"use client";

import { useState } from "react";

export default function UpdateOrderStatus({
  orderId,
  currentStatus
}: { orderId: string; currentStatus: string }) {

  const [status, setStatus] =
    useState(currentStatus);

  async function updateStatus(
    value: string
  ) {

    setStatus(value);

    await fetch(
      `/api/admin/orders/${orderId}`,
      {

        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          status: value
        })

      }
    );

  }

  return (

    <select

      value={status}

      onChange={(e) =>
        updateStatus(
          e.target.value
        )
      }

      className="
        border
        border-gray-200
        rounded-2xl
        px-5
        py-3
        outline-none
      "
    >

      <option value="PENDING">
        PENDING
      </option>

      <option value="PAID">
        PAID
      </option>

      <option value="PACKED">
        PACKED
      </option>

      <option value="SHIPPED">
        SHIPPED
      </option>

      <option value="DELIVERED">
        DELIVERED
      </option>

      <option value="CANCELLED">
        CANCELLED
      </option>

    </select>

  );

}