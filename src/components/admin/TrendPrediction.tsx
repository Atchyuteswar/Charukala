import { prisma }
from "@/lib/prisma";

import { ai }
from "@/lib/gemini";

export default async function TrendPrediction() {

  const orders =
    await prisma.order.findMany({

      include: {

        items: {

          include: {
            product: true
          }

        }

      }

    });

  const trendData =
    orders.map((order) => (

      order.items.map((item) => (`

Product:
${item.product.name}

Category:
${item.product.category}

Quantity:
${item.quantity}

Revenue:
₹${item.price * item.quantity}

`)).join("\n")

    )).join("\n");

  const prompt = `

You are an AI trend forecaster.

Respond SHORT and CLEAN.

Format EXACTLY like:

📈 Rising Trend
...

⚠ Risk
...

💡 Forecast
...

Keep every point concise.

Trend Data:
${trendData}

`;

  const response =
    await ai.models.generateContent({

      model:
        "gemini-2.5-flash",

      contents:
        prompt

    });

  return (

  <div
    className="
      bg-black
      text-white
      rounded-[40px]
      p-10
      mt-12
    "
  >

    <div className="mb-10">

      <p
        className="
          uppercase
          tracking-[0.4em]
          text-[#f3c46b]
          text-sm
        "
      >
        AI Forecasting
      </p>

      <h2
        className="
          text-4xl
          font-black
          mt-5
        "
      >
        Trend Prediction
      </h2>

    </div>

    <div
      className="
        bg-white/5
        rounded-[30px]
        p-8
        whitespace-pre-wrap
        leading-8
        text-white/80
      "
    >

      {response.text}

    </div>

  </div>

);

}