
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, loginUrl } = await req.json();

    const emailResponse = await resend.emails.send({
      from: "FlightEaseClaim <onboarding@resend.dev>",
      to: [email],
      subject: "Your FlightEaseClaim Account",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6; margin-top: 40px; margin-bottom: 20px;">Welcome to FlightEaseClaim</h1>
          <p>Hello ${name || 'there'},</p>
          <p>Thank you for submitting your flight compensation claim. We've created an account for you to track your claim's progress.</p>
          <p>Click the button below to access your personal dashboard:</p>
          <div style="margin: 30px 0;">
            <a href="${loginUrl}" style="background-color: #3b82f6; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Access Your Dashboard
            </a>
          </div>
          <p>Or copy and paste this URL into your browser: ${loginUrl}</p>
          <p>Your claim has been received and is now being processed. You'll be able to track its progress through your dashboard.</p>
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          <p style="margin-top: 30px;">The FlightEaseClaim Team</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-login-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
