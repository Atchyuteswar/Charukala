import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import ProductGallery
from "@/components/product/ProductGallery";

import AddToCartButton
from "@/components/AddToCartButton";

import RelatedProducts
from "@/components/product/RelatedProducts";

import ReviewForm
from "@/components/product/ReviewForm";

import WishlistButton
from "@/components/product/WishlistButton";

type Params = Promise<{
  slug: string;
}>;

export default async function ProductPage({
  params
}: {
  params: Params;
}) {

  const { slug } =
    await params;

  const product =
    await prisma.product.findUnique({

      where: {
        slug
      },

      include: {

        reviews: {

          include: {
            user: true
          },

          orderBy: {
            createdAt: "desc"
          }

        }

      }

    });

  if (!product) {

    notFound();

  }

  // AVERAGE RATING

  const averageRating =

    product.reviews.length > 0

    ?

    (
      product.reviews.reduce(
        (acc, review) =>
          acc + review.rating,
        0
      ) / product.reviews.length
    ).toFixed(1)

    :

    null;

  return (

    <div
      className="
        bg-[#f8f5f0]
        min-h-screen
      "
    >

      {/* PRODUCT SECTION */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          pt-24
          sm:pt-28
          md:pt-32
          pb-12
          sm:pb-20
          md:pb-32
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          sm:gap-12
          md:gap-20
        "
      >

        {/* LEFT */}

        <ProductGallery
          images={product.images}
        />

        {/* RIGHT */}

        <div
          className="
            lg:sticky
            lg:top-32
            h-fit
          "
        >

          {/* CATEGORY */}

          <p
            className="
              uppercase
              tracking-[0.3em]
              sm:tracking-[0.4em]
              text-[#9b174c]
              text-xs
              sm:text-sm
              mb-3
              sm:mb-6
            "
          >

            Luxury Collection

          </p>

          {/* TITLE */}

          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              leading-tight
            "
          >

            {product.name}

          </h1>

          {/* PRICE */}

          <p
            className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-black
              mt-4
              sm:mt-8
            "
          >

            ₹{product.price}

          </p>

          {/* REVIEWS SUMMARY */}

          <div
            className="
              flex
              items-center
              gap-3
              sm:gap-4
              mt-4
              sm:mt-6
              flex-wrap
            "
          >

            <div
              className="
                text-[#9b174c]
                text-base
                sm:text-lg
              "
            >

              {

                averageRating
                ?
                "⭐".repeat(
                  Math.round(
                    Number(
                      averageRating
                    )
                  )
                )
                :
                "No Ratings"

              }

            </div>

            <p className="text-gray-500 text-sm sm:text-base">

              {

                averageRating
                ?
                `${averageRating} rating (${product.reviews.length} reviews)`
                :
                "Be the first to review"

              }

            </p>

          </div>

          {/* DESCRIPTION */}

          <p
            className="
              text-gray-600
              leading-7
              sm:leading-8
              md:leading-9
              text-base
              sm:text-lg
              mt-5
              sm:mt-10
            "
          >

            {product.description}

          </p>

          {/* STOCK */}

          <div
            className="
              mt-6
              sm:mt-10
              flex
              items-center
              gap-3
              sm:gap-4
            "
          >

            <div
              className={`
                w-3
                h-3
                rounded-full

                ${
                  product.stock > 0
                  ?
                  "bg-green-500"
                  :
                  "bg-red-500"
                }
              `}
            />

            <p className="text-gray-600 text-sm sm:text-base">

              {

                product.stock > 0

                ?

                `${product.stock} pieces available`

                :

                "Out Of Stock"

              }

            </p>

          </div>

          {/* BUTTON */}

          <div className="
            flex
            flex-col
            sm:flex-row
            items-stretch
            sm:items-center
            gap-3
            sm:gap-4
            mt-6
            sm:mt-8
          ">

            <AddToCartButton
              product={product}
            />

            <WishlistButton
              productId={product.id}
            />


          </div>

          {/* FEATURES */}

          <div
            className="
              border-t
              border-gray-200
              mt-8
              sm:mt-12
              md:mt-16
              pt-6
              sm:pt-8
              md:pt-10
              space-y-5
              sm:space-y-6
              md:space-y-8
            "
          >

            <div>

              <h3
                className="
                  font-bold
                  text-base
                  sm:text-lg
                  md:text-xl
                "
              >
                Premium Fabric
              </h3>

              <p
                className="
                  text-gray-500
                  mt-1.5
                  sm:mt-2
                  leading-6
                  sm:leading-7
                  text-sm
                  sm:text-base
                "
              >
                Handcrafted with luxurious fabric
                and timeless traditional artistry.
              </p>

            </div>

            <div>

              <h3
                className="
                  font-bold
                  text-base
                  sm:text-lg
                  md:text-xl
                "
              >
                Free Shipping
              </h3>

              <p
                className="
                  text-gray-500
                  mt-1.5
                  sm:mt-2
                  leading-6
                  sm:leading-7
                  text-sm
                  sm:text-base
                "
              >
                Fast and secure delivery
                across India.
              </p>

            </div>

            <div>

              <h3
                className="
                  font-bold
                  text-base
                  sm:text-lg
                  md:text-xl
                "
              >
                Secure Payments
              </h3>

              <p
                className="
                  text-gray-500
                  mt-1.5
                  sm:mt-2
                  leading-6
                  sm:leading-7
                  text-sm
                  sm:text-base
                "
              >
                100% secure checkout
                powered by Razorpay.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* REVIEWS SECTION */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          pb-12
          sm:pb-18
          md:pb-24
        "
      >

        {/* HEADER */}

        <div className="mb-8 sm:mb-12">

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
            Customer Reviews
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              mt-3
              sm:mt-5
            "
          >
            Luxury Experiences
          </h2>

        </div>

        {/* REVIEW FORM */}

        <ReviewForm
          productId={product.id}
        />

        {/* REVIEWS */}

        <div
          className="
            mt-6
            sm:mt-8
            md:mt-10
            space-y-4
            sm:space-y-6
          "
        >

          {

            product.reviews.length === 0

            ?

            (

              <div
                className="
                  bg-white
                  rounded-[20px]
                  sm:rounded-[30px]
                  p-6
                  sm:p-10
                  text-center
                  shadow-sm
                "
              >

                <p
                  className="
                    text-gray-500
                    text-base
                    sm:text-lg
                  "
                >
                  No reviews yet.
                </p>

              </div>

            )

            :

            (

              product.reviews.map(
                (review) => (

                  <div

                    key={review.id}

                    className="
                      bg-white
                      rounded-[20px]
                      sm:rounded-[30px]
                      p-5
                      sm:p-8
                      shadow-sm
                    "
                  >

                    {/* TOP */}

                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-2
                      "
                    >

                      <div>

                        <h3
                          className="
                            font-black
                            text-base
                            sm:text-lg
                            md:text-xl
                          "
                        >

                          {

                            review.user.name
                            ||
                            "Luxury Customer"

                          }

                        </h3>

                        <p
                          className="
                            text-xs
                            sm:text-sm
                            text-gray-400
                            mt-0.5
                            sm:mt-1
                          "
                        >

                          {

                            new Date(
                              review.createdAt
                            ).toLocaleDateString()

                          }

                        </p>

                      </div>

                      {/* STARS */}

                      <div
                        className="
                          text-[#9b174c]
                          text-base
                          sm:text-lg
                        "
                      >

                        {"⭐".repeat(
                          review.rating
                        )}

                      </div>

                    </div>

                    {/* COMMENT */}

                    <p
                      className="
                        mt-3
                        sm:mt-6
                        text-gray-600
                        leading-7
                        sm:leading-8
                        text-sm
                        sm:text-base
                      "
                    >

                      {review.comment}

                    </p>

                  </div>

                )
              )

            )

          }

        </div>

      </div>

      {/* RELATED PRODUCTS */}

      <RelatedProducts
        currentProductId={product.id}
      />

    </div>

  );

}