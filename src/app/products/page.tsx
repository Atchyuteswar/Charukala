import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";

import ProductFilters
from "@/components/product/ProductFilters";

export default async function ProductsPage({
  searchParams
}: any) {

  const search =
    searchParams.search || "";

  const category =
    searchParams.category || "";

  const sort =
    searchParams.sort || "";

  // PRODUCTS

  const products =
    await prisma.product.findMany({

      where: {

        AND: [

          search
          ?
          {

            OR: [

              {
                name: {
                  contains:
                    search,
                  mode:
                    "insensitive"
                }
              },

              {
                description: {
                  contains:
                    search,
                  mode:
                    "insensitive"
                }
              }

            ]

          }
          :
          {},

          category
          ?
          {
            category: {
              contains:
                category,
              mode:
                "insensitive"
            }
          }
          :
          {}

        ]

      },

      orderBy:

        sort === "low"
        ?
        {
          price: "asc"
        }

        :

        sort === "high"
        ?
        {
          price: "desc"
        }

        :

        {
          createdAt: "desc"
        }

    });

  return (

    <div
      className="
        min-h-screen
        bg-[#f8f5f0]
        pt-24
        sm:pt-28
        md:pt-20
        pb-10
        sm:pb-16
        md:pb-20
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
        "
      >

        {/* HEADER */}

        <div className="mb-8 sm:mb-12 md:mb-16">

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
            Luxury Collection
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              mt-3
              sm:mt-5
            "
          >
            Our Collection
          </h1>

          <p
            className="
              mt-3
              sm:mt-6
              text-gray-500
              leading-7
              sm:leading-8
              max-w-2xl
              text-sm
              sm:text-base
            "
          >
            Discover timeless elegance crafted
            for weddings,
            festivals,
            and luxury occasions.
          </p>

        </div>

        {/* FILTERS */}

        <div className="mb-6 sm:mb-8 md:mb-12">

          <ProductFilters />

        </div>

        {/* PRODUCTS */}

        {

          products.length === 0

          ?

          (

            <div
              className="
                bg-white
                rounded-[24px]
                sm:rounded-[32px]
                md:rounded-[40px]
                p-10
                sm:p-16
                md:p-20
                text-center
                shadow-sm
              "
            >

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-black
                "
              >
                No Products Found
              </h2>

              <p
                className="
                  mt-4
                  sm:mt-6
                  text-gray-500
                  text-base
                  sm:text-lg
                "
              >
                Try adjusting your search
                or filters.
              </p>

            </div>

          )

          :

          (

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-4
                sm:gap-6
                md:gap-8
                lg:gap-10
              "
            >

              {

                products.map((product) => (

                  <Link
                    href={`/products/${product.slug}`}
                    key={product.id}
                  >

                    <div
                      className="
                        group
                        overflow-hidden
                        rounded-[16px]
                        sm:rounded-[24px]
                        md:rounded-[35px]
                        bg-white
                        shadow-sm
                        transition-all
                        duration-500
                        hover:-translate-y-3
                        hover:shadow-2xl
                      "
                    >

                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          h-[220px]
                          sm:h-[300px]
                          md:h-[360px]
                          lg:h-[420px]
                          overflow-hidden
                          bg-gray-100
                        "
                      >

                        <Image
                          src={
                            product.images?.[0]

                            ||

                            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
                          }
                          alt={product.name}
                          fill
                          sizes="
                            (max-width: 640px) 50vw,
                            (max-width: 768px) 50vw,
                            (max-width: 1024px) 33vw,
                            25vw
                          "
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          "
                        />

                        {/* OVERLAY */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/30
                            to-transparent
                          "
                        />

                        {/* CATEGORY */}

                        <div
                          className="
                            absolute
                            top-3
                            left-3
                            sm:top-5
                            sm:left-5
                            bg-white/90
                            backdrop-blur-md
                            px-2.5
                            py-1
                            sm:px-4
                            sm:py-2
                            rounded-full
                            text-[10px]
                            sm:text-xs
                            font-semibold
                          "
                        >

                          {product.category}

                        </div>

                      </div>

                      {/* CONTENT */}

                      <div className="p-3 sm:p-4 md:p-6">

                        <h2
                          className="
                            font-black
                            text-sm
                            sm:text-lg
                            md:text-xl
                            lg:text-2xl
                            line-clamp-1
                          "
                        >
                          {product.name}
                        </h2>

                        <p
                          className="
                            mt-1.5
                            sm:mt-3
                            text-gray-500
                            line-clamp-1
                            sm:line-clamp-2
                            leading-5
                            sm:leading-7
                            text-xs
                            sm:text-sm
                            md:text-base
                          "
                        >
                          {product.description}
                        </p>

                        <div
                          className="
                            mt-3
                            sm:mt-6
                            flex
                            items-center
                            justify-between
                          "
                        >

                          <p
                            className="
                              text-[#8B1E3F]
                              font-black
                              text-base
                              sm:text-lg
                              md:text-xl
                              lg:text-2xl
                            "
                          >
                            ₹{product.price}
                          </p>

                          <div
                            className="
                              text-[10px]
                              sm:text-xs
                              md:text-sm
                              text-gray-400
                              hidden
                              sm:block
                            "
                          >
                            Luxury Wear
                          </div>

                        </div>

                      </div>

                    </div>

                  </Link>

                ))

              }

            </div>

          )

        }

      </div>

    </div>

  );

}