"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { Order } from "@prisma/client";

export default function DashboardCharts({
  orders
}: { orders: any[] }) {

  const data =
    orders.map((order: Order) => ({

      name:
        new Date(
          order.createdAt
        ).toLocaleDateString(),

      revenue:
        order.totalAmount

    }));

  return (

    <div
      className="
        bg-white
        rounded-[40px]
        p-10
        shadow-lg
      "
    >

      <div className="mb-10">

        <p
          className="
            uppercase
            tracking-[0.4em]
            text-[#9b174c]
            text-sm
          "
        >
          Analytics
        </p>

        <h2
          className="
            text-4xl
            font-black
            mt-4
          "
        >
          Revenue Overview
        </h2>

      </div>

      <div className="h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <XAxis dataKey="name" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#9b174c"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}