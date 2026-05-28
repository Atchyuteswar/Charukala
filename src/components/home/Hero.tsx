"use client";

import Image from "next/image";

import Link from "next/link";

export default function Hero() {

  return (

    <section
      className="
        relative
        h-[100svh]
        min-h-[600px]
        overflow-hidden
      "
    >

      {/* BACKGROUND IMAGE */}

      <Image
        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop"
        alt="Luxury Saree"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-black/50
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          h-full
          flex
          items-center
        "
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">

          <div className="max-w-3xl">

            <p
              className="
                uppercase
                tracking-[0.3em]
                sm:tracking-[0.5em]
                text-[#f3c46b]
                text-xs
                sm:text-sm
              "
            >
              AI Luxury Fashion
            </p>

            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-7xl
                lg:text-8xl
                font-black
                text-white
                leading-none
                mt-4
                sm:mt-8
              "
            >
              Redefining
              <br />
              Saree Luxury
            </h1>

            <p
              className="
                text-white/70
                text-base
                sm:text-lg
                md:text-xl
                leading-7
                sm:leading-9
                mt-5
                sm:mt-10
                max-w-2xl
              "
            >
              Experience AI-powered luxury
              fashion with personalized
              saree recommendations,
              virtual styling,
              and curated elegance.
            </p>

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                sm:gap-5
                mt-8
                sm:mt-12
              "
            >

              <Link
                href="/products"
                className="
                  bg-[#9b174c]
                  text-white
                  px-6
                  sm:px-8
                  py-4
                  sm:py-5
                  rounded-full
                  hover:scale-105
                  transition
                  duration-500
                  text-center
                  text-sm
                  sm:text-base
                "
              >
                Explore Collection
              </Link>

              <Link
                href="/virtual-tryon"
                className="
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  text-white
                  px-6
                  sm:px-8
                  py-4
                  sm:py-5
                  rounded-full
                  hover:bg-white/20
                  transition
                  duration-500
                  text-center
                  text-sm
                  sm:text-base
                "
              >
                Virtual Try-On
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}