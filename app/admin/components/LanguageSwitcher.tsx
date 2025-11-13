"use client";

import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<"en" | "ar">("en");

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem("adminLocale") as "en" | "ar" | null;
    if (saved) {
      setLocale(saved);
      applyLanguage(saved);
    }
  }, []);

  const applyLanguage = (newLocale: "en" | "ar") => {
    // Update HTML attributes
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";

    // Save preference
    localStorage.setItem("adminLocale", newLocale);

    // Reload to apply translations
    window.location.reload();
  };

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    setLocale(newLocale);
    applyLanguage(newLocale);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-background-card border border-gray-dark hover:border-green-primary text-gray-light hover:text-green-primary transition-colors"
      title={locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <span className="text-sm font-medium">
        {locale === "en" ? "العربية" : "English"}
      </span>
    </button>
  );
}
