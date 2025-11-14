"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../components/LanguageSwitcher";

interface NassGallery {
  id: string;
  collectionKey: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  titleHighlightEn: string;
  titleHighlightAr: string;
  order: number;
  published: boolean;
  images: { id: string }[];
  features: { id: string }[];
}

export default function NassGalleryListClient() {
  const t = useTranslations("Admin.nassGallery");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [loading, setLoading] = useState(true);
  const [galleries, setGalleries] = useState<NassGallery[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await fetch("/api/nass-gallery");
      if (!res.ok) throw new Error("Failed to fetch galleries");
      const data = await res.json();
      setGalleries(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load galleries");
      setLoading(false);
    }
  };

  const deleteGallery = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;

    try {
      const res = await fetch(`/api/nass-gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete gallery");

      setGalleries(galleries.filter((g) => g.id !== id));
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
            href={`/${locale}/admin/nass-gallery/new"
            className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium"
          >
            {t("addGallery")}
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        {galleries.length === 0 ? (
          <div className="text-center py-12 border border-gray-dark">
            <p className="text-gray-light mb-4">{t("noGalleries")}</p>
            <Link
              href={`/${locale}/admin/nass-gallery/new"
              className="text-green-primary hover:text-green-vibrant"
            >
              {t("addFirst")}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="bg-background-card border border-gray-dark hover:border-green-primary/50 transition-colors p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs bg-green-primary/20 text-green-primary px-3 py-1 font-mono">
                        {gallery.collectionKey}
                      </span>
                      {!gallery.published && (
                        <span className="text-xs bg-red-500 text-white px-3 py-1 font-medium">
                          {t("unpublished")}
                        </span>
                      )}
                      <span className="text-xs text-gray-light">
                        {t("order")}: {gallery.order}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xl font-serif text-white mb-1">
                        <span className="text-green-vibrant">
                          {gallery.titleHighlightEn}
                        </span>{" "}
                        {gallery.titleEn}
                      </h3>
                      <p className="text-sm text-gray-light mb-1" dir="rtl">
                        <span className="text-green-vibrant">
                          {gallery.titleHighlightAr}
                        </span>{" "}
                        {gallery.titleAr}
                      </p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-light">
                        <span>
                          {gallery.images.length} {t("imagesCount")}
                        </span>
                        <span>
                          {gallery.features.length} {t("featuresCount")}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 text-xs">
                      <span className="bg-black border border-gray-dark px-3 py-1">
                        {gallery.badgeEn}
                      </span>
                      <span
                        className="bg-black border border-gray-dark px-3 py-1"
                        dir="rtl"
                      >
                        {gallery.badgeAr}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Link
                      href={`/admin/nass-gallery/${gallery.id}`}
                      className="px-4 py-2 border border-green-primary text-green-primary hover:bg-green-primary/10 transition-colors"
                    >
                      {tActions("edit")}
                    </Link>
                    <button
                      onClick={() => deleteGallery(gallery.id)}
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
            href={`/${locale}/admin"
            className="text-gray-light hover:text-white transition-colors"
          >
            {tActions("backToDashboard")}
          </Link>
        </div>
      </div>
    </div>
  );
}
