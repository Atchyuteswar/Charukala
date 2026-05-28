import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: any
) {

  try {

    const body =
      await req.json();

    const id =
      context.params.id;

    // UPDATE ORDER

    const order =
      await prisma.order.update({

        where: {
          id
        },

        data: {
          status:
            body.status
        },

        include: {
          user: true
        }

      });

    // SEND EMAIL

    if (order.user.email) {

      await sendOrderEmail({

        to:
          order.user.email,

        subject:
          `Order ${body.status}`,

        message:
          `Your Charukala order is now marked as ${body.status}. Thank you for shopping luxury with us.`

      });

    }

    return NextResponse.json(order);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed updating order"
      },
      {
        status: 500
      }
    );

  }

}