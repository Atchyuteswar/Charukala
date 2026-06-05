import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import InvoiceActions from "./InvoiceActions";

type Params = Promise<{ id: string }>;

export default async function InvoicePage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const order = await prisma.order.findUnique({
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
    redirect("/orders");
  }

  if (order.user.email !== session.user.email) {
    redirect("/orders");
  }

  const orderDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const invoiceNumber = `CK-${order.id
    .slice(-8)
    .toUpperCase()}`;

  return (
    <main className="invoice-page-bg">
      {/* PRINT-HIDDEN ACTIONS BAR */}
      <InvoiceActions orderId={order.id} />

      {/* INVOICE DOCUMENT */}
      <div className="invoice-paper">
        {/* HEADER */}
        <header className="invoice-header">
          <div className="invoice-header-left">
            <Image
              src="/logo-main.png"
              alt="Charukala"
              width={180}
              height={60}
              className="invoice-logo"
              priority
            />
          </div>
          <div className="invoice-header-right">
            <h2 className="invoice-title">
              INVOICE
            </h2>
            <p className="invoice-meta-item">
              <span className="invoice-meta-label">
                Invoice No
              </span>
              <span className="invoice-meta-value">
                {invoiceNumber}
              </span>
            </p>
            <p className="invoice-meta-item">
              <span className="invoice-meta-label">
                Date
              </span>
              <span className="invoice-meta-value">
                {orderDate}
              </span>
            </p>
            {order.paymentId && (
              <p className="invoice-meta-item">
                <span className="invoice-meta-label">
                  Payment ID
                </span>
                <span className="invoice-meta-value invoice-meta-value--small">
                  {order.paymentId}
                </span>
              </p>
            )}
          </div>
        </header>

        {/* ACCENT LINE */}
        <div className="invoice-accent-line" />

        {/* CUSTOMER DETAILS */}
        <section className="invoice-customer-section">
          <div>
            <h3 className="invoice-section-label">
              Bill To
            </h3>
            <p className="invoice-customer-name">
              {order.fullName}
            </p>
            <p className="invoice-customer-detail">
              {order.street}
            </p>
            <p className="invoice-customer-detail">
              {order.city}, {order.state}{" "}
              {order.pincode}
            </p>
            <p className="invoice-customer-detail">
              Phone: {order.phone}
            </p>
          </div>
          <div>
            <h3 className="invoice-section-label">
              Order Status
            </h3>
            <span className="invoice-status-badge">
              {order.status}
            </span>
          </div>
        </section>

        {/* ITEMS TABLE */}
        <section className="invoice-items-section">
          <table className="invoice-table">
            <thead>
              <tr>
                <th className="invoice-th invoice-th--left">
                  #
                </th>
                <th className="invoice-th invoice-th--left invoice-th--wide">
                  Item
                </th>
                <th className="invoice-th invoice-th--center">
                  Qty
                </th>
                <th className="invoice-th invoice-th--right">
                  Unit Price
                </th>
                <th className="invoice-th invoice-th--right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(
                (item, index) => (
                  <tr
                    key={item.id}
                    className={
                      index % 2 === 0
                        ? "invoice-tr--even"
                        : ""
                    }
                  >
                    <td className="invoice-td invoice-td--left invoice-td--muted">
                      {index + 1}
                    </td>
                    <td className="invoice-td invoice-td--left invoice-td--name">
                      {item.product.name}
                    </td>
                    <td className="invoice-td invoice-td--center">
                      {item.quantity}
                    </td>
                    <td className="invoice-td invoice-td--right">
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </td>
                    <td className="invoice-td invoice-td--right invoice-td--bold">
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>

        {/* TOTALS */}
        <section className="invoice-totals-section">
          <div className="invoice-totals-box">
            <div className="invoice-totals-row">
              <span>Subtotal</span>
              <span>
                ₹
                {order.totalAmount.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
            <div className="invoice-totals-row">
              <span>Shipping</span>
              <span className="invoice-free-tag">
                FREE
              </span>
            </div>
            <div className="invoice-totals-divider" />
            <div className="invoice-totals-row invoice-totals-row--grand">
              <span>Grand Total</span>
              <span>
                ₹
                {order.totalAmount.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="invoice-footer">
          <div className="invoice-accent-line" />
          <p className="invoice-footer-thanks">
            Thank you for shopping with Charukala
          </p>
          <p className="invoice-footer-note">
            This is a computer-generated invoice
            and does not require a physical
            signature.
          </p>
          <div className="invoice-footer-links">
            <Link
              href="/orders"
              className="invoice-footer-link"
            >
              View Orders
            </Link>
            <span className="invoice-footer-separator">
              •
            </span>
            <Link
              href="/products"
              className="invoice-footer-link"
            >
              Continue Shopping
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
