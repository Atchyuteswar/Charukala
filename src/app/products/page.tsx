import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import ProductFilters from "@/components/product/ProductFilters";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
  }>;
}) {
  const resolvedParams =
    await searchParams;

  const search =
    resolvedParams.search || "";

  const category =
    resolvedParams.category || "";

  const sort =
    resolvedParams.sort || "";

  const products =
    await prisma.product.findMany({
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
                  contains: category,
                  mode: "insensitive",
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
            Timeless Sarees
          </h1>

          <p
            className="
              section-description
              mx-auto
              mt-6
            "
          >
            Discover handcrafted sarees inspired
            by India&apos;s rich weaving heritage,
            designed for celebrations and
            timeless elegance.
          </p>
        </div>

        {/* FILTERS */}

        <div className="mb-12">
          <ProductFilters />
        </div>

        {/* EMPTY */}

        {products.length === 0 ? (
          <div
            className="
              bg-white
              rounded-2xl
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
              grid-cols-2
              lg:grid-cols-4
              gap-6
              md:gap-8
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
                    relative
                    overflow-hidden
                    rounded-2xl
                    bg-white
                  "
                >
                  <div
                    className="
                      relative
                      h-[260px]
                      md:h-[420px]
                    "
                  >
                    <Image
                      src={
                        product.images?.[0] &&
                        product.images[0].trim() !== ""
                          ? product.images[0]
                          : "/placeholder-saree.jpg"
                      }
                      alt={product.name}
                      fill
                      sizes="
                        (max-width:768px) 50vw,
                        (max-width:1200px) 33vw,
                        25vw
                      "
                      className="
                        object-cover
                        transition
                        duration-700
                        group-hover:scale-105
                      "
                    />
                  </div>
                </div>

                {/* DETAILS */}

                <div
                  className="
                    mt-5
                    text-center
                  "
                >
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-[#D4A857]
                    "
                  >
                    {product.category}
                  </p>

                  <h2
                    className="
                      font-brand
                      text-xl
                      md:text-2xl
                      mt-2
                      text-[#2A2A2A]
                    "
                  >
                    {product.name}
                  </h2>

                  <p
                    className="
                      mt-3
                      text-lg
                      font-semibold
                      text-[#7A0019]
                    "
                  >
                    ₹{product.price}
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
