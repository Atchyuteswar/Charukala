import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const amount = body.amount;

    if (!amount) {
      return NextResponse.json(
        {
          error: "Amount missing"
        },
        {
          status: 400
        }
      );
    }

    const order =
      await razorpay.orders.create({

        amount:
          amount * 100,

        currency:
          "INR",

        receipt:
          `charukala_${Date.now()}`

      });

    return NextResponse.json(order);

  } catch(error){

    console.log(error);

    return NextResponse.json(
      {
        error:"Failed creating payment order"
      },
      {
        status:500
      }
    );

  }
}
