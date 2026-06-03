import { prisma } from "@/lib/prisma";
import PDFDocument from "pdfkit";
import { auth } from "@/auth";

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
    {
      status: 401,
    }
  );
}

  const order =
    await prisma.order.findUnique({
      where: {
        id,
      },

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
      {
        status: 404,
      }
    );
  }

  if (
  order.user.email !==
  session.user.email
) {
  return new Response(
    "Forbidden",
    {
      status: 403,
    }
  );
}

  const doc =
    new PDFDocument({
      margin: 50,
    });

  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) =>
    chunks.push(chunk)
  );

  const endPromise =
  new Promise<Uint8Array>((resolve) => {
      doc.on("end", () => {
        resolve(
  new Uint8Array(
    Buffer.concat(chunks)
  )
);
      });
    });

  /* HEADER */

  doc
    .fontSize(24)
    .text("CHARUKALA");

  doc.moveDown();

  doc
    .fontSize(12)
    .text(
      "Luxury Saree Collection"
    );

  doc.moveDown(2);

  /* INVOICE */

  doc
    .fontSize(20)
    .text("Invoice");

  doc.moveDown();

  doc.text(
    `Order ID: ${order.id}`
  );

  doc.text(
    `Date: ${new Date(
      order.createdAt
    ).toLocaleDateString()}`
  );

  doc.moveDown();

  /* CUSTOMER */

  doc
    .fontSize(16)
    .text(
      "Customer Details"
    );

  doc.moveDown(0.5);

  doc.text(order.fullName);

  doc.text(order.phone);

  doc.text(order.street);

  doc.text(
    `${order.city}, ${order.state}`
  );

  doc.text(order.pincode);

  doc.moveDown();

  /* PRODUCTS */

  doc
    .fontSize(16)
    .text("Items");

  doc.moveDown();

  order.items.forEach(
    (item) => {
      doc.text(
        `${item.product.name}`
      );

      doc.text(
        `Qty: ${item.quantity}`
      );

      doc.text(
        `₹${
          item.price *
          item.quantity
        }`
      );

      doc.moveDown();
    }
  );

  doc.moveDown();

  /* TOTAL */

  doc
    .fontSize(18)
    .text(
      `Total: ₹${order.totalAmount}`
    );

  doc.moveDown(2);

  doc
    .fontSize(10)
    .text(
      "Thank you for shopping with Charukala."
    );

  doc.end();

  const pdfBuffer =
  await endPromise;

const uint8Array =
  new Uint8Array(pdfBuffer);

return new Response(
  uint8Array,
  {
    headers: {
      "Content-Type":
        "application/pdf",

      "Content-Disposition":
        `attachment; filename=invoice-${order.id}.pdf`,
    },
  }
);
}