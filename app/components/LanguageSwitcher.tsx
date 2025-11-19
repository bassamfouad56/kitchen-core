"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchToLocale = (newLocale: string) => {
    console.log("Switching locale from", locale, "to", newLocale);
    console.log("Current pathname:", pathname);

    startTransition(() => {
      // Remove current locale from pathname and add new locale
      const pathWithoutLocale = pathname.replace(`/${locale}`, "");
      const newPath = `/${newLocale}${pathWithoutLocale}`;
      console.log("Navigating to:", newPath);
      router.push(newPath);
    });
  };

  const isRTL = locale === "ar";

  return (
    <div className="flex items-center gap-2 border border-green-primary/50 rounded-md overflow-hidden">
      {/* English Button */}
      <button
        onClick={() => switchToLocale("en")}
        disabled={isPending}
        className={`px-3 py-1.5 text-xs tracking-wider transition-all duration-300 ${
          locale === "en"
            ? "bg-green-primary text-black font-medium"
            : "text-green-primary hover:bg-green-primary/10"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <div className="w-px h-4 bg-green-primary/30" />
      {/* Arabic Button */}
      <button
        onClick={() => switchToLocale("ar")}
        disabled={isPending}
        className={`px-3 py-1.5 text-xs tracking-wider transition-all duration-300 ${
          locale === "ar"
            ? "bg-green-primary text-black font-medium"
            : "text-green-primary hover:bg-green-primary/10"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Switch to Arabic"
      >
        AR
      </button>
    </div>
  );
}
