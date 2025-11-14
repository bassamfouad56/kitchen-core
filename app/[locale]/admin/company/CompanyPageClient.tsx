"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "../components/LanguageSwitcher";
import TranslateButton from "../components/TranslateButton";

interface CompanyData {
  id?: string;
  nameEn: string;
  nameAr: string;
  taglineEn?: string;
  taglineAr?: string;
  descriptionEn: string;
  descriptionAr: string;
  missionEn?: string;
  missionAr?: string;
  visionEn?: string;
  visionAr?: string;
  valuesEn: string[];
  valuesAr: string[];
  foundedYear?: string;
  employeeCount?: string;
  projectsCompleted?: string;
  countriesServed?: string;
  yearsOfExperience?: string;
  phone?: string;
  email?: string;
  instagramUrl?: string;
  featuredImage?: string;
  backgroundVideo?: string;
  published: boolean;
}

export default function CompanyPageClient() {
  const router = useRouter();
  const t = useTranslations("Admin.company");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [company, setCompany] = useState<CompanyData | null>(null);

  // Controlled form state
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [taglineEn, setTaglineEn] = useState("");
  const [taglineAr, setTaglineAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [missionEn, setMissionEn] = useState("");
  const [missionAr, setMissionAr] = useState("");
  const [visionEn, setVisionEn] = useState("");
  const [visionAr, setVisionAr] = useState("");
  const [valuesEn, setValuesEn] = useState<string[]>([""]);
  const [valuesAr, setValuesAr] = useState<string[]>([""]);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Failed to fetch company data");
      const data = await res.json();

      if (data.company) {
        setCompany(data.company);
        setNameEn(data.company.nameEn || "");
        setNameAr(data.company.nameAr || "");
        setTaglineEn(data.company.taglineEn || "");
        setTaglineAr(data.company.taglineAr || "");
        setDescriptionEn(data.company.descriptionEn || "");
        setDescriptionAr(data.company.descriptionAr || "");
        setMissionEn(data.company.missionEn || "");
        setMissionAr(data.company.missionAr || "");
        setVisionEn(data.company.visionEn || "");
        setVisionAr(data.company.visionAr || "");
        setValuesEn(
          data.company.valuesEn && data.company.valuesEn.length > 0
            ? data.company.valuesEn
            : [""],
        );
        setValuesAr(
          data.company.valuesAr && data.company.valuesAr.length > 0
            ? data.company.valuesAr
            : [""],
        );
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      nameEn,
      nameAr,
      taglineEn: taglineEn || null,
      taglineAr: taglineAr || null,
      descriptionEn,
      descriptionAr,
      missionEn: missionEn || null,
      missionAr: missionAr || null,
      visionEn: visionEn || null,
      visionAr: visionAr || null,
      valuesEn: valuesEn.filter((v) => v.trim()),
      valuesAr: valuesAr.filter((v) => v.trim()),
      foundedYear: formData.get("foundedYear") || null,
      employeeCount: formData.get("employeeCount") || null,
      projectsCompleted: formData.get("projectsCompleted") || null,
      countriesServed: formData.get("countriesServed") || null,
      yearsOfExperience: formData.get("yearsOfExperience") || null,
      phone: formData.get("phone") || null,
      email: formData.get("email") || null,
      instagramUrl: formData.get("instagramUrl") || null,
      featuredImage: formData.get("featuredImage") || null,
      backgroundVideo: formData.get("backgroundVideo") || null,
      published: formData.get("published") === "on",
    };

    try {
      const res = await fetch("/api/company", {
        method: company ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save company data");

      const updated = await res.json();
      setCompany(updated);
      setSaving(false);
      alert(t("dataSaved"));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save data");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-gray-light">{tCommon("loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              {t("title")}
            </h1>
            <p className="text-gray-light">{t("subtitle")}</p>
          </div>
          <LanguageSwitcher />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-2xl font-serif mb-6">{t("basicInfo")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("nameEn")} *
                </label>
                <input
                  type="text"
                  name="nameEn"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("nameAr")} *
                  </label>
                  <TranslateButton
                    sourceText={nameEn}
                    onTranslated={(translated) => setNameAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <input
                  type="text"
                  name="nameAr"
                  required
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("taglineEn")}
                </label>
                <input
                  type="text"
                  name="taglineEn"
                  value={taglineEn}
                  onChange={(e) => setTaglineEn(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("taglineAr")}
                  </label>
                  <TranslateButton
                    sourceText={taglineEn}
                    onTranslated={(translated) => setTaglineAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <input
                  type="text"
                  name="taglineAr"
                  value={taglineAr}
                  onChange={(e) => setTaglineAr(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("descriptionEn")} *
                </label>
                <textarea
                  name="descriptionEn"
                  required
                  rows={4}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("descriptionAr")} *
                  </label>
                  <TranslateButton
                    sourceText={descriptionEn}
                    onTranslated={(translated) => setDescriptionAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <textarea
                  name="descriptionAr"
                  required
                  rows={4}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-2xl font-serif mb-6">{t("missionVision")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("missionEn")}
                </label>
                <textarea
                  name="missionEn"
                  rows={4}
                  value={missionEn}
                  onChange={(e) => setMissionEn(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("missionAr")}
                  </label>
                  <TranslateButton
                    sourceText={missionEn}
                    onTranslated={(translated) => setMissionAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <textarea
                  name="missionAr"
                  rows={4}
                  value={missionAr}
                  onChange={(e) => setMissionAr(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("visionEn")}
                </label>
                <textarea
                  name="visionEn"
                  rows={4}
                  value={visionEn}
                  onChange={(e) => setVisionEn(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("visionAr")}
                  </label>
                  <TranslateButton
                    sourceText={visionEn}
                    onTranslated={(translated) => setVisionAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <textarea
                  name="visionAr"
                  rows={4}
                  value={visionAr}
                  onChange={(e) => setVisionAr(e.target.value)}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Company Values */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-2xl font-serif mb-6">{t("companyValues")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("valuesEn")}
                  </label>
                  <button
                    type="button"
                    onClick={() => setValuesEn([...valuesEn, ""])}
                    className="text-sm text-green-primary hover:text-green-vibrant"
                  >
                    {t("addValue")}
                  </button>
                </div>
                <div className="space-y-3">
                  {valuesEn.map((value, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const newValues = [...valuesEn];
                          newValues[index] = e.target.value;
                          setValuesEn(newValues);
                        }}
                        className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                      />
                      {valuesEn.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setValuesEn(valuesEn.filter((_, i) => i !== index))
                          }
                          className="px-3 py-2 border border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("valuesAr")}
                  </label>
                  <button
                    type="button"
                    onClick={() => setValuesAr([...valuesAr, ""])}
                    className="text-sm text-green-primary hover:text-green-vibrant"
                  >
                    {t("addValue")}
                  </button>
                </div>
                <div className="space-y-3">
                  {valuesAr.map((value, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <TranslateButton
                          sourceText={valuesEn[index] || ""}
                          onTranslated={(translated) => {
                            const newValues = [...valuesAr];
                            newValues[index] = translated;
                            setValuesAr(newValues);
                          }}
                          from="en"
                          to="ar"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const newValues = [...valuesAr];
                            newValues[index] = e.target.value;
                            setValuesAr(newValues);
                          }}
                          className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                          dir="rtl"
                        />
                        {valuesAr.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setValuesAr(
                                valuesAr.filter((_, i) => i !== index),
                              )
                            }
                            className="px-3 py-2 border border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-2xl font-serif mb-6">{t("statistics")}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("foundedYear")}
                </label>
                <input
                  type="text"
                  name="foundedYear"
                  defaultValue={company?.foundedYear || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("employeeCount")}
                </label>
                <input
                  type="text"
                  name="employeeCount"
                  defaultValue={company?.employeeCount || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("projectsCompleted")}
                </label>
                <input
                  type="text"
                  name="projectsCompleted"
                  defaultValue={company?.projectsCompleted || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("countriesServed")}
                </label>
                <input
                  type="text"
                  name="countriesServed"
                  defaultValue={company?.countriesServed || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("yearsOfExperience")}
                </label>
                <input
                  type="text"
                  name="yearsOfExperience"
                  defaultValue={company?.yearsOfExperience || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact & Media */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-2xl font-serif mb-6">{t("contactInfo")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("phone")}
                </label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={company?.phone || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("email")}
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={company?.email || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("instagram")}
                </label>
                <input
                  type="url"
                  name="instagramUrl"
                  defaultValue={company?.instagramUrl || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("featuredImage")}
                </label>
                <input
                  type="url"
                  name="featuredImage"
                  defaultValue={company?.featuredImage || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("backgroundVideo")}
                </label>
                <input
                  type="url"
                  name="backgroundVideo"
                  defaultValue={company?.backgroundVideo || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Publishing */}
          <div className="border border-gray-dark p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                defaultChecked={company?.published ?? true}
                className="w-5 h-5 text-green-primary"
              />
              <span className="text-white">{t("publishPage")}</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-dark">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50"
            >
              {saving ? tCommon("saving") : t("saveCompanyData")}
            </button>
            <Link
              href={`/${locale}/admin"
              className="bg-background-card border border-gray-dark px-6 py-3 hover:border-green-primary transition-colors"
            >
              {tActions("backToDashboard")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
