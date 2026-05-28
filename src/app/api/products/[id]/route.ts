import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{
  id: string;
}>;

// GET SINGLE PRODUCT
export async function GET(
  req: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          error: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(product);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to fetch product",
      },
      {
        status: 500,
      }
    );
  }
}


// UPDATE PRODUCT
export async function PUT(
  req: Request,
  { params }: { params: Params }
) {
  try {

    const { id } = await params;

    const body = await req.json();

    const updatedProduct =
      await prisma.product.update({

        where: {
          id,
        },

        data: {

          name: body.name,

          description:
            body.description,

          price:
            Number(body.price),

          stock:
            Number(body.stock),

          category:
            body.category,

        }

      });

    return NextResponse.json(
      updatedProduct
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Update failed"
      },
      {
        status: 500
      }
    );

  }
}


// DELETE PRODUCT
export async function DELETE(
  req: Request,
  { params }: { params: Params }
) {
  try {

    const { id } = await params;

    const product =
      await prisma.product.findUnique({
        where: {
          id
        }
      });

    if (!product) {

      return NextResponse.json(
        {
          error:
            "Product not found"
        },
        {
          status: 404
        }
      );

    }

    await prisma.product.delete({

      where: {
        id
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
          "Delete failed"
      },
      {
        status: 500
      }
    );

  }
}