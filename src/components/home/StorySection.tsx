import Image from "next/image";

export default function StorySection() {
  return (
    <section
      className="
        bg-white
        py-24
        md:py-32
        border-t
        border-[#E8DCC4]
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          grid
          lg:grid-cols-2
          gap-16
          lg:gap-24
          items-center
        "
      >
        {/* LEFT IMAGE */}
        <div
          className="
            relative
            h-[400px]
            md:h-[600px]
            rounded-2xl
            overflow-hidden
          "
        >
          <Image
            src="/placeholder-saree.jpg"
            alt="Indian Craftsmanship"
            fill
            sizes="
              (max-width: 1024px) 100vw,
              50vw
            "
            className="
              object-cover
              transition
              duration-700
              hover:scale-105
            "
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <p
            className="
              section-tag
              mb-6
            "
          >
            Our Heritage
          </p>

          <h2
            className="
              font-brand
              text-5xl
              md:text-6xl
              text-[#2A2A2A]
              leading-tight
            "
          >
            Every Thread
            <br />
            Carries Tradition
          </h2>

          <p
            className="
              text-[#6B6B6B]
              text-lg
              leading-8
              mt-8
              max-w-lg
            "
          >
            Charukala celebrates the artistry of Indian handwoven sarees,
            blending timeless craftsmanship with contemporary elegance.
            Every collection is carefully curated to preserve heritage while
            embracing the spirit of the modern woman.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-[#E8DCC4]">
            <div>
              <h3
                className="
                  text-4xl
                  font-semibold
                  text-[#7A0019]
                "
              >
                25+
              </h3>
              <p className="text-[#6B6B6B] mt-2 font-medium">
                Years Of Craftsmanship
              </p>
            </div>

            <div>
              <h3
                className="
                  text-4xl
                  font-semibold
                  text-[#7A0019]
                "
              >
                10k+
              </h3>
              <p className="text-[#6B6B6B] mt-2 font-medium">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
