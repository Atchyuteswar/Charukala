"use client";

import {
  useRouter,
  useSearchParams
} from "next/navigation";

export default function ProductFilters() {

  const router =
    useRouter();

  const params =
    useSearchParams();

  function updateParam(
    key: string,
    value: string
  ) {

    const searchParams =
      new URLSearchParams(
        params.toString()
      );

    if (value) {

      searchParams.set(
        key,
        value
      );

    } else {

      searchParams.delete(key);

    }

    router.push(
      `/products?${searchParams.toString()}`
    );

  }

  return (

    <div
      className="
        bg-white
        rounded-[16px]
        sm:rounded-[24px]
        md:rounded-[30px]
        p-4
        sm:p-5
        md:p-6
        shadow-sm
        flex
        flex-col
        sm:flex-row
        gap-3
        sm:gap-4
        md:gap-5
      "
    >

      {/* SEARCH */}

      <input

        type="text"

        placeholder="Search luxury sarees..."

        defaultValue={
          params.get("search")
          || ""
        }

        onChange={(e) =>
          updateParam(
            "search",
            e.target.value
          )
        }

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
          w-full
        "
      />

      {/* CATEGORY & SORT ROW ON MOBILE */}

      <div
        className="
          flex
          gap-3
          sm:gap-4
          md:gap-5
          sm:contents
        "
      >

        {/* CATEGORY */}

        <select

          defaultValue={
            params.get("category")
            || ""
          }

          onChange={(e) =>
            updateParam(
              "category",
              e.target.value
            )
          }

          className="
            flex-1
            sm:flex-none
            border
            border-gray-200
            rounded-xl
            sm:rounded-2xl
            px-3
            sm:px-5
            py-3
            sm:py-4
            outline-none
            text-sm
            sm:text-base
            bg-white
          "
        >

          <option value="">
            All Categories
          </option>

          <option value="Bridal">
            Bridal
          </option>

          <option value="Festival">
            Festival
          </option>

          <option value="Silk">
            Silk
          </option>

          <option value="Party">
            Party Wear
          </option>

        </select>

        {/* SORT */}

        <select

          defaultValue={
            params.get("sort")
            || ""
          }

          onChange={(e) =>
            updateParam(
              "sort",
              e.target.value
            )
          }

          className="
            flex-1
            sm:flex-none
            border
            border-gray-200
            rounded-xl
            sm:rounded-2xl
            px-3
            sm:px-5
            py-3
            sm:py-4
            outline-none
            text-sm
            sm:text-base
            bg-white
          "
        >

          <option value="">
            Sort By
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>

        </select>

      </div>

    </div>

  );

}