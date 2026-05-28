"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const items = useCartStore(
    (state) => state.items
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    });

  const totalAmount =
    items.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    try {
      setLoading(true);

      const paymentRes =
        await fetch(
          "/api/payment/create-order",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              amount:
                totalAmount,
            }),
          }
        );

      const paymentData =
        await paymentRes.json();

      if (!paymentRes.ok) {
        throw new Error(
          paymentData.error
        );
      }

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount:
          paymentData.amount,

        currency:
          paymentData.currency,

        name:
          "Charukala",

        description:
          "Order Payment",

        order_id:
          paymentData.id,

        prefill: {
          name:
            formData.fullName,

          contact:
            formData.phone,
        },

        handler: async function (
  response: any
) {

try {

const verifyRes =
await fetch(
"/api/payment/verify",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

razorpay_order_id:
response.razorpay_order_id,

razorpay_payment_id:
response.razorpay_payment_id,

razorpay_signature:
response.razorpay_signature,

items,

totalAmount,

shippingData:
formData

})

}

);

const result =
await verifyRes.json();

if(!verifyRes.ok){

throw new Error(
result.error
);

}

alert(
"Order placed successfully"
);

clearCart();

window.location.href=
`/order-success?id=${result.order.id}`;

}
catch(error){

console.log(
error
);

alert(
"Payment verification failed"
);

}

},

        theme: {
          color:
            "#8a1538",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (error) {

      console.log(error);

      alert(
        "Payment initialization failed"
      );

    } finally {

      setLoading(false);

    }
  }

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
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
        "
      >

        {/* HEADER */}

        <div className="mb-8 sm:mb-12">

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
            Secure Payment
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              mt-3
              sm:mt-5
            "
          >
            Checkout
          </h1>

        </div>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            sm:gap-8
            md:gap-10
          "
        >
          <form
            onSubmit={handleSubmit}
            className="
              space-y-3
              sm:space-y-4
              md:space-y-5
            "
          >
            <input
              placeholder="Full Name"
              value={
                formData.fullName
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                border-gray-200
                p-3
                sm:p-4
                rounded-xl
                sm:rounded-2xl
                outline-none
                text-sm
                sm:text-base
                bg-white
              "
            />

            <input
              placeholder="Phone"
              value={
                formData.phone
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                border-gray-200
                p-3
                sm:p-4
                rounded-xl
                sm:rounded-2xl
                outline-none
                text-sm
                sm:text-base
                bg-white
              "
            />

            <input
              placeholder="Street Address"
              value={
                formData.street
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  street:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                border-gray-200
                p-3
                sm:p-4
                rounded-xl
                sm:rounded-2xl
                outline-none
                text-sm
                sm:text-base
                bg-white
              "
            />

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <input
                placeholder="City"
                value={
                  formData.city
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    city:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-200
                  p-3
                  sm:p-4
                  rounded-xl
                  sm:rounded-2xl
                  outline-none
                  text-sm
                  sm:text-base
                  bg-white
                "
              />

              <input
                placeholder="State"
                value={
                  formData.state
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-200
                  p-3
                  sm:p-4
                  rounded-xl
                  sm:rounded-2xl
                  outline-none
                  text-sm
                  sm:text-base
                  bg-white
                "
              />
            </div>

            <input
              placeholder="Pincode"
              value={
                formData.pincode
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pincode:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                border-gray-200
                p-3
                sm:p-4
                rounded-xl
                sm:rounded-2xl
                outline-none
                text-sm
                sm:text-base
                bg-white
              "
            />

            <button
              disabled={loading}
              className="
                w-full
                bg-[#8a1538]
                text-white
                py-4
                sm:py-5
                rounded-full
                disabled:opacity-50
                text-sm
                sm:text-base
                font-semibold
                hover:scale-[1.02]
                transition
                duration-500
                mt-2
              "
            >
              {loading
                ? "Processing..."
                : `Pay ₹${totalAmount}`}
            </button>
          </form>

          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-[16px]
              sm:rounded-[24px]
              md:rounded-[30px]
              p-5
              sm:p-6
              h-fit
              sticky
              top-24
              sm:top-28
            "
          >
            <h2
              className="
                text-xl
                sm:text-2xl
                font-bold
                mb-4
                sm:mb-6
              "
            >
              Order Summary
            </h2>

            {items.map(
              (item) => (
                <div
                  key={item.id}
                  className="
                    flex
                    justify-between
                    mb-3
                    sm:mb-4
                    text-sm
                    sm:text-base
                  "
                >
                  <div>
                    <p className="font-medium line-clamp-1">
                      {item.name}
                    </p>

                    <p
                      className="
                        text-xs
                        sm:text-sm
                        text-gray-500
                      "
                    >
                      Qty:
                      {
                        item.quantity
                      }
                    </p>
                  </div>

                  <p className="font-semibold shrink-0 ml-4">
                    ₹
                    {item.price *
                      item.quantity}
                  </p>
                </div>
              )
            )}

            <hr className="my-4 sm:my-6" />

            <div
              className="
                flex
                justify-between
                font-bold
                text-lg
                sm:text-xl
              "
            >
              <span>Total</span>

              <span>
                ₹{totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}