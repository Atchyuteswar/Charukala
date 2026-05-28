import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/EditProductForm";

type Params = Promise<{
  id:string
}>;

export default async function EditProductPage({
  params
}:{
  params:Params
}) {

const { id } = await params;

const product =
await prisma.product.findUnique({
where:{
id
}
});

if(!product){
notFound();
}

return(

<div className="max-w-4xl mx-auto py-10 px-6">

<h1
className="
text-4xl
font-bold
mb-8
"
>

Edit Product

</h1>

<EditProductForm
product={product}
/>

</div>

);

}