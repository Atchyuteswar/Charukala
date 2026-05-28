import { Resend } from "resend";

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

export async function sendOrderEmail({

  to,

  subject,

  message

}: {

  to: string;

  subject: string;

  message: string;

}) {

  try {

    await resend.emails.send({

      from:
        "Charukala <onboarding@resend.dev>",

      to,

      subject,

      html: `

<div
style="
font-family:sans-serif;
padding:40px;
background:#f8f5f0;
"
>

<h1
style="
font-size:32px;
margin-bottom:20px;
"
>
${subject}
</h1>

<p
style="
font-size:18px;
line-height:1.8;
color:#444;
"
>
${message}
</p>

<p
style="
margin-top:40px;
font-size:14px;
color:#888;
"
>
Luxury fashion by Charukala ✨
</p>

</div>

`

    });

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error
    );

  }

}