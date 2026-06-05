"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateProductPage() {

const router = useRouter();

const [loading,setLoading]=useState(false);

const [preview,setPreview]=useState("");

const [formData,setFormData]=useState({

name:"",
description:"",
price:"",
stock:"",
category:"",
images:[] as string[]

});

async function uploadImage(
e:React.ChangeEvent<HTMLInputElement>
){

try{

const file=
e.target.files?.[0];

if(!file) return;

setLoading(true);

const data=
new FormData();

data.append(
"file",
file
);

const res=
await fetch(
"/api/upload",
{
method:"POST",
body:data
}
);

const result=
await res.json();

if(!res.ok){

throw new Error(
result.error
);
}

setPreview(
result.url
);

setFormData(
prev=>({

...prev,

images:[
result.url
]

})
);

}catch(error){

console.log(error);

alert(
"Image upload failed"
);

}

finally{

setLoading(false);

}

}

async function handleSubmit(
e:React.FormEvent
){

e.preventDefault();

if(

!formData.name ||
!formData.description ||
!formData.price ||
!formData.stock ||
!formData.category

){

alert(
"Please fill all fields"
);

return;

}

try{

setLoading(true);

const res=
await fetch(
"/api/products",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify(
formData
)

}
);

const result=
await res.json();

if(!res.ok){

throw new Error(
result.error
);

}

alert(
"Product created successfully"
);

router.push(
"/products"
);

router.refresh();

}catch(error){

console.log(error);

alert(
"Failed creating product"
);

}

finally{

setLoading(false);

}

}

return(

<div
className="
max-w-3xl
mx-auto
py-12
px-6
"
>

<h1
className="
text-4xl
font-bold
mb-8
"
>

Add Product

</h1>

<form
onSubmit={handleSubmit}
className="
space-y-6
"
>

<input
type="text"
placeholder="Product Name"
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
rounded-xl
p-4
"
/>

<textarea
placeholder="Description"
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
rounded-xl
p-4
h-32
"
/>

<input
type="number"
placeholder="Price"
value={formData.price}
onChange={(e)=>
setFormData({

...formData,

price:e.target.value

})
}
className="
w-full
border
rounded-xl
p-4
"
/>

<input
type="number"
placeholder="Stock"
value={formData.stock}
onChange={(e)=>
setFormData({

...formData,

stock:e.target.value

})
}
className="
w-full
border
rounded-xl
p-4
"
/>

<input
type="text"
placeholder="Category"
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
rounded-xl
p-4
"
/>

<div>

<label
className="
block
mb-2
font-medium
"
>

Upload Product Image

</label>

<input
type="file"
accept="image/*"
onChange={uploadImage}
/>

</div>

{preview && (

<div
className="
relative
w-[250px]
h-[350px]
rounded-xl
overflow-hidden
border
"
>

<Image
src={preview}
alt="Preview"
fill
sizes="250px"
className="object-cover"
/>

</div>

)}

<button
disabled={loading}
className="
bg-[#8a1538]
text-white
px-8
py-4
rounded-full
font-semibold
disabled:opacity-50
"
>

{loading
? "Please wait..."
: "Create Product"}

</button>

</form>

</div>

)

}
