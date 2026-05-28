import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";

import OrderTimeline from "@/components/orders/OrderTimeline";

export default async function OrdersPage() {

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

  const orders =
    await prisma.order.findMany({

      where: {
        userId: user.id
      },

      include: {

        items: {

          include: {
            product: true
          }

        }

      },

      orderBy: {
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
          max-w-7xl
          mx-auto
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
            Luxury Orders
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
            My Orders
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              sm:mt-6
              max-w-2xl
              leading-7
              sm:leading-8
              text-sm
              sm:text-base
            "
          >
            Track your luxury fashion purchases,
            shipment updates,
            and premium delivery experience.
          </p>

        </div>

        {

          orders.length === 0

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
                No Orders Yet
              </h2>

              <p
                className="
                  text-gray-500
                  mt-4
                  sm:mt-6
                  text-base
                  sm:text-lg
                "
              >
                Your luxury fashion journey
                starts here.
              </p>

            </div>

          )

          :

          (

            <div
              className="
                space-y-6
                sm:space-y-8
                md:space-y-10
              "
            >

              {

                orders.map((order) => (

                  <div

                    key={order.id}

                    className="
                      bg-white
                      rounded-[20px]
                      sm:rounded-[30px]
                      md:rounded-[40px]
                      overflow-hidden
                      shadow-sm
                    "
                  >

                    {/* TOP */}

                    <div
                      className="
                        border-b
                        px-4
                        sm:px-6
                        md:px-8
                        py-5
                        sm:py-6
                        md:py-8
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-4
                        sm:gap-6
                        md:gap-8
                      "
                    >

                      {/* LEFT */}

                      <div>

                        <p
                          className="
                            text-xs
                            sm:text-sm
                            text-gray-500
                          "
                        >
                          Order ID
                        </p>

                        <h2
                          className="
                            text-sm
                            sm:text-lg
                            md:text-2xl
                            font-black
                            mt-1
                            sm:mt-2
                            break-all
                          "
                        >
                          {order.id}
                        </h2>

                        <p
                          className="
                            text-gray-500
                            mt-2
                            sm:mt-4
                            text-xs
                            sm:text-sm
                            md:text-base
                          "
                        >
                          {

                            new Date(
                              order.createdAt
                            ).toLocaleDateString()

                          }
                        </p>

                      </div>

                      {/* RIGHT */}

                      <div
                        className="
                          flex
                          flex-row
                          items-center
                          gap-4
                          sm:gap-6
                        "
                      >

                        <div>

                          <p
                            className="
                              text-xs
                              sm:text-sm
                              text-gray-500
                            "
                          >
                            Total Amount
                          </p>

                          <h3
                            className="
                              text-xl
                              sm:text-2xl
                              md:text-3xl
                              lg:text-4xl
                              font-black
                              mt-1
                              sm:mt-2
                            "
                          >
                            ₹{order.totalAmount}
                          </h3>

                        </div>

                        <div>

                          <span
                            className={`
                              px-3
                              sm:px-4
                              md:px-6
                              py-1.5
                              sm:py-2
                              md:py-3
                              rounded-full
                              text-xs
                              sm:text-sm
                              font-semibold

                              ${
                                order.status === "DELIVERED"
                                ?
                                "bg-green-100 text-green-700"

                                :

                                order.status === "CANCELLED"
                                ?
                                "bg-red-100 text-red-700"

                                :

                                "bg-[#9b174c]/10 text-[#9b174c]"
                              }
                            `}
                          >

                            {order.status}

                          </span>

                        </div>

                      </div>

                    </div>

                    {/* TIMELINE */}

                    <div
                      className="
                        px-4
                        sm:px-6
                        md:px-8
                        py-5
                        sm:py-6
                        md:py-8
                        border-b
                        overflow-x-auto
                      "
                    >

                      <OrderTimeline
                        status={order.status}
                      />

                    </div>

                    {/* ITEMS */}

                    <div
                      className="
                        p-4
                        sm:p-6
                        md:p-8
                        space-y-4
                        sm:space-y-6
                        md:space-y-8
                      "
                    >

                      {

                        order.items.map((item) => (

                          <div

                            key={item.id}

                            className="
                              flex
                              flex-col
                              sm:flex-row
                              sm:items-center
                              gap-4
                              sm:gap-6
                            "
                          >

                            {/* IMAGE */}

                            <div
                              className="
                                relative
                                w-full
                                sm:w-28
                                md:w-32
                                h-[200px]
                                sm:h-28
                                md:h-40
                                rounded-[16px]
                                sm:rounded-[24px]
                                md:rounded-[30px]
                                overflow-hidden
                                shrink-0
                              "
                            >

                              <Image
                                src={
                                  item.product
                                  .images?.[0]

                                  ||

                                  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
                                }
                                alt={
                                  item.product.name
                                }
                                fill
                                sizes="(max-width:640px) 100vw, 128px"
                                className="
                                  object-cover
                                "
                              />

                            </div>

                            {/* INFO */}

                            <div className="flex-1">

                              <h3
                                className="
                                  text-lg
                                  sm:text-xl
                                  md:text-2xl
                                  font-black
                                "
                              >
                                {
                                  item.product.name
                                }
                              </h3>

                              <p
                                className="
                                  text-gray-500
                                  mt-1.5
                                  sm:mt-3
                                  leading-6
                                  sm:leading-7
                                  text-xs
                                  sm:text-sm
                                  md:text-base
                                  line-clamp-2
                                "
                              >
                                {
                                  item.product
                                  .description
                                }
                              </p>

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-4
                                  sm:gap-6
                                  mt-3
                                  sm:mt-5
                                  text-xs
                                  sm:text-sm
                                  md:text-base
                                "
                              >

                                <p
                                  className="
                                    text-gray-500
                                  "
                                >
                                  Qty:
                                  {" "}
                                  <span className="font-semibold text-black">
                                    {
                                      item.quantity
                                    }
                                  </span>
                                </p>

                                <p
                                  className="
                                    text-gray-500
                                  "
                                >
                                  Price:
                                  {" "}
                                  <span className="font-semibold text-black">
                                    ₹{item.price}
                                  </span>
                                </p>

                              </div>

                            </div>

                            {/* TOTAL */}

                            <div>

                              <h4
                                className="
                                  text-xl
                                  sm:text-2xl
                                  md:text-3xl
                                  font-black
                                "
                              >
                                ₹{
                                  item.price *
                                  item.quantity
                                }
                              </h4>

                            </div>

                          </div>

                        ))

                      }

                    </div>

                    {/* SHIPPING */}

                    <div
                      className="
                        border-t
                        p-4
                        sm:p-6
                        md:p-8
                        bg-black
                        text-white
                      "
                    >

                      <p
                        className="
                          uppercase
                          tracking-[0.2em]
                          sm:tracking-[0.3em]
                          text-[#f3c46b]
                          text-xs
                          sm:text-sm
                        "
                      >
                        Shipping Details
                      </p>

                      <div
                        className="
                          mt-4
                          sm:mt-6
                          grid
                          grid-cols-1
                          sm:grid-cols-2
                          gap-4
                          sm:gap-6
                          md:gap-10
                        "
                      >

                        <div className="space-y-2 sm:space-y-3">

                          <p
                            className="
                              text-lg
                              sm:text-xl
                              md:text-2xl
                              font-black
                            "
                          >
                            {order.fullName}
                          </p>

                          <p className="text-white/70 text-sm sm:text-base">
                            {order.street}
                          </p>

                          <p className="text-white/70 text-sm sm:text-base">
                            {order.city},{" "}
                            {order.state}
                          </p>

                          <p className="text-white/70 text-sm sm:text-base">
                            {order.pincode}
                          </p>

                        </div>

                        <div className="space-y-2 sm:space-y-3">

                          <p className="text-white/70 text-sm sm:text-base">
                            Contact Number
                          </p>

                          <p
                            className="
                              text-lg
                              sm:text-xl
                              md:text-2xl
                              font-black
                            "
                          >
                            {order.phone}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

    </div>

  );

}