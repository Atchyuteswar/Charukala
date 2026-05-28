"use client";

import { useCartStore } from "@/store/cart-store";

export default function AddToCartButton({
  product,
}: {
  product: any;
}) {

  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  function handleAddToCart() {

    addItem({

      id: product.id,

      name: product.name,

      price: product.price,

      image:
        product.images?.[0] ||
        "",

      quantity: 1,

    });

    alert(
      "Added to cart"
    );

  }

  return (

    <button
      onClick={handleAddToCart}
      className="
      bg-[#8a1538]
      text-white
      px-8
      py-4
      rounded-full
      hover:opacity-90
      "
    >

      Add To Cart

    </button>

  );

}