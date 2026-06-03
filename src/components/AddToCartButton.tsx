"use client";

import { useCartStore } from "@/store/cart-store";
import { Product } from "@prisma/client";

export default function AddToCartButton({
  product,
}: {
  product: Product;
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
      images: product.images,
      slug: product.slug,
      description: product.description,
      stock: product.stock,
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