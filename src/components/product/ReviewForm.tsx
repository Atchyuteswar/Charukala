"use client";

import {
  useState
} from "react";

export default function ReviewForm({
  productId
}: {
  productId: string;
}) {

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function submitReview() {

    try {

      setLoading(true);

      await fetch(
        "/api/reviews",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            productId,

            rating,

            comment

          })

        }
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div
      className="
        bg-white
        rounded-[20px]
        sm:rounded-[30px]
        md:rounded-[40px]
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
          md:text-3xl
          font-black
        "
      >
        Write Review
      </h2>

      {/* RATING */}

      <select

        value={rating}

        onChange={(e) =>
          setRating(
            Number(e.target.value)
          )
        }

        className="
          mt-4
          sm:mt-6
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
          bg-white
        "
      >

        <option value={5}>
          ⭐⭐⭐⭐⭐
        </option>

        <option value={4}>
          ⭐⭐⭐⭐
        </option>

        <option value={3}>
          ⭐⭐⭐
        </option>

        <option value={2}>
          ⭐⭐
        </option>

        <option value={1}>
          ⭐
        </option>

      </select>

      {/* COMMENT */}

      <textarea

        value={comment}

        onChange={(e) =>
          setComment(
            e.target.value
          )
        }

        placeholder="
Share your luxury experience...
"

        className="
          w-full
          h-[120px]
          sm:h-[150px]
          md:h-[180px]
          mt-4
          sm:mt-6
          border
          border-gray-200
          rounded-[16px]
          sm:rounded-[24px]
          md:rounded-[30px]
          p-4
          sm:p-5
          md:p-6
          outline-none
          resize-none
          text-sm
          sm:text-base
        "
      />

      {/* BUTTON */}

      <button

        onClick={submitReview}

        disabled={loading}

        className="
          mt-4
          sm:mt-6
          bg-black
          text-white
          px-6
          sm:px-8
          py-3
          sm:py-4
          rounded-full
          hover:scale-105
          transition
          duration-500
          text-sm
          sm:text-base
        "
      >

        {

          loading
          ?
          "Submitting..."
          :
          "Submit Review"

        }

      </button>

    </div>

  );

}