import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {

try{

const session =
await auth();

if(
!session?.user?.email
){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}

const body =
await req.json();

const user =
await prisma.user.findUnique({

where:{
email:
session.user.email
}

});

if(!user){

return NextResponse.json(
{
error:"User not found"
},
{
status:404
}
);

}

const order = await prisma.order.create({

  data: {

    userId: user.id,

    totalAmount:
      body.totalAmount,

    status:
      "PENDING",

    fullName:
      body.shippingData.fullName,

    phone:
      body.shippingData.phone,

    street:
      body.shippingData.street,

    city:
      body.shippingData.city,

    state:
      body.shippingData.state,

    pincode:
      body.shippingData.pincode,

    items: {

      create:
        body.items.map(
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

  }

});

return NextResponse.json(
order
);

}catch(error){

console.log(error);

return NextResponse.json(
{
error:
"Order creation failed"
},
{
status:500
}
);

}

}