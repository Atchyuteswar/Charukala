"use client";

import { useSearchStore } from "@/store/search-store";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const demoProducts = [

  {
    id:1,
    name:"Banarasi Silk Saree",
    slug:"banarasi-silk-saree"
  },

  {
    id:2,
    name:"Kanjivaram Bridal Saree",
    slug:"kanjivaram-bridal-saree"
  },

  {
    id:3,
    name:"Festival Silk Collection",
    slug:"festival-silk-collection"
  }

];

export default function SearchOverlay(){

const {
isOpen,
close
}=useSearchStore();

const [query,setQuery]=
useState("");

const filtered =
demoProducts.filter((product)=>

product.name
.toLowerCase()
.includes(
query.toLowerCase()
)

);

return(

<AnimatePresence>

{

isOpen && (

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

exit={{
opacity:0
}}

className="
fixed
inset-0
z-[100]
bg-black/70
backdrop-blur-2xl
"

>

{/* CLOSE */}

<button

onClick={close}

className="
absolute
top-8
right-8
text-white
"

>

<X size={35}/>

</button>

{/* CONTENT */}

<div
className="
max-w-4xl
mx-auto
pt-40
px-6
"
>

{/* INPUT */}

<input

value={query}

onChange={(e)=>
setQuery(
e.target.value
)
}

placeholder="
Search luxury sarees...
"

className="
w-full
bg-transparent
border-b
border-white/20
text-white
text-5xl
outline-none
pb-6
placeholder:text-white/30
"

/>

{/* RESULTS */}

<div className="mt-16 space-y-6">

{

filtered.map((product)=>(

<Link

key={product.id}

href={`/products/${product.slug}`}

onClick={close}

className="
block
text-3xl
text-white/80
hover:text-white
transition
"

>

{product.name}

</Link>

))

}

{

query &&
filtered.length===0 && (

<p className="text-white/40 text-xl">

No products found

</p>

)

}

</div>

</div>

</motion.div>

)

}

</AnimatePresence>

);

}