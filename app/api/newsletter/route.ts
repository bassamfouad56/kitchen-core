import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting: 5 signups per day per IP
const ratelimit = process.env.UPSTASH_REDIS_REST_URL
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '24 h'),
      analytics: true,
    })
  : null

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous'
      const { success } = await ratelimit.limit(`newsletter_${ip}`)

      if (!success) {
        return NextResponse.json(
          { error: 'Too many signup attempts. Please try again tomorrow.' },
          { status: 429 }
        )
      }
    }

    const body = await request.json()
    const { email, name } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.verified) {
        return NextResponse.json(
          { message: 'You are already subscribed to our newsletter.' },
          { status: 200 }
        )
      } else {
        // Resend verification email
        await sendVerificationEmail(email, name || '', existing.verifyToken!)
        return NextResponse.json(
          { message: 'Verification email resent. Please check your inbox.' },
          { status: 200 }
        )
      }
    }

    // Generate verification token
    const verifyToken = crypto.randomBytes(32).toString('hex')
    const unsubscribeToken = crypto.randomBytes(32).toString('hex')

    // Create subscriber
    await prisma.subscriber.create({
      data: {
        email,
        name: name || null,
        verifyToken,
        unsubscribeToken,
        verified: false,
      },
    })

    // Send verification email
    await sendVerificationEmail(email, name || '', verifyToken)

    return NextResponse.json(
      {
        message: 'Success! Please check your email to confirm your subscription.',
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

async function sendVerificationEmail(email: string, name: string, token: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured - verification email not sent')
    return
  }

  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/newsletter/verify?token=${token}`

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Kitchen Core <onboarding@resend.dev>',
      to: email,
      subject: 'Confirm your Kitchen Core newsletter subscription',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: sans-serif; background-color: #000000; margin: 0; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0A0A0A; border: 1px solid #262626; padding: 40px;">
            <h1 style="color: #C8E163; margin-top: 0;">Welcome to Kitchen Core</h1>
            <p style="color: #737373; font-size: 16px; line-height: 1.6;">
              ${name ? `Hi ${name},` : 'Hello,'}
            </p>
            <p style="color: #737373; font-size: 16px; line-height: 1.6;">
              Thank you for subscribing to the Kitchen Core newsletter! You'll receive exclusive updates on luxury kitchen design trends, project showcases, and special offers.
            </p>
            <p style="color: #737373; font-size: 16px; line-height: 1.6;">
              Please confirm your subscription by clicking the button below:
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${verifyUrl}"
                 style="display: inline-block; background-color: #C8E163; color: #000000; padding: 16px 40px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Confirm Subscription
              </a>
            </div>
            <p style="color: #737373; font-size: 14px; line-height: 1.6;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="color: #C8E163; font-size: 14px; word-break: break-all;">
              ${verifyUrl}
            </p>
            <hr style="border: none; border-top: 1px solid #262626; margin: 40px 0;" />
            <p style="color: #737373; font-size: 12px; line-height: 1.6; text-align: center;">
              Kitchen Core - Luxury Kitchen Design<br />
              If you didn't request this email, you can safely ignore it.
            </p>
          </div>
        </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Failed to send verification email:', error)
    throw error
  }
}
