"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../components/LanguageSwitcher";

interface TeamMember {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  image: string;
  order: number;
  published: boolean;
  yearsOfExperience?: string;
}

export default function TeamMembersListClient() {
  const router = useRouter();
  const t = useTranslations("Admin.teamMembers");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch("/api/team-members");
      if (!res.ok) throw new Error("Failed to fetch team members");
      const data = await res.json();
      setTeamMembers(data);
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load team members",
      );
      setLoading(false);
    }
  };

  const deleteTeamMember = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;

    try {
      const res = await fetch(`/api/team-members/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete team member");

      setTeamMembers(teamMembers.filter((tm) => tm.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-serif text-white mb-2">
                  {t("title")}
                </h1>
                <p className="text-gray-light">{t("subtitle")}</p>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <Link
            href="/admin/team-members/new"
            className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium"
          >
            {t("addTeamMember")}
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        {teamMembers.length === 0 ? (
          <div className="text-center py-12 border border-gray-dark">
            <p className="text-gray-light mb-4">{t("noMembers")}</p>
            <Link
              href="/admin/team-members/new"
              className="text-green-primary hover:text-green-vibrant"
            >
              {t("addFirst")}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-background-card border border-gray-dark hover:border-green-primary/50 transition-colors overflow-hidden"
              >
                {/* Member Image */}
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.nameEn}
                    fill
                    className="object-cover"
                  />
                  {!member.published && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 font-medium">
                      {t("unpublished")}
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-serif text-white mb-1">
                      {member.nameEn}
                    </h3>
                    <p className="text-sm text-gray-light mb-1" dir="rtl">
                      {member.nameAr}
                    </p>
                    <p className="text-green-vibrant text-sm font-medium">
                      {member.roleEn}
                    </p>
                    {member.yearsOfExperience && (
                      <p className="text-xs text-gray-light mt-2">
                        {member.yearsOfExperience} {t("yearsExp")}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 text-xs text-gray-light mb-4">
                    <span>
                      {t("order")}: {member.order}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/team-members/${member.id}`}
                      className="flex-1 px-4 py-2 border border-green-primary text-green-primary hover:bg-green-primary/10 transition-colors text-center"
                    >
                      {tActions("edit")}
                    </Link>
                    <button
                      onClick={() => deleteTeamMember(member.id)}
                      className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      {tActions("delete")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/admin"
            className="text-gray-light hover:text-white transition-colors"
          >
            {tActions("backToDashboard")}
          </Link>
        </div>
      </div>
    </div>
  );
}
