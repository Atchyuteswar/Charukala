"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const categories = {
  Sarees: [
    "Silk Sarees",
    "Kalamkari Sarees",
    "Gadwal Sarees",
    "Maheshwari Sarees",
    "Tussar Sarees",
    "Banarasi Sarees",
    "Cotton Sarees",
    "Jamdani Sarees",
    "Handloom Sarees",
    "Fancy Sarees",
  ],

  Dresses: [
    "Ready-Made Dresses",
    "Unstitched Materials",
  ],
};

export default function ProductFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const selectedCategory =
    params.get("category") || "";

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

    if (key === "category") {
      searchParams.delete(
        "subCategory"
      );
    }

    router.push(
      `/products?${searchParams.toString()}`
    );
  }

  function clearFilters() {
    router.push("/products");
  }

  return (
    <div
      className="
      bg-white
      border
      border-[#E8DCC4]
      rounded-[28px]
      p-6
      md:p-8
      shadow-sm
      "
    >
      {/* SEARCH + FILTERS */}

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-4
        gap-4
        "
      >
        {/* SEARCH */}

        <div
          className="
          relative
          lg:col-span-1
          "
        >
          <Search
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#6B6B6B]
            "
          />

          <input
            type="text"
            placeholder="Search products..."
            defaultValue={
              params.get("search") || ""
            }
            onChange={(e) =>
              updateParam(
                "search",
                e.target.value
              )
            }
            className="
            w-full
            h-12
            pl-11
            pr-4
            rounded-xl
            border
            border-[#E8DCC4]
            bg-white
            outline-none
            transition
            focus:border-[#7A0019]
            "
          />
        </div>

        {/* CATEGORY */}

        <select
          value={selectedCategory}
          onChange={(e) =>
            updateParam(
              "category",
              e.target.value
            )
          }
          className="
          h-12
          px-4
          rounded-xl
          border
          border-[#E8DCC4]
          bg-white
          outline-none
          cursor-pointer
          focus:border-[#7A0019]
          "
        >
          <option value="">
            All Categories
          </option>

          <option value="Sarees">
            Sarees
          </option>

          <option value="Dresses">
            Dresses
          </option>
        </select>

        {/* SUB CATEGORY */}

        <select
          value={
            params.get(
              "subCategory"
            ) || ""
          }
          onChange={(e) =>
            updateParam(
              "subCategory",
              e.target.value
            )
          }
          disabled={!selectedCategory}
          className="
          h-12
          px-4
          rounded-xl
          border
          border-[#E8DCC4]
          bg-white
          outline-none
          cursor-pointer
          disabled:opacity-50
          disabled:cursor-not-allowed
          focus:border-[#7A0019]
          "
        >
          <option value="">
            All Sub Categories
          </option>

          {selectedCategory &&
            categories[
              selectedCategory as keyof typeof categories
            ]?.map(
              (subCategory) => (
                <option
                  key={
                    subCategory
                  }
                  value={
                    subCategory
                  }
                >
                  {subCategory}
                </option>
              )
            )}
        </select>

        {/* SORT */}

        <select
          value={
            params.get("sort") || ""
          }
          onChange={(e) =>
            updateParam(
              "sort",
              e.target.value
            )
          }
          className="
          h-12
          px-4
          rounded-xl
          border
          border-[#E8DCC4]
          bg-white
          outline-none
          cursor-pointer
          focus:border-[#7A0019]
          "
        >
          <option value="">
            Latest Arrivals
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>
        </select>
      </div>

      {/* ACTIONS */}

      <div
        className="
        flex
        flex-wrap
        justify-between
        items-center
        gap-4
        mt-6
        pt-5
        border-t
        border-[#E8DCC4]
        "
      >
        

        <button
          onClick={clearFilters}
          className="
          px-5
          py-2.5
          rounded-xl
          border
          border-[#7A0019]
          text-[#7A0019]
          font-medium
          transition
          hover:bg-[#7A0019]
          hover:text-white
          "
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}