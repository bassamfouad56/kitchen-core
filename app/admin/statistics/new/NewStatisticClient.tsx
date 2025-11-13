"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import TranslateButton from "../../components/TranslateButton";

export default function NewStatisticClient() {
  const router = useRouter();
  const t = useTranslations("Admin.statistics");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Controlled form state
  const [labelEn, setLabelEn] = useState("");
  const [labelAr, setLabelAr] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      number: formData.get("number"),
      labelEn,
      labelAr,
      section: formData.get("section"),
      order: parseInt(formData.get("order") as string),
    };

    try {
      const res = await fetch("/api/statistics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create statistic");
      }

      router.push("/admin/statistics");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create statistic. Please try again.",
      );
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              {t("addNewStatistic")}
            </h1>
            <p className="text-gray-light">{t("createTrustMarker")}</p>
          </div>
          <LanguageSwitcher />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Number */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("numberValue")}
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                {t("numberLabel")} *
                <span className="text-xs ml-2">{t("numberHelp")}</span>
              </label>
              <input
                type="text"
                name="number"
                required
                className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                placeholder={t("numberPlaceholder")}
              />
            </div>
          </div>

          {/* Labels */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("labelsBilingual")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("labelEn")} *
                </label>
                <input
                  type="text"
                  name="labelEn"
                  required
                  value={labelEn}
                  onChange={(e) => setLabelEn(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder={t("labelPlaceholderEn")}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("labelAr")} *
                  </label>
                  <TranslateButton
                    sourceText={labelEn}
                    onTranslated={(translated) => setLabelAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <input
                  type="text"
                  name="labelAr"
                  required
                  dir="rtl"
                  value={labelAr}
                  onChange={(e) => setLabelAr(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder={t("labelPlaceholderAr")}
                />
              </div>
            </div>
          </div>

          {/* Section & Order */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("displaySettings")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("sectionLabel")} *
                  <span className="text-xs ml-2">{t("sectionHelp")}</span>
                </label>
                <select
                  name="section"
                  required
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                >
                  <option value="hero">{t("sectionHero")}</option>
                  <option value="about">{t("sectionAbout")}</option>
                  <option value="trust">{t("sectionTrust")}</option>
                  <option value="footer">{t("sectionFooter")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("displayOrder")} *
                  <span className="text-xs ml-2">{t("displayOrderHelp")}</span>
                </label>
                <input
                  type="number"
                  name="order"
                  required
                  min="0"
                  defaultValue="0"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-primary text-black px-8 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? tCommon("creating") : t("createStatistic")}
            </button>
            <Link
              href="/admin/statistics"
              className="border border-gray-dark text-white px-8 py-3 hover:border-green-primary/50 transition-colors font-medium inline-block text-center"
            >
              {tActions("cancel")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
