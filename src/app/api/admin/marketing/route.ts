import { NextResponse }
from "next/server";

import { ai }
from "@/lib/gemini";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const prompt = `

You are an AI luxury fashion marketing strategist for Charukala.

Generate:
- luxury campaigns
- Instagram captions
- promotional copy
- launch campaigns
- festive campaigns
- elegant marketing content

Tone:
- luxurious
- emotional
- premium
- fashion-editorial style

User Request:
${body.prompt}

`;

    const response =
      await ai.models.generateContent({

        model:
          "gemini-2.5-flash",

        contents:
          prompt

      });

    return NextResponse.json({

      result:
        response.text

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Generation failed"
      },
      {
        status: 500
      }
    );

  }

}