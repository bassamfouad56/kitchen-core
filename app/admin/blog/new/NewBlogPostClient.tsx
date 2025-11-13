"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import TranslateButton from "../../components/TranslateButton";

const SUGGESTED_CATEGORIES = [
  "Kitchen Design",
  "Trends",
  "Tips & Advice",
  "Case Studies",
];

export default function NewBlogPostClient() {
  const router = useRouter();
  const t = useTranslations("Admin.blog");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [slug, setSlug] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [excerptAr, setExcerptAr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([""]);
  const [author, setAuthor] = useState("Kitchen Core Team");
  const [readingTime, setReadingTime] = useState(5);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState<string[]>([""]);
  const [published, setPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState("");

  // Generate slug from titleEn
  const generateSlug = () => {
    const generated = titleEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generated);
  };

  // Auto-set publishedAt when published is checked
  const handlePublishedChange = (checked: boolean) => {
    setPublished(checked);
    if (checked && !publishedAt) {
      const now = new Date();
      const localDateTime = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16);
      setPublishedAt(localDateTime);
    }
  };

  // Calculate reading time from content
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    const words = contentEn.split(/\s+/).length;
    const estimatedTime = Math.ceil(words / wordsPerMinute);
    setReadingTime(estimatedTime || 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const data = {
      slug,
      titleEn,
      titleAr: titleAr || null,
      excerptEn,
      excerptAr: excerptAr || null,
      contentEn,
      contentAr: contentAr || null,
      featuredImage: featuredImage || null,
      category,
      tags: tags.filter((t) => t.trim()),
      author,
      readingTime,
      published,
      publishedAt: published && publishedAt ? publishedAt : null,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      seoKeywords: seoKeywords.filter((k) => k.trim()),
    };

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create blog post. Please try again.",
      );
      setSaving(false);
    }
  };

  const addTag = () => setTags([...tags, ""]);
  const removeTag = (index: number) => {
    if (tags.length > 1) {
      setTags(tags.filter((_, i) => i !== index));
    }
  };
  const updateTag = (index: number, value: string) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  const addKeyword = () => setSeoKeywords([...seoKeywords, ""]);
  const removeKeyword = (index: number) => {
    if (seoKeywords.length > 1) {
      setSeoKeywords(seoKeywords.filter((_, i) => i !== index));
    }
  };
  const updateKeyword = (index: number, value: string) => {
    const updated = [...seoKeywords];
    updated[index] = value;
    setSeoKeywords(updated);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              {t("addPost")}
            </h1>
            <p className="text-gray-light">Create a new blog post</p>
          </div>
          <LanguageSwitcher />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Slug & Basic Info */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">Basic Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("slug")} *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    className="flex-1 bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                    placeholder="luxury-kitchen-trends-2024"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="px-4 py-3 border border-green-primary text-green-primary hover:bg-green-primary/10 transition-colors whitespace-nowrap"
                  >
                    Generate from Title
                  </button>
                </div>
                <p className="text-xs text-gray-light mt-1">{t("slugHelp")}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-light mb-2">
                    {t("titleEn")} *
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    required
                    className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                    placeholder="Luxury Kitchen Trends 2024"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-light">
                      {t("titleAr")}
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
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    dir="rtl"
                    className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                    placeholder="اتجاهات المطابخ الفاخرة 2024"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">Excerpt</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("excerptEn")} *
                </label>
                <textarea
                  value={excerptEn}
                  onChange={(e) => setExcerptEn(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                  placeholder="Brief summary of the article..."
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("excerptAr")}
                  </label>
                  <TranslateButton
                    sourceText={excerptEn}
                    onTranslated={(translated) => setExcerptAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <textarea
                  value={excerptAr}
                  onChange={(e) => setExcerptAr(e.target.value)}
                  rows={3}
                  dir="rtl"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                  placeholder="ملخص موجز للمقال..."
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">Content</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("contentEn")} *
                </label>
                <textarea
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  required
                  rows={15}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none font-mono text-sm"
                  placeholder="Full article content..."
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-light">
                    {t("contentAr")}
                  </label>
                  <TranslateButton
                    sourceText={contentEn}
                    onTranslated={(translated) => setContentAr(translated)}
                    from="en"
                    to="ar"
                  />
                </div>
                <textarea
                  value={contentAr}
                  onChange={(e) => setContentAr(e.target.value)}
                  rows={15}
                  dir="rtl"
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none font-mono text-sm"
                  placeholder="محتوى المقال الكامل..."
                />
              </div>
            </div>
          </div>

          {/* Featured Image & Category */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Media & Classification
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("featuredImage")}
                </label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("category")} *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    list="category-suggestions"
                    className="flex-1 bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                    placeholder="Kitchen Design"
                  />
                  <datalist id="category-suggestions">
                    {SUGGESTED_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                <p className="text-xs text-gray-light mt-1">
                  Suggestions: {SUGGESTED_CATEGORIES.join(", ")}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-light">
                    {t("tags")}
                  </label>
                  <button
                    type="button"
                    onClick={addTag}
                    className="text-green-primary hover:text-green-vibrant text-sm"
                  >
                    {t("addTag")}
                  </button>
                </div>
                <div className="space-y-2">
                  {tags.map((tag, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        className="flex-1 bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                        placeholder="modern, luxury, trends"
                      />
                      {tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
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

          {/* Author & Reading Time */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Author & Metadata
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("author")} *
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="Kitchen Core Team"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("readingTime")} *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={readingTime}
                    onChange={(e) => setReadingTime(parseInt(e.target.value))}
                    required
                    min="1"
                    className="flex-1 bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={calculateReadingTime}
                    className="px-4 py-3 border border-green-primary text-green-primary hover:bg-green-primary/10 transition-colors whitespace-nowrap"
                  >
                    Calculate
                  </button>
                </div>
                <p className="text-xs text-gray-light mt-1">
                  (estimated based on word count)
                </p>
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              {t("seoSection")}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("seoTitle")}
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="Leave empty to use post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  {t("seoDescription")}
                </label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                  placeholder="Leave empty to use excerpt"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-light">
                    {t("seoKeywords")}
                  </label>
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="text-green-primary hover:text-green-vibrant text-sm"
                  >
                    {t("addKeyword")}
                  </button>
                </div>
                <div className="space-y-2">
                  {seoKeywords.map((keyword, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={keyword}
                        onChange={(e) => updateKeyword(index, e.target.value)}
                        className="flex-1 bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
                        placeholder="keyword"
                      />
                      {seoKeywords.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeKeyword(index)}
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

          {/* Publishing */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">Publishing</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => handlePublishedChange(e.target.checked)}
                    className="w-5 h-5 bg-black border border-gray-dark text-green-primary focus:ring-green-primary focus:ring-2"
                  />
                  <span className="text-gray-light">{t("published")}</span>
                </label>
              </div>
              {published && (
                <div>
                  <label className="block text-sm font-medium text-gray-light mb-2">
                    {t("publishedAt")}
                  </label>
                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-primary text-black px-8 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? tCommon("creating") : tActions("create")}
            </button>
            <Link
              href="/admin/blog"
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
