import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

import Image from "next/image";

import Link from "next/link";

const lookbooks = [

  {
    title:
      "Royal Bridal Edit",

    description:
      "Timeless bridal luxury inspired by regal Indian heritage.",

    category:
      "Bridal"
  },

  {
    title:
      "Festival Gold Collection",

    description:
      "Elegant festive silhouettes crafted for celebration nights.",

    category:
      "Festival"
  },

  {
    title:
      "Modern Silk Statement",

    description:
      "Contemporary silk sarees with modern sophistication.",

    category:
      "Silk"
  }

];

export default async function AILookbook() {

  const session =
    await auth();

  const user =
    session?.user?.email
    ?
    await prisma.user.findUnique({

      where: {
        email:
          session.user.email
      },

      include: {
        preference: true
      }

    })
    :
    null;

  return (

    <section className="py-16 sm:py-24 md:py-32 bg-[#f8f5f0]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}

        <div className="text-center mb-12 sm:mb-18 md:mb-24">

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
            AI Editorial
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
            Curated Luxury
            <br />
            Lookbooks
          </h2>

          <p
            className="
              text-gray-500
              mt-4
              sm:mt-6
              md:mt-8
              max-w-3xl
              mx-auto
              leading-7
              sm:leading-8
              text-sm
              sm:text-base
            "
          >
            AI-generated luxury fashion edits
            personalized for your style identity.
          </p>

        </div>

        {/* LOOKBOOKS */}

        <div className="space-y-16 sm:space-y-24 md:space-y-32">

          {

            await Promise.all(

              lookbooks.map(async (lookbook, index) => {

                const products =
                  await prisma.product.findMany({

                    where: {

                      category: {
                        contains:
                          lookbook.category,
                        mode:
                          "insensitive"
                      }

                    },

                    take: 3

                  });

                if (
                  products.length === 0
                ) return null;

                return (

                  <div

                    key={lookbook.title}

                    className={`
                      grid
                      grid-cols-1
                      lg:grid-cols-2
                      gap-8
                      sm:gap-12
                      md:gap-16
                      items-center

                      ${
                        index % 2 === 1
                        ?
                        "lg:[&>*:first-child]:order-2"
                        :
                        ""
                      }
                    `}
                  >

                    {/* TEXT */}

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
                        AI Curated
                      </p>

                      <h3
                        className="
                          text-2xl
                          sm:text-3xl
                          md:text-4xl
                          lg:text-5xl
                          font-black
                          mt-3
                          sm:mt-6
                          leading-tight
                        "
                      >
                        {lookbook.title}
                      </h3>

                      <p
                        className="
                          text-gray-500
                          mt-4
                          sm:mt-6
                          md:mt-8
                          leading-7
                          sm:leading-8
                          text-sm
                          sm:text-base
                          md:text-lg
                        "
                      >
                        {lookbook.description}
                      </p>

                      {

                        user?.preference
                        && (

                          <p
                            className="
                              mt-4
                              sm:mt-8
                              text-black/70
                              leading-7
                              sm:leading-8
                              text-sm
                              sm:text-base
                            "
                          >

                            Inspired by your
                            preference for

                            {" "}

                            <span className="font-bold">
                              {
                                user.preference
                                .fashionStyle
                                || "Luxury"
                              }
                            </span>

                            {" "}

                            aesthetics and

                            {" "}

                            <span className="font-bold">
                              {
                                user.preference
                                .favoriteCategory
                                || "Premium"
                              }
                            </span>

                            {" "}

                            fashion.

                          </p>

                        )

                      }

                      <Link

                        href="/products"

                        className="
                          inline-block
                          mt-6
                          sm:mt-10
                          bg-black
                          text-white
                          px-6
                          sm:px-8
                          py-3
                          sm:py-4
                          rounded-full
                          hover:scale-105
                          transition
                          duration-500
                          text-sm
                          sm:text-base
                        "
                      >

                        Explore Edit

                      </Link>

                    </div>

                    {/* PRODUCTS */}

                    <div
                      className="
                        grid
                        grid-cols-3
                        gap-3
                        sm:gap-4
                        md:gap-5
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
                            "
                          >

                            <div
                              className="
                                relative
                                h-[180px]
                                sm:h-[250px]
                                md:h-[350px]
                                lg:h-[450px]
                                rounded-[12px]
                                sm:rounded-[20px]
                                md:rounded-[30px]
                                overflow-hidden
                              "
                            >

                              <Image
                                src={product.images?.[0] || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"}
                                alt={product.name}
                                fill
                                sizes="
                                  (max-width: 640px) 33vw,
                                  (max-width: 1024px) 33vw,
                                  17vw
                                "
                                className="
                                  object-cover
                                  group-hover:scale-110
                                  transition
                                  duration-700
                                "
                              />

                            </div>

                          </Link>

                        ))

                      }

                    </div>

                  </div>

                );

              })

            )

          }

        </div>

      </div>

    </section>

  );

}