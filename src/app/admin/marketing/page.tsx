"use client";

import {
  useState
} from "react";

export default function MarketingPage() {

  const [prompt, setPrompt] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function generateMarketing() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/admin/marketing",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              prompt
            })

          }
        );

      const data =
        await response.json();

      setResult(
        data.result
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div
      className="
        min-h-screen
        bg-[#f8f5f0]
        p-10
      "
    >

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <p
            className="
              uppercase
              tracking-[0.4em]
              text-[#9b174c]
              text-sm
            "
          >
            AI Marketing
          </p>

          <h1
            className="
              text-6xl
              font-black
              mt-5
            "
          >
            Campaign Studio
          </h1>

          <p
            className="
              text-gray-500
              mt-6
              leading-8
              max-w-2xl
            "
          >
            Generate luxury campaigns,
            Instagram captions,
            festive launches,
            and AI-powered promotions.
          </p>

        </div>

        {/* INPUT */}

        <div
          className="
            bg-white
            rounded-[40px]
            p-10
            shadow-sm
          "
        >

          <textarea

            value={prompt}

            onChange={(e) =>
              setPrompt(
                e.target.value
              )
            }

            placeholder="
Generate an Instagram campaign for luxury bridal sarees...
"

            className="
              w-full
              h-[200px]
              border
              border-gray-200
              rounded-[30px]
              p-6
              outline-none
              resize-none
              leading-8
            "
          />

          <button

            onClick={generateMarketing}

            disabled={loading}

            className="
              mt-8
              bg-[#9b174c]
              text-white
              px-8
              py-4
              rounded-full
              hover:scale-105
              transition
              duration-500
            "
          >

            {

              loading
              ?
              "Generating..."
              :
              "Generate Campaign"

            }

          </button>

        </div>

        {/* RESULT */}

        {

          result && (

            <div
              className="
                bg-black
                text-white
                rounded-[40px]
                p-10
                mt-10
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
                AI Generated
              </p>

              <div
                className="
                  mt-8
                  whitespace-pre-wrap
                  leading-8
                  text-white/80
                "
              >

                {result}

              </div>

            </div>

          )

        }

      </div>

    </div>

  );

}