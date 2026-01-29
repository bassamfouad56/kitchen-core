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
  Link,
} from '@react-email/components'

interface ContactConfirmationEmailProps {
  name: string
  projectType?: string
  locale?: 'en' | 'ar'
}

export default function ContactConfirmationEmail({
  name,
  projectType,
  locale = 'en',
}: ContactConfirmationEmailProps) {
  const isArabic = locale === 'ar'

  const content = {
    en: {
      preview: 'Thank you for contacting Kitchen Core',
      greeting: `Dear ${name},`,
      thankYou: 'Thank you for reaching out to Kitchen Core!',
      received: 'We have received your inquiry and our team will review it shortly.',
      response: 'You can expect to hear back from us within 24 hours.',
      projectInfo: projectType ? `Project Type: ${projectType}` : null,
      meanwhile: 'In the meantime, feel free to:',
      action1: 'Browse our gallery for design inspiration',
      action2: 'Explore our services',
      action3: 'Follow us on social media for the latest updates',
      questions: 'If you have any urgent questions, please don\'t hesitate to call us at:',
      phone: '+971 55 792 6686',
      closing: 'We look forward to helping you create your dream kitchen!',
      signature: 'Best regards,',
      team: 'The Kitchen Core Team',
      footer: 'Kitchen Core - Premium Kitchen Design & Manufacturing',
      address: 'Fujairah, United Arab Emirates',
    },
    ar: {
      preview: 'شكراً لتواصلك مع كيتشن كور',
      greeting: `عزيزي ${name}،`,
      thankYou: 'شكراً لتواصلك مع كيتشن كور!',
      received: 'لقد استلمنا استفسارك وسيقوم فريقنا بمراجعته قريباً.',
      response: 'يمكنك توقع الرد منا خلال 24 ساعة.',
      projectInfo: projectType ? `نوع المشروع: ${projectType}` : null,
      meanwhile: 'في هذه الأثناء، لا تتردد في:',
      action1: 'تصفح معرض أعمالنا للإلهام في التصميم',
      action2: 'استكشاف خدماتنا',
      action3: 'متابعتنا على وسائل التواصل الاجتماعي لآخر التحديثات',
      questions: 'إذا كان لديك أي أسئلة عاجلة، لا تتردد في الاتصال بنا على:',
      phone: '+971 55 792 6686',
      closing: 'نتطلع لمساعدتك في إنشاء مطبخ أحلامك!',
      signature: 'مع أطيب التحيات،',
      team: 'فريق كيتشن كور',
      footer: 'كيتشن كور - تصميم وتصنيع المطابخ الفاخرة',
      address: 'الفجيرة، الإمارات العربية المتحدة',
    },
  }

  const t = content[locale]
  const direction = isArabic ? 'rtl' : 'ltr'

  return (
    <Html lang={locale} dir={direction}>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={{ ...container, direction }}>
          {/* Logo/Brand Header */}
          <Section style={header}>
            <Text style={brandName}>KITCHEN CORE</Text>
            <Text style={brandTagline}>Premium Kitchen Design</Text>
          </Section>

          <Hr style={hr} />

          <Heading style={h1}>{t.thankYou}</Heading>

          <Text style={greeting}>{t.greeting}</Text>

          <Text style={text}>{t.received}</Text>

          <Text style={text}>{t.response}</Text>

          {t.projectInfo && (
            <Section style={infoBox}>
              <Text style={infoText}>{t.projectInfo}</Text>
            </Section>
          )}

          <Hr style={hr} />

          <Text style={text}>{t.meanwhile}</Text>

          <Section style={actionList}>
            <Text style={actionItem}>• {t.action1}</Text>
            <Text style={actionItem}>• {t.action2}</Text>
            <Text style={actionItem}>• {t.action3}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={text}>{t.questions}</Text>
          <Text style={phoneNumber}>{t.phone}</Text>

          <Section style={ctaSection}>
            <Link href="https://kitchen-core.vercel.app" style={ctaButton}>
              {isArabic ? 'زيارة موقعنا' : 'Visit Our Website'}
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={closingText}>{t.closing}</Text>

          <Text style={signature}>
            {t.signature}
            <br />
            <strong>{t.team}</strong>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            {t.footer}
            <br />
            {t.address}
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
  maxWidth: '600px',
}

const header = {
  textAlign: 'center' as const,
  padding: '20px 0',
}

const brandName = {
  color: '#C8E163',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '0.1em',
}

const brandTagline = {
  color: '#737373',
  fontSize: '14px',
  margin: '8px 0 0',
  letterSpacing: '0.05em',
}

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '24px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const greeting = {
  color: '#ffffff',
  fontSize: '18px',
  lineHeight: '28px',
  margin: '24px 0 16px',
}

const text = {
  color: '#a3a3a3',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
}

const infoBox = {
  backgroundColor: '#171717',
  border: '1px solid #262626',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '24px 0',
}

const infoText = {
  color: '#C8E163',
  fontSize: '16px',
  margin: '0',
  fontWeight: '500',
}

const actionList = {
  margin: '16px 0',
  paddingLeft: '8px',
}

const actionItem = {
  color: '#d4d4d4',
  fontSize: '15px',
  lineHeight: '28px',
  margin: '8px 0',
}

const phoneNumber = {
  color: '#C8E163',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '8px 0 24px',
  textAlign: 'center' as const,
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const ctaButton = {
  backgroundColor: '#C8E163',
  color: '#000000',
  padding: '14px 32px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '14px',
  letterSpacing: '0.05em',
}

const closingText = {
  color: '#ffffff',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '24px 0',
  textAlign: 'center' as const,
}

const signature = {
  color: '#a3a3a3',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '24px 0',
  textAlign: 'center' as const,
}

const hr = {
  borderColor: '#262626',
  margin: '32px 0',
}

const footer = {
  color: '#525252',
  fontSize: '13px',
  lineHeight: '22px',
  margin: '32px 0 0',
  textAlign: 'center' as const,
}
