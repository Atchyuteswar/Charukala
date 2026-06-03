import Link from "next/link";
import Image from "next/image";

export default function Footer() {

  return (

    <footer className="bg-black text-white pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-4
            gap-8
            sm:gap-10
            md:gap-16
          "
        >

          {/* BRAND */}

          <div className="sm:col-span-2 md:col-span-1">

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              <Image 
                src="/logo-main.png" 
                alt="Charukala" 
                width={160} 
                height={40} 
                className="w-auto h-8 sm:h-10 md:h-12 object-contain" 
              />
            </h2>

            <p
              className="
                text-white/60
                mt-4
                sm:mt-6
                leading-7
                sm:leading-8
                text-sm
                sm:text-base
              "
            >
              Celebrating timeless Indian craftsmanship through
              luxurious handcrafted sarees.
            </p>

          </div>

          {/* LINKS */}

          <div>

            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Collections
            </h3>

            <div className="flex flex-col gap-3 sm:gap-4 text-white/60 text-sm sm:text-base">

              <Link href="/products">
                Silk Sarees
              </Link>

              <Link href="/products">
                Bridal Collection
              </Link>

              <Link href="/products">
                Festival Wear
              </Link>

            </div>

          </div>

          {/* SUPPORT */}

          <div>

            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Support
            </h3>

            <div className="flex flex-col gap-3 sm:gap-4 text-white/60 text-sm sm:text-base">

              <Link href="/orders">
                Orders
              </Link>

              <Link href="/contact">
                Contact Us
              </Link>

              <Link href="/shipping">
                Shipping Policy
              </Link>

            </div>

          </div>

          {/* NEWSLETTER */}

          <div className="sm:col-span-2 md:col-span-1">

            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Stay Updated
            </h3>

            <div className="flex max-w-md">

              <input
                type="email"
                placeholder="Your email"
                className="
                  bg-white/10
                  border
                  border-white/10
                  px-4
                  sm:px-5
                  py-3
                  sm:py-4
                  rounded-l-full
                  outline-none
                  w-full
                  min-w-0
                  text-sm
                  sm:text-base
                "
              />

              <button
                className="
                  bg-[#9b174c]
                  px-5
                  sm:px-6
                  rounded-r-full
                  whitespace-nowrap
                  text-sm
                  sm:text-base
                  shrink-0
                "
              >
                Join
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div
          className="
            border-t
            border-white/10
            mt-12
            sm:mt-16
            md:mt-20
            pt-6
            sm:pt-8
            flex
            flex-col
            md:flex-row
            justify-between
            gap-3
            sm:gap-5
            text-white/50
            text-xs
            sm:text-sm
          "
        >

          <p>
            &copy; 2026 Charukala. All rights reserved.
          </p>

          <p>
            Designed with elegance in India.
          </p>

        </div>

      </div>

    </footer>

  );

}