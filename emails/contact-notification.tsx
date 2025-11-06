import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components'

interface ContactNotificationEmailProps {
  name: string
  email: string
  phone?: string
  projectType?: string
  message: string
}

export default function ContactNotificationEmail({
  name,
  email,
  phone,
  projectType,
  message,
}: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>

          <Text style={text}>
            You have received a new inquiry from your Kitchen Core website.
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Contact Information
            </Heading>

            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>

            {phone && (
              <>
                <Text style={label}>Phone:</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}

            {projectType && (
              <>
                <Text style={label}>Project Type:</Text>
                <Text style={value}>{projectType}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Message
            </Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Sent from Kitchen Core Contact Form
            <br />
            {new Date().toLocaleString('en-US', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#000000',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#0A0A0A',
  margin: '0 auto',
  padding: '40px 20px',
  marginBottom: '64px',
  border: '1px solid #262626',
}

const h1 = {
  color: '#C8E163',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 24px',
  padding: '0',
}

const h2 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '600',
  margin: '24px 0 16px',
}

const text = {
  color: '#737373',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
}

const section = {
  margin: '24px 0',
}

const label = {
  color: '#C8E163',
  fontSize: '14px',
  fontWeight: '600',
  margin: '16px 0 4px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}

const value = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0 0 16px',
}

const messageText = {
  color: '#ffffff',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '20px',
  backgroundColor: '#000000',
  border: '1px solid #262626',
  borderRadius: '4px',
}

const hr = {
  borderColor: '#262626',
  margin: '32px 0',
}

const footer = {
  color: '#737373',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '32px 0 0',
  textAlign: 'center' as const,
}
