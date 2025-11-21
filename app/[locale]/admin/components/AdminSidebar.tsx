"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useGlobalSearch } from "@/app/hooks/useGlobalSearch";

interface NavItem {
  label: string;
  labelAr: string;
  href: string;
  icon: string;
}

interface NavSection {
  section: string;
  sectionAr: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    section: "Content",
    sectionAr: "المحتوى",
    items: [
      {
        label: "Dashboard",
        labelAr: "لوحة التحكم",
        href: "/admin",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      },
      {
        label: "Projects",
        labelAr: "المشاريع",
        href: "/admin/projects",
        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      },
      {
        label: "Gallery",
        labelAr: "المعرض",
        href: "/admin/gallery",
        icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
      },
      {
        label: "Blog",
        labelAr: "المدونة",
        href: "/admin/blog",
        icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
      },
      {
        label: "Services",
        labelAr: "الخدمات",
        href: "/admin/services",
        icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
      {
        label: "Testimonials",
        labelAr: "الشهادات",
        href: "/admin/testimonials",
        icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      },
    ],
  },
  {
    section: "Company",
    sectionAr: "الشركة",
    items: [
      {
        label: "About & Company",
        labelAr: "عن الشركة",
        href: "/admin/company",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      },
      {
        label: "Founder",
        labelAr: "المؤسس",
        href: "/admin/founder",
        icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      },
      {
        label: "Team Members",
        labelAr: "أعضاء الفريق",
        href: "/admin/team-members",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      },
      {
        label: "Partnerships",
        labelAr: "الشراكات",
        href: "/admin/partnerships",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      },
    ],
  },
  {
    section: "CRM & Leads",
    sectionAr: "إدارة العملاء",
    items: [
      {
        label: "Customers",
        labelAr: "العملاء",
        href: "/admin/customers",
        icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      },
      {
        label: "Leads",
        labelAr: "العملاء المحتملين",
        href: "/admin/leads",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
      },
      {
        label: "Contact Forms",
        labelAr: "نماذج الاتصال",
        href: "/admin/contact-submissions",
        icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
      {
        label: "Subscribers",
        labelAr: "المشتركون",
        href: "/admin/subscribers",
        icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
      },
    ],
  },
  {
    section: "Settings",
    sectionAr: "الإعدادات",
    items: [
      {
        label: "Hero Section",
        labelAr: "القسم الرئيسي",
        href: "/admin/hero",
        icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
      },
      {
        label: "Process Steps",
        labelAr: "خطوات العملية",
        href: "/admin/process-steps",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      },
      {
        label: "Statistics",
        labelAr: "الإحصائيات",
        href: "/admin/statistics",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      },
      {
        label: "Users",
        labelAr: "المستخدمون",
        href: "/admin/users",
        icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      },
      {
        label: "Translations",
        labelAr: "الترجمات",
        href: "/admin/translations",
        icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
      },
    ],
  },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const { open: openGlobalSearch } = useGlobalSearch();

  const filteredSections = navigationSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        const label = isArabic ? item.labelAr : item.label;
        return label.toLowerCase().includes(searchQuery.toLowerCase());
      }),
    }))
    .filter((section) => section.items.length > 0);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === `/${locale}/admin` || pathname === "/admin";
    }
    return pathname?.includes(href);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 start-4 z-50 p-2 bg-background-card border border-gray-dark hover:border-green-primary text-gray-light hover:text-green-primary transition-colors rounded-md"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${isArabic ? "end-0" : "start-0"} h-full bg-black border-${isArabic ? "s" : "e"} border-gray-dark/40 z-40 transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : isArabic ? "translate-x-full" : "-translate-x-full"}
          lg:translate-x-0 w-64`}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-dark/40">
          <h2 className="text-xl font-bold text-green-primary">Kitchen Core</h2>
          <p className="text-xs text-gray-light mt-1">
            {isArabic ? "لوحة التحكم" : "Admin Dashboard"}
          </p>
        </div>

        {/* Global Search Button */}
        <div className="p-4 border-b border-gray-dark/40">
          <button
            onClick={openGlobalSearch}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-background-card border border-gray-dark hover:border-green-primary text-gray-light hover:text-white transition-all rounded-md group"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="flex-1 text-start text-sm">
              {isArabic ? "بحث سريع..." : "Quick Search..."}
            </span>
            <kbd className="hidden sm:inline-flex px-2 py-1 text-xs border border-gray-dark rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation Filter */}
        <div className="p-4 border-b border-gray-dark/40">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isArabic ? "تصفية القائمة..." : "Filter menu..."}
              className="w-full bg-background-card border border-gray-dark text-gray-light placeholder-gray-dark px-4 py-2 rounded-md focus:outline-none focus:border-green-primary text-sm"
            />
            <svg
              className="absolute top-2.5 end-3 w-4 h-4 text-gray-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {filteredSections.map((section) => (
            <div key={section.section}>
              <h3 className="text-xs font-semibold text-gray-dark uppercase tracking-wider mb-2 px-2">
                {isArabic ? section.sectionAr : section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  const fullHref = `/${locale}${item.href}`;
                  return (
                    <li key={item.href}>
                      <Link
                        href={fullHref}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                          active
                            ? "bg-green-primary/10 text-green-primary border border-green-primary/30"
                            : "text-gray-light hover:bg-background-card hover:text-white"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={active ? 2 : 1.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={item.icon}
                          />
                        </svg>
                        <span className="text-sm font-medium">
                          {isArabic ? item.labelAr : item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-dark/40">
          <p className="text-xs text-gray-dark text-center">
            v1.0.0 • Kitchen Core CMS
          </p>
        </div>
      </aside>

      {/* Spacer for content */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
}
