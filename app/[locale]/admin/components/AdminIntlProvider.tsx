"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode, useEffect, useState } from "react";

interface AdminIntlProviderProps {
  children: ReactNode;
}

export default function AdminIntlProvider({
  children,
}: AdminIntlProviderProps) {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [messages, setMessages] = useState<Record<string, unknown> | null>(
    null,
  );

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem("adminLocale") as "en" | "ar" | null;
    const currentLocale = saved || "en";
    setLocale(currentLocale);

    // Update HTML attributes
    document.documentElement.lang = currentLocale;
    document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";

    // Load messages
    loadMessages(currentLocale);
  }, []);

  const loadMessages = async (locale: "en" | "ar") => {
    try {
      const adminMessages = await import(
        `../../../../messages/admin-${locale}.json`
      );
      const publicMessages = await import(
        `../../../../messages/${locale}.json`
      );

      // Merge admin and public messages
      setMessages({
        ...publicMessages.default,
        ...adminMessages.default,
      });
    } catch (error) {
      console.error("Failed to load messages:", error);
      // Fallback to empty messages
      setMessages({});
    }
  };

  if (!messages) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-light">Loading...</div>
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
