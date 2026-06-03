import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function RelatedProducts({
currentProductId
}:{
currentProductId:string
}){

const products =
await prisma.product.findMany({

where:{
NOT:{
id:currentProductId
}
},

take:4,

orderBy:{
createdAt:"desc"
}

});

return(

<section className="py-16 sm:py-24 md:py-32 bg-[#f8f5f0]">

<div className="max-w-7xl mx-auto px-4 sm:px-6">

{/* HEADING */}

<div className="mb-8 sm:mb-12 md:mb-16">

<p
className="
uppercase
tracking-[0.3em]
sm:tracking-[0.4em]
text-[#9b174c]
text-xs
sm:text-sm
"
>

You May Also Like

</p>

<h2
className="
text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
font-black
mt-3
sm:mt-5
"
>

Related Sarees

</h2>

</div>

{/* PRODUCTS */}

<div
  className="
    grid
    grid-cols-2
    lg:grid-cols-4
    gap-4
    sm:gap-6
    md:gap-8
  "
>

{

products.map((product)=>(

<Link

key={product.id}

href={`/products/${product.slug}`}

className="group"

>

<div
className="
relative
h-[220px]
sm:h-[300px]
md:h-[380px]
lg:h-[450px]
overflow-hidden
rounded-[16px]
sm:rounded-[24px]
md:rounded-[30px]
bg-white
"
>

<Image
src={product.images?.[0] || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"}
alt={product.name}
fill
sizes="
  (max-width: 640px) 50vw,
  (max-width: 1024px) 50vw,
  25vw
"
className="
object-cover
group-hover:scale-110
transition
duration-700
"
/>

<div
className="
absolute
inset-0
bg-black/0
group-hover:bg-black/10
transition
"
/>

</div>

<div className="mt-3 sm:mt-5">

<h3
className="
text-base
sm:text-lg
md:text-xl
lg:text-2xl
font-bold
group-hover:text-[#9b174c]
transition
line-clamp-1
"
>

{product.name}

</h3>

<p
className="
text-gray-500
mt-1
sm:mt-2
line-clamp-1
sm:line-clamp-2
text-xs
sm:text-sm
md:text-base
"
>

{product.description}

</p>

<p
className="
text-lg
sm:text-xl
md:text-2xl
font-black
mt-2
sm:mt-4
"
>

₹{product.price}

</p>

</div>

</Link>

))

}

</div>

</div>

</section>

);

}