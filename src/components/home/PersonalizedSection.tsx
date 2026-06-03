import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

import Link from "next/link";

import Image from "next/image";

export default async function PersonalizedSection() {

  const session =
    await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user =
    await prisma.user.findUnique({

      where: {
        email:
          session.user.email
      },

      include: {
        preference: true
      }

    });

  if (!user?.preference) {
    return null;
  }

  const products =
    await prisma.product.findMany({

      where: {

        OR: [

          {
            category: {
              contains:
                user.preference.favoriteCategory || "",
              mode: "insensitive"
            }
          },

          {
            description: {
              contains:
                user.preference.favoriteColor || "",
              mode: "insensitive"
            }
          }

        ]

      },

      take: 4

    });

  if (products.length === 0) {
    return null;
  }

  return (

    <section className="py-16 sm:py-24 md:py-32 bg-[#111111] text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}

        <div className="mb-10 sm:mb-16 md:mb-20">

          <p
            className="
              uppercase
              tracking-[0.3em]
              sm:tracking-[0.4em]
              text-[#f3c46b]
              text-xs
              sm:text-sm
            "
          >
            Personalized For You
          </p>

          <h2
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
            Curated By Aira
          </h2>

          <p
            className="
              text-white/60
              mt-4
              sm:mt-6
              max-w-2xl
              leading-7
              sm:leading-8
              text-sm
              sm:text-base
            "
          >
            Luxury recommendations based on
            your personal fashion identity.
          </p>

        </div>

        {/* PRODUCTS */}

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

            products.map((product) => (

              <Link

                key={product.id}

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
                    h-[220px]
                    sm:h-[300px]
                    md:h-[380px]
                    lg:h-[450px]
                    overflow-hidden
                    rounded-[16px]
                    sm:rounded-[24px]
                    md:rounded-[30px]
                  "
                >

                  <Image
                    src={product.images?.[0] || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"}
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

                </div>

                {/* INFO */}

                <div className="mt-3 sm:mt-6">

                  <h3
                    className="
                      text-base
                      sm:text-lg
                      md:text-xl
                      lg:text-2xl
                      font-bold
                      line-clamp-1
                    "
                  >
                    {product.name}
                  </h3>

                  <p
                    className="
                      text-white/60
                      mt-1
                      sm:mt-3
                      line-clamp-1
                      sm:line-clamp-2
                      text-xs
                      sm:text-sm
                      md:text-base
                    "
                  >
                    {product.description}
                  </p>

                  <p
                    className="
                      text-lg
                      sm:text-xl
                      md:text-2xl
                      font-black
                      mt-2
                      sm:mt-5
                    "
                  >
                    ₹{product.price}
                  </p>

                </div>

              </Link>

            ))

          }

        </div>

      </div>

    </section>

  );

}