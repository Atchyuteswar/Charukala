"use client";

import {
  Heart
} from "lucide-react";

import {
  useState
} from "react";

export default function WishlistButton({
  productId
}: {
  productId: string;
}) {

  const [loading, setLoading] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  async function toggleWishlist() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/wishlist",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              productId
            })

          }
        );

      const data =
        await response.json();

      setSaved(
        data.added
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <button

      onClick={toggleWishlist}

      disabled={loading}

      className={`
        w-14
        h-14
        rounded-full
        flex
        items-center
        justify-center
        transition
        duration-500

        ${
          saved
          ?
          "bg-[#9b174c] text-white"
          :
          "bg-white text-black border"
        }
      `}
    >

      <Heart
        size={22}
        fill={
          saved
          ?
          "currentColor"
          :
          "none"
        }
      />

    </button>

  );

}