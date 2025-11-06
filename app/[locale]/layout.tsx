import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Playfair_Display, Cairo, Amiri } from "next/font/google";
import { Providers } from "../providers";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import ContactForm from "@/app/components/ContactForm";
import FloatingSocialWrapper from "@/app/components/FloatingSocialWrapper";
import "../globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params for Next.js 15 compatibility
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Determine if the locale is RTL
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${cairo.variable} ${amiri.variable} antialiased bg-black text-white`}
      >
        <Providers>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {/* Navigation Bar */}
            <Navigation />

            {/* Main Content */}
            <main className="min-h-screen">
              {children}
            </main>

            {/* Contact Form Section */}
            <section id="contact" className="relative">
              <ContactForm />
            </section>

            {/* Footer */}
            <Footer />

            {/* Floating Social Media Widget */}
            <FloatingSocialWrapper />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
