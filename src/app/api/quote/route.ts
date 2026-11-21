import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, phone, product, message } = body;

    // Field presence and length validation
    if (
      !fullName?.trim() ||
      !companyName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !product?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { error: "All quote inquiry fields are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Read environment variables (do NOT hardcode owner email)
    const ownerEmail = process.env.OWNER_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "Graphipacks Quote <onboarding@resend.dev>";

    if (apiKey && ownerEmail) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [ownerEmail],
            reply_to: email,
            subject: `New Technical Quote Request: ${product} - ${companyName}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #B08D57; border-radius: 8px; background-color: #0F2A44; color: #F8F4EC;">
                <h2 style="color: #B08D57; border-bottom: 1px solid rgba(176,141,87,0.3); padding-bottom: 10px;">New B2B Quote Request</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px; color: #F8F4EC;">
                  <tr>
                    <td style="padding: 8px 0; color: #B08D57; font-weight: bold; width: 140px;">Client Name:</td>
                    <td style="padding: 8px 0;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #B08D57; font-weight: bold;">Company Name:</td>
                    <td style="padding: 8px 0;">${companyName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #B08D57; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #F8F4EC;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #B08D57; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #F8F4EC;">${phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #B08D57; font-weight: bold;">Product:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #B08D57;">${product}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px; padding: 15px; background-color: #091B2C; border-radius: 6px; border: 1px solid rgba(176,141,87,0.2);">
                  <strong style="color: #B08D57; display: block; margin-bottom: 8px;">Specifications & Requirements:</strong>
                  <p style="white-space: pre-wrap; margin: 0; line-height: 1.5;">${message}</p>
                </div>
                <p style="margin-top: 25px; font-size: 11px; color: rgba(248,244,236,0.6); text-align: center;">
                  Graphipacks Private Limited · Automated Quote Dispatch System
                </p>
              </div>
            `,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.error("Resend API rejected transmission:", errData);
        }
      } catch (sendErr) {
        console.error("Failed to transmit email via Resend:", sendErr);
      }
    } else {
      console.log(
        "[Quote Flow Notice: RESEND_API_KEY or OWNER_EMAIL not set — quote recorded locally]:",
        {
          fullName,
          companyName,
          email,
          phone,
          product,
          message,
          targetOwnerEmail: ownerEmail || "Not configured (set OWNER_EMAIL in env)",
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Request received. Our team will call you within 1 working day.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/quote:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing quote." },
      { status: 500 }
    );
  }
}
