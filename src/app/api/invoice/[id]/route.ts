import { prisma } from "@/lib/prisma";
import PDFDocument from "pdfkit";
import { auth } from "@/auth";
import path from "path";
import fs from "fs";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.email) {
    return new Response(
      "Unauthorized",
      { status: 401 }
    );
  }

  const order =
    await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

  if (!order) {
    return new Response(
      "Order not found",
      { status: 404 }
    );
  }

  if (
    order.user.email !==
    session.user.email
  ) {
    return new Response(
      "Forbidden",
      { status: 403 }
    );
  }

  // ── PDF Generation ──

  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
    bufferPages: true,
  });

  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) =>
    chunks.push(chunk)
  );

  const endPromise =
    new Promise<Uint8Array>(
      (resolve) => {
        doc.on("end", () => {
          resolve(
            new Uint8Array(
              Buffer.concat(chunks)
            )
          );
        });
      }
    );

  // ── Colors ──

  const MAROON = "#7A0019";
  const GOLD = "#D4A857";
  const CHARCOAL = "#2A2A2A";
  const GRAY = "#6B6B6B";
  const LIGHT_BG = "#FDFBF7";
  const BORDER = "#E8DCC4";

  const pageWidth =
    doc.page.width -
    doc.page.margins.left -
    doc.page.margins.right;

  const leftX = 50;
  const rightEdge = leftX + pageWidth;

  const invoiceNumber = `CK-${order.id
    .slice(-8)
    .toUpperCase()}`;

  const orderDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ── Font setup (for ₹ support) ──

  let currencySymbol = "Rs.";
  const arialPath =
    "C:\\Windows\\Fonts\\arial.ttf";
  const arialBoldPath =
    "C:\\Windows\\Fonts\\arialbd.ttf";

  const hasArial =
    fs.existsSync(arialPath);

  if (hasArial) {
    doc.registerFont(
      "Main",
      arialPath
    );
    if (fs.existsSync(arialBoldPath)) {
      doc.registerFont(
        "MainBold",
        arialBoldPath
      );
    } else {
      doc.registerFont(
        "MainBold",
        arialPath
      );
    }
    currencySymbol = "\u20B9";
  } else {
    doc.registerFont(
      "Main",
      "Helvetica"
    );
    doc.registerFont(
      "MainBold",
      "Helvetica-Bold"
    );
  }

  // ── HEADER: Logo + Invoice metadata ──

  // Logo image
  const logoPath = path.join(
    process.cwd(),
    "public",
    "logo-main.png"
  );

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, leftX, 45, {
      width: 160,
    });
  } else {
    doc
      .font("MainBold")
      .fontSize(28)
      .fillColor(MAROON)
      .text("CHARUKALA", leftX, 50);
  }

  // Right side: INVOICE title + metadata
  doc
    .font("MainBold")
    .fontSize(22)
    .fillColor(CHARCOAL)
    .text("INVOICE", 350, 48, {
      align: "right",
    });

  const metaX = 370;
  const metaValX = 460;
  const metaValW = 85;
  let metaY = 78;

  doc
    .font("Main")
    .fontSize(9)
    .fillColor(GRAY);

  doc.text("Invoice No", metaX, metaY, {
    width: 80,
    align: "right",
  });
  doc
    .font("MainBold")
    .fillColor(CHARCOAL)
    .text(invoiceNumber, metaValX, metaY, {
      width: metaValW,
      align: "right",
    });

  metaY += 16;
  doc
    .font("Main")
    .fillColor(GRAY)
    .text("Date", metaX, metaY, {
      width: 80,
      align: "right",
    });
  doc
    .font("MainBold")
    .fillColor(CHARCOAL)
    .text(orderDate, metaValX, metaY, {
      width: metaValW,
      align: "right",
    });

  if (order.paymentId) {
    metaY += 16;
    doc
      .font("Main")
      .fontSize(9)
      .fillColor(GRAY)
      .text("Payment ID", metaX, metaY, {
        width: 80,
        align: "right",
      });
    doc
      .font("Main")
      .fontSize(7.5)
      .fillColor(CHARCOAL)
      .text(
        order.paymentId,
        metaValX,
        metaY,
        {
          width: metaValW,
          align: "right",
        }
      );
  }

  // ── Accent line (below header) ──

  const accentY = metaY + 22;

  doc
    .moveTo(leftX, accentY)
    .lineTo(
      leftX + pageWidth * 0.4,
      accentY
    )
    .strokeColor(MAROON)
    .lineWidth(2.5)
    .stroke();

  doc
    .moveTo(
      leftX + pageWidth * 0.4,
      accentY
    )
    .lineTo(rightEdge, accentY)
    .strokeColor(GOLD)
    .lineWidth(2.5)
    .stroke();

  // ── Customer Details (Bill To) + Order Status ──

  const custY = accentY + 22;

  // Bill To label
  doc
    .font("MainBold")
    .fontSize(8)
    .fillColor(GOLD)
    .text("BILL TO", leftX, custY, {
      characterSpacing: 2,
    });

  doc
    .font("MainBold")
    .fontSize(14)
    .fillColor(CHARCOAL)
    .text(
      order.fullName,
      leftX,
      custY + 20
    );

  doc
    .font("Main")
    .fontSize(9)
    .fillColor(GRAY);

  doc.text(
    order.street,
    leftX,
    custY + 40
  );
  doc.text(
    `${order.city}, ${order.state} ${order.pincode}`,
    leftX,
    custY + 54
  );
  doc.text(
    `Phone: ${order.phone}`,
    leftX,
    custY + 68
  );

  // Order Status (right side)
  doc
    .font("MainBold")
    .fontSize(8)
    .fillColor(GOLD)
    .text(
      "ORDER STATUS",
      350,
      custY,
      {
        align: "right",
        characterSpacing: 2,
      }
    );

  // Status badge
  const badgeText = order.status;
  const badgeWidth = 70;
  const badgeX = rightEdge - badgeWidth;
  const badgeY = custY + 20;

  doc
    .roundedRect(
      badgeX,
      badgeY,
      badgeWidth,
      22,
      3
    )
    .fillAndStroke(
      "#F8F3EA",
      BORDER
    );

  doc
    .font("MainBold")
    .fontSize(8)
    .fillColor(MAROON)
    .text(
      badgeText,
      badgeX,
      badgeY + 7,
      {
        width: badgeWidth,
        align: "center",
      }
    );

  // ── ITEMS TABLE ──

  const tableTop = custY + 100;
  const col = {
    num: leftX,
    item: leftX + 40,
    qty: 310,
    price: 390,
    total: 475,
  };

  // Table header background
  doc
    .save()
    .roundedRect(
      leftX,
      tableTop,
      pageWidth,
      24,
      6
    )
    .clip()
    .rect(
      leftX,
      tableTop,
      pageWidth,
      24
    )
    .fill(MAROON)
    .restore();

  // Table header text
  doc
    .font("MainBold")
    .fontSize(8)
    .fillColor("#ffffff");

  doc.text(
    "#",
    col.num + 10,
    tableTop + 8
  );

  doc.text(
    "ITEM",
    col.item + 10,
    tableTop + 8
  );

  doc.text(
    "QTY",
    col.qty,
    tableTop + 8,
    { width: 60, align: "center" }
  );

  doc.text(
    "UNIT PRICE",
    col.price,
    tableTop + 8,
    { width: 75, align: "right" }
  );

  doc.text(
    "TOTAL",
    col.total,
    tableTop + 8,
    { width: 70, align: "right" }
  );

  // Table rows
  let rowY = tableTop + 30;

  order.items.forEach(
    (item, index) => {
      // Alternating row background
      if (index % 2 === 0) {
        doc
          .rect(
            leftX,
            rowY - 4,
            pageWidth,
            26
          )
          .fill(LIGHT_BG);
      }

      doc
        .font("Main")
        .fontSize(9)
        .fillColor(GRAY)
        .text(
          String(index + 1),
          col.num + 10,
          rowY + 3
        );

      doc
        .font("MainBold")
        .fillColor(CHARCOAL)
        .text(
          item.product.name,
          col.item + 10,
          rowY + 3,
          { width: 220 }
        );

      doc
        .font("Main")
        .fillColor(CHARCOAL)
        .text(
          String(item.quantity),
          col.qty,
          rowY + 3,
          {
            width: 60,
            align: "center",
          }
        );

      doc
        .font("Main")
        .fillColor(GRAY)
        .text(
          `${currencySymbol}${item.price.toLocaleString("en-IN")}`,
          col.price,
          rowY + 3,
          { width: 75, align: "right" }
        );

      doc
        .font("MainBold")
        .fillColor(CHARCOAL)
        .text(
          `${currencySymbol}${(item.price * item.quantity).toLocaleString("en-IN")}`,
          col.total,
          rowY + 3,
          {
            width: 70,
            align: "right",
          }
        );

      rowY += 28;
    }
  );

  // Bottom border of table
  doc
    .moveTo(leftX, rowY)
    .lineTo(rightEdge, rowY)
    .strokeColor(BORDER)
    .lineWidth(1)
    .stroke();

  // ── TOTALS ──

  const totalsLabelX = 390;
  const totalsValueX = col.total;
  const totalsY = rowY + 20;

  doc
    .font("Main")
    .fontSize(10)
    .fillColor(GRAY)
    .text(
      "Subtotal",
      totalsLabelX,
      totalsY,
      { width: 75, align: "right" }
    );

  doc
    .font("Main")
    .fillColor(CHARCOAL)
    .text(
      `${currencySymbol}${order.totalAmount.toLocaleString("en-IN")}`,
      totalsValueX,
      totalsY,
      { width: 70, align: "right" }
    );

  doc
    .font("Main")
    .fillColor(GRAY)
    .text(
      "Shipping",
      totalsLabelX,
      totalsY + 18,
      { width: 75, align: "right" }
    );

  doc
    .font("MainBold")
    .fontSize(9)
    .fillColor("#16a34a")
    .text(
      "FREE",
      totalsValueX,
      totalsY + 18,
      { width: 70, align: "right" }
    );

  // Divider
  doc
    .moveTo(totalsLabelX, totalsY + 38)
    .lineTo(rightEdge, totalsY + 38)
    .strokeColor(BORDER)
    .lineWidth(1.5)
    .stroke();

  // Grand total
  doc
    .font("MainBold")
    .fontSize(14)
    .fillColor(MAROON)
    .text(
      "Grand Total",
      totalsLabelX - 30,
      totalsY + 48,
      { width: 105, align: "right" }
    );

  doc
    .font("MainBold")
    .fontSize(14)
    .fillColor(MAROON)
    .text(
      `${currencySymbol}${order.totalAmount.toLocaleString("en-IN")}`,
      totalsValueX - 10,
      totalsY + 48,
      { width: 80, align: "right" }
    );

  // ── FOOTER ──

  const footerY = totalsY + 90;

  // Accent line
  doc
    .moveTo(leftX, footerY)
    .lineTo(
      leftX + pageWidth * 0.4,
      footerY
    )
    .strokeColor(MAROON)
    .lineWidth(2)
    .stroke();

  doc
    .moveTo(
      leftX + pageWidth * 0.4,
      footerY
    )
    .lineTo(rightEdge, footerY)
    .strokeColor(GOLD)
    .lineWidth(2)
    .stroke();

  doc
    .font("MainBold")
    .fontSize(13)
    .fillColor(CHARCOAL)
    .text(
      "Thank you for shopping with Charukala",
      leftX,
      footerY + 16,
      {
        align: "center",
        width: pageWidth,
      }
    );

  doc
    .font("Main")
    .fontSize(8)
    .fillColor(GRAY)
    .text(
      "This is a computer-generated invoice and does not require a physical signature.",
      leftX,
      footerY + 38,
      {
        align: "center",
        width: pageWidth,
      }
    );

  doc.end();

  const pdfBuffer =
    await endPromise;

  return new Response(
    new Uint8Array(pdfBuffer),
    {
      headers: {
        "Content-Type":
          "application/pdf",
        "Content-Disposition":
          `attachment; filename=charukala-invoice-${invoiceNumber}.pdf`,
      },
    }
  );
}