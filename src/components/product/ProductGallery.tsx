"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
};

export default function ProductGallery({
  images,
}: ProductGalleryProps) {
  const fallbackImage =
    "/placeholder-saree.jpg";

  const safeImages =
    images?.length > 0
      ? images
      : [fallbackImage];

  const [selected, setSelected] =
    useState(safeImages[0]);

  return (
    <div
      className="
        space-y-6
      "
    >
      {/* MAIN IMAGE */}

      <div
        className="
          relative
          h-[420px]
          md:h-[600px]
          lg:h-[760px]
          overflow-hidden
          rounded-2xl
          bg-white
        "
      >
        <Image
          src={selected}
          alt="Product Image"
          fill
          priority
          sizes="
            (max-width:1024px) 100vw,
            50vw
          "
          className="
            object-cover
            transition
            duration-700
            hover:scale-105
          "
        />
      </div>

      {/* THUMBNAILS */}

      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-2
        "
      >
        {safeImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            onClick={() =>
              setSelected(image)
            }
            className={`
              relative
              w-20
              h-28
              md:w-24
              md:h-32
              overflow-hidden
              rounded-xl
              flex-shrink-0
              transition-all
              duration-300

              ${
                selected === image
                  ? "ring-2 ring-[#7A0019]"
                  : "opacity-70 hover:opacity-100"
              }
            `}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="96px"
              className="
                object-cover
              "
            />
          </button>
        ))}
      </div>

      {/* IMAGE COUNT */}

      <p
        className="
          text-sm
          text-[#6B6B6B]
          tracking-wide
        "
      >
        {safeImages.length} Image
        {safeImages.length > 1 ? "s" : ""}
      </p>
    </div>
  );
}
