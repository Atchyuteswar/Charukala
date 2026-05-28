const steps = [

  "PENDING",

  "PAID",

  "PACKED",

  "SHIPPED",

  "DELIVERED"

];

export default function OrderTimeline({
  status
}: {
  status: string;
}) {

  const currentIndex =
    steps.indexOf(status);

  return (

    <div className="flex items-center gap-4 mt-8">

      {

        steps.map((step, index) => (

          <div
            key={step}
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* CIRCLE */}

            <div
              className={`
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                text-sm
                font-bold

                ${
                  index <= currentIndex
                  ?
                  "bg-[#9b174c] text-white"
                  :
                  "bg-gray-200 text-gray-500"
                }
              `}
            >

              {index + 1}

            </div>

            {/* LINE */}

            {

              index !==
              steps.length - 1
              && (

                <div
                  className={`
                    w-12
                    h-1

                    ${
                      index < currentIndex
                      ?
                      "bg-[#9b174c]"
                      :
                      "bg-gray-200"
                    }
                  `}
                />

              )

            }

          </div>

        ))

      }

    </div>

  );

}