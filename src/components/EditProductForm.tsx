"use client";

import { useState } from "react";

import { Product } from "@/generated/prisma/client";

export default function EditProductForm({
product
}:{
product: Product
}){

const [loading,setLoading]=
useState(false);

const [formData,setFormData]=
useState({

name:product.name,
description:product.description,
price:product.price,
stock:product.stock,
category:product.category

});

async function handleSubmit(
e:React.FormEvent
){

e.preventDefault();

setLoading(true);

const res=
await fetch(
`/api/products/${product.id}`,
{
method:"PUT",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify(formData)
}
);

setLoading(false);

if(res.ok){

alert(
"Product updated successfully"
);

}else{

alert(
"Update failed"
);

}

}

return(

<form
onSubmit={handleSubmit}
className="
space-y-5
"
>

<input
value={formData.name}
onChange={(e)=>
setFormData({
...formData,
name:e.target.value
})
}
className="
w-full
border
p-4
rounded-xl
"
placeholder="Name"
/>

<textarea
value={formData.description}
onChange={(e)=>
setFormData({
...formData,
description:e.target.value
})
}
className="
w-full
border
p-4
rounded-xl
"
/>

<input
type="number"
value={formData.price}
onChange={(e)=>
setFormData({
...formData,
price:Number(
e.target.value
)
})
}
className="
w-full
border
p-4
rounded-xl
"
/>

<input
type="number"
value={formData.stock}
onChange={(e)=>
setFormData({
...formData,
stock:Number(
e.target.value
)
})
}
className="
w-full
border
p-4
rounded-xl
"
/>

<input
value={formData.category}
onChange={(e)=>
setFormData({
...formData,
category:e.target.value
})
}
className="
w-full
border
p-4
rounded-xl
"
/>

<button
disabled={loading}
className="
bg-black
text-white
px-6
py-4
rounded-xl
"
>

{loading
? "Updating..."
: "Update Product"}

</button>

</form>

);

}