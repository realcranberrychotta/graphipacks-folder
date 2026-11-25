import { NextResponse } from "next/server";
import { PALETTE } from "@/lib/palette";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, phone, product, message } = body;

    const cleanFullName = typeof fullName === "string" ? fullName.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const cleanCompany = typeof companyName === "string" ? companyName.trim() : "";
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanProduct = typeof product === "string" ? product.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    // Field presence validation: fullName, email, and product are required; phone, companyName, and message are optional
    if (
      !cleanFullName ||
      !cleanEmail ||
      !cleanProduct
    ) {
      return NextResponse.json(
        { error: "Please provide all required fields." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Read environment variables (do NOT hardcode owner email)
    const ownerEmail = process.env.OWNER_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "Graphipackss Quote <onboarding@resend.dev>";

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
            reply_to: cleanEmail,
            subject: `New Technical Quote Request: ${cleanProduct}${cleanCompany ? ` - ${cleanCompany}` : ""}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid ${PALETTE.steelBlue}; border-radius: 8px; background-color: ${PALETTE.darkNavy}; color: ${PALETTE.honeydew};">
                <h2 style="color: ${PALETTE.powderBlue}; border-bottom: 1px solid rgba(168,218,220,0.3); padding-bottom: 10px;">New B2B Quote Request</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px; color: ${PALETTE.honeydew};">
                  <tr>
                    <td style="padding: 8px 0; color: ${PALETTE.powderBlue}; font-weight: bold; width: 140px;">Client Name:</td>
                    <td style="padding: 8px 0;">${cleanFullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: ${PALETTE.powderBlue}; font-weight: bold;">Company Name:</td>
                    <td style="padding: 8px 0;">${cleanCompany || "Not specified"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: ${PALETTE.powderBlue}; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: ${PALETTE.honeydew};">${cleanEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: ${PALETTE.powderBlue}; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px 0;">${cleanPhone ? `<a href="tel:${cleanPhone}" style="color: ${PALETTE.honeydew};">${cleanPhone}</a>` : "Not specified"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: ${PALETTE.powderBlue}; font-weight: bold;">Product:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: ${PALETTE.powderBlue};">${cleanProduct}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px; padding: 15px; background-color: #152740; border-radius: 6px; border: 1px solid rgba(168,218,220,0.2);">
                  <strong style="color: ${PALETTE.powderBlue}; display: block; margin-bottom: 8px;">Specifications & Requirements:</strong>
                  <p style="white-space: pre-wrap; margin: 0; line-height: 1.5;">${cleanMessage}</p>
                </div>
                <p style="margin-top: 25px; font-size: 11px; color: rgba(241,250,238,0.7); text-align: center;">
                  Graphipackss Private Limited · Automated Quote Dispatch System
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
          fullName: cleanFullName,
          companyName: cleanCompany,
          email: cleanEmail,
          phone: cleanPhone,
          product: cleanProduct,
          message: cleanMessage,
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
