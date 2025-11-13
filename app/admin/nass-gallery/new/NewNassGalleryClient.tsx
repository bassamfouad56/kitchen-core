"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewNassGalleryClient() {
  const router = useRouter();
  const t = useTranslations("Admin.nassGallery");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
      const res = await fetch("/api/nass-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create gallery");
      }

      router.push("/admin/nass-gallery");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create gallery. Please try again.",
      );
      setSaving(false);
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

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              {t("addNewGallery")}
            </h1>
            <p className="text-gray-light">{t("createGallery")}</p>
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
                placeholder="nass0"
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
                  placeholder="NASS KITCHENS"
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
                  placeholder="مطابخ ناس"
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
                    placeholder="Experience"
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
                    placeholder="تجربة"
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
                    placeholder="Innovation"
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
                    placeholder="الابتكار"
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
                  placeholder="Describe this gallery collection..."
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
                  placeholder="صف مجموعة المعرض هذه..."
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
                        placeholder="https://..."
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
                        placeholder="Alt text"
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
                        placeholder="Image title"
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
                        placeholder="Sparkles"
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
                        placeholder="Feature label"
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
                        placeholder="تسمية الميزة"
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
                        placeholder="Feature description"
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
                        placeholder="وصف الميزة"
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
                  defaultValue="0"
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
                    defaultChecked
                    className="w-5 h-5 bg-black border border-gray-dark text-green-primary focus:ring-green-primary focus:ring-2"
                  />
                  <span className="text-gray-light">{t("published")}</span>
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
              {saving ? tCommon("creating") : t("createGallery")}
            </button>
            <Link
              href="/admin/nass-gallery"
              className="border border-gray-dark text-white px-8 py-3 hover:border-green-primary/50 transition-colors font-medium inline-block text-center"
            >
              {tActions("cancel")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
