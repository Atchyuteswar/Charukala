import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import FadeIn from "@/components/animations/FadeIn";

import WishlistButton from "@/components/product/WishlistButton";

export default async function FeaturedProducts() {

  const products =
    await prisma.product.findMany({

      take: 4,

      orderBy: {
        createdAt: "desc"
      }

    });

  return (

    <section className="py-16 sm:py-24 md:py-32 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            mb-10
            sm:mb-16
            gap-4
          "
        >

          <div>

            <p
              className="
                uppercase
                tracking-[0.3em]
                sm:tracking-[0.4em]
                text-[#9b174c]
                text-xs
                sm:text-sm
              "
            >
              New Arrivals
            </p>

            <h2
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                font-black
                mt-3
                sm:mt-4
              "
            >
              Featured Sarees
            </h2>

          </div>

          <Link
            href="/products"
            className="
              hidden
              sm:block
              border
              border-black
              px-6
              py-3
              rounded-full
              hover:bg-black
              hover:text-white
              transition
              whitespace-nowrap
            "
          >
            View All
          </Link>

        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
            sm:gap-6
            md:gap-8
          "
        >

          {

            products.map((product, index) => (

              <FadeIn
                key={product.id}
                delay={index * 0.15}
              >

                <Link
                  href={`/products/${product.slug}`}
                  className="
                    group
                    block
                    transition
                    duration-500
                    hover:-translate-y-2
                  "
                >

                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      h-[250px]
                      sm:h-[350px]
                      md:h-[420px]
                      lg:h-[500px]
                      overflow-hidden
                      rounded-[16px]
                      sm:rounded-[24px]
                      md:rounded-[30px]
                      bg-[#f8f5f0]
                    "
                  >

                    <WishlistButton
                      productId={product.id}
                    />

                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="
                        (max-width: 640px) 50vw,
                        (max-width: 1024px) 50vw,
                        25vw
                      "
                      className="
                        object-cover
                        group-hover:scale-110
                        transition
                        duration-700
                      "
                    />

                    {/* OVERLAY */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-black/0
                        group-hover:bg-black/10
                        transition
                      "
                    />

                    {/* QUICK VIEW */}

                    <div
                      className="
                        absolute
                        bottom-5
                        left-1/2
                        -translate-x-1/2
                        translate-y-20
                        group-hover:translate-y-0
                        transition
                        duration-500
                        hidden
                        sm:block
                      "
                    >

                      <button
                        className="
                          bg-white
                          text-black
                          px-4
                          sm:px-6
                          py-2
                          sm:py-3
                          rounded-full
                          font-medium
                          hover:scale-105
                          hover:shadow-2xl
                          transition
                          duration-500
                          text-sm
                        "
                      >
                        View Product
                      </button>

                    </div>

                  </div>

                  {/* DETAILS */}

                  <div className="mt-3 sm:mt-6">

                    <h3
                      className="
                        text-base
                        sm:text-lg
                        md:text-xl
                        lg:text-2xl
                        font-bold
                        mb-1
                        sm:mb-2
                        group-hover:text-[#9b174c]
                        transition
                        line-clamp-1
                      "
                    >
                      {product.name}
                    </h3>

                    <p
                      className="
                        text-gray-500
                        line-clamp-1
                        sm:line-clamp-2
                        text-xs
                        sm:text-sm
                        md:text-base
                      "
                    >

                      {product.description}

                    </p>

                    <div
                      className="
                        mt-2
                        sm:mt-4
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-1
                      "
                    >

                      <p
                        className="
                          text-lg
                          sm:text-xl
                          md:text-2xl
                          font-black
                        "
                      >
                        ₹{product.price}
                      </p>

                      <span
                        className="
                          text-xs
                          sm:text-sm
                          text-gray-500
                        "
                      >
                        In Stock: {product.stock}
                      </span>

                    </div>

                  </div>

                </Link>

              </FadeIn>

            ))

          }

        </div>

        {/* MOBILE BUTTON */}

        <div className="mt-8 sm:mt-12 sm:hidden text-center">

          <Link
            href="/products"
            className="
              inline-block
              border
              border-black
              px-8
              py-4
              rounded-full
              hover:bg-black
              hover:text-white
              transition
            "
          >
            View All Products
          </Link>

        </div>

      </div>

    </section>

  );

}