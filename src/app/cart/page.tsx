"use client";

import Image from "next/image";

import Link from "next/link";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag
} from "lucide-react";

import { useState }
from "react";

import { useCartStore }
from "@/store/cart-store";

export default function CartPage() {

  const cart =
    useCartStore();

  const [coupon, setCoupon] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // TOTAL

  const totalPrice =
    cart.items.reduce(

      (acc, item) =>

        acc +
        item.price *
        item.quantity,

      0

    );

  // DISCOUNT

  const subtotal =
    totalPrice;

  const discountAmount =

    cart.discount

    ?

    subtotal *
    (cart.discount / 100)

    :

    0;

  const finalTotal =
    subtotal -
    discountAmount;

  // APPLY COUPON

  async function applyCoupon() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/coupons",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              code: coupon
            })

          }
        );

      const data =
        await response.json();

      if (data.success) {

        useCartStore
        .getState()
        .applyCoupon(

          coupon,

          data.discount

        );

        alert(
          "Coupon Applied Successfully"
        );

      } else {

        alert(
          data.error
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  // EMPTY CART

  if (cart.items.length === 0) {

    return (

      <div
        className="
          min-h-screen
          bg-[#f8f5f0]
          flex
          items-center
          justify-center
          px-4
          sm:px-6
          pt-20
        "
      >

        <div
          className="
            bg-white
            rounded-[24px]
            sm:rounded-[32px]
            md:rounded-[40px]
            p-10
            sm:p-14
            md:p-20
            text-center
            shadow-sm
            max-w-2xl
            w-full
          "
        >

          <div
            className="
              w-20
              h-20
              sm:w-24
              sm:h-24
              md:w-28
              md:h-28
              rounded-full
              bg-[#9b174c]/10
              flex
              items-center
              justify-center
              mx-auto
            "
          >

            <ShoppingBag
              size={36}
              className="
                text-[#9b174c]
                sm:w-10 sm:h-10
                md:w-12 md:h-12
              "
            />

          </div>

          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              mt-6
              sm:mt-8
              md:mt-10
            "
          >
            Your Cart Is Empty
          </h1>

          <p
            className="
              text-gray-500
              mt-4
              sm:mt-6
              leading-7
              sm:leading-8
              text-sm
              sm:text-base
            "
          >
            Discover timeless luxury
            crafted for every occasion.
          </p>

          <Link
            href="/products"
            className="
              inline-block
              mt-6
              sm:mt-8
              md:mt-10
              bg-black
              text-white
              px-6
              sm:px-8
              py-4
              sm:py-5
              rounded-full
              hover:scale-105
              transition
              duration-500
              text-sm
              sm:text-base
            "
          >
            Explore Collection
          </Link>

        </div>

      </div>

    );

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
            Luxury Checkout
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
            Shopping Cart
          </h1>

        </div>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_420px]
            gap-6
            sm:gap-8
            md:gap-10
          "
        >

          {/* LEFT */}

          <div className="space-y-4 sm:space-y-6">

            {

              cart.items.map((item) => (

                <div

                  key={item.id}

                  className="
                    bg-white
                    rounded-[16px]
                    sm:rounded-[24px]
                    md:rounded-[35px]
                    p-4
                    sm:p-5
                    md:p-6
                    shadow-sm
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    sm:gap-6
                  "
                >

                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      w-full
                      sm:w-32
                      md:w-40
                      h-[200px]
                      sm:h-32
                      md:h-44
                      rounded-[12px]
                      sm:rounded-[20px]
                      md:rounded-[25px]
                      overflow-hidden
                      shrink-0
                    "
                  >

                    <Image
                      src={
                        item.images?.[0] || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt={item.name}
                      fill
                      sizes="
                        (max-width: 640px) 100vw,
                        160px
                      "
                      className="
                        object-cover
                      "
                    />

                  </div>

                  {/* CONTENT */}

                  <div className="flex-1">

                    <h2
                      className="
                        text-xl
                        sm:text-2xl
                        md:text-3xl
                        font-black
                      "
                    >
                      {item.name}
                    </h2>

                    <p
                      className="
                        text-gray-500
                        mt-2
                        sm:mt-4
                        leading-6
                        sm:leading-7
                        text-sm
                        sm:text-base
                        line-clamp-2
                      "
                    >
                      {item.description}
                    </p>

                    <p
                      className="
                        mt-3
                        sm:mt-6
                        text-xl
                        sm:text-2xl
                        font-black
                        text-[#9b174c]
                      "
                    >
                      ₹{item.price}
                    </p>

                    {/* CONTROLS */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mt-4
                        sm:mt-8
                      "
                    >

                      {/* QUANTITY */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          sm:gap-4
                        "
                      >

                        <button

                          onClick={() =>
                            cart.decreaseQuantity(
                              item.id
                            )
                          }

                          className="
                            w-9
                            h-9
                            sm:w-10
                            sm:h-10
                            rounded-full
                            border
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <Minus size={14} />

                        </button>

                        <span
                          className="
                            text-lg
                            sm:text-xl
                            font-bold
                          "
                        >
                          {item.quantity}
                        </span>

                        <button

                          onClick={() =>
                            cart.increaseQuantity(
                              item.id
                            )
                          }

                          className="
                            w-9
                            h-9
                            sm:w-10
                            sm:h-10
                            rounded-full
                            border
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <Plus size={14} />

                        </button>

                      </div>

                      {/* REMOVE */}

                      <button

                        onClick={() =>
                          cart.removeItem(
                            item.id
                          )
                        }

                        className="
                          text-red-500
                          p-2
                        "
                      >

                        <Trash2 size={20} />

                      </button>

                    </div>

                  </div>

                </div>

              ))

            }

          </div>

          {/* RIGHT */}

          <div className="space-y-4 sm:space-y-6">

            {/* COUPON */}

            <div
              className="
                bg-white
                rounded-[16px]
                sm:rounded-[24px]
                md:rounded-[35px]
                p-5
                sm:p-6
                md:p-8
                shadow-sm
              "
            >

              <h2
                className="
                  text-xl
                  sm:text-2xl
                  font-black
                  mb-3
                  sm:mb-5
                "
              >
                Apply Coupon
              </h2>

              <div
                className="
                  flex
                  gap-3
                  sm:gap-4
                "
              >

                <input

                  type="text"

                  value={coupon}

                  onChange={(e) =>
                    setCoupon(
                      e.target.value
                    )
                  }

                  placeholder="Enter coupon code"

                  className="
                    flex-1
                    border
                    border-gray-200
                    rounded-xl
                    sm:rounded-2xl
                    px-4
                    sm:px-5
                    py-3
                    sm:py-4
                    outline-none
                    text-sm
                    sm:text-base
                    min-w-0
                  "
                />

                <button

                  onClick={applyCoupon}

                  disabled={loading}

                  className="
                    bg-black
                    text-white
                    px-4
                    sm:px-6
                    rounded-xl
                    sm:rounded-2xl
                    text-sm
                    sm:text-base
                    shrink-0
                  "
                >

                  {

                    loading
                    ?
                    "..."
                    :
                    "Apply"

                  }

                </button>

              </div>

            </div>

            {/* SUMMARY */}

            <div
              className="
                bg-black
                text-white
                rounded-[16px]
                sm:rounded-[24px]
                md:rounded-[35px]
                p-5
                sm:p-6
                md:p-8
                sticky
                top-24
                sm:top-28
              "
            >

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                "
              >
                Order Summary
              </h2>

              <div
                className="
                  mt-6
                  sm:mt-10
                  space-y-4
                  sm:space-y-6
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                    sm:text-base
                  "
                >

                  <p className="text-white/70">
                    Subtotal
                  </p>

                  <p>
                    ₹{subtotal.toFixed(2)}
                  </p>

                </div>

                {

                  cart.discount
                  ?
                  (

                    <div
                      className="
                        flex
                        justify-between
                        text-green-400
                        text-sm
                        sm:text-base
                      "
                    >

                      <p>
                        Discount (
                        {cart.discount}%)
                      </p>

                      <p>
                        -₹{
                          discountAmount.toFixed(2)
                        }
                      </p>

                    </div>

                  )
                  :
                  null

                }

                <div
                  className="
                    border-t
                    border-white/10
                    pt-4
                    sm:pt-6
                    flex
                    justify-between
                    text-xl
                    sm:text-2xl
                    font-black
                  "
                >

                  <p>Total</p>

                  <p>
                    ₹{finalTotal.toFixed(2)}
                  </p>

                </div>

              </div>

              <Link
                href="/checkout"
                className="
                  block
                  w-full
                  mt-6
                  sm:mt-10
                  bg-white
                  text-black
                  text-center
                  py-4
                  sm:py-5
                  rounded-full
                  font-semibold
                  hover:scale-[1.02]
                  transition
                  duration-500
                  text-sm
                  sm:text-base
                "
              >
                Proceed To Checkout
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}