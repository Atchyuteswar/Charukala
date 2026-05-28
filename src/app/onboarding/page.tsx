"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function OnboardingPage() {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      favoriteColor: "",

      favoriteCategory: "",

      fashionStyle: "",

      budget: ""

    });

  async function savePreferences() {

    try {

      setLoading(true);

      await fetch(
        "/api/preferences",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(form)

        }
      );

      router.push("/");

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
        flex
        items-center
        justify-center
        px-6
      "
    >

      <div
        className="
          bg-white
          rounded-[40px]
          p-10
          max-w-2xl
          w-full
          shadow-xl
        "
      >

        <p
          className="
            uppercase
            tracking-[0.4em]
            text-[#9b174c]
            text-sm
          "
        >
          Personalization
        </p>

        <h1
          className="
            text-5xl
            font-black
            mt-5
          "
        >
          Build Your
          <br />
          Luxury Style
        </h1>

        <p
          className="
            text-gray-500
            mt-6
            leading-8
          "
        >
          Help Aira personalize your
          luxury saree experience.
        </p>

        {/* FORM */}

        <div className="space-y-6 mt-12">

          {/* COLOR */}

          <div>

            <label className="font-medium">
              Favorite Color
            </label>

            <select

              value={form.favoriteColor}

              onChange={(e) =>
                setForm({
                  ...form,
                  favoriteColor:
                    e.target.value
                })
              }

              className="
                w-full
                mt-3
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            >

              <option value="">
                Select
              </option>

              <option>
                Red
              </option>

              <option>
                Blue
              </option>

              <option>
                Green
              </option>

              <option>
                Gold
              </option>

              <option>
                Black
              </option>

            </select>

          </div>

          {/* CATEGORY */}

          <div>

            <label className="font-medium">
              Preferred Category
            </label>

            <select

              value={form.favoriteCategory}

              onChange={(e) =>
                setForm({
                  ...form,
                  favoriteCategory:
                    e.target.value
                })
              }

              className="
                w-full
                mt-3
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            >

              <option value="">
                Select
              </option>

              <option>
                Bridal
              </option>

              <option>
                Festival
              </option>

              <option>
                Silk
              </option>

              <option>
                Party Wear
              </option>

            </select>

          </div>

          {/* STYLE */}

          <div>

            <label className="font-medium">
              Fashion Style
            </label>

            <select

              value={form.fashionStyle}

              onChange={(e) =>
                setForm({
                  ...form,
                  fashionStyle:
                    e.target.value
                })
              }

              className="
                w-full
                mt-3
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            >

              <option value="">
                Select
              </option>

              <option>
                Royal
              </option>

              <option>
                Traditional
              </option>

              <option>
                Minimal
              </option>

              <option>
                Modern
              </option>

            </select>

          </div>

          {/* BUDGET */}

          <div>

            <label className="font-medium">
              Budget Range
            </label>

            <select

              value={form.budget}

              onChange={(e) =>
                setForm({
                  ...form,
                  budget:
                    e.target.value
                })
              }

              className="
                w-full
                mt-3
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            >

              <option value="">
                Select
              </option>

              <option>
                Under 5000
              </option>

              <option>
                5000 - 10000
              </option>

              <option>
                10000 - 25000
              </option>

              <option>
                Luxury Unlimited
              </option>

            </select>

          </div>

        </div>

        {/* BUTTON */}

        <button

          onClick={savePreferences}

          disabled={loading}

          className="
            w-full
            mt-10
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
            "Saving..."
            :
            "Complete Personalization"

          }

        </button>

      </div>

    </div>

  );

}