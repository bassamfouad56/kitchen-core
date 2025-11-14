"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import TranslateButton from "../../components/TranslateButton";

interface ImageData {
  src: string;
  alt: string;
  title: string;
  size: string;
  order: number;
}

interface FeatureData {
  icon: string;
  labelEn: string;
  labelAr: string;
  descriptionEn: string;
  descriptionAr: string;
  order: number;
}

interface NassGallery {
  id: string;
  collectionKey: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  titleHighlightEn: string;
  titleHighlightAr: string;
  descriptionEn: string;
  descriptionAr: string;
  order: number;
  published: boolean;
  images: {
    src: string;
    alt: string;
    title: string;
    size: string;
  }[];
  features: {
    icon: string;
    labelEn: string;
    labelAr: string;
    descriptionEn: string;
    descriptionAr: string;
  }[];
}

export default function EditNassGalleryClient() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const t = useTranslations("Admin.nassGallery");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState<NassGallery | null>(null);

  // Controlled form state
  const [collectionKey, setCollectionKey] = useState("");
  const [badgeEn, setBadgeEn] = useState("");
  const [badgeAr, setBadgeAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [titleHighlightEn, setTitleHighlightEn] = useState("");
  const [titleHighlightAr, setTitleHighlightAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");

  const [images, setImages] = useState<ImageData[]>([
    { src: "", alt: "", title: "", size: "MEDIUM", order: 0 },
  ]);

  const [features, setFeatures] = useState<FeatureData[]>([
    {
      icon: "",
      labelEn: "",
      labelAr: "",
      descriptionEn: "",
      descriptionAr: "",
      order: 0,
    },
  ]);

  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch(`/api/nass-gallery/${id}`);
      if (!res.ok) throw new Error("Failed to fetch gallery");
      const data = await res.json();
      setGallery(data);

      // Set form state
      setCollectionKey(data.collectionKey || "");
      setBadgeEn(data.badgeEn || "");
      setBadgeAr(data.badgeAr || "");
      setTitleEn(data.titleEn || "");
      setTitleAr(data.titleAr || "");
      setTitleHighlightEn(data.titleHighlightEn || "");
      setTitleHighlightAr(data.titleHighlightAr || "");
      setDescriptionEn(data.descriptionEn || "");
      setDescriptionAr(data.descriptionAr || "");

      // Set images
      if (data.images && data.images.length > 0) {
        setImages(
          data.images.map(
            (
              img: { src: string; alt: string; title: string; size: string },
              idx: number,
            ) => ({
              src: img.src || "",
              alt: img.alt || "",
              title: img.title || "",
              size: img.size || "MEDIUM",
              order: idx,
            }),
          ),
        );
      }

      // Set features
      if (data.features && data.features.length > 0) {
        setFeatures(
          data.features.map(
            (
              feat: {
                icon: string;
                labelEn: string;
                labelAr: string;
                descriptionEn: string;
                descriptionAr: string;
              },
              idx: number,
            ) => ({
              icon: feat.icon || "",
              labelEn: feat.labelEn || "",
              labelAr: feat.labelAr || "",
              descriptionEn: feat.descriptionEn || "",
              descriptionAr: feat.descriptionAr || "",
              order: idx,
            }),
          ),
        );
      }

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    // Filter out empty images and features
    const validImages = images
      .filter((img) => img.src.trim())
      .map((img, idx) => ({
        ...img,
        order: idx,
      }));

    const validFeatures = features
      .filter((feat) => feat.labelEn.trim() || feat.labelAr.trim())
      .map((feat, idx) => ({
        ...feat,
        order: idx,
      }));

    const data = {
      collectionKey,
      badgeEn,
      badgeAr,
      titleEn,
      titleAr,
      titleHighlightEn,
      titleHighlightAr,
      descriptionEn,
      descriptionAr,
      order: parseInt(formData.get("order") as string),
      published: formData.get("published") === "on",
      images: validImages,
      features: validFeatures,
    };

    try {
      const res = await fetch(`/api/nass-gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update gallery");
      }

      router.push("/admin/nass-gallery");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update gallery. Please try again.",
      );
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(t("confirmDelete"))) return;

    try {
      const res = await fetch(`/api/nass-gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete gallery");

      router.push("/admin/nass-gallery");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  // Image management
  const addImage = () => {
    setImages([
      ...images,
      { src: "", alt: "", title: "", size: "MEDIUM", order: images.length },
    ]);
  };

  const removeImage = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const updateImage = (
    index: number,
    field: keyof ImageData,
    value: string | number,
  ) => {
    const updated = [...images];
    updated[index] = { ...updated[index], [field]: value };
    setImages(updated);
  };

  // Feature management
  const addFeature = () => {
    setFeatures([
      ...features,
      {
        icon: "",
        labelEn: "",
        labelAr: "",
        descriptionEn: "",
        descriptionAr: "",
        order: features.length,
      },
    ]);
  };

  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const updateFeature = (
    index: number,
    field: keyof FeatureData,
    value: string | number,
  ) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    setFeatures(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-gray-light">{tCommon("loading")}</div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {t("notFound")}
          </div>
          <Link
            href={`/${locale}/admin/nass-gallery"
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
              {t("editGallery")}
            </h1>
            <p className="text-gray-light">{t("updateGallery")}</p>
          </div>
          <LanguageSwitcher />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Collection Key */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("collectionKey")}
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                {t("collectionKey")} *
              </label>
              <input
                type="text"
                required
                value={collectionKey}
                onChange={(e) => setCollectionKey(e.target.value)}
                className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none font-mono"
              />
              <p className="text-xs text-gray-light mt-1">
                {t("collectionKeyHelp")}
              </p>
            </div>
          </div>

          {/* Badge */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">{t("badge")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("badgeEn")} *
                </label>
                <input
                  type="text"
                  required
                  value={badgeEn}
                  onChange={(e) => setBadgeEn(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("badgeAr")} *
                  </label>
                  <TranslateButton
                    sourceText={badgeEn}
                    onTranslated={(translated) => setBadgeAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={badgeAr}
                  onChange={(e) => setBadgeAr(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">{t("title")}</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-light mb-2">
                    {t("titleEn")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-light">
                      {t("titleAr")} *
                    </label>
                    <TranslateButton
                      sourceText={titleEn}
                      onTranslated={(translated) => setTitleAr(translated)}
                      from="en"
                      to="ar"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-light mb-2">
                    {t("titleHighlightEn")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleHighlightEn}
                    onChange={(e) => setTitleHighlightEn(e.target.value)}
                    className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-light">
                      {t("titleHighlightAr")} *
                    </label>
                    <TranslateButton
                      sourceText={titleHighlightEn}
                      onTranslated={(translated) =>
                        setTitleHighlightAr(translated)
                      }
                      from="en"
                      to="ar"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={titleHighlightAr}
                    onChange={(e) => setTitleHighlightAr(e.target.value)}
                    className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("description")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("descriptionEn")} *
                </label>
                <textarea
                  required
                  rows={6}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
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
                  required
                  rows={6}
                  dir="rtl"
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-background-card border border-gray-dark p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-white">{t("images")}</h2>
              <button
                type="button"
                onClick={addImage}
                className="bg-green-primary text-black px-4 py-2 hover:bg-green-vibrant transition-colors text-sm font-medium"
              >
                {t("addImage")}
              </button>
            </div>

            <div className="space-y-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="border border-gray-dark p-4 space-y-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-light">
                      {t("image")} #{index + 1}
                    </span>
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        {tActions("remove")}
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-light mb-2">
                        {t("imageSrc")} *
                      </label>
                      <input
                        type="url"
                        value={image.src}
                        onChange={(e) =>
                          updateImage(index, "src", e.target.value)
                        }
                        className="w-full bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-light mb-2">
                        {t("imageAlt")}
                      </label>
                      <input
                        type="text"
                        value={image.alt}
                        onChange={(e) =>
                          updateImage(index, "alt", e.target.value)
                        }
                        className="w-full bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-light mb-2">
                        {t("imageTitle")}
                      </label>
                      <input
                        type="text"
                        value={image.title}
                        onChange={(e) =>
                          updateImage(index, "title", e.target.value)
                        }
                        className="w-full bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-light mb-2">
                        {t("imageSize")}
                      </label>
                      <select
                        value={image.size}
                        onChange={(e) =>
                          updateImage(index, "size", e.target.value)
                        }
                        className="w-full bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                      >
                        <option value="SMALL">Small</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LARGE">Large</option>
                        <option value="WIDE">Wide</option>
                        <option value="TALL">Tall</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-background-card border border-gray-dark p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-white">{t("features")}</h2>
              <button
                type="button"
                onClick={addFeature}
                className="bg-green-primary text-black px-4 py-2 hover:bg-green-vibrant transition-colors text-sm font-medium"
              >
                {t("addFeature")}
              </button>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="border border-gray-dark p-4 space-y-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-light">
                      {t("feature")} #{index + 1}
                    </span>
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        {tActions("remove")}
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-light mb-2">
                        {t("featureIcon")}
                      </label>
                      <input
                        type="text"
                        value={feature.icon}
                        onChange={(e) =>
                          updateFeature(index, "icon", e.target.value)
                        }
                        className="w-full bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none font-mono"
                      />
                      <p className="text-xs text-gray-light mt-1">
                        Lucide icon name
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-light mb-2">
                        {t("featureLabelEn")}
                      </label>
                      <input
                        type="text"
                        value={feature.labelEn}
                        onChange={(e) =>
                          updateFeature(index, "labelEn", e.target.value)
                        }
                        className="w-full bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-light">
                          {t("featureLabelAr")}
                        </label>
                        <TranslateButton
                          sourceText={feature.labelEn}
                          onTranslated={(translated) =>
                            updateFeature(index, "labelAr", translated)
                          }
                          from="en"
                          to="ar"
                        />
                      </div>
                      <input
                        type="text"
                        dir="rtl"
                        value={feature.labelAr}
                        onChange={(e) =>
                          updateFeature(index, "labelAr", e.target.value)
                        }
                        className="w-full bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-light mb-2">
                        {t("featureDescEn")}
                      </label>
                      <textarea
                        rows={3}
                        value={feature.descriptionEn}
                        onChange={(e) =>
                          updateFeature(index, "descriptionEn", e.target.value)
                        }
                        className="w-full bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-light">
                          {t("featureDescAr")}
                        </label>
                        <TranslateButton
                          sourceText={feature.descriptionEn}
                          onTranslated={(translated) =>
                            updateFeature(index, "descriptionAr", translated)
                          }
                          from="en"
                          to="ar"
                        />
                      </div>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={feature.descriptionAr}
                        onChange={(e) =>
                          updateFeature(index, "descriptionAr", e.target.value)
                        }
                        className="w-full bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
                  defaultValue={gallery.order}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                />
                <p className="text-xs text-gray-light mt-1">
                  {t("displayOrderHelp")}
                </p>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={gallery.published}
                    className="w-5 h-5 bg-black border border-gray-dark text-green-primary focus:ring-green-primary focus:ring-2"
                  />
                  <span className="text-gray-light">{t("published")}</span>
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
                href={`/${locale}/admin/nass-gallery"
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
              {t("deleteGallery")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
