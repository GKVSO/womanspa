import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { getSetting } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, name, phone, concern, email } = body;
    
    // Get destination email
    let toEmail = await getSetting("notification_email");
    if (!toEmail) {
      toEmail = "womancare1006@gmail.com";
    }

    // Configure Nodemailer
    // We try to get SMTP config from ENV
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let subject = "New Form Submission - Woman Luxe";
    let text = "";
    let html = "";

    if (formType === "subscribe") {
      subject = "New Newsletter Subscription - Woman Luxe";
      text = `New subscriber email: ${email}`;
      html = `<h3>New Newsletter Subscription</h3><p><strong>Email:</strong> ${email}</p>`;
    } else {
      subject = `New Consultation Request from ${name || "a client"} - Woman Luxe`;
      text = `Name: ${name}\nPhone: ${phone}\nConcern: ${concern}`;
      html = `<h3>New Consultation Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Concern:</strong> ${concern}</p>`;
    }

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Woman Luxe Notifications" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject,
        text,
        html,
      });
      console.log(`Email sent to ${toEmail} for ${formType}`);
    } else {
      // Mock mode for local dev without SMTP
      console.log("=== MOCK EMAIL SENT ===");
      console.log(`To: ${toEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(`Text: ${text}`);
      console.log("=======================");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to send email" }, { status: 500 });
  }
}
