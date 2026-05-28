import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { auth } from "@/auth";

export async function POST(req: Request) {

  try {

    const session =
      await auth();

    if (!session?.user?.email) {

      return NextResponse.json(
        {
          error: "Unauthorized"
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
          error: "User not found"
        },
        {
          status: 404
        }
      );

    }

    await prisma.userPreference.upsert({

      where: {
        userId:
          user.id
      },

      update: {

        favoriteColor:
          body.favoriteColor,

        favoriteCategory:
          body.favoriteCategory,

        fashionStyle:
          body.fashionStyle,

        budget:
          body.budget

      },

      create: {

        userId:
          user.id,

        favoriteColor:
          body.favoriteColor,

        favoriteCategory:
          body.favoriteCategory,

        fashionStyle:
          body.fashionStyle,

        budget:
          body.budget

      }

    });

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed saving preferences"
      },
      {
        status: 500
      }
    );

  }

}