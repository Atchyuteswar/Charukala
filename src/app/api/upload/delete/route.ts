import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

function extractPublicId(url: string) {
  const parts = url.split("/");

  const fileName =
    parts[parts.length - 1];

  const folder =
    parts[parts.length - 2];

  const publicId =
    `${folder}/${fileName.split(".")[0]}`;

  return publicId;
}

export async function POST(
  req: Request
) {
  try {
    const { imageUrl } =
      await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        {
          error:
            "Image URL required",
        },
        {
          status: 400,
        }
      );
    }

    const publicId =
      extractPublicId(
        imageUrl
      );

    await cloudinary.uploader.destroy(
      publicId
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(
      "DELETE IMAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}