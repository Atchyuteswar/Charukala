import { prisma } from "@/lib/prisma";
import AIInsights from "@/components/admin/AIInsights";
import CustomerSegments from "@/components/admin/CustomerSegments";
import TrendPrediction from "@/components/admin/TrendPrediction";

import {
  Package,
  ShoppingBag,
  IndianRupee,
  Users
} from "lucide-react";

import {
  Card,
  CardContent
} from "@/components/ui/card";

import DashboardCharts from "@/components/admin/DashboardCharts";

export default async function AdminDashboard() {

  // STATS

  const productsCount =
    await prisma.product.count();

  const ordersCount =
    await prisma.order.count();

  const usersCount =
    await prisma.user.count();

  const orders =
    await prisma.order.findMany();

  const revenue =
    orders.reduce(
      (acc, order) =>
        acc + order.totalAmount,
      0
    );

  // RECENT ORDERS

  const recentOrders =
    await prisma.order.findMany({

      take: 5,

      orderBy: {
        createdAt: "desc"
      }

    });

  return (

    <div className="p-10">

      {/* HEADER */}

      <div className="mb-12">

        <p
          className="
            uppercase
            tracking-[0.4em]
            text-[#9b174c]
            text-sm
          "
        >
          Admin Analytics
        </p>

        <h1
          className="
            text-5xl
            font-black
            mt-4
          "
        >
          Commerce Dashboard
        </h1>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* REVENUE */}

        <Card className="rounded-[30px] border-0 shadow-lg">

          <CardContent className="p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Revenue
                </p>

                <h2
                  className="
                    text-4xl
                    font-black
                    mt-4
                  "
                >
                  ₹{revenue}
                </h2>

              </div>

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-[#9b174c]/10
                  flex
                  items-center
                  justify-center
                "
              >

                <IndianRupee
                  className="text-[#9b174c]"
                />

              </div>

            </div>

          </CardContent>

        </Card>

        {/* PRODUCTS */}

        <Card className="rounded-[30px] border-0 shadow-lg">

          <CardContent className="p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Products
                </p>

                <h2
                  className="
                    text-4xl
                    font-black
                    mt-4
                  "
                >
                  {productsCount}
                </h2>

              </div>

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-black/5
                  flex
                  items-center
                  justify-center
                "
              >

                <Package />

              </div>

            </div>

          </CardContent>

        </Card>

        {/* ORDERS */}

        <Card className="rounded-[30px] border-0 shadow-lg">

          <CardContent className="p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Orders
                </p>

                <h2
                  className="
                    text-4xl
                    font-black
                    mt-4
                  "
                >
                  {ordersCount}
                </h2>

              </div>

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-black/5
                  flex
                  items-center
                  justify-center
                "
              >

                <ShoppingBag />

              </div>

            </div>

          </CardContent>

        </Card>

        {/* USERS */}

        <Card className="rounded-[30px] border-0 shadow-lg">

          <CardContent className="p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Users
                </p>

                <h2
                  className="
                    text-4xl
                    font-black
                    mt-4
                  "
                >
                  {usersCount}
                </h2>

              </div>

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-black/5
                  flex
                  items-center
                  justify-center
                "
              >

                <Users />

              </div>

            </div>

          </CardContent>

        </Card>

      </div>

      {/* CHARTS */}

      <div className="mt-12">

        <DashboardCharts orders={orders} />

        <AIInsights />

        <CustomerSegments />

        <TrendPrediction />

      </div>

      {/* RECENT ORDERS */}

      <div className="mt-16">

        <h2
          className="
            text-3xl
            font-black
            mb-8
          "
        >
          Recent Orders
        </h2>

        <div className="space-y-5">

          {

            recentOrders.map((order) => (

              <div

                key={order.id}

                className="
                  bg-white
                  rounded-[25px]
                  p-6
                  shadow-sm
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h3 className="font-bold">
                    {order.fullName}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {order.city}, {order.state}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-black text-2xl">
                    ₹{order.totalAmount}
                  </p>

                  <p className="text-green-600 mt-2">
                    {order.status}
                  </p>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}