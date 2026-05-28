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

    // CHECK EXISTING

    const existing =
      await prisma.wishlist.findFirst({

        where: {

          userId:
            user.id,

          productId:
            body.productId

        }

      });

    // REMOVE IF EXISTS

    if (existing) {

      await prisma.wishlist.delete({

        where: {
          id:
            existing.id
        }

      });

      return NextResponse.json({
        added: false
      });

    }

    // CREATE

    await prisma.wishlist.create({

      data: {

        userId:
          user.id,

        productId:
          body.productId

      }

    });

    return NextResponse.json({
      added: true
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Wishlist failed"
      },
      {
        status: 500
      }
    );

  }

}