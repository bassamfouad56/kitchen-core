"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

interface AdminDashboardClientProps {
  userName: string;
  stats: Array<{
    labelKey: string;
    count: number;
    href: string;
  }>;
}

export default function AdminDashboardClient({
  userName,
  stats,
}: AdminDashboardClientProps) {
  const t = useTranslations("Admin");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Language Switcher */}
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-2">
              {t("dashboard.welcome")}, {userName}
            </h1>
            <p className="text-sm md:text-base text-gray-light">
              {t("dashboard.manageContent")}
            </p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-12">
          {stats.map((stat) => (
            <Link
              key={stat.labelKey}
              href={stat.href}
              className="group bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-green-primary/50 hover:bg-zinc-900 transition-all duration-200"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-primary mb-1 group-hover:text-green-vibrant transition-colors">
                {stat.count}
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-wide leading-tight">
                {t(`stats.${stat.labelKey}`)}
              </div>
            </Link>
          ))}
        </div>

        {/* Content Management */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif mb-6">
            {t("dashboard.contentManagement")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href={`/${locale}/admin/company`}
              className="bg-green-primary text-black p-6 hover:bg-green-vibrant transition-colors font-medium"
            >
              {t("contentLinks.companyAbout")}
            </Link>
            <Link
              href={`/${locale}/admin/founder`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              {t("contentLinks.founderProfile")}
            </Link>
            <Link
              href={`/${locale}/admin/team-members`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              {t("contentLinks.teamMembers")}
            </Link>
            <Link
              href={`/${locale}/admin/statistics`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              {t("contentLinks.statisticsTrust")}
            </Link>
            <Link
              href={`/${locale}/admin/hero`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Hero Section
            </Link>
            <Link
              href={`/${locale}/admin/process-steps`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Process Steps
            </Link>
            <Link
              href={`/${locale}/admin/contact-submissions`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Contact Submissions
            </Link>
            <Link
              href={`/${locale}/admin/partnerships`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Brand Partnerships
            </Link>
            <Link
              href={`/${locale}/admin/translations`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              UI Translations
            </Link>
            <Link
              href={`/${locale}/admin/credentials`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Credentials & Certifications
            </Link>
            <Link
              href={`/${locale}/admin/engineering-metrics`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Engineering Metrics
            </Link>
            <Link
              href={`/${locale}/admin/subscribers`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Newsletter Subscribers
            </Link>
            <Link
              href={`/${locale}/admin/cta-section`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              CTA Section
            </Link>
            <Link
              href={`/${locale}/admin/before-after`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Before/After Gallery
            </Link>
            <Link
              href={`/${locale}/admin/technical-specs`}
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Technical Specifications
            </Link>
            <Link
              href={`/${locale}/admin/settings`}
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              {t("contentLinks.siteSettings")}
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif mb-6">
            {t("dashboard.quickActions")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href={`/${locale}/admin/projects/new`}
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              {t("actions.newProject")}
            </Link>
            <Link
              href={`/${locale}/admin/gallery`}
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              {t("actions.manageGallery")}
            </Link>
            <Link
              href={`/${locale}/admin/leads`}
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              {t("actions.crmLeads")}
            </Link>
            <Link
              href={`/${locale}/admin/customers`}
              className="bg-orange-600 text-white p-6 hover:bg-orange-700 transition-colors font-medium"
            >
              Customer Management
            </Link>
            <Link
              href={`/${locale}/admin/customers/new`}
              className="bg-background-card border border-orange-600 p-6 hover:bg-orange-600/10 transition-colors text-orange-400 font-medium"
            >
              + Add New Customer
            </Link>
          </div>
        </div>

        {/* System Administration */}
        <div>
          <h2 className="text-2xl font-serif mb-6">System Administration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href={`/${locale}/admin/users`}
              className="bg-purple-600 text-white p-6 hover:bg-purple-700 transition-colors font-medium"
            >
              User Management
            </Link>
            <Link
              href={`/${locale}/admin/users/new`}
              className="bg-background-card border border-purple-600 p-6 hover:bg-purple-600/10 transition-colors text-purple-400 font-medium"
            >
              + Create New User
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-dark flex justify-between items-center">
          <div className="text-sm text-gray-dark">{t("dashboard.version")}</div>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="text-sm text-gray-light hover:text-green-primary transition-colors"
            >
              {t("dashboard.viewWebsite")}
            </Link>
            <Link
              href="/api/auth/signout"
              className="text-sm text-gray-light hover:text-green-primary transition-colors"
            >
              {t("dashboard.signOut")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
