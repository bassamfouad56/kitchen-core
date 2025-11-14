"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SiteSettings {
  id?: string;
  siteTitle: string;
  heroTagline?: string | null;
  heroHeading?: string | null;
  heroSubheading?: string | null;
  heroImage?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  showroomAddress?: string | null;
  instagramUrl?: string | null;
  pinterestUrl?: string | null;
  linkedinUrl?: string | null;
  houzzUrl?: string | null;
  partnerships?: string[];
  seoDescription?: string | null;
  seoKeywords?: string[];
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [partnerships, setPartnerships] = useState<string[]>([""]);
  const [seoKeywords, setSeoKeywords] = useState<string[]>([""]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      const data = await res.json();

      // Handle null response (no settings in database yet)
      if (data === null) {
        setSettings(null);
        setPartnerships([""]);
        setSeoKeywords([""]);
      } else {
        setSettings(data);
        setPartnerships(
          data.partnerships && data.partnerships.length > 0
            ? data.partnerships
            : [""],
        );
        setSeoKeywords(
          data.seoKeywords && data.seoKeywords.length > 0
            ? data.seoKeywords
            : [""],
        );
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      siteTitle: formData.get("siteTitle"),
      heroTagline: formData.get("heroTagline") || null,
      heroHeading: formData.get("heroHeading") || null,
      heroSubheading: formData.get("heroSubheading") || null,
      heroImage: formData.get("heroImage") || null,
      contactPhone: formData.get("contactPhone") || null,
      contactEmail: formData.get("contactEmail") || null,
      showroomAddress: formData.get("showroomAddress") || null,
      instagramUrl: formData.get("instagramUrl") || null,
      pinterestUrl: formData.get("pinterestUrl") || null,
      linkedinUrl: formData.get("linkedinUrl") || null,
      houzzUrl: formData.get("houzzUrl") || null,
      partnerships: partnerships.filter((p) => p.trim()),
      seoDescription: formData.get("seoDescription") || null,
      seoKeywords: seoKeywords.filter((k) => k.trim()),
    };

    try {
      const res = await fetch("/api/settings", {
        method: settings ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      const updated = await res.json();
      setSettings(updated);
      setSaving(false);
      alert("Settings saved successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
      setSaving(false);
    }
  };

  const addPartnership = () => setPartnerships([...partnerships, ""]);
  const removePartnership = (index: number) =>
    setPartnerships(partnerships.filter((_, i) => i !== index));
  const updatePartnership = (index: number, value: string) => {
    const newPartnerships = [...partnerships];
    newPartnerships[index] = value;
    setPartnerships(newPartnerships);
  };

  const addKeyword = () => setSeoKeywords([...seoKeywords, ""]);
  const removeKeyword = (index: number) =>
    setSeoKeywords(seoKeywords.filter((_, i) => i !== index));
  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...seoKeywords];
    newKeywords[index] = value;
    setSeoKeywords(newKeywords);
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">Site Settings</h1>
          <p className="text-gray-light">Configure your website settings</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Settings */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-xl font-serif mb-4">General</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="siteTitle"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Site Title *
                </label>
                <input
                  type="text"
                  id="siteTitle"
                  name="siteTitle"
                  required
                  defaultValue={settings?.siteTitle}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-xl font-serif mb-4">Hero Section</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="heroTagline"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Tagline
                </label>
                <input
                  type="text"
                  id="heroTagline"
                  name="heroTagline"
                  defaultValue={settings?.heroTagline || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="heroHeading"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Heading
                </label>
                <input
                  type="text"
                  id="heroHeading"
                  name="heroHeading"
                  defaultValue={settings?.heroHeading || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="heroSubheading"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Subheading
                </label>
                <textarea
                  id="heroSubheading"
                  name="heroSubheading"
                  rows={3}
                  defaultValue={settings?.heroSubheading || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="heroImage"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Background Image URL
                </label>
                <input
                  type="text"
                  id="heroImage"
                  name="heroImage"
                  defaultValue={settings?.heroImage || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-xl font-serif mb-4">Contact Information</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  defaultValue={settings?.contactPhone || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  defaultValue={settings?.contactEmail || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="showroomAddress"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Showroom Address
                </label>
                <textarea
                  id="showroomAddress"
                  name="showroomAddress"
                  rows={3}
                  defaultValue={settings?.showroomAddress || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-xl font-serif mb-4">Social Media</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="instagramUrl"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagramUrl"
                  name="instagramUrl"
                  defaultValue={settings?.instagramUrl || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="pinterestUrl"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Pinterest URL
                </label>
                <input
                  type="url"
                  id="pinterestUrl"
                  name="pinterestUrl"
                  defaultValue={settings?.pinterestUrl || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  defaultValue={settings?.linkedinUrl || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="houzzUrl"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Houzz URL
                </label>
                <input
                  type="url"
                  id="houzzUrl"
                  name="houzzUrl"
                  defaultValue={settings?.houzzUrl || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Partnerships */}
          <div className="border border-gray-dark p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif">Brand Partnerships</h2>
              <button
                type="button"
                onClick={addPartnership}
                className="text-sm text-green-primary hover:text-green-vibrant"
              >
                + Add Partnership
              </button>
            </div>
            <div className="space-y-2">
              {partnerships.map((partnership, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={partnership}
                    onChange={(e) => updatePartnership(index, e.target.value)}
                    placeholder="Brand name"
                    className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removePartnership(index)}
                    className="px-4 py-2 text-gray-light hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-xl font-serif mb-4">SEO</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="seoDescription"
                  className="block text-sm font-medium text-gray-light mb-2"
                >
                  Meta Description
                </label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  rows={3}
                  defaultValue={settings?.seoDescription || ""}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    SEO Keywords
                  </label>
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="text-sm text-green-primary hover:text-green-vibrant"
                  >
                    + Add Keyword
                  </button>
                </div>
                <div className="space-y-2">
                  {seoKeywords.map((keyword, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={keyword}
                        onChange={(e) => updateKeyword(index, e.target.value)}
                        placeholder="Keyword"
                        className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeKeyword(index)}
                        className="px-4 py-2 text-gray-light hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-dark">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
            <Link
              href={`/${locale}/admin"
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
