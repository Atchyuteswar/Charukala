import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import FadeIn from "@/components/animations/FadeIn";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section
      className="
        py-20
        md:py-32
        bg-[#F8F3EA]
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

          <h2
            className="
              font-brand
              text-5xl
              md:text-6xl
              text-[#2A2A2A]
            "
          >
            Featured Sarees
          </h2>

          <p
            className="
              section-description
              mx-auto
              mt-6
            "
          >
            Discover our carefully curated collection
            of handcrafted sarees inspired by India&apos;s
            timeless weaving traditions.
          </p>
        </div>

        {/* PRODUCTS GRID */}

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-6
            md:gap-8
          "
        >
          {products.map((product, index) => (
            <FadeIn
              key={product.id}
              delay={index * 0.1}
            >
              <Link
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
                        (max-width: 768px) 50vw,
                        (max-width: 1200px) 33vw,
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
                  <h3
                    className="
                      font-brand
                      text-xl
                      md:text-2xl
                      text-[#2A2A2A]
                      transition
                      group-hover:text-[#7A0019]
                    "
                  >
                    {product.name}
                  </h3>

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
            </FadeIn>
          ))}
        </div>

        {/* CTA */}

        <div
          className="
            text-center
            mt-16
          "
        >
          <Link
            href="/products"
            className="
              btn-primary
              inline-block
            "
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
