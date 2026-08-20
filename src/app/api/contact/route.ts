import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, service, budget, message } = result.data;
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "hello@altiadev.com";
    const senderName = process.env.BREVO_SENDER_NAME || "ALTIA DEV Website";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "hello@altiadev.com";

    // If no Brevo API key is configured yet (e.g. initial dev/test), simulate success and log
    if (!apiKey || apiKey === "your_brevo_api_key_here") {
      console.log("[ALTIA DEV Contact Form Submission (Mock mode)]:", {
        name,
        email,
        service,
        budget,
        message,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Message received successfully (development mock mode).",
      });
    }

    // Call Brevo v3 Transactional Email API
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: receiverEmail,
            name: "ALTIA DEV Inquiries",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `[New Inquiry] ${name} — ${service}`,
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E8DFD3; border-radius: 12px; background-color: #FFF6E8; color: #2F2A26;">
            <h2 style="color: #E34234; margin-top: 0;">New Project Brief Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Service of Interest:</strong> ${service}</p>
            <p><strong>Estimated Budget:</strong> ${budget || "Not specified"}</p>
            <div style="margin-top: 20px; padding: 15px; background: #FAF4E9; border-radius: 8px; border-left: 4px solid #E34234;">
              <p style="margin: 0; font-weight: bold; margin-bottom: 8px;">Project Details & Message:</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #8A8078; margin-top: 30px; border-top: 1px solid #E8DFD3; padding-top: 10px;">
              Sent from ALTIA DEV Contact Form (${new Date().toLocaleString()})
            </p>
          </div>
        `,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error("[Brevo API Error]:", errorData);
      return NextResponse.json(
        { error: "Failed to send email through Brevo API", details: errorData },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully to ALTIA DEV.",
    });
  } catch (error) {
    console.error("[Contact API Internal Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
