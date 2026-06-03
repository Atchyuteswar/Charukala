"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function ProductFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function updateParam(key: string, value: string) {
    const searchParams = new URLSearchParams(params.toString());
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    router.push(`/products?${searchParams.toString()}`);
  }

  return (
    <div
      className="
        flex
        flex-col
        lg:flex-row
        gap-6
        items-center
        justify-between
        pb-8
        border-b
        border-[#E8DCC4]
      "
    >
      {/* SEARCH */}
      <div
        className="
          relative
          w-full
          lg:max-w-md
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
          placeholder="Search collections..."
          defaultValue={params.get("search") || ""}
          onChange={(e) => updateParam("search", e.target.value)}
          className="
            w-full
            pl-12
            pr-4
            py-3
            bg-transparent
            border
            border-[#E8DCC4]
            rounded-xl
            outline-none
            transition
            focus:border-[#7A0019]
            placeholder:text-[#6B6B6B]
          "
        />
      </div>

      {/* DROPDOWNS */}
      <div
        className="
          flex
          w-full
          lg:w-auto
          gap-4
        "
      >
        {/* CATEGORY */}
        <select
          defaultValue={params.get("category") || ""}
          onChange={(e) => updateParam("category", e.target.value)}
          className="
            flex-1
            lg:w-48
            bg-transparent
            border
            border-[#E8DCC4]
            rounded-xl
            px-4
            py-3
            outline-none
            transition
            focus:border-[#7A0019]
            text-[#2A2A2A]
            cursor-pointer
            appearance-none
          "
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "1em",
          }}
        >
          <option value="">All Collections</option>
          <option value="Bridal">Bridal Heritage</option>
          <option value="Festival">Festive Wear</option>
          <option value="Silk">Pure Silk</option>
          <option value="Party">Evening Classics</option>
        </select>

        {/* SORT */}
        <select
          defaultValue={params.get("sort") || ""}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="
            flex-1
            lg:w-48
            bg-transparent
            border
            border-[#E8DCC4]
            rounded-xl
            px-4
            py-3
            outline-none
            transition
            focus:border-[#7A0019]
            text-[#2A2A2A]
            cursor-pointer
            appearance-none
          "
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "1em",
          }}
        >
          <option value="">Latest Arrivals</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}