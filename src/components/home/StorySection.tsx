import Image from "next/image";

export default function StorySection() {

  return (

    <section className="bg-[#111111] text-white py-16 sm:py-24 md:py-32 overflow-hidden">

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-10
          sm:gap-14
          md:gap-20
          items-center
        "
      >

        {/* LEFT IMAGE */}

        <div
          className="
            relative
            h-[350px]
            sm:h-[450px]
            md:h-[550px]
            lg:h-[700px]
            rounded-[24px]
            sm:rounded-[32px]
            md:rounded-[40px]
            overflow-hidden
          "
        >

          <Image
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1400&auto=format&fit=crop"
            alt="Indian Craftsmanship"
            fill
            sizes="
              (max-width: 1024px) 100vw,
              50vw
            "
            className="
              object-cover
              hover:scale-105
              transition
              duration-700
            "
          />

        </div>

        {/* RIGHT CONTENT */}

        <div>

          <p
            className="
              uppercase
              tracking-[0.3em]
              sm:tracking-[0.4em]
              text-[#f3c46b]
              text-xs
              sm:text-sm
              mb-4
              sm:mb-8
            "
          >
            Our Heritage
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-7xl
              font-black
              leading-tight
            "
          >
            Every Thread
            <br />
            Carries Tradition
          </h2>

          <p
            className="
              text-white/70
              text-base
              sm:text-lg
              leading-7
              sm:leading-9
              mt-5
              sm:mt-10
            "
          >
            Charukala celebrates the artistry of Indian handwoven sarees,
            blending timeless craftsmanship with contemporary elegance.

            Every collection is carefully curated to preserve heritage while
            embracing the spirit of the modern woman.
          </p>

          {/* FEATURES */}

          <div className="grid grid-cols-2 gap-5 sm:gap-8 mt-8 sm:mt-14">

            <div>

              <h3
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-black
                  text-[#f3c46b]
                "
              >
                25+
              </h3>

              <p className="text-white/60 mt-2 sm:mt-3 text-sm sm:text-base">
                Years Of Craftsmanship
              </p>

            </div>

            <div>

              <h3
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-black
                  text-[#f3c46b]
                "
              >
                10k+
              </h3>

              <p className="text-white/60 mt-2 sm:mt-3 text-sm sm:text-base">
                Happy Customers
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}