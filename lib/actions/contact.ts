'use server';

import { revalidatePath } from 'next/cache';
import { contactFormSchema } from '../validations/contact';
import { prisma } from '../prisma';
import { Resend } from 'resend';
import ContactNotificationEmail from '@/emails/contact-notification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  try {
    // Extract and validate form data
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    const validatedData = contactFormSchema.parse(data);

    // Split name
    const nameParts = validatedData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        message: validatedData.message,
        source: 'WEBSITE',
        status: 'NEW',
        priority: 'MEDIUM',
      },
    });

    // Create contact submission
    await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        subject: validatedData.subject,
        message: validatedData.message,
        source: 'Contact Form',
        metadata: { leadId: lead.id },
      },
    });

    // Send email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Kitchen Core <onboarding@resend.dev>',
        to: process.env.EMAIL_REPLY_TO || 'design@kitchencore.com',
        replyTo: validatedData.email,
        subject: `New Contact: ${validatedData.subject || 'General Inquiry'}`,
        react: ContactNotificationEmail({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message,
          projectType: validatedData.subject,
        }),
      });
    }

    revalidatePath('/');

    return {
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: 'Failed to submit form. Please try again.',
    };
  }
}
