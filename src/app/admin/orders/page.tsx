import { prisma } from "@/lib/prisma";

import UpdateOrderStatus from "@/components/admin/UpdateOrderStatus";

export default async function AdminOrdersPage() {

  const orders =
    await prisma.order.findMany({

      orderBy: {
        createdAt: "desc"
      }

    });

  return (

    <div className="p-10">

      <div className="mb-12">

        <p
          className="
            uppercase
            tracking-[0.4em]
            text-[#9b174c]
            text-sm
          "
        >
          Management
        </p>

        <h1
          className="
            text-5xl
            font-black
            mt-4
          "
        >
          Orders
        </h1>

      </div>

      <div className="space-y-6">

        {

          orders.map((order) => (

            <div

              key={order.id}

              className="
                bg-white
                rounded-[30px]
                p-8
                shadow-sm
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-6
              "
            >

              {/* LEFT */}

              <div>

                <h2
                  className="
                    text-2xl
                    font-black
                  "
                >
                  {order.fullName}
                </h2>

                <p className="text-gray-500 mt-2">
                  {order.city}, {order.state}
                </p>

                <p className="mt-4">
                  ₹{order.totalAmount}
                </p>

              </div>

              {/* RIGHT */}

              <UpdateOrderStatus
                orderId={order.id}
                currentStatus={order.status}
              />

            </div>

          ))

        }

      </div>

    </div>

  );

}