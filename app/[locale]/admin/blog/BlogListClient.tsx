"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../components/LanguageSwitcher";

interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string | null;
  category: string;
  published: boolean;
  views: number;
  publishedAt: string | null;
  createdAt: string;
}

export default function BlogListClient() {
  const t = useTranslations("Admin.blog");
  const tCommon = useTranslations("Admin.common");
  const tActions = useTranslations("Admin.actions");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filter === "published") params.append("published", "true");
      if (filter === "draft") params.append("published", "false");
      if (categoryFilter) params.append("category", categoryFilter);

      const res = await fetch(`/api/blog?${params.toString()}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, categoryFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (slug: string) => {
    if (!confirm(t("confirmDelete"))) return;

    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete post");

      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.titleEn.toLowerCase().includes(query) ||
      post.titleAr?.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
  });

  // Extract unique categories
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              {t("title")}
            </h1>
            <p className="text-gray-light">{t("subtitle")}</p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Actions Bar */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center flex-wrap">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 border transition-colors ${
                  filter === "all"
                    ? "border-green-primary bg-green-primary/10 text-green-primary"
                    : "border-gray-dark text-gray-light hover:border-green-primary/50"
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setFilter("published")}
                className={`px-4 py-2 border transition-colors ${
                  filter === "published"
                    ? "border-green-primary bg-green-primary/10 text-green-primary"
                    : "border-gray-dark text-gray-light hover:border-green-primary/50"
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setFilter("draft")}
                className={`px-4 py-2 border transition-colors ${
                  filter === "draft"
                    ? "border-green-primary bg-green-primary/10 text-green-primary"
                    : "border-gray-dark text-gray-light hover:border-green-primary/50"
                }`}
              >
                Drafts
              </button>
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Search */}
            <input
              type="text"
              placeholder={tCommon("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black border border-gray-dark text-white px-4 py-2 focus:border-green-primary focus:outline-none w-64"
            />
          </div>

          <Link
            href="/admin/blog/new"
            className="bg-green-primary text-black px-6 py-2 hover:bg-green-vibrant transition-colors font-medium"
          >
            {t("addPost")}
          </Link>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-12 text-gray-light">
            {tCommon("loading")}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-light mb-4">{t("noPosts")}</p>
            <Link
              href="/admin/blog/new"
              className="inline-block bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium"
            >
              {t("addPost")}
            </Link>
          </div>
        ) : (
          <div className="bg-background-card border border-gray-dark">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-dark">
                  <th className="text-left p-4 text-gray-light font-medium">
                    Title
                  </th>
                  <th className="text-left p-4 text-gray-light font-medium">
                    Category
                  </th>
                  <th className="text-left p-4 text-gray-light font-medium">
                    Status
                  </th>
                  <th className="text-left p-4 text-gray-light font-medium">
                    Views
                  </th>
                  <th className="text-left p-4 text-gray-light font-medium">
                    Date
                  </th>
                  <th className="text-right p-4 text-gray-light font-medium">
                    {tCommon("actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-dark hover:bg-black/50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <div className="text-white font-medium">
                          {post.titleEn}
                        </div>
                        {post.titleAr && (
                          <div className="text-gray-light text-sm" dir="rtl">
                            {post.titleAr}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          /{post.slug}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-light">{post.category}</td>
                    <td className="p-4">
                      {post.published ? (
                        <span className="text-green-primary text-sm">
                          Published
                        </span>
                      ) : (
                        <span className="text-yellow-500 text-sm">
                          {t("draft")}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-light">{post.views}</td>
                    <td className="p-4 text-gray-light text-sm">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="text-green-primary hover:text-green-vibrant transition-colors"
                        >
                          {tActions("edit")}
                        </Link>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          {tActions("delete")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link
            href="/admin"
            className="text-green-primary hover:text-green-vibrant transition-colors"
          >
            {tActions("backToDashboard")}
          </Link>
        </div>
      </div>
    </div>
  );
}
