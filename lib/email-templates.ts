// HTML Email Templates for Kitchen Core

interface AdminNotificationData {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message?: string;
}

export function getAdminNotificationEmail(data: AdminNotificationData): string {
  const { name, email, phone, projectType, message } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; border: 1px solid #262626; padding: 40px;">
          <tr>
            <td>
              <h1 style="color: #C8E163; font-size: 28px; font-weight: bold; margin: 0 0 24px;">New Contact Form Submission</h1>

              <p style="color: #737373; font-size: 16px; line-height: 26px; margin: 16px 0;">
                You have received a new inquiry from your Kitchen Core website.
              </p>

              <hr style="border: none; border-top: 1px solid #262626; margin: 32px 0;">

              <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 24px 0 16px;">Contact Information</h2>

              <p style="color: #C8E163; font-size: 14px; font-weight: 600; margin: 16px 0 4px; text-transform: uppercase; letter-spacing: 0.05em;">Name:</p>
              <p style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">${name}</p>

              <p style="color: #C8E163; font-size: 14px; font-weight: 600; margin: 16px 0 4px; text-transform: uppercase; letter-spacing: 0.05em;">Email:</p>
              <p style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">${email}</p>

              ${phone ? `
              <p style="color: #C8E163; font-size: 14px; font-weight: 600; margin: 16px 0 4px; text-transform: uppercase; letter-spacing: 0.05em;">Phone:</p>
              <p style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">${phone}</p>
              ` : ''}

              ${projectType ? `
              <p style="color: #C8E163; font-size: 14px; font-weight: 600; margin: 16px 0 4px; text-transform: uppercase; letter-spacing: 0.05em;">Project Type:</p>
              <p style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">${projectType}</p>
              ` : ''}

              ${message ? `
              <hr style="border: none; border-top: 1px solid #262626; margin: 32px 0;">

              <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 24px 0 16px;">Message</h2>
              <div style="color: #ffffff; font-size: 16px; line-height: 26px; padding: 20px; background-color: #000000; border: 1px solid #262626; border-radius: 4px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
              ` : ''}

              <hr style="border: none; border-top: 1px solid #262626; margin: 32px 0;">

              <p style="color: #737373; font-size: 14px; line-height: 24px; margin: 32px 0 0; text-align: center;">
                Sent from Kitchen Core Contact Form<br>
                ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

interface UserConfirmationData {
  name: string;
  projectType?: string;
  locale?: 'en' | 'ar';
}

export function getUserConfirmationEmail(data: UserConfirmationData): string {
  const { name, projectType, locale = 'en' } = data;
  const isArabic = locale === 'ar';

  const content = {
    en: {
      title: 'Thank you for contacting Kitchen Core!',
      greeting: `Dear ${name},`,
      received: 'We have received your inquiry and our team will review it shortly.',
      response: 'You can expect to hear back from us within <strong>24 hours</strong>.',
      projectInfo: projectType ? `<strong>Project Type:</strong> ${projectType}` : null,
      meanwhile: 'In the meantime, feel free to:',
      action1: 'Browse our gallery for design inspiration',
      action2: 'Explore our services',
      action3: 'Follow us on social media for the latest updates',
      questions: 'If you have any urgent questions, please call us at:',
      phone: '+971 55 792 6686',
      closing: 'We look forward to helping you create your dream kitchen!',
      signature: 'Best regards,',
      team: 'The Kitchen Core Team',
      cta: 'Visit Our Website',
      footer: 'Kitchen Core - Premium Kitchen Design & Manufacturing',
      address: 'Fujairah, United Arab Emirates',
    },
    ar: {
      title: 'شكراً لتواصلك مع كيتشن كور!',
      greeting: `عزيزي ${name}،`,
      received: 'لقد استلمنا استفسارك وسيقوم فريقنا بمراجعته قريباً.',
      response: 'يمكنك توقع الرد منا خلال <strong>24 ساعة</strong>.',
      projectInfo: projectType ? `<strong>نوع المشروع:</strong> ${projectType}` : null,
      meanwhile: 'في هذه الأثناء، لا تتردد في:',
      action1: 'تصفح معرض أعمالنا للإلهام في التصميم',
      action2: 'استكشاف خدماتنا',
      action3: 'متابعتنا على وسائل التواصل الاجتماعي لآخر التحديثات',
      questions: 'إذا كان لديك أي أسئلة عاجلة، اتصل بنا على:',
      phone: '+971 55 792 6686',
      closing: 'نتطلع لمساعدتك في إنشاء مطبخ أحلامك!',
      signature: 'مع أطيب التحيات،',
      team: 'فريق كيتشن كور',
      cta: 'زيارة موقعنا',
      footer: 'كيتشن كور - تصميم وتصنيع المطابخ الفاخرة',
      address: 'الفجيرة، الإمارات العربية المتحدة',
    },
  };

  const t = content[locale];
  const direction = isArabic ? 'rtl' : 'ltr';
  const textAlign = isArabic ? 'right' : 'left';

  return `
<!DOCTYPE html>
<html lang="${locale}" dir="${direction}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; border: 1px solid #262626; padding: 40px; direction: ${direction};">
          <tr>
            <td>
              <!-- Header -->
              <div style="text-align: center; padding: 20px 0;">
                <h2 style="color: #C8E163; font-size: 28px; font-weight: bold; margin: 0; letter-spacing: 0.1em;">KITCHEN CORE</h2>
                <p style="color: #737373; font-size: 14px; margin: 8px 0 0; letter-spacing: 0.05em;">Premium Kitchen Design</p>
              </div>

              <hr style="border: none; border-top: 1px solid #262626; margin: 32px 0;">

              <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 24px 0; text-align: center;">${t.title}</h1>

              <p style="color: #ffffff; font-size: 18px; line-height: 28px; margin: 24px 0 16px; text-align: ${textAlign};">${t.greeting}</p>

              <p style="color: #a3a3a3; font-size: 16px; line-height: 26px; margin: 16px 0; text-align: ${textAlign};">${t.received}</p>

              <p style="color: #a3a3a3; font-size: 16px; line-height: 26px; margin: 16px 0; text-align: ${textAlign};">${t.response}</p>

              ${t.projectInfo ? `
              <div style="background-color: #171717; border: 1px solid #262626; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
                <p style="color: #C8E163; font-size: 16px; margin: 0; text-align: ${textAlign};">${t.projectInfo}</p>
              </div>
              ` : ''}

              <hr style="border: none; border-top: 1px solid #262626; margin: 32px 0;">

              <p style="color: #a3a3a3; font-size: 16px; line-height: 26px; margin: 16px 0; text-align: ${textAlign};">${t.meanwhile}</p>

              <ul style="color: #d4d4d4; font-size: 15px; line-height: 28px; margin: 16px 0; padding-${isArabic ? 'right' : 'left'}: 20px;">
                <li style="margin: 8px 0;">${t.action1}</li>
                <li style="margin: 8px 0;">${t.action2}</li>
                <li style="margin: 8px 0;">${t.action3}</li>
              </ul>

              <hr style="border: none; border-top: 1px solid #262626; margin: 32px 0;">

              <p style="color: #a3a3a3; font-size: 16px; line-height: 26px; margin: 16px 0; text-align: ${textAlign};">${t.questions}</p>

              <p style="color: #C8E163; font-size: 20px; font-weight: bold; margin: 8px 0 24px; text-align: center;">${t.phone}</p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="https://kitchen-core.vercel.app" style="display: inline-block; background-color: #C8E163; color: #000000; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 14px; letter-spacing: 0.05em;">${t.cta}</a>
              </div>

              <hr style="border: none; border-top: 1px solid #262626; margin: 32px 0;">

              <p style="color: #ffffff; font-size: 16px; line-height: 26px; margin: 24px 0; text-align: center;">${t.closing}</p>

              <p style="color: #a3a3a3; font-size: 16px; line-height: 26px; margin: 24px 0; text-align: center;">
                ${t.signature}<br>
                <strong>${t.team}</strong>
              </p>

              <hr style="border: none; border-top: 1px solid #262626; margin: 32px 0;">

              <p style="color: #525252; font-size: 13px; line-height: 22px; margin: 32px 0 0; text-align: center;">
                ${t.footer}<br>
                ${t.address}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
