import { NextResponse }
from "next/server";

import { prisma }
from "@/lib/prisma";

import { auth }
from "@/auth";

export async function POST(
  req: Request
) {

  try {

    const session =
      await auth();

    if (!session?.user?.email) {

      return NextResponse.json(
        {
          error:
            "Unauthorized"
        },
        {
          status: 401
        }
      );

    }

    const body =
      await req.json();

    const user =
      await prisma.user.findUnique({

        where: {
          email:
            session.user.email
        }

      });

    if (!user) {

      return NextResponse.json(
        {
          error:
            "User not found"
        },
        {
          status: 404
        }
      );

    }

    const review =
      await prisma.review.create({

        data: {

          rating:
            body.rating,

          comment:
            body.comment,

          productId:
            body.productId,

          userId:
            user.id

        }

      });

    return NextResponse.json(
      review
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Review failed"
      },
      {
        status: 500
      }
    );

  }

}