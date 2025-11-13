"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../components/LanguageSwitcher";

interface Statistic {
  id: string;
  number: string;
  labelEn: string;
  labelAr: string;
  section: string;
  order: number;
}

export default function StatisticsListClient() {
  const router = useRouter();
  const t = useTranslations("Admin.statistics");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const res = await fetch("/api/statistics");
      if (!res.ok) throw new Error("Failed to fetch statistics");
      const data = await res.json();
      setStatistics(data);
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load statistics",
      );
      setLoading(false);
    }
  };

  const deleteStatistic = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;

    try {
      const res = await fetch(`/api/statistics/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete statistic");

      setStatistics(statistics.filter((s) => s.id !== id));
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
      <div className="max-w-6xl mx-auto">
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
            href="/admin/statistics/new"
            className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium"
          >
            {t("addStatistic")}
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        {statistics.length === 0 ? (
          <div className="text-center py-12 border border-gray-dark">
            <p className="text-gray-light mb-4">{t("noStatistics")}</p>
            <Link
              href="/admin/statistics/new"
              className="text-green-primary hover:text-green-vibrant"
            >
              {t("createFirst")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {statistics.map((stat) => (
              <div
                key={stat.id}
                className="bg-background-card border border-gray-dark p-6 hover:border-green-primary/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-4xl font-serif text-green-vibrant">
                        {stat.number}
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {stat.labelEn}
                        </div>
                        <div className="text-gray-light text-sm" dir="rtl">
                          {stat.labelAr}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-light">
                      <span>
                        {t("section")}: {stat.section}
                      </span>
                      <span>
                        {tCommon("sort")}: {stat.order}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/statistics/${stat.id}`}
                      className="px-4 py-2 border border-green-primary text-green-primary hover:bg-green-primary/10 transition-colors"
                    >
                      {tActions("edit")}
                    </Link>
                    <button
                      onClick={() => deleteStatistic(stat.id)}
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
