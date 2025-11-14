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
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Language Switcher */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              {t("dashboard.welcome")}, {userName}
            </h1>
            <p className="text-gray-light">{t("dashboard.manageContent")}</p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <Link
              key={stat.labelKey}
              href={stat.href}
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              <div className="text-4xl font-serif text-green-vibrant mb-2">
                {stat.count}
              </div>
              <div className="text-sm text-gray-light uppercase tracking-wider">
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
              href={`/${locale}/admin/settings`}
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              {t("contentLinks.siteSettings")}
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
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
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-dark flex justify-between items-center">
          <div className="text-sm text-gray-dark">{t("dashboard.version")}</div>
          <div className="space-x-4">
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
