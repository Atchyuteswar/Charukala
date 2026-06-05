"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [

  "https://images.unsplash.com/photo-1583391733981-84984053353c?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1594736797933-d0ef1c6a0a7d?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1583391733956-6c77a7b98d70?q=80&w=1200&auto=format&fit=crop",

];

export default function FashionGallery() {

  return (

    <section className="bg-white py-16 sm:py-24 md:py-32 overflow-hidden">

      {/* HEADING */}

      <div className="text-center mb-10 sm:mb-16 md:mb-20 px-4 sm:px-6">

        <p
          className="
            uppercase
            tracking-[0.3em]
            sm:tracking-[0.4em]
            text-[#9b174c]
            text-xs
            sm:text-sm
          "
        >
          Editorial Gallery
        </p>

        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-7xl
            font-black
            mt-3
            sm:mt-5
          "
        >
          Crafted For
          <br />
          Timeless Elegance
        </h2>

      </div>

      {/* MARQUEE */}

      <motion.div

        animate={{
          x: ["0%", "-50%"]
        }}

        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear"
        }}

        className="flex gap-4 sm:gap-6 md:gap-8 w-max"
      >

        {[...images, ...images].map(
          (image, index) => (

            <div

              key={index}

              className="
                relative
                w-[220px]
                sm:w-[280px]
                md:w-[350px]
                h-[320px]
                sm:h-[400px]
                md:h-[500px]
                overflow-hidden
                rounded-[20px]
                sm:rounded-[30px]
                md:rounded-[40px]
                flex-shrink-0
                group
              "
            >

              <Image
                src={image}
                alt="Fashion"
                fill
                sizes="
                  (max-width: 640px) 220px,
                  (max-width: 768px) 280px,
                  350px
                "
                className="
                  object-cover
                  group-hover:scale-110
                  transition
                  duration-700
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/10
                  group-hover:bg-black/20
                  transition
                "
              />

            </div>

          )
        )}

      </motion.div>

    </section>

  );

}
