import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Here you would integrate with your email service
    // Examples:
    // 1. Resend: https://resend.com/docs/send-with-nextjs
    // 2. SendGrid: https://sendgrid.com/
    // 3. Nodemailer: https://nodemailer.com/

    // For now, we'll just log the submission
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      projectType,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending
    // In production, replace with actual email service:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Kitchen Core <noreply@kitchencore.com>',
      to: 'design@kitchencore.com',
      subject: `New Contact Form: ${projectType || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    */

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
