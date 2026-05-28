"use client";

import {
  useState
} from "react";

import Image from "next/image";

export default function VirtualTryOnPage() {

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function analyzeLook() {

    if (!image) return;

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "image",
        image
      );

      formData.append(
        "prompt",
        "Analyze this person and suggest luxury saree styling recommendations."
      );

      const response =
        await fetch(
          "/api/ai",
          {

            method: "POST",

            body: formData

          }
        );

      const data =
        await response.json();

      setResult(
        data.message
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="min-h-screen bg-[#f8f5f0] py-32">

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}

        <div className="text-center mb-20">

          <p
            className="
              uppercase
              tracking-[0.4em]
              text-[#9b174c]
              text-sm
            "
          >
            AI Fashion Tech
          </p>

          <h1
            className="
              text-6xl
              font-black
              mt-5
            "
          >
            Virtual Saree
            <br />
            Styling
          </h1>

          <p
            className="
              text-gray-500
              mt-8
              max-w-3xl
              mx-auto
              leading-8
            "
          >
            Upload your photo and let Aira
            curate personalized luxury saree
            styling recommendations.
          </p>

        </div>

        {/* GRID */}

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}

          <div
            className="
              bg-white
              rounded-[40px]
              p-10
              shadow-xl
            "
          >

            <h2
              className="
                text-3xl
                font-black
              "
            >
              Upload Your Photo
            </h2>

            <label
              className="
                mt-10
                h-[500px]
                border-2
                border-dashed
                border-gray-300
                rounded-[40px]
                flex
                items-center
                justify-center
                overflow-hidden
                cursor-pointer
                relative
              "
            >

              {

                preview
                ?

                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />

                :

                <p className="text-gray-400">
                  Upload inspiration image
                </p>

              }

              <input

                type="file"

                accept="image/*"

                hidden

                onChange={(e) => {

                  const file =
                    e.target.files?.[0];

                  if (file) {

                    setImage(file);

                    setPreview(
                      URL.createObjectURL(file)
                    );

                  }

                }}

              />

            </label>

            <button

              onClick={analyzeLook}

              disabled={loading}

              className="
                w-full
                mt-8
                bg-[#9b174c]
                text-white
                py-5
                rounded-full
                hover:scale-[1.02]
                transition
                duration-500
              "
            >

              {

                loading
                ?
                "Analyzing..."
                :
                "Generate Luxury Styling"

              }

            </button>

          </div>

          {/* RIGHT */}

          <div
            className="
              bg-black
              text-white
              rounded-[40px]
              p-10
              shadow-xl
              flex
              flex-col
            "
          >

            <p
              className="
                uppercase
                tracking-[0.4em]
                text-[#f3c46b]
                text-sm
              "
            >
              AI Analysis
            </p>

            <h2
              className="
                text-4xl
                font-black
                mt-5
              "
            >
              Aira Recommendations
            </h2>

            <div
              className="
                mt-10
                flex-1
                bg-white/5
                rounded-[30px]
                p-8
                leading-8
                text-white/80
              "
            >

              {

                result
                ?

                result

                :

                "Your personalized styling recommendations will appear here."

              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}