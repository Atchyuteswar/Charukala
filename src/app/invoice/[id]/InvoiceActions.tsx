"use client";

export default function InvoiceActions({
  orderId,
}: {
  orderId: string;
}) {
  return (
    <div className="invoice-actions no-print">
      <button
        onClick={() => window.print()}
        className="invoice-action-btn invoice-action-btn--print"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9V2h12v7" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect
            x="6"
            y="14"
            width="12"
            height="8"
          />
        </svg>
        Print Invoice
      </button>

      <a
        href={`/api/invoice/${orderId}`}
        className="invoice-action-btn invoice-action-btn--download"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line
            x1="12"
            y1="15"
            x2="12"
            y2="3"
          />
        </svg>
        Download PDF
      </a>
    </div>
  );
}
