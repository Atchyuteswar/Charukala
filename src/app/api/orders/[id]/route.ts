import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{
id:string
}>;

export async function PUT(

req:Request,

{
params
}:{
params:Params
}

){

try{

const {id}=
await params;

const body=
await req.json();

const order=
await prisma.order.update({

where:{
id
},

data:{
status:
body.status
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
"Update failed"
},
{
status:500
}
);

}

}