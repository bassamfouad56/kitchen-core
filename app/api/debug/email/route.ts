import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function GET() {
  // Check if environment variables are set
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  const envStatus = {
    GMAIL_USER: gmailUser ? `Set (${gmailUser})` : 'NOT SET',
    GMAIL_APP_PASSWORD: gmailAppPassword ? `Set (${gmailAppPassword.substring(0, 4)}****)` : 'NOT SET',
  };

  return NextResponse.json({
    success: true,
    environmentStatus: envStatus,
    message: 'Email configuration check. Use POST to send a test email.',
  });
}

export async function POST(request: Request) {
  try {
    const { secret, testEmail } = await request.json();

    // Simple security check
    if (secret !== 'test-email-2025') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      return NextResponse.json({
        success: false,
        error: 'Email credentials not configured',
        envStatus: {
          GMAIL_USER: gmailUser ? 'Set' : 'NOT SET',
          GMAIL_APP_PASSWORD: gmailAppPassword ? 'Set' : 'NOT SET',
        },
      });
    }

    // Send test email
    const targetEmail = testEmail || gmailUser;

    console.log('Attempting to send test email to:', targetEmail);
    console.log('Using Gmail user:', gmailUser);

    const result = await sendEmail({
      to: targetEmail,
      subject: 'Kitchen Core - Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #C8E163;">Test Email from Kitchen Core</h1>
          <p>This is a test email to verify the email configuration is working correctly.</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
          <p style="color: #888;">If you received this email, the configuration is working!</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: result.messageId,
      sentTo: targetEmail,
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send test email',
        details: String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
