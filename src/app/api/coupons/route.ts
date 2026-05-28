import { NextResponse }
from "next/server";

import { prisma }
from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const coupon =
      await prisma.coupon.findUnique({

        where: {
          code:
            body.code
        }

      });

    if (!coupon) {

      return NextResponse.json(
        {
          error:
            "Invalid coupon"
        },
        {
          status: 404
        }
      );

    }

    if (!coupon.active) {

      return NextResponse.json(
        {
          error:
            "Coupon inactive"
        },
        {
          status: 400
        }
      );

    }

    if (
      new Date() >
      coupon.expiresAt
    ) {

      return NextResponse.json(
        {
          error:
            "Coupon expired"
        },
        {
          status: 400
        }
      );

    }

    return NextResponse.json({

      success: true,

      discount:
        coupon.discount

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Coupon failed"
      },
      {
        status: 500
      }
    );

  }

}