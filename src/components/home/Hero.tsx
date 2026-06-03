"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-screen
        pt-20
        bg-[#F8F3EA]
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-16
          lg:py-24
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >
        {/* LEFT CONTENT */}

        <div>

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-[#D4A857]
              text-xs
              font-semibold
              mb-6
            "
          >
            Heritage • Elegance • Craftsmanship
          </p>

          <h1
            className="
              font-brand
              text-[#2A2A2A]
              text-5xl
              md:text-7xl
              leading-none
            "
          >
            Timeless Sarees
            <br />
            For Modern Women
          </h1>

          <p
            className="
              mt-8
              text-[#6B6B6B]
              text-lg
              leading-8
              max-w-xl
            "
          >
            Discover handcrafted sarees inspired by
            India&apos;s rich weaving traditions, designed
            for celebrations, heritage, and everyday elegance.
          </p>

          <div
            className="
              flex
              flex-wrap
              gap-4
              mt-10
            "
          >
            <Link
              href="/products"
              className="
                btn-primary
              "
            >
              Explore Collection
            </Link>

            <Link
              href="/products"
              className="
                btn-secondary
              "
            >
              View Catalogue
            </Link>
          </div>

          <div
            className="
              flex
              gap-12
              mt-16
            "
          >
            <div>
              <h3
                className="
                  text-3xl
                  font-semibold
                  text-[#7A0019]
                "
              >
                500+
              </h3>

              <p
                className="
                  text-sm
                  text-[#6B6B6B]
                "
              >
                Premium Designs
              </p>
            </div>

            <div>
              <h3
                className="
                  text-3xl
                  font-semibold
                  text-[#7A0019]
                "
              >
                100%
              </h3>

              <p
                className="
                  text-sm
                  text-[#6B6B6B]
                "
              >
                Authentic Craftsmanship
              </p>
            </div>

            <div>
              <h3
                className="
                  text-3xl
                  font-semibold
                  text-[#7A0019]
                "
              >
                PAN
              </h3>

              <p
                className="
                  text-sm
                  text-[#6B6B6B]
                "
              >
                India Delivery
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}

        <div
          className="
            relative
          "
        >
          <div
            className="
              relative
              h-[600px]
              rounded-2xl
              overflow-hidden
            "
          >
            <Image
              src="/hero-saree.jpg"
              alt="Charukala Saree Collection"
              fill
              priority
              className="
                object-cover
              "
            />
          </div>

          <div
            className="
              absolute
              -bottom-8
              -left-8
              bg-white
              p-6
              rounded-xl
              shadow-md
            "
          >
            <p
              className="
                text-sm
                text-[#6B6B6B]
              "
            >
              Featured Collection
            </p>

            <h3
              className="
                font-brand
                text-2xl
                mt-1
              "
            >
              Bridal Heritage
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}