"use client";

import { useState } from "react";

import { Product } from "@/generated/prisma/client";
import { ShoppingBag, Check } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  const [added, setAdded] =
    useState(false);

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      slug: product.slug,
      description: product.description,
      stock: product.stock,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.stock <= 0}
      className={`
        w-full
        md:w-auto
        min-w-[240px]
        px-8
        py-4
        rounded-xl
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-3
        font-medium

        ${
          product.stock > 0
            ? "bg-[#7A0019] text-white hover:opacity-90"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }
      `}
    >
      {added ? (
        <>
          <Check size={18} />
          Added To Cart
        </>
      ) : (
        <>
          <ShoppingBag size={18} />
          Add To Cart
        </>
      )}
    </button>
  );
}