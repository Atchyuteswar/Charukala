"use client";

import { useState } from "react";

export default function UpdateOrderStatus({
  orderId,
  currentStatus
}: { orderId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);

  async function updateStatus(value: string) {
    setStatus(value);

    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: value })
    });
  }

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      className="
        block
        w-full
        pl-3
        pr-10
        py-1.5
        text-sm
        border-gray-300
        focus:outline-none
        focus:ring-indigo-500
        focus:border-indigo-500
        sm:text-sm
        rounded-md
        bg-white
        border
        text-gray-900
      "
    >
      <option value="PENDING">PENDING</option>
      <option value="PAID">PAID</option>
      <option value="PACKED">PACKED</option>
      <option value="SHIPPED">SHIPPED</option>
      <option value="DELIVERED">DELIVERED</option>
      <option value="CANCELLED">CANCELLED</option>
    </select>
  );
}