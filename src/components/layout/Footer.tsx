import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="
        bg-[#7A0019]
        border-t
        border-[#5A0012]
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
                text-[#F8F3EA]/80
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
                text-[#D4A857]
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
                  text-[#F8F3EA]/80
                  hover:text-[#D4A857]
                  transition
                "
              >
                Home
              </Link>

              <Link
                href="/products"
                className="
                  text-[#F8F3EA]/80
                  hover:text-[#D4A857]
                  transition
                "
              >
                Collections
              </Link>

              <Link
                href="/orders"
                className="
                  text-[#F8F3EA]/80
                  hover:text-[#D4A857]
                  transition
                "
              >
                Orders
              </Link>

              <Link
                href="/profile"
                className="
                  text-[#F8F3EA]/80
                  hover:text-[#D4A857]
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
                text-[#D4A857]
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
                text-[#F8F3EA]/80
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
            border-[#5A0012]
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
            text-sm
            text-[#F8F3EA]/60
          "
        >
          <p>
            © 2026 Charukala. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 md:gap-8">
            <p>
              Crafted with elegance in India.
            </p>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <Image
                src="/sklogo.png"
                alt="Powered by"
                width={80}
                height={30}
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
