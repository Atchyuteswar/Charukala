"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/generated/prisma/client";

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

export default function EditProductForm({
  product,
}: {
  product: Product;
}) {
  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState(
      product.images?.[0] || ""
    );

  const [formData, setFormData] =
    useState({
      name: product.name,

      description:
        product.description,

      price: product.price,

      stock: product.stock,

      category:
        product.category,

      subCategory:
        product.subCategory,

      images:
        product.images || [],
    });

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      const file =
        e.target.files?.[0];

      if (!file) return;

      setLoading(true);

      const oldImage =
        formData.images?.[0];

      const data =
        new FormData();

      data.append(
        "file",
        file
      );

      const uploadRes =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: data,
          }
        );

      const uploaded =
        await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(
          uploaded.error
        );
      }

      // Delete old cloudinary image

      if (
        oldImage &&
        oldImage.includes(
          "cloudinary"
        )
      ) {
        await fetch(
          "/api/upload/delete",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              imageUrl:
                oldImage,
            }),
          }
        );
      }

      setPreview(
        uploaded.url
      );

      setFormData({
        ...formData,

        images: [
          uploaded.url,
        ],
      });
    } catch (error) {
      console.log(error);

      alert(
        "Image upload failed"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const res =
        await fetch(
          `/api/products/${product.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              formData
            ),
          }
        );

      if (!res.ok) {
        throw new Error();
      }

      alert(
        "Product updated successfully"
      );
    } catch {
      alert(
        "Update failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="
      bg-white
      rounded-3xl
      border
      border-[#E8DCC4]
      p-8
      space-y-6
      shadow-sm
      "
    >
      {/* PRODUCT IMAGE */}

      <div>
        <label
          className="
          block
          text-sm
          font-medium
          text-[#2A2A2A]
          mb-3
          "
        >
          Product Image
        </label>

        {preview && (
          <div
            className="
            relative
            w-full
            h-[400px]
            rounded-2xl
            overflow-hidden
            border
            border-[#E8DCC4]
            bg-[#F8F3EA]
            mb-4
            "
          >
            <Image
              src={preview}
              alt="Product Preview"
              fill
              sizes="800px"
              className="object-cover"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="
          block
          w-full
          text-sm
          "
        />
      </div>

      {/* NAME */}

      <div>
        <label
          className="
          block
          text-sm
          font-medium
          mb-2
          "
        >
          Product Name
        </label>

        <input
          value={
            formData.name
          }
          onChange={(e) =>
            setFormData({
              ...formData,

              name:
                e.target.value,
            })
          }
          className="
          w-full
          border
          border-[#D8CCB5]
          rounded-xl
          p-4
          outline-none
          focus:border-[#7A0019]
          "
        />
      </div>

      {/* DESCRIPTION */}

      <div>
        <label
          className="
          block
          text-sm
          font-medium
          mb-2
          "
        >
          Description
        </label>

        <textarea
          rows={6}
          value={
            formData.description
          }
          onChange={(e) =>
            setFormData({
              ...formData,

              description:
                e.target.value,
            })
          }
          className="
          w-full
          border
          border-[#D8CCB5]
          rounded-xl
          p-4
          outline-none
          focus:border-[#7A0019]
          "
        />
      </div>

      {/* PRICE + STOCK */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-5
        "
      >
        <div>
          <label
            className="
            block
            text-sm
            font-medium
            mb-2
            "
          >
            Price
          </label>

          <input
            type="number"
            value={
              formData.price
            }
            onChange={(e) =>
              setFormData({
                ...formData,

                price: Number(
                  e.target.value
                ),
              })
            }
            className="
            w-full
            border
            border-[#D8CCB5]
            rounded-xl
            p-4
            outline-none
            focus:border-[#7A0019]
            "
          />
        </div>

        <div>
          <label
            className="
            block
            text-sm
            font-medium
            mb-2
            "
          >
            Stock
          </label>

          <input
            type="number"
            value={
              formData.stock
            }
            onChange={(e) =>
              setFormData({
                ...formData,

                stock: Number(
                  e.target.value
                ),
              })
            }
            className="
            w-full
            border
            border-[#D8CCB5]
            rounded-xl
            p-4
            outline-none
            focus:border-[#7A0019]
            "
          />
        </div>
      </div>

      {/* CATEGORY */}

      <div>
        <label
          className="
          block
          text-sm
          font-medium
          mb-2
          "
        >
          Category
        </label>

        <select
          value={
            formData.category
          }
          onChange={(e) =>
            setFormData({
              ...formData,

              category:
                e.target.value,

              subCategory:
                "",
            })
          }
          className="
          w-full
          border
          border-[#D8CCB5]
          rounded-xl
          p-4
          outline-none
          "
        >
          <option value="">
            Select Category
          </option>

          <option value="Sarees">
            Sarees
          </option>

          <option value="Dresses">
            Dresses
          </option>
        </select>
      </div>

      {/* SUBCATEGORY */}

      <div>
        <label
          className="
          block
          text-sm
          font-medium
          mb-2
          "
        >
          Sub Category
        </label>

        <select
          value={
            formData.subCategory
          }
          onChange={(e) =>
            setFormData({
              ...formData,

              subCategory:
                e.target.value,
            })
          }
          disabled={
            !formData.category
          }
          className="
          w-full
          border
          border-[#D8CCB5]
          rounded-xl
          p-4
          outline-none
          disabled:bg-gray-100
          "
        >
          <option value="">
            Select Sub Category
          </option>

          {formData.category &&
            categories[
              formData.category as keyof typeof categories
            ]?.map(
              (
                subCategory
              ) => (
                <option
                  key={
                    subCategory
                  }
                  value={
                    subCategory
                  }
                >
                  {
                    subCategory
                  }
                </option>
              )
            )}
        </select>
      </div>

      {/* BUTTON */}

      <button
        disabled={
          loading
        }
        className="
        bg-[#7A0019]
        hover:bg-[#650015]
        text-white
        px-8
        py-4
        rounded-xl
        font-medium
        transition
        disabled:opacity-50
        "
      >
        {loading
          ? "Updating..."
          : "Update Product"}
      </button>
    </form>
  );
}