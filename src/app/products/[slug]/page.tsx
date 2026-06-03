import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/product/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";

type Params = Promise<{
  slug: string;
}>;

export default async function ProductPage({
  params,
}: {
  params: Params;
}) {
  const { slug } =
    await params;

  const product =
    await prisma.product.findUnique({
      where: {
        slug,
      },
    });

  if (!product) {
    notFound();
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#F8F3EA]
        pt-28
        md:pt-32
        pb-24
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          grid
          lg:grid-cols-2
          gap-12
          lg:gap-20
        "
      >
        {/* GALLERY */}

        <ProductGallery
          images={product.images}
        />

        {/* DETAILS */}

        <div
          className="
            lg:sticky
            lg:top-28
            h-fit
          "
        >
          {/* LABEL */}

          <p
            className="
              section-tag
              mb-6
            "
          >
            Charukala Collection
          </p>

          {/* TITLE */}

          <h1
            className="
              font-brand
              text-[#2A2A2A]
              text-5xl
              md:text-6xl
              leading-tight
            "
          >
            {product.name}
          </h1>

          {/* PRICE */}

          <p
            className="
              mt-6
              text-3xl
              font-semibold
              text-[#7A0019]
            "
          >
            ₹{product.price}
          </p>

          {/* AVAILABILITY */}

          <div
            className="
              flex
              items-center
              gap-3
              mt-8
            "
          >
            <div
              className={`
                w-3
                h-3
                rounded-full
                ${
                  product.stock > 0
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              `}
            />

            <p
              className="
                text-[#6B6B6B]
              "
            >
              {product.stock > 0
                ? "Available for Order"
                : "Currently Unavailable"}
            </p>
          </div>

          {/* DESCRIPTION */}

          <div className="mt-10">
            <h2
              className="
                font-brand
                text-3xl
                mb-4
              "
            >
              Product Details
            </h2>

            <p
              className="
                text-[#6B6B6B]
                leading-8
              "
            >
              {product.description}
            </p>
          </div>

          {/* CTA */}

          <div className="mt-12">
            <AddToCartButton
              product={product}
            />
          </div>

          {/* INFO BLOCKS */}

          <div
            className="
              mt-16
              pt-10
              border-t
              border-[#E8DCC4]
              grid
              gap-8
            "
          >
            <div>
              <h3
                className="
                  font-brand
                  text-2xl
                  text-[#2A2A2A]
                "
              >
                Handcrafted Excellence
              </h3>

              <p
                className="
                  mt-2
                  text-[#6B6B6B]
                  leading-7
                "
              >
                Carefully curated sarees
                celebrating India&apos;s rich
                weaving traditions and
                timeless artistry.
              </p>
            </div>

            <div>
              <h3
                className="
                  font-brand
                  text-2xl
                  text-[#2A2A2A]
                "
              >
                Pan India Delivery
              </h3>

              <p
                className="
                  mt-2
                  text-[#6B6B6B]
                  leading-7
                "
              >
                Secure and reliable
                shipping across India
                with careful packaging.
              </p>
            </div>

            <div>
              <h3
                className="
                  font-brand
                  text-2xl
                  text-[#2A2A2A]
                "
              >
                Secure Checkout
              </h3>

              <p
                className="
                  mt-2
                  text-[#6B6B6B]
                  leading-7
                "
              >
                Protected online payments
                powered by Razorpay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}