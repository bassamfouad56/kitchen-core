"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface TranslateButtonProps {
  sourceText: string;
  onTranslated: (translatedText: string) => void;
  from: "en" | "ar";
  to: "en" | "ar";
  className?: string;
}

export default function TranslateButton({
  sourceText,
  onTranslated,
  from,
  to,
  className = "",
}: TranslateButtonProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const t = useTranslations("Admin.common");

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      alert("Please enter some text to translate");
      return;
    }

    setIsTranslating(true);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          text: sourceText,
          from,
          to,
        }),
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      onTranslated(data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      alert("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleTranslate}
      disabled={isTranslating || !sourceText.trim()}
      className={`flex items-center gap-2 text-xs px-3 py-1 border border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title={`Translate ${from === "en" ? "English → Arabic" : "Arabic → English"}`}
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
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      {isTranslating ? "Translating..." : "Auto Translate"}
    </button>
  );
}
