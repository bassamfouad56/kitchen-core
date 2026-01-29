import { NextRequest } from 'next/server';
import { successResponse, handleApiError, errorResponse } from '@/lib/api/response';
import { getClientIP, contactLimiter, checkRateLimit } from '@/lib/rate-limit';
import { contactFormSchema } from '@/lib/validations/contact';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { getAdminNotificationEmail, getUserConfirmationEmail } from '@/lib/email-templates';

/**
 * POST /api/contact
 * Handle contact form submissions with rate limiting
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = getClientIP(request);

    // Check rate limit (3 submissions per hour)
    const { success: rateLimitOk } = await checkRateLimit(contactLimiter, ip);

    if (!rateLimitOk) {
      return errorResponse(
        'Too many submissions. Please try again in an hour.',
        429
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Extract data
    const { name, email, phone, company, subject, projectType, message } = validatedData;

    // Split name into first and last
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Get request metadata
    const userAgent = request.headers.get('user-agent');
    const referer = request.headers.get('referer');

    // Create lead in CRM
    let leadId: string | null = null;
    try {
      const lead = await prisma.lead.create({
        data: {
          firstName,
          lastName,
          email,
          phone: phone || null,
          company: company || null,
          message: message || '',
          source: 'WEBSITE',
          status: 'NEW',
          priority: 'MEDIUM',
          metadata: {
            userAgent,
            referer,
            ip,
            formSubmission: true,
            subject,
            projectType,
            submittedAt: new Date().toISOString(),
          },
        },
      });
      leadId = lead.id;
    } catch (leadError) {
      console.error('Failed to create lead:', leadError);
      // Continue even if lead creation fails
    }

    // Create contact submission record
    try {
      await prisma.contactSubmission.create({
        data: {
          name,
          email,
          phone: phone || null,
          company: company || null,
          subject: subject || 'General Inquiry',
          message: message || '',
          source: referer || 'Unknown',
          metadata: {
            userAgent,
            ip,
            leadId,
            projectType,
          },
        },
      });
    } catch (submissionError) {
      console.error('Failed to create contact submission:', submissionError);
    }

    // Detect locale from referer URL
    const locale = referer?.includes('/ar') ? 'ar' : 'en';

    // Send email notifications via Gmail
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      // 1. Send notification to admin
      try {
        const emailSubject = projectType
          ? `New Contact: ${projectType} - ${name}`
          : `New Contact: ${subject || 'General Inquiry'} - ${name}`;

        await sendEmail({
          to: ['kitchencorefuj@gmail.com', 'bassamfouad56@gmail.com'],
          subject: emailSubject,
          html: getAdminNotificationEmail({
            name,
            email,
            phone,
            message: message || 'No message provided',
            projectType: projectType || subject,
          }),
          replyTo: email,
        });
        console.log('Admin notification email sent successfully');
      } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError);
      }

      // 2. Send confirmation email to user
      try {
        const confirmationSubject = locale === 'ar'
          ? 'شكراً لتواصلك مع كيتشن كور'
          : 'Thank you for contacting Kitchen Core';

        await sendEmail({
          to: email,
          subject: confirmationSubject,
          html: getUserConfirmationEmail({
            name,
            projectType,
            locale: locale as 'en' | 'ar',
          }),
        });
        console.log('User confirmation email sent successfully');
      } catch (emailError) {
        console.error('Failed to send confirmation email to user:', emailError);
      }
    } else {
      console.warn('Gmail credentials not configured. Emails not sent.');
    }

    return successResponse(
      { leadId },
      'Thank you for your inquiry! We will get back to you within 24 hours.'
    );
  } catch (error) {
    return handleApiError(error);
  }
}
