"use client";

import { useState } from "react";
import Script from "next/script";
import { useCartStore } from "@/store/cart-store";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        "Please complete all required fields."
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

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay SDK not loaded. Please refresh and try again."
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
          "Charukala Order",

        order_id:
          paymentData.id,

        prefill: {
          name:
            formData.fullName,

          contact:
            formData.phone,
        },

        handler:
          async function (
            response: {
              razorpay_order_id: string;
              razorpay_payment_id: string;
              razorpay_signature: string;
            }
          ) {
            try {
              const verifyRes =
                await fetch(
                  "/api/payment/verify",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify({
                      razorpay_order_id:
                        response.razorpay_order_id,

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_signature:
                        response.razorpay_signature,

                      items,

                      totalAmount,

                      shippingData:
                        formData,
                    }),
                  }
                );

              const result =
                await verifyRes.json();

              if (
                !verifyRes.ok
              ) {
                throw new Error(
                  result.error
                );
              }

              clearCart();

              window.location.href =
                `/order-success?id=${result.order.id}`;
            } catch (error) {
              console.log(
                error
              );

              alert(
                "Payment verification failed."
              );
            }
          },

        theme: {
          color:
            "#7A0019",
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
        "Unable to initialize payment."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <Script
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="lazyOnload"
    />
    <main
      className="
        min-h-screen
        bg-[#F8F3EA]
        pt-32
        pb-24
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >
        {/* HEADER */}

        <div
          className="
            mb-14
          "
        >
          <p
            className="
              section-tag
              mb-4
            "
          >
            Secure Checkout
          </p>

          <h1
            className="
              font-brand
              text-5xl
              md:text-6xl
              text-[#2A2A2A]
            "
          >
            Complete Your Order
          </h1>

          <p
            className="
              mt-4
              text-[#6B6B6B]
            "
          >
            Carefully review your details before proceeding to payment.
          </p>
        </div>

        <div
          className="
            grid
            lg:grid-cols-[1fr_420px]
            gap-10
          "
        >
          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="
              bg-white
              rounded-2xl
              p-8
              space-y-5
            "
          >
            <h2
              className="
                font-brand
                text-3xl
                mb-2
              "
            >
              Shipping Information
            </h2>

            <input
              placeholder="Full Name"
              value={formData.fullName}
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
                border-[#E8DCC4]
                rounded-xl
                px-4
                py-4
                outline-none
              "
            />

            <input
              placeholder="Phone Number"
              value={formData.phone}
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
                border-[#E8DCC4]
                rounded-xl
                px-4
                py-4
                outline-none
              "
            />

            <input
              placeholder="Street Address"
              value={formData.street}
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
                border-[#E8DCC4]
                rounded-xl
                px-4
                py-4
                outline-none
              "
            />

            <div
              className="
                grid
                md:grid-cols-2
                gap-4
              "
            >
              <input
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    city:
                      e.target.value,
                  })
                }
                className="
                  border
                  border-[#E8DCC4]
                  rounded-xl
                  px-4
                  py-4
                  outline-none
                "
              />

              <input
                placeholder="State"
                value={formData.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state:
                      e.target.value,
                  })
                }
                className="
                  border
                  border-[#E8DCC4]
                  rounded-xl
                  px-4
                  py-4
                  outline-none
                "
              />
            </div>

            <input
              placeholder="Pincode"
              value={formData.pincode}
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
                border-[#E8DCC4]
                rounded-xl
                px-4
                py-4
                outline-none
              "
            />

            <button
              disabled={loading}
              className="
                btn-primary
                w-full
                mt-4
                disabled:opacity-50
              "
            >
              {loading
                ? "Processing..."
                : `Pay ₹${totalAmount}`}
            </button>
          </form>

          {/* SUMMARY */}

          <div>
            <div
              className="
                bg-white
                rounded-2xl
                p-8
                sticky
                top-28
              "
            >
              <h2
                className="
                  font-brand
                  text-4xl
                  mb-8
                "
              >
                Order Summary
              </h2>

              <div
                className="
                  space-y-5
                "
              >
                {items.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="
                        flex
                        justify-between
                      "
                    >
                      <div>
                        <p>
                          {item.name}
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#6B6B6B]
                          "
                        >
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p>
                        ₹
                        {item.price *
                          item.quantity}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div
                className="
                  mt-8
                  pt-6
                  border-t
                  border-[#E8DCC4]
                  flex
                  justify-between
                  text-xl
                  font-semibold
                "
              >
                <span>
                  Total
                </span>

                <span>
                  ₹{totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
