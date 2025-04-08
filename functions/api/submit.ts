// functions/api/submit.ts
import type { PagesFunction } from "@astrojs/cloudflare"; // Import the type

// Define the expected shape of the form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Define the expected shape of the Cloudflare environment variables
interface Env {
  RESEND_API_KEY: string;
}

// Define the Cloudflare Pages function handler
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    // --- 1. Get Environment Variables ---
    const resendApiKey = context.env.RESEND_API_KEY;
    const recipientEmail = "michael@coalbanks.com"; // Your recipient email
    // IMPORTANT: Set up a verified sending domain in Resend (e.g., noreply@yourdomain.com)
    const senderEmail = "noreply@lethbridgedrone.com"; // Replace with your verified Resend sending email

    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set.");
      // Return JSON error
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server configuration error.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // --- 2. Parse Form Data ---
    const formData = await context.request.formData();
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const message = formData.get("message") as string | null;

    // Basic validation
    if (!name || !email || !message) {
      // Return JSON error
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required form fields.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // --- 3. Send Email using Resend ---
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `Coalbanks Creative Inquiry <${senderEmail}>`,
        to: [recipientEmail],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <p>You received a new message from your website contact form:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Message:</strong></li>
          </ul>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        reply_to: email, // Set reply-to for easy response
      }),
    });

    // --- 4. Handle Resend Response ---
    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error("Resend API Error:", errorData);
      // Return JSON error
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to send email: ${errorData.message || "Unknown error"}`,
        }),
        {
          status: resendResponse.status, // Use Resend's status code if available
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // --- 5. Return Success Response (or Redirect) ---
    // Option 1: Simple success message
    // return new Response('Thank you for your message!', { status: 200 });

    // Option 2: Redirect to a thank-you page (if you create one)
    // const url = new URL(context.request.url);
    // return Response.redirect(`${url.origin}/thank-you`, 302);

    // Option 3: Return JSON success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully! We will get back to you soon.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error processing form submission:", error);
    // Return JSON error
    return new Response(
      JSON.stringify({
        success: false,
        error: "An unexpected error occurred.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

// Optional: Handle non-POST requests if someone tries to access the URL directly
export const onRequestGet: PagesFunction = async () => {
  return new Response("Method Not Allowed", { status: 405 });
};
