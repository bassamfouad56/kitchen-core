import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { successResponse, handleApiError, errorResponse } from '@/lib/api/response';
import { getClientIP, contactLimiter, checkRateLimit } from '@/lib/rate-limit';
import { contactFormSchema } from '@/lib/validations/contact';
import { prisma } from '@/lib/prisma';
import ContactNotificationEmail from '@/emails/contact-notification';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { name, email, phone, company, subject, message } = validatedData;

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
          message,
          source: 'WEBSITE',
          status: 'NEW',
          priority: 'MEDIUM',
          metadata: {
            userAgent,
            referer,
            ip,
            formSubmission: true,
            subject,
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
          message,
          source: referer || 'Unknown',
          metadata: {
            userAgent,
            ip,
            leadId,
          },
        },
      });
    } catch (submissionError) {
      console.error('Failed to create contact submission:', submissionError);
    }

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Kitchen Core <onboarding@resend.dev>',
          to: process.env.EMAIL_REPLY_TO || 'design@kitchencore.com',
          replyTo: email,
          subject: `New Contact: ${subject || 'General Inquiry'} - ${name}`,
          react: ContactNotificationEmail({
            name,
            email,
            phone,
            message,
            projectType: subject,
          }),
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue even if email fails
      }
    }

    return successResponse(
      { leadId },
      'Thank you for your inquiry! We will get back to you within 24 hours.'
    );
  } catch (error) {
    return handleApiError(error);
  }
}
