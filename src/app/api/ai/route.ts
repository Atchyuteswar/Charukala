import { NextResponse }
from "next/server";

import { ai }
from "@/lib/gemini";

export async function POST(
  req: Request
) {

  try {

    const formData =
      await req.formData();

    const prompt =
      formData.get("prompt");

    const finalPrompt = `

You are Aira,
an AI luxury fashion stylist
for Charukala.

You help users with:
- luxury saree recommendations
- bridal styling
- festive fashion
- color coordination
- luxury aesthetics

User Request:
${prompt}

Respond elegantly and professionally.

`;

    const response =
      await ai.models.generateContent({

        model:
          "gemini-2.5-flash",

        contents:
          finalPrompt

      });

    return NextResponse.json({

      message:
        response.text

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "AI generation failed"
      },
      {
        status: 500
      }
    );

  }

}