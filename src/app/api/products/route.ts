import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function generateSlug(name:string){

const baseSlug =
name
.toLowerCase()
.trim()
.replace(/[^\w\s-]/g,"")
.replace(/\s+/g,"-");

return `${baseSlug}-${Date.now()}`;
}

export async function POST(
req:Request
){

try{

const body=
await req.json();

if(
!body.name ||
!body.description ||
!body.price ||
!body.stock ||
!body.category
){

return NextResponse.json(
{
error:"All fields required"
},
{
status:400
}
);

}

const product=
await prisma.product.create({

data:{

name:body.name,

slug:
generateSlug(
body.name
),

description:
body.description,

price:
Number(
body.price
),

stock:
Number(
body.stock
),

category:
body.category,

featured:false,

images:
body.images || []

}

});

return NextResponse.json(
product
);

}

catch(error){

console.log(error);

return NextResponse.json(
{
error:"Product creation failed"
},
{
status:500
}
)

}
}