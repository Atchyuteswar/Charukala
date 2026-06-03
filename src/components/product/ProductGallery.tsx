"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
images
}:{
images:string[]
}){

const [selected,setSelected]=
useState(
images?.[0] || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
);

return(

<div className="space-y-3 sm:space-y-6">

<div
className="
relative
h-[350px]
sm:h-[450px]
md:h-[550px]
lg:h-[700px]
rounded-[20px]
sm:rounded-[30px]
md:rounded-[40px]
overflow-hidden
bg-[#f8f5f0]
"
>

<Image
src={selected || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"}
alt="Product"
fill
sizes="
  (max-width: 1024px) 100vw,
  50vw
"
className="
object-cover
hover:scale-110
transition
duration-700
"
/>

</div>

<div
  className="
    flex
    gap-2
    sm:gap-4
    overflow-x-auto
    pb-2
    -mx-1
    px-1
    scrollbar-hide
  "
>

{

images.map((image)=>(

<button

key={image}

onClick={()=>
setSelected(image)
}

className={`
relative
w-16
sm:w-20
md:w-28
h-20
sm:h-28
md:h-36
rounded-xl
sm:rounded-2xl
overflow-hidden
border-2
flex-shrink-0

${
selected===image
?
"border-[#9b174c]"
:
"border-transparent"
}
`}

>

<Image
src={image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"}
alt="Thumbnail"
fill
sizes="
  (max-width: 640px) 64px,
  (max-width: 768px) 80px,
  112px
"
className="object-cover"
/>

</button>

))

}

</div>

</div>

);

}