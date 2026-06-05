"use client";

export default function DeleteButton({
  id,
}:{
  id:string
}){

async function handleDelete(){

const confirmed=
confirm(
"Delete this product?"
);

if(!confirmed)
return;

await fetch(
`/api/products/${id}`,
{
method:"DELETE"
}
);

window.location.reload();

}

return(

<button
onClick={handleDelete}
className="
px-4
py-2
rounded-lg
bg-red-500
text-white
"
>

Delete

</button>

);

}
