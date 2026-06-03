import Link from "next/link";

type SearchParams = Promise<{
  id?: string;
}>;

export default async function OrderSuccess({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params =
    await searchParams;

  return (
    <main
      className="
        min-h-screen
        bg-[#F8F3EA]
        pt-32
        pb-24
        px-6
      "
    >
      <div
        className="
          max-w-3xl
          mx-auto
          text-center
        "
      >
        {/* SUCCESS ICON */}

        <div
          className="
            w-24
            h-24
            mx-auto
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
            text-5xl
          "
        >
          ✓
        </div>

        {/* TAG */}

        <p
          className="
            section-tag
            mt-10
            mb-4
          "
        >
          Order Confirmed
        </p>

        {/* TITLE */}

        <h1
          className="
            font-brand
            text-5xl
            md:text-6xl
            text-[#2A2A2A]
          "
        >
          Thank You
          <br />
          For Your Purchase
        </h1>

        {/* MESSAGE */}

        <p
          className="
            mt-8
            text-[#6B6B6B]
            text-lg
            leading-8
            max-w-xl
            mx-auto
          "
        >
          Your order has been successfully placed.
          We are preparing your Charukala
          collection for dispatch and will keep
          you updated throughout the journey.
        </p>

        {/* ORDER ID */}

        <div
          className="
            mt-10
            bg-white
            rounded-2xl
            p-6
            border
            border-[#E8DCC4]
          "
        >
          <p
            className="
              text-sm
              uppercase
              tracking-widest
              text-[#6B6B6B]
            "
          >
            Order Reference
          </p>

          <p
            className="
              mt-2
              text-xl
              font-semibold
              text-[#7A0019]
              break-all
            "
          >
            {params.id}
          </p>
        </div>

        {/* ACTIONS */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-center
            gap-4
            mt-12
          "
        >
          <Link
            href={`/api/invoice/${params.id}`}
            className="
              btn-primary
            "
          >
            Download Invoice
          </Link>

          <Link
            href="/orders"
            className="
              btn-secondary
            "
          >
            View Orders
          </Link>

          <Link
            href="/products"
            className="
              btn-secondary
            "
          >
            Continue Shopping
          </Link>
        </div>

        {/* INFO */}

        <div
          className="
            mt-16
            text-[#6B6B6B]
            text-sm
          "
        >
          <p>
            A confirmation has been recorded for
            your order and payment.
          </p>
        </div>
      </div>
    </main>
  );
}