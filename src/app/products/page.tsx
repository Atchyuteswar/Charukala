import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import ProductFilters from "@/components/product/ProductFilters";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    subCategory?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;

  const search = params.search || "";
  const category = params.category || "";
  const subCategory = params.subCategory || "";
  const sort = params.sort || "";

  const products = await prisma.product.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},

        category
          ? {
              category: {
                equals: category,
              },
            }
          : {},

        subCategory
          ? {
              subCategory: {
                equals: subCategory,
              },
            }
          : {},
      ],
    },

    orderBy:
      sort === "low"
        ? {
            price: "asc",
          }
        : sort === "high"
        ? {
            price: "desc",
          }
        : {
            createdAt: "desc",
          },
  });

  return (
    <main
      className="
      min-h-screen
      bg-[#F8F3EA]
      pt-32
      pb-24
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >
        {/* HEADER */}

        <div
          className="
          text-center
          mb-16
          "
        >
          <p
            className="
            section-tag
            mb-4
            "
          >
            The Charukala Collection
          </p>

          <h1
            className="
            font-brand
            text-[#2A2A2A]
            text-5xl
            md:text-7xl
            "
          >
            Sarees & Dresses
          </h1>

          <p
            className="
            section-description
            mx-auto
            mt-6
            "
          >
            Explore handcrafted sarees and curated dress materials inspired by
            India's rich textile heritage.
          </p>
        </div>

        {/* FILTERS */}

        <div className="mb-10">
          <ProductFilters />
        </div>

        {/* PRODUCT COUNT */}

        <div
          className="
          flex
          justify-between
          items-center
          mb-10
          pb-5
          border-b
          border-[#E8DCC4]
          "
        >
          <p
            className="
            text-[#6B6B6B]
            "
          >
            {products.length} Products Found
          </p>

          <p
            className="
            text-sm
            text-[#6B6B6B]
            hidden md:block
            "
          >
            Showing latest collections
          </p>
        </div>

        {/* EMPTY STATE */}

        {products.length === 0 ? (
          <div
            className="
            bg-white
            rounded-3xl
            p-16
            text-center
            "
          >
            <h2
              className="
              font-brand
              text-4xl
              "
            >
              No Products Found
            </h2>

            <p
              className="
              mt-4
              text-[#6B6B6B]
              "
            >
              Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
            "
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="
                block
                group
                "
              >
                {/* IMAGE */}

                <div
                  className="
                  overflow-hidden
                  rounded-[32px]
                  bg-white
                  shadow-sm
                  "
                >
                  <div
                    className="
                    relative
                    h-[420px]
                    "
                  >
                    <Image
                      src={
                        product.images?.[0]?.trim()
                          ? product.images[0]
                          : "/placeholder-saree.jpg"
                      }
                      alt={product.name}
                      fill
                      sizes="(max-width:768px) 100vw, 25vw"
                      className="
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-105
                      "
                    />
                  </div>
                </div>

                {/* INFO */}

                <div className="mt-5">
                  <p
                    className="
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-[#D4A857]
                    "
                  >
                    {product.category}
                  </p>

                  <p
                    className="
                    text-sm
                    mt-2
                    text-[#6B6B6B]
                    "
                  >
                    {product.subCategory}
                  </p>

                  <h2
                    className="
                    font-brand
                    text-2xl
                    mt-2
                    text-[#2A2A2A]
                    "
                  >
                    {product.name}
                  </h2>

                  <p
                    className="
                    mt-3
                    text-xl
                    font-semibold
                    text-[#7A0019]
                    "
                  >
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}