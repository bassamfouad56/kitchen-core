"use client";

import { NextIntlClientProvider, useLocale } from "next-intl";
import { ReactNode, useEffect, useState, useCallback, useRef } from "react";

interface AdminIntlProviderProps {
  children: ReactNode;
  locale: string;
}

export default function AdminIntlProvider({
  children,
  locale: initialLocale,
}: AdminIntlProviderProps) {
  const [messages, setMessages] = useState<Record<string, unknown> | null>(
    null
  );
  const isInitialized = useRef(false);
  const currentLocale = (initialLocale as "en" | "ar") || "en";

  const loadMessages = useCallback(async (locale: "en" | "ar") => {
    try {
      const adminMessages = await import(
        `../../../../messages/admin-${locale}.json`
      );
      const publicMessages = await import(`../../../../messages/${locale}.json`);

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
  }, []);

  // Load messages when locale changes
  useEffect(() => {
    // Update HTML attributes for RTL support
    document.documentElement.lang = currentLocale;
    document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";

    // Load messages for current locale
    loadMessages(currentLocale);
  }, [currentLocale, loadMessages]);

  if (!messages) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-light">Loading...</div>
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={currentLocale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
