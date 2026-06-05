import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

export async function POST() {

  const session = await auth();

  if (!session?.user?.email) {

    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );

  }

  const existingUser =
  await prisma.user.findUnique({

    where: {
      email: session.user.email,
    },

  });

  if (existingUser) {

    return NextResponse.json(
      existingUser
    );

  }

  const user = await prisma.user.create({
  data: {
    email: session.user.email,

    name:
      session.user.name || "",

    role: Role.USER
  }
});

  return NextResponse.json(
    user
  );

}
