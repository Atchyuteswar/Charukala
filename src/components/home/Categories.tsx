import Image from "next/image";

import FadeIn from "@/components/animations/FadeIn";

const categories = [

  {
    title: "Bridal Collection",
    image:
      "https://images.unsplash.com/photo-1583391733981-84984053353c?q=80&w=1200&auto=format&fit=crop"
  },

  {
    title: "Silk Sarees",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
  },

  {
    title: "Festival Wear",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0ef1c6a0a7d?q=80&w=1200&auto=format&fit=crop"
  }

];

export default function Categories() {

  return (

    <section className="py-16 sm:py-20 md:py-28 bg-[#f8f5f0]">

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
            Collections
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              mt-3
              sm:mt-5
            "
          >
            Curated Luxury
          </h2>

        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-5
            sm:gap-6
            md:gap-8
          "
        >

          {

            categories.map((category, index) => (

              <FadeIn
                key={category.title}
                delay={index * 0.2}
              >

                <div
                  className="
                    relative
                    h-[350px]
                    sm:h-[400px]
                    md:h-[450px]
                    lg:h-[550px]
                    overflow-hidden
                    rounded-[24px]
                    sm:rounded-[32px]
                    md:rounded-[40px]
                    group
                    cursor-pointer
                    transition
                    duration-500
                    hover:-translate-y-2
                  "
                >

                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 768px) 50vw,
                      33vw
                    "
                    className="
                      object-cover
                      group-hover:scale-110
                      transition
                      duration-700
                    "
                  />

                  <div className="absolute inset-0 bg-black/30" />

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      sm:bottom-8
                      sm:left-8
                      md:bottom-10
                      md:left-10
                      z-10
                    "
                  >

                    <h3
                      className="
                        text-2xl
                        sm:text-3xl
                        md:text-4xl
                        font-black
                        text-white
                      "
                    >
                      {category.title}
                    </h3>

                  </div>

                </div>

              </FadeIn>

            ))

          }

        </div>

      </div>

    </section>

  );

}