import Link from "next/link";
type SearchParams = Promise<{
id?:string
}>;

export default async function OrderSuccess({

searchParams

}:{

searchParams:
SearchParams

}){

const params=
await searchParams;

return(

<div
className="
min-h-screen
flex
items-center
justify-center
"
>

<div
className="
text-center
max-w-lg
"
>

<h1
className="
text-5xl
font-bold
text-green-600
mb-6
"
>

Payment Successful 🎉

</h1>

<p
className="
text-lg
mb-6
"
>

Your order has been placed successfully.

</p>

<p
className="
text-gray-500
mb-8
"
>

Order ID:

{params.id}

</p>

<Link
href="/products"
className="
bg-[#8a1538]
text-white
px-8
py-4
rounded-full
"
>

Continue Shopping

</Link>

</div>

</div>

);

}