"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewStatisticPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      number: formData.get("number"),
      labelEn: formData.get("labelEn"),
      labelAr: formData.get("labelAr"),
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
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">
            Add New Statistic
          </h1>
          <p className="text-gray-light">
            Create a new trust marker or statistic for your homepage
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Number */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">Number/Value</h2>
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Number/Statistic Value *
                <span className="text-xs ml-2">(e.g., 500+, 10K+, 99%)</span>
              </label>
              <input
                type="text"
                name="number"
                required
                className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                placeholder="500+"
              />
            </div>
          </div>

          {/* Labels */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Labels (Bilingual)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Label (English) *
                </label>
                <input
                  type="text"
                  name="labelEn"
                  required
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="Happy Clients"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Label (Arabic) *
                </label>
                <input
                  type="text"
                  name="labelAr"
                  required
                  dir="rtl"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="عملاء سعداء"
                />
              </div>
            </div>
          </div>

          {/* Section & Order */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Display Settings
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Section *
                  <span className="text-xs ml-2">
                    (Where to display this statistic)
                  </span>
                </label>
                <select
                  name="section"
                  required
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                >
                  <option value="hero">Hero Section</option>
                  <option value="about">About Section</option>
                  <option value="trust">Trust Markers</option>
                  <option value="footer">Footer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Display Order *
                  <span className="text-xs ml-2">
                    (Lower numbers appear first)
                  </span>
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
              {saving ? "Creating..." : "Create Statistic"}
            </button>
            <Link
              href="/admin/statistics"
              className="border border-gray-dark text-white px-8 py-3 hover:border-green-primary/50 transition-colors font-medium inline-block text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
