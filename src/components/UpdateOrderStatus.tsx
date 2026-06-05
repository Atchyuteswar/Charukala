"use client";

export default function UpdateOrderStatus({
id,
status
}:{
id:string;
status:string;
}){

async function updateStatus(
newStatus:string
){

await fetch(
`/api/orders/${id}`,
{

method:"PUT",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

status:newStatus

})

}

);

window.location.reload();

}

return(

<select

value={status}

onChange={(e)=>

updateStatus(
e.target.value
)

}

className="
border
rounded-lg
px-3
py-2
"

>

<option value="PAID">
PAID
</option>

<option value="SHIPPED">
SHIPPED
</option>

<option value="DELIVERED">
DELIVERED
</option>

<option value="CANCELLED">
CANCELLED
</option>

</select>

);

}
