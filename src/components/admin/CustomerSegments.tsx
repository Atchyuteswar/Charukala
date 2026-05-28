import { prisma }
from "@/lib/prisma";

import { ai }
from "@/lib/gemini";

export default async function CustomerSegments() {

  const users =
    await prisma.user.findMany({

      include: {

        orders: {

          include: {

            items: {

              include: {
                product: true
              }

            }

          }

        }

      }

    });

  const customerData =
    users.map((user) => {

      const totalSpent =
        user.orders.reduce(
          (acc, order) =>
            acc + order.totalAmount,
          0
        );

      return `

Customer:
${user.email}

Orders:
${user.orders.length}

Total Spent:
₹${totalSpent}

`;

    }).join("\n");

  const prompt = `

You are an AI customer strategist.

Respond SHORT and CLEAN.

Format EXACTLY like:

👑 VIP Customers
...

🛍 Repeat Buyers
...

🎯 Opportunity
...

Keep insights concise.

Customer Data:
${customerData}

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
      bg-white
      rounded-[40px]
      p-10
      shadow-lg
      mt-12
    "
  >

    <div className="mb-10">

      <p
        className="
          uppercase
          tracking-[0.4em]
          text-[#9b174c]
          text-sm
        "
      >
        AI Segmentation
      </p>

      <h2
        className="
          text-4xl
          font-black
          mt-5
        "
      >
        Customer Intelligence
      </h2>

    </div>

    <div
      className="
        bg-[#f8f5f0]
        rounded-[30px]
        p-8
        whitespace-pre-wrap
        leading-8
        text-gray-700
      "
    >

      {response.text}

    </div>

  </div>

);

}