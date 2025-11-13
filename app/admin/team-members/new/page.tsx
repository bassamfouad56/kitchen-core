"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state for dynamic arrays
  const [specialtiesEn, setSpecialtiesEn] = useState<string[]>([""]);
  const [specialtiesAr, setSpecialtiesAr] = useState<string[]>([""]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      nameEn: formData.get("nameEn"),
      nameAr: formData.get("nameAr"),
      roleEn: formData.get("roleEn"),
      roleAr: formData.get("roleAr"),
      bioEn: formData.get("bioEn"),
      bioAr: formData.get("bioAr"),
      image: formData.get("image"),
      email: formData.get("email") || null,
      linkedin: formData.get("linkedin") || null,
      yearsOfExperience: formData.get("yearsOfExperience") || null,
      order: parseInt(formData.get("order") as string),
      specialtiesEn: specialtiesEn.filter((s) => s.trim()),
      specialtiesAr: specialtiesAr.filter((s) => s.trim()),
      published: formData.get("published") === "on",
    };

    try {
      const res = await fetch("/api/team-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create team member");
      }

      router.push("/admin/team-members");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create team member. Please try again.",
      );
      setSaving(false);
    }
  };

  const addSpecialtyEn = () => setSpecialtiesEn([...specialtiesEn, ""]);
  const removeSpecialtyEn = (index: number) => {
    if (specialtiesEn.length > 1) {
      setSpecialtiesEn(specialtiesEn.filter((_, i) => i !== index));
    }
  };
  const updateSpecialtyEn = (index: number, value: string) => {
    const updated = [...specialtiesEn];
    updated[index] = value;
    setSpecialtiesEn(updated);
  };

  const addSpecialtyAr = () => setSpecialtiesAr([...specialtiesAr, ""]);
  const removeSpecialtyAr = (index: number) => {
    if (specialtiesAr.length > 1) {
      setSpecialtiesAr(specialtiesAr.filter((_, i) => i !== index));
    }
  };
  const updateSpecialtyAr = (index: number, value: string) => {
    const updated = [...specialtiesAr];
    updated[index] = value;
    setSpecialtiesAr(updated);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">
            Add New Team Member
          </h1>
          <p className="text-gray-light">
            Create a new team member profile (bilingual)
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Name (English) *
                </label>
                <input
                  type="text"
                  name="nameEn"
                  required
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Name (Arabic) *
                </label>
                <input
                  type="text"
                  name="nameAr"
                  required
                  dir="rtl"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="جون دو"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Role/Title (English) *
                </label>
                <input
                  type="text"
                  name="roleEn"
                  required
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="Senior Designer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Role/Title (Arabic) *
                </label>
                <input
                  type="text"
                  name="roleAr"
                  required
                  dir="rtl"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="مصمم أول"
                />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">Biography</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Bio (English) *
                </label>
                <textarea
                  name="bioEn"
                  required
                  rows={6}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                  placeholder="Brief professional biography..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Bio (Arabic) *
                </label>
                <textarea
                  name="bioAr"
                  required
                  rows={6}
                  dir="rtl"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                  placeholder="سيرة مهنية موجزة..."
                />
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Profile Image
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                required
                className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-light mt-1">
                Professional headshot or portrait photo
              </p>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Areas of Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* English Specialties */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-light">
                    Specialties (English)
                  </label>
                  <button
                    type="button"
                    onClick={addSpecialtyEn}
                    className="text-green-primary hover:text-green-vibrant text-sm"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-3">
                  {specialtiesEn.map((specialty, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={specialty}
                        onChange={(e) =>
                          updateSpecialtyEn(index, e.target.value)
                        }
                        className="flex-1 bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                        placeholder="Kitchen Design"
                      />
                      {specialtiesEn.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSpecialtyEn(index)}
                          className="px-3 border border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arabic Specialties */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-light">
                    Specialties (Arabic)
                  </label>
                  <button
                    type="button"
                    onClick={addSpecialtyAr}
                    className="text-green-primary hover:text-green-vibrant text-sm"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-3">
                  {specialtiesAr.map((specialty, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={specialty}
                        onChange={(e) =>
                          updateSpecialtyAr(index, e.target.value)
                        }
                        dir="rtl"
                        className="flex-1 bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                        placeholder="تصميم المطابخ"
                      />
                      {specialtiesAr.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSpecialtyAr(index)}
                          className="px-3 border border-red-500 text-red-500 hover:bg-red-500/10"
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

          {/* Contact & Experience */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Contact & Experience
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedin"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Years of Experience
                </label>
                <input
                  type="text"
                  name="yearsOfExperience"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="10+"
                />
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Display Settings
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
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
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked
                    className="w-5 h-5 bg-black border border-gray-dark text-green-primary focus:ring-green-primary focus:ring-2"
                  />
                  <span className="text-gray-light">Publish team member</span>
                </label>
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
              {saving ? "Creating..." : "Create Team Member"}
            </button>
            <Link
              href="/admin/team-members"
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
