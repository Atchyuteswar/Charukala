"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const cart =
    useCartStore();

  const totalPrice =
    cart.items.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity,
      0
    );

  if (
    cart.items.length === 0
  ) {
    return (
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
            max-w-3xl
            mx-auto
            px-6
            text-center
          "
        >
          <div
            className="
              w-24
              h-24
              mx-auto
              rounded-full
              bg-[#7A0019]/10
              flex
              items-center
              justify-center
            "
          >
            <ShoppingBag
              size={36}
              className="
                text-[#7A0019]
              "
            />
          </div>

          <h1
            className="
              font-brand
              text-5xl
              md:text-6xl
              mt-8
              text-[#2A2A2A]
            "
          >
            Your Cart Is Empty
          </h1>

          <p
            className="
              mt-6
              text-[#6B6B6B]
              leading-8
            "
          >
            Discover handcrafted
            sarees inspired by
            India&apos;s rich textile
            heritage.
          </p>

          <Link
            href="/products"
            className="
              btn-primary
              inline-block
              mt-10
            "
          >
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
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
            Charukala Collection
          </p>

          <h1
            className="
              font-brand
              text-5xl
              md:text-6xl
              text-[#2A2A2A]
            "
          >
            Shopping Cart
          </h1>
        </div>

        <div
          className="
            grid
            lg:grid-cols-[1fr_380px]
            gap-10
          "
        >
          {/* ITEMS */}

          <div
            className="
              space-y-6
            "
          >
            {cart.items.map(
              (item) => (
                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-2xl
                    p-5
                    md:p-6
                    flex
                    flex-col
                    md:flex-row
                    gap-6
                  "
                >
                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      w-full
                      md:w-40
                      h-56
                      md:h-44
                      overflow-hidden
                      rounded-xl
                      shrink-0
                    "
                  >
                    <Image
                      src={
                        item.images?.[0] ||
                        "/placeholder-saree.jpg"
                      }
                      alt={item.name}
                      fill
                      sizes="160px"
                      className="
                        object-cover
                      "
                    />
                  </div>

                  {/* DETAILS */}

                  <div
                    className="
                      flex-1
                    "
                  >
                    <h2
                      className="
                        font-brand
                        text-3xl
                        text-[#2A2A2A]
                      "
                    >
                      {item.name}
                    </h2>

                    <p
                      className="
                        mt-4
                        text-xl
                        font-semibold
                        text-[#7A0019]
                      "
                    >
                      ₹{item.price}
                    </p>

                    {/* QUANTITY */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mt-8
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >
                        <button
                          onClick={() =>
                            cart.decreaseQuantity(
                              item.id
                            )
                          }
                          className="
                            w-10
                            h-10
                            border
                            border-[#E8DCC4]
                            rounded-lg
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Minus
                            size={16}
                          />
                        </button>

                        <span
                          className="
                            text-lg
                            font-medium
                          "
                        >
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            cart.increaseQuantity(
                              item.id
                            )
                          }
                          className="
                            w-10
                            h-10
                            border
                            border-[#E8DCC4]
                            rounded-lg
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Plus
                            size={16}
                          />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          cart.removeItem(
                            item.id
                          )
                        }
                        className="
                          text-red-500
                        "
                      >
                        <Trash2
                          size={18}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

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
                <div
                  className="
                    flex
                    justify-between
                    text-[#6B6B6B]
                  "
                >
                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {totalPrice.toFixed(
                      2
                    )}
                  </span>
                </div>

                <div
                  className="
                    border-t
                    border-[#E8DCC4]
                    pt-5
                    flex
                    justify-between
                    text-xl
                    font-semibold
                    text-[#2A2A2A]
                  "
                >
                  <span>
                    Total
                  </span>

                  <span>
                    ₹
                    {totalPrice.toFixed(
                      2
                    )}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="
                  btn-primary
                  w-full
                  text-center
                  mt-10
                  block
                "
              >
                Proceed To Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}