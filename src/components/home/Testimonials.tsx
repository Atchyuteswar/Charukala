"use client";

import { motion } from "framer-motion";

const testimonials = [

  {
    name: "Aaradhya Sharma",
    text:
      "The craftsmanship is breathtaking. Every saree feels like a piece of art woven with heritage and elegance.",
  },

  {
    name: "Meera Kapoor",
    text:
      "Charukala perfectly blends luxury with tradition. I've never received so many compliments before.",
  },

  {
    name: "Ishita Reddy",
    text:
      "From packaging to fabric quality, everything feels premium and deeply authentic.",
  },

];

export default function Testimonials() {

  return (

    <section className="bg-[#f8f5f0] py-16 sm:py-24 md:py-32 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}

        <div className="text-center mb-10 sm:mb-16 md:mb-20">

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
            Testimonials
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
            Loved By Women
            <br />
            Across India
          </h2>

        </div>

        {/* TESTIMONIAL GRID */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            sm:gap-6
            md:gap-8
          "
        >

          {testimonials.map((item, index) => (

            <motion.div

              key={item.name}

              initial={{
                opacity: 0,
                y: 80
              }}

              whileInView={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.8,
                delay: index * 0.2
              }}

              viewport={{
                once: true
              }}

              className="
                bg-white
                rounded-[24px]
                sm:rounded-[32px]
                md:rounded-[40px]
                p-6
                sm:p-8
                md:p-10
                shadow-sm
                hover:shadow-2xl
                transition
                duration-500
              "
            >

              {/* QUOTE */}

              <div
                className="
                  text-[#9b174c]
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  leading-none
                "
              >
                &ldquo;
              </div>

              {/* TEXT */}

              <p
                className="
                  text-gray-600
                  leading-7
                  sm:leading-8
                  md:leading-9
                  text-base
                  sm:text-lg
                  mt-4
                  sm:mt-6
                "
              >
                {item.text}
              </p>

              {/* USER */}

              <div className="mt-6 sm:mt-8 md:mt-10">

                <h3
                  className="
                    text-lg
                    sm:text-xl
                    md:text-2xl
                    font-bold
                  "
                >
                  {item.name}
                </h3>

                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                  Verified Customer
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

}
