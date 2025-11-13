"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import TranslateButton from "../../components/TranslateButton";

interface TeamMember {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  bioEn: string;
  bioAr: string;
  image: string;
  specialtiesEn: string[];
  specialtiesAr: string[];
  email?: string;
  linkedin?: string;
  yearsOfExperience?: string;
  order: number;
  published: boolean;
}

export default function EditTeamMemberClient() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const t = useTranslations("Admin.teamMembers");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);

  // Controlled form state
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [roleAr, setRoleAr] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [bioAr, setBioAr] = useState("");
  const [specialtiesEn, setSpecialtiesEn] = useState<string[]>([""]);
  const [specialtiesAr, setSpecialtiesAr] = useState<string[]>([""]);

  useEffect(() => {
    fetchTeamMember();
  }, [id]);

  const fetchTeamMember = async () => {
    try {
      const res = await fetch(`/api/team-members/${id}`);
      if (!res.ok) throw new Error("Failed to fetch team member");
      const data = await res.json();
      setTeamMember(data);
      setNameEn(data.nameEn || "");
      setNameAr(data.nameAr || "");
      setRoleEn(data.roleEn || "");
      setRoleAr(data.roleAr || "");
      setBioEn(data.bioEn || "");
      setBioAr(data.bioAr || "");
      setSpecialtiesEn(
        data.specialtiesEn && data.specialtiesEn.length > 0
          ? data.specialtiesEn
          : [""],
      );
      setSpecialtiesAr(
        data.specialtiesAr && data.specialtiesAr.length > 0
          ? data.specialtiesAr
          : [""],
      );
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load team member",
      );
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
      roleEn,
      roleAr,
      bioEn,
      bioAr,
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
      const res = await fetch(`/api/team-members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update team member");
      }

      router.push("/admin/team-members");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update team member. Please try again.",
      );
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(t("confirmDelete"))) return;

    try {
      const res = await fetch(`/api/team-members/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete team member");

      router.push("/admin/team-members");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-gray-light">{tCommon("loading")}</div>
      </div>
    );
  }

  if (!teamMember) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {t("notFound")}
          </div>
          <Link
            href="/admin/team-members"
            className="text-gray-light hover:text-white transition-colors"
          >
            {tActions("backToDashboard")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              {t("editTeamMember")}
            </h1>
            <p className="text-gray-light">{t("updateInfo")}</p>
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
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("basicInfo")}
            </h2>
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
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
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
                  dir="rtl"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("roleEn")} *
                </label>
                <input
                  type="text"
                  name="roleEn"
                  required
                  value={roleEn}
                  onChange={(e) => setRoleEn(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("roleAr")} *
                  </label>
                  <TranslateButton
                    sourceText={roleEn}
                    onTranslated={(translated) => setRoleAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <input
                  type="text"
                  name="roleAr"
                  required
                  value={roleAr}
                  onChange={(e) => setRoleAr(e.target.value)}
                  dir="rtl"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("biography")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("bioEn")} *
                </label>
                <textarea
                  name="bioEn"
                  required
                  rows={6}
                  value={bioEn}
                  onChange={(e) => setBioEn(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("bioAr")} *
                  </label>
                  <TranslateButton
                    sourceText={bioEn}
                    onTranslated={(translated) => setBioAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <textarea
                  name="bioAr"
                  required
                  rows={6}
                  value={bioAr}
                  onChange={(e) => setBioAr(e.target.value)}
                  dir="rtl"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("profileImage")}
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                {t("imageURL")} *
              </label>
              <input
                type="url"
                name="image"
                required
                defaultValue={teamMember.image}
                className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("areasOfExpertise")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* English Specialties */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-light">
                    {t("specialtiesEn")}
                  </label>
                  <button
                    type="button"
                    onClick={addSpecialtyEn}
                    className="text-green-primary hover:text-green-vibrant text-sm"
                  >
                    {tActions("add")}
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
                    {t("specialtiesAr")}
                  </label>
                  <button
                    type="button"
                    onClick={addSpecialtyAr}
                    className="text-green-primary hover:text-green-vibrant text-sm"
                  >
                    {tActions("add")}
                  </button>
                </div>
                <div className="space-y-3">
                  {specialtiesAr.map((specialty, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <TranslateButton
                          sourceText={specialtiesEn[index] || ""}
                          onTranslated={(translated) =>
                            updateSpecialtyAr(index, translated)
                          }
                          from="en"
                          to="ar"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={specialty}
                          onChange={(e) =>
                            updateSpecialtyAr(index, e.target.value)
                          }
                          dir="rtl"
                          className="flex-1 bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Experience */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("contactExperience")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("email")}
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={teamMember.email || ""}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("linkedIn")}
                </label>
                <input
                  type="url"
                  name="linkedin"
                  defaultValue={teamMember.linkedin || ""}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("yearsOfExperience")}
                </label>
                <input
                  type="text"
                  name="yearsOfExperience"
                  defaultValue={teamMember.yearsOfExperience || ""}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("displaySettings")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("displayOrder")} *
                </label>
                <input
                  type="number"
                  name="order"
                  required
                  min="0"
                  defaultValue={teamMember.order}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={teamMember.published}
                    className="w-5 h-5 bg-black border border-gray-dark text-green-primary focus:ring-green-primary focus:ring-2"
                  />
                  <span className="text-gray-light">{t("publishMember")}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-between">
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-primary text-black px-8 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? tCommon("saving") : t("saveChanges")}
              </button>
              <Link
                href="/admin/team-members"
                className="border border-gray-dark text-white px-8 py-3 hover:border-green-primary/50 transition-colors font-medium inline-block text-center"
              >
                {tActions("cancel")}
              </Link>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              className="border border-red-500 text-red-500 px-8 py-3 hover:bg-red-500/10 transition-colors font-medium"
            >
              {t("deleteTeamMember")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
