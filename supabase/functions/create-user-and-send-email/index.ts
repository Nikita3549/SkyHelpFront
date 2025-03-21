
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "npm:resend@2.0.0";

// Configure CORS headers for browser access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { email, firstName, lastName, claimId } = await req.json();
    
    if (!email) {
      throw new Error("Email is required");
    }

    // Initialize Supabase client with Admin privileges
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Generate a random password
    const tempPassword = generateRandomPassword(12);
    console.log(`Temporary password for ${email}: ${tempPassword}`);

    // Check if user already exists
    const { data: existingUser, error: getUserError } = await supabaseAdmin.auth.admin.getUserByEmail(email);
    
    if (getUserError && !getUserError.message.includes("User not found")) {
      throw getUserError;
    }
    
    let userId;
    
    if (existingUser) {
      // User already exists, we'll just link the claim to them
      userId = existingUser.user.id;
      console.log(`User ${email} already exists with ID: ${userId}`);
    } else {
      // Create the user with the temporary password
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true, // Auto-confirm the email
        user_metadata: { firstName, lastName, firstLogin: true },
      });

      if (error) {
        throw error;
      }

      userId = data.user.id;
      console.log(`Created new user with ID: ${userId}`);
    }

    // If we have a claim ID, update it to associate with this user
    if (claimId) {
      const { error: updateError } = await supabaseAdmin
        .from("claims")
        .update({ customer: userId })
        .eq("id", claimId);

      if (updateError) {
        console.error("Error updating claim:", updateError);
        throw updateError;
      }
      
      console.log(`Associated claim ${claimId} with user ${userId}`);
    }

    // Only send welcome email if this is a new user
    if (!existingUser) {
      // Send welcome email with login credentials
      await sendWelcomeEmail(email, tempPassword, firstName || "Customer");
    }

    return new Response(JSON.stringify({ success: true, userId }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-user function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500,
    });
  }
});

// Helper function to generate a random password
function generateRandomPassword(length: number): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Helper function to send welcome email
async function sendWelcomeEmail(email: string, password: string, firstName: string): Promise<void> {
  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const { data, error } = await resend.emails.send({
      from: "FlightClaim <noreply@flightclaim.app>",
      to: [email],
      subject: "Welcome to FlightClaim - Your Account Details",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #3b82f6; text-align: center;">Welcome to FlightClaim!</h1>
          <p>Hello ${firstName},</p>
          <p>Thank you for submitting your claim with FlightClaim. We've created an account for you to track your claim status:</p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Temporary Password:</strong> ${password}</p>
          </div>
          <p>Please log in to your account and change your password as soon as possible. You can do this by visiting your account settings after logging in.</p>
          <p>From your account dashboard, you can:</p>
          <ul>
            <li>Track the status of your claims</li>
            <li>Submit new claims</li>
            <li>Update your account information</li>
          </ul>
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br>The FlightClaim Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      throw error;
    }
    
    console.log("Welcome email sent successfully:", data);
  } catch (error) {
    console.error("Error in sendWelcomeEmail:", error);
    // We'll log the error but not throw it to avoid breaking the main function
    // if email sending fails
  }
}
