"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SUB_CATEGORIES = {
  Sarees: [
    "Silk Sarees",
    "Cotton Sarees",
    "Banarasi Sarees",
    "Kanchipuram Sarees",
    "Designer Sarees",
    "Fancy Sarees",
    "Kalamkari Sarees",
    "Pochampally Sarees",
  ],

  Dresses: [
    "Ready-Made Dresses",
    "Unstitched Materials",
  ],
};

export default function CreateProductPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "Sarees",
      subCategory: "",
      images: [] as string[],
    });

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      const file =
        e.target.files?.[0];

      if (!file) return;

      setLoading(true);

      const data =
        new FormData();

      data.append(
        "file",
        file
      );

      const res =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: data,
          }
        );

      const result =
        await res.json();

      if (!res.ok) {
        throw new Error(
          result.error
        );
      }

      setPreview(
        result.url
      );

      setFormData(
        (prev) => ({
          ...prev,
          images: [
            result.url,
          ],
        })
      );
    } catch {
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

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      !formData.category ||
      !formData.subCategory
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    try {
      setLoading(true);

      const res =
        await fetch(
          "/api/products",
          {
            method: "POST",
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
        "Product Created Successfully"
      );

      router.push(
        "/admin/products"
      );

      router.refresh();
    } catch {
      alert(
        "Failed creating product"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#F8F3EA] min-h-screen p-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">
          <p className="section-tag">
            Product Management
          </p>

          <h1
            className="
            font-brand
            text-5xl
            text-[#2A2A2A]
            mt-3
            "
          >
            Add New Product
          </h1>

          <p
            className="
            text-[#6B6B6B]
            mt-3
            "
          >
            Create a new product
            for the Charukala
            collection.
          </p>
        </div>

        {/* CARD */}

        <div
          className="
          bg-white
          rounded-[24px]
          border
          border-[#E8DCC4]
          shadow-sm
          p-10
          "
        >
          <form
            onSubmit={
              handleSubmit
            }
            className="
            space-y-8
            "
          >
            {/* NAME */}

            <div>
              <label className="block mb-2 font-medium">
                Product Name
              </label>

              <input
                type="text"
                value={
                  formData.name
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target
                        .value,
                  })
                }
                className="
                w-full
                h-14
                px-5
                rounded-xl
                border
                border-[#E8DCC4]
                bg-white
                outline-none
                focus:border-[#7A0019]
                "
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                value={
                  formData.description
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target
                        .value,
                  })
                }
                rows={6}
                className="
                w-full
                p-5
                rounded-xl
                border
                border-[#E8DCC4]
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
              gap-6
              "
            >
              <div>
                <label className="block mb-2 font-medium">
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
                      price:
                        e.target
                          .value,
                    })
                  }
                  className="
                  w-full
                  h-14
                  px-5
                  rounded-xl
                  border
                  border-[#E8DCC4]
                  "
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
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
                      stock:
                        e.target
                          .value,
                    })
                  }
                  className="
                  w-full
                  h-14
                  px-5
                  rounded-xl
                  border
                  border-[#E8DCC4]
                  "
                />
              </div>
            </div>

            {/* CATEGORYS */}

            <div
              className="
              grid
              md:grid-cols-2
              gap-6
              "
            >
              <div>
                <label className="block mb-2 font-medium">
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
                        e.target
                          .value,
                      subCategory:
                        "",
                    })
                  }
                  className="
                  w-full
                  h-14
                  px-5
                  rounded-xl
                  border
                  border-[#E8DCC4]
                  "
                >
                  <option>
                    Sarees
                  </option>

                  <option>
                    Dresses
                  </option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
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
                        e.target
                          .value,
                    })
                  }
                  className="
                  w-full
                  h-14
                  px-5
                  rounded-xl
                  border
                  border-[#E8DCC4]
                  "
                >
                  <option value="">
                    Select
                  </option>

                  {SUB_CATEGORIES[
                    formData.category as keyof typeof SUB_CATEGORIES
                  ].map(
                    (
                      sub
                    ) => (
                      <option
                        key={
                          sub
                        }
                      >
                        {sub}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* IMAGE */}

            <div>
              <label className="block mb-4 font-medium">
                Product Image
              </label>

              <div
                className="
                border-2
                border-dashed
                border-[#D4A857]
                rounded-2xl
                p-8
                "
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    uploadImage
                  }
                />
              </div>

              {preview && (
                <div
                  className="
                  mt-6
                  relative
                  h-[400px]
                  rounded-2xl
                  overflow-hidden
                  "
                >
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* BUTTON */}

            <button
              disabled={
                loading
              }
              className="
              btn-primary
              px-10
              py-4
              "
            >
              {loading
                ? "Creating..."
                : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}