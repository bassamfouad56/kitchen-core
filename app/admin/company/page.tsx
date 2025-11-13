"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function CompanyManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [company, setCompany] = useState<CompanyData | null>(null);
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
      nameEn: formData.get("nameEn"),
      nameAr: formData.get("nameAr"),
      taglineEn: formData.get("taglineEn") || null,
      taglineAr: formData.get("taglineAr") || null,
      descriptionEn: formData.get("descriptionEn"),
      descriptionAr: formData.get("descriptionAr"),
      missionEn: formData.get("missionEn") || null,
      missionAr: formData.get("missionAr") || null,
      visionEn: formData.get("visionEn") || null,
      visionAr: formData.get("visionAr") || null,
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
      alert("Company information saved successfully!");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save data");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-gray-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">
            Company & About Page Management
          </h1>
          <p className="text-gray-light">
            Manage your company information and about page content
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-2xl font-serif mb-6">Basic Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Company Name (English) *
                </label>
                <input
                  type="text"
                  name="nameEn"
                  required
                  defaultValue={company?.nameEn}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Company Name (Arabic) *
                </label>
                <input
                  type="text"
                  name="nameAr"
                  required
                  defaultValue={company?.nameAr}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Tagline (English)
                </label>
                <input
                  type="text"
                  name="taglineEn"
                  defaultValue={company?.taglineEn || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Tagline (Arabic)
                </label>
                <input
                  type="text"
                  name="taglineAr"
                  defaultValue={company?.taglineAr || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Description (English) *
                </label>
                <textarea
                  name="descriptionEn"
                  required
                  rows={4}
                  defaultValue={company?.descriptionEn}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Description (Arabic) *
                </label>
                <textarea
                  name="descriptionAr"
                  required
                  rows={4}
                  defaultValue={company?.descriptionAr}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-2xl font-serif mb-6">Mission & Vision</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Mission (English)
                </label>
                <textarea
                  name="missionEn"
                  rows={4}
                  defaultValue={company?.missionEn || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Mission (Arabic)
                </label>
                <textarea
                  name="missionAr"
                  rows={4}
                  defaultValue={company?.missionAr || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Vision (English)
                </label>
                <textarea
                  name="visionEn"
                  rows={4}
                  defaultValue={company?.visionEn || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Vision (Arabic)
                </label>
                <textarea
                  name="visionAr"
                  rows={4}
                  defaultValue={company?.visionAr || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Company Values */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-2xl font-serif mb-6">Company Values</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    Values (English)
                  </label>
                  <button
                    type="button"
                    onClick={() => setValuesEn([...valuesEn, ""])}
                    className="text-sm text-green-primary hover:text-green-vibrant"
                  >
                    + Add Value
                  </button>
                </div>
                <div className="space-y-2">
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
                    Values (Arabic)
                  </label>
                  <button
                    type="button"
                    onClick={() => setValuesAr([...valuesAr, ""])}
                    className="text-sm text-green-primary hover:text-green-vibrant"
                  >
                    + Add Value
                  </button>
                </div>
                <div className="space-y-2">
                  {valuesAr.map((value, index) => (
                    <div key={index} className="flex gap-2">
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
                            setValuesAr(valuesAr.filter((_, i) => i !== index))
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
            </div>
          </div>

          {/* Statistics */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-2xl font-serif mb-6">Company Statistics</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Founded Year
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
                  Employee Count
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
                  Projects Completed
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
                  Countries Served
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
                  Years of Experience
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
            <h2 className="text-2xl font-serif mb-6">Contact & Media</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Phone
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
                  Email
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
                  Instagram URL
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
                  Featured Image URL
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
                  Background Video URL
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
              <span className="text-white">Publish company information</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-dark">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/admin"
              className="bg-background-card border border-gray-dark px-6 py-3 hover:border-green-primary transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
