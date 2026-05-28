import { auth }
from "@/auth";

import { prisma }
from "@/lib/prisma";

import { redirect }
from "next/navigation";

import Link from "next/link";

import Image from "next/image";

export default async function WishlistPage() {

  const session =
    await auth();

  if (!session?.user?.email) {

    redirect("/api/auth/signin");

  }

  const user =
    await prisma.user.findUnique({

      where: {
        email:
          session.user.email
      }

    });

  if (!user) {

    redirect("/");

  }

  const wishlist =
    await prisma.wishlist.findMany({

      where: {
        userId:
          user.id
      },

      include: {
        product: true
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
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
        "
      >

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
            Saved Luxury
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
            Wishlist
          </h1>

        </div>

        {

          wishlist.length === 0

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
              "
            >

              <p
                className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  text-gray-500
                "
              >
                No saved products yet.
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

                wishlist.map((item) => (

                  <Link
                    key={item.id}
                    href={`/products/${item.product.slug}`}
                  >

                    <div
                      className="
                        bg-white
                        rounded-[16px]
                        sm:rounded-[24px]
                        md:rounded-[35px]
                        overflow-hidden
                        shadow-sm
                        hover:shadow-2xl
                        hover:-translate-y-2
                        transition
                        duration-500
                      "
                    >

                      <div
                        className="
                          relative
                          h-[220px]
                          sm:h-[300px]
                          md:h-[360px]
                          lg:h-[420px]
                        "
                      >

                        <Image
                          src={
                            item.product.images?.[0]
                          }
                          alt={
                            item.product.name
                          }
                          fill
                          sizes="
                            (max-width: 640px) 50vw,
                            (max-width: 768px) 50vw,
                            (max-width: 1024px) 33vw,
                            25vw
                          "
                          className="
                            object-cover
                          "
                        />

                      </div>

                      <div className="p-3 sm:p-4 md:p-6">

                        <h2
                          className="
                            text-sm
                            sm:text-lg
                            md:text-xl
                            lg:text-2xl
                            font-black
                            line-clamp-1
                          "
                        >
                          {
                            item.product.name
                          }
                        </h2>

                        <p
                          className="
                            mt-2
                            sm:mt-4
                            text-[#9b174c]
                            font-bold
                            text-base
                            sm:text-lg
                            md:text-xl
                          "
                        >
                          ₹{
                            item.product.price
                          }
                        </p>

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