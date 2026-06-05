import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="
        bg-[#F8F3EA]
        border-t
        border-[#E8DCC4]
        pt-20
        pb-10
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >
        <div
          className="
            grid
            md:grid-cols-3
            gap-16
          "
        >
          {/* BRAND */}

          <div>
            <Image
              src="/logo-main.png"
              alt="Charukala"
              width={260}
              height={60}
              className="
                h-14
                w-auto
                object-contain
              "
            />

            <p
              className="
                mt-6
                text-[#6B6B6B]
                leading-8
                max-w-sm
              "
            >
              Celebrating India&apos;s rich textile heritage
              through thoughtfully curated sarees that
              blend timeless craftsmanship with modern elegance.
            </p>
          </div>

          {/* QUICK LINKS */}

          <div>
            <h3
              className="
                font-brand
                text-3xl
                text-[#2A2A2A]
                mb-6
              "
            >
              Explore
            </h3>

            <div
              className="
                flex
                flex-col
                gap-4
              "
            >
              <Link
                href="/"
                className="
                  text-[#6B6B6B]
                  hover:text-[#7A0019]
                  transition
                "
              >
                Home
              </Link>

              <Link
                href="/products"
                className="
                  text-[#6B6B6B]
                  hover:text-[#7A0019]
                  transition
                "
              >
                Collections
              </Link>

              <Link
                href="/orders"
                className="
                  text-[#6B6B6B]
                  hover:text-[#7A0019]
                  transition
                "
              >
                Orders
              </Link>

              <Link
                href="/profile"
                className="
                  text-[#6B6B6B]
                  hover:text-[#7A0019]
                  transition
                "
              >
                Profile
              </Link>
            </div>
          </div>

          {/* CUSTOMER CARE */}

          <div>
            <h3
              className="
                font-brand
                text-3xl
                text-[#2A2A2A]
                mb-6
              "
            >
              Customer Care
            </h3>

            <div
              className="
                flex
                flex-col
                gap-4
                text-[#6B6B6B]
              "
            >
              <p>
                support@charukala.com
              </p>

              <p>
                +91 XXXXX XXXXX
              </p>

              <p>
                Secure Payments via Razorpay
              </p>

              <p>
                Pan India Delivery
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div
          className="
            mt-16
            pt-8
            border-t
            border-[#E8DCC4]
            flex
            flex-col
            md:flex-row
            justify-between
            gap-4
            text-sm
            text-[#6B6B6B]
          "
        >
          <p>
            © 2026 Charukala. All Rights Reserved.
          </p>

          <p>
            Crafted with elegance in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
