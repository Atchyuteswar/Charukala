import { Resend } from "resend";

export async function sendOrderEmail({
  to,
  subject,
  message
}: {
  to: string;
  subject: string;
  message: string;
}) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");
    await resend.emails.send({

      from:
        "Charukala <charukala@resend.dev>",

      to,

      subject,

      html: `

<div
style="
font-family:sans-serif;
padding:40px;
background:#f8f5f0;
"
>

<h1
style="
font-size:32px;
margin-bottom:20px;
"
>
${subject}
</h1>

<p
style="
font-size:18px;
line-height:1.8;
color:#444;
"
>
${message}
</p>

<p
style="
margin-top:40px;
font-size:14px;
color:#888;
"
>
Luxury fashion by Charukala ✨
</p>

</div>

`

    });

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error
    );

  }

}

// ── Invoice Email ──

interface InvoiceItem {
  product: { name: string };
  quantity: number;
  price: number;
}

interface InvoiceOrderData {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  totalAmount: number;
  paymentId: string | null;
  createdAt: Date;
  items: InvoiceItem[];
}

export async function sendInvoiceEmail({
  to,
  order,
}: {
  to: string;
  order: InvoiceOrderData;
}) {
  try {
    const resend = new Resend(
      process.env.RESEND_API_KEY || "re_dummy"
    );

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

    const itemRows = order.items
      .map(
        (item, i) => `
        <tr style="${i % 2 === 0 ? "background:#fdfbf7;" : ""}">
          <td style="padding:12px 16px;font-size:14px;color:#999;border-bottom:1px solid #f0ebe2;">
            ${i + 1}
          </td>
          <td style="padding:12px 16px;font-size:14px;font-weight:500;color:#2A2A2A;border-bottom:1px solid #f0ebe2;">
            ${item.product.name}
          </td>
          <td style="padding:12px 16px;font-size:14px;text-align:center;color:#6B6B6B;border-bottom:1px solid #f0ebe2;">
            ${item.quantity}
          </td>
          <td style="padding:12px 16px;font-size:14px;text-align:right;color:#6B6B6B;border-bottom:1px solid #f0ebe2;">
            ₹${item.price.toLocaleString("en-IN")}
          </td>
          <td style="padding:12px 16px;font-size:14px;text-align:right;font-weight:700;color:#2A2A2A;border-bottom:1px solid #f0ebe2;">
            ₹${(item.price * item.quantity).toLocaleString("en-IN")}
          </td>
        </tr>`
      )
      .join("");

    const baseUrl =
      process.env.AUTH_URL ||
      "http://localhost:3000";

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#F8F3EA;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">

  <!-- OUTER WRAPPER -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F3EA;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- HEADER -->
          <tr>
            <td style="padding:32px 40px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin:0;font-size:28px;font-weight:700;color:#7A0019;letter-spacing:2px;">CHARUKALA</h1>
                    <p style="margin:4px 0 0;font-size:11px;color:#6B6B6B;letter-spacing:3px;text-transform:uppercase;">Luxury Saree Collection</p>
                  </td>
                  <td style="text-align:right;">
                    <h2 style="margin:0;font-size:22px;font-weight:600;color:#2A2A2A;">INVOICE</h2>
                    <p style="margin:4px 0 0;font-size:12px;color:#6B6B6B;">${invoiceNumber}</p>
                    <p style="margin:2px 0 0;font-size:12px;color:#6B6B6B;">${orderDate}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ACCENT LINE -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:3px;background:linear-gradient(90deg,#7A0019,#D4A857);border-radius:2px;"></div>
            </td>
          </tr>

          <!-- CUSTOMER INFO -->
          <tr>
            <td style="padding:24px 40px 8px;">
              <p style="font-size:10px;color:#D4A857;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;font-weight:600;">BILL TO</p>
              <p style="margin:0;font-size:18px;font-weight:600;color:#2A2A2A;">${order.fullName}</p>
              <p style="margin:4px 0;font-size:13px;color:#6B6B6B;line-height:1.6;">
                ${order.street}<br />
                ${order.city}, ${order.state} ${order.pincode}<br />
                Phone: ${order.phone}
              </p>
            </td>
          </tr>

          <!-- ITEMS TABLE -->
          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <thead>
                  <tr>
                    <th style="padding:10px 16px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#fff;background:#7A0019;text-align:left;border-radius:8px 0 0 0;">#</th>
                    <th style="padding:10px 16px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#fff;background:#7A0019;text-align:left;">Item</th>
                    <th style="padding:10px 16px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#fff;background:#7A0019;text-align:center;">Qty</th>
                    <th style="padding:10px 16px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#fff;background:#7A0019;text-align:right;">Price</th>
                    <th style="padding:10px 16px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#fff;background:#7A0019;text-align:right;border-radius:0 8px 0 0;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- TOTALS -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table width="260" cellpadding="0" cellspacing="0" style="margin-left:auto;">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#6B6B6B;">Subtotal</td>
                  <td style="padding:6px 0;font-size:14px;color:#6B6B6B;text-align:right;">₹${order.totalAmount.toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#6B6B6B;">Shipping</td>
                  <td style="padding:6px 0;font-size:13px;color:#16a34a;font-weight:600;text-align:right;">FREE</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:8px 0 0;">
                    <div style="height:2px;background:#E8DCC4;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0 0;font-size:18px;font-weight:700;color:#7A0019;">Grand Total</td>
                  <td style="padding:12px 0 0;font-size:18px;font-weight:700;color:#7A0019;text-align:right;">₹${order.totalAmount.toLocaleString("en-IN")}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ACCENT LINE -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:3px;background:linear-gradient(90deg,#7A0019,#D4A857);border-radius:2px;"></div>
            </td>
          </tr>

          <!-- CTA BUTTON -->
          <tr>
            <td style="padding:28px 40px 12px;text-align:center;">
              <a href="${baseUrl}/invoice/${order.id}" style="display:inline-block;padding:14px 36px;background:#7A0019;color:#D4A857;font-size:14px;font-weight:600;text-decoration:none;border-radius:10px;">
                View Invoice
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:16px 40px 32px;text-align:center;">
              <p style="margin:0;font-size:16px;color:#2A2A2A;">Thank you for shopping with Charukala ✨</p>
              <p style="margin:8px 0 0;font-size:11px;color:#999;">This is a computer-generated invoice and does not require a physical signature.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

    await resend.emails.send({
      from: "Charukala <charukala@resend.dev>",
      to,
      subject: `Your Charukala Invoice — ${invoiceNumber}`,
      html,
    });

  } catch (error) {
    console.log(
      "INVOICE EMAIL ERROR:",
      error
    );
  }
}
