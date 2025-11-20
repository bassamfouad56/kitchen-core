"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const breadcrumbLabels: Record<string, { en: string; ar: string }> = {
  admin: { en: "Dashboard", ar: "لوحة التحكم" },
  projects: { en: "Projects", ar: "المشاريع" },
  gallery: { en: "Gallery", ar: "المعرض" },
  blog: { en: "Blog", ar: "المدونة" },
  services: { en: "Services", ar: "الخدمات" },
  testimonials: { en: "Testimonials", ar: "الشهادات" },
  company: { en: "Company", ar: "الشركة" },
  founder: { en: "Founder", ar: "المؤسس" },
  "team-members": { en: "Team Members", ar: "أعضاء الفريق" },
  partnerships: { en: "Partnerships", ar: "الشراكات" },
  customers: { en: "Customers", ar: "العملاء" },
  leads: { en: "Leads", ar: "العملاء المحتملين" },
  "contact-submissions": { en: "Contact Forms", ar: "نماذج الاتصال" },
  subscribers: { en: "Subscribers", ar: "المشتركون" },
  hero: { en: "Hero Section", ar: "القسم الرئيسي" },
  "process-steps": { en: "Process Steps", ar: "خطوات العملية" },
  statistics: { en: "Statistics", ar: "الإحصائيات" },
  users: { en: "Users", ar: "المستخدمون" },
  translations: { en: "Translations", ar: "الترجمات" },
  videos: { en: "Videos", ar: "الفيديوهات" },
  innovations: { en: "Innovations", ar: "الابتكارات" },
  "nass-gallery": { en: "Nass Gallery", ar: "معرض ناس" },
  "before-after": { en: "Before & After", ar: "قبل وبعد" },
  "technical-specs": { en: "Technical Specs", ar: "المواصفات الفنية" },
  credentials: { en: "Credentials", ar: "الشهادات" },
  "engineering-metrics": { en: "Engineering Metrics", ar: "المقاييس الهندسية" },
  "cta-section": { en: "CTA Section", ar: "قسم الدعوة للعمل" },
  new: { en: "New", ar: "جديد" },
  edit: { en: "Edit", ar: "تعديل" },
  settings: { en: "Settings", ar: "الإعدادات" },
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Parse pathname to create breadcrumb segments
  const segments = pathname
    ?.split("/")
    .filter((segment) => segment && segment !== locale);

  if (!segments || segments.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link
        href={`/${locale}/admin`}
        className="text-gray-light hover:text-green-primary transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = `/${locale}/${segments.slice(0, index + 1).join("/")}`;
        const label =
          breadcrumbLabels[segment]?.[isArabic ? "ar" : "en"] || segment;

        // Check if segment is a number (ID)
        const isId = /^\d+$/.test(segment);
        const displayLabel = isId ? `#${segment}` : label;

        return (
          <div key={segment} className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isArabic ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
              />
            </svg>
            {isLast ? (
              <span className="text-green-primary font-medium">
                {displayLabel}
              </span>
            ) : (
              <Link
                href={href}
                className="text-gray-light hover:text-green-primary transition-colors"
              >
                {displayLabel}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
