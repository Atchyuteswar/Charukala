import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendInvoiceEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {

    const session = await auth();

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

    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      totalAmount,
      shippingData
    } = body;

    // Verify payment signature

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET!
        )
        .update(
          razorpay_order_id +
          "|" +
          razorpay_payment_id
        )
        .digest("hex");

    const isValid =
      generatedSignature ===
      razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        {
          error: "Payment verification failed"
        },
        {
          status: 400
        }
      );
    }

    // Find user

    const user =
      await prisma.user.findUnique({
        where: {
          email: session.user.email
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

    // Create order

    const order =
      await prisma.order.create({

        data: {

          userId: user.id,

          totalAmount,

          paymentId:
            razorpay_payment_id,

          orderId:
            razorpay_order_id,

          signature:
            razorpay_signature,

          status:
            "PAID",

          fullName:
            shippingData.fullName,

          phone:
            shippingData.phone,

          street:
            shippingData.street,

          city:
            shippingData.city,

          state:
            shippingData.state,

          pincode:
            shippingData.pincode,

          items: {
            create:
              items.map(
                (item: { quantity: number; price: number; id: string }) => ({
                  quantity:
                    item.quantity,

                  price:
                    item.price,

                  productId:
                    item.id
                })
              )
          }

        },

        include: {
          items: {
            include: {
              product: true,
            },
          },
        }

      });

    // Reduce stock automatically

    for (const item of order.items) {

      await prisma.product.update({

        where: {
          id: item.productId
        },

        data: {
          stock: {
            decrement: item.quantity
          }
        }

      });

    }

    // Send invoice email (fire-and-forget)

    sendInvoiceEmail({
      to: session.user.email,
      order: {
        ...order,
        items: order.items.map((item) => ({
          product: { name: item.product.name },
          quantity: item.quantity,
          price: item.price,
        })),
      },
    }).catch((err) =>
      console.log("Invoice email failed:", err)
    );

    return NextResponse.json({
      success: true,
      order
    });

  } catch (error) {

    console.log(
      "VERIFY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Verification failed"
      },
      {
        status: 500
      }
    );
  }
}
