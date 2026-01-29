"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/app/components/ImageUpload";
import MultipleImageUpload from "@/app/components/MultipleImageUpload";
import RichTextEditor from "@/app/components/RichTextEditor";

interface ProjectFormData {
  titleEn: string;
  titleAr: string;
  slug: string;
  location: string;
  category: "MODERN_WOODEN" | "CLASSIC_WOODEN" | "ALUMINUM" | "BEDROOMS";
  image: string;
  gallery: string[];
  descriptionEn: string;
  descriptionAr: string;
  year: string;
  area: string;
  budget: string;
  materials: string[];
  appliances: string[];
  features: string[];
  duration: string;
  challengesEn: string;
  challengesAr: string;
  innovations: string[];
  featured: boolean;
  published: boolean;
  order: number;
}

interface ProjectFormClientProps {
  locale: string;
  initialData?: Partial<ProjectFormData>;
  isEditing?: boolean;
  projectId?: string;
}

export default function ProjectFormClient({
  locale,
  initialData,
  isEditing = false,
  projectId,
}: ProjectFormClientProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [project, setProject] = useState<ProjectFormData>({
    titleEn: initialData?.titleEn || "",
    titleAr: initialData?.titleAr || "",
    slug: initialData?.slug || "",
    location: initialData?.location || "",
    category: initialData?.category || "MODERN_WOODEN",
    image: initialData?.image || "",
    gallery: initialData?.gallery || [],
    descriptionEn: initialData?.descriptionEn || "",
    descriptionAr: initialData?.descriptionAr || "",
    year: initialData?.year || new Date().getFullYear().toString(),
    area: initialData?.area || "",
    budget: initialData?.budget || "",
    materials: initialData?.materials || [],
    appliances: initialData?.appliances || [],
    features: initialData?.features || [],
    duration: initialData?.duration || "",
    challengesEn: initialData?.challengesEn || "",
    challengesAr: initialData?.challengesAr || "",
    innovations: initialData?.innovations || [],
    featured: initialData?.featured || false,
    published: initialData?.published || false,
    order: initialData?.order || 0,
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const updateArrayField = (field: keyof ProjectFormData, value: string) => {
    const lines = value.split("\n").filter((line) => line.trim());
    setProject({ ...project, [field]: lines });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const url = isEditing
        ? `/api/projects/${projectId}`
        : `/api/projects`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        let errorMessage = "Failed to save project";
        try {
          const data = await response.json();
          errorMessage = data.error || data.message || errorMessage;
        } catch {
          // Response may not be JSON
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      setSuccess(isEditing ? "Project updated successfully!" : "Project created successfully!");

      // Redirect after showing success message
      setTimeout(() => {
        router.push(`/${locale}/admin/projects`);
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif">
              {isEditing ? "Edit Project" : "Create New Project"}
            </h1>
            <p className="text-gray-light mt-2">
              {isEditing
                ? "Update project details"
                : "Add a new luxury kitchen project"}
            </p>
          </div>
          <Link
            href={`/${locale}/admin/projects`}
            className="px-4 py-2 border border-gray-dark text-gray-light hover:border-green-primary hover:text-green-primary transition-colors"
          >
            Back to Projects
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 text-green-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Title (English)
              </label>
              <input
                type="text"
                value={project.titleEn}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  if (!isEditing) {
                    // Auto-generate slug from title for new projects
                    setProject((prev) => ({
                      ...prev,
                      titleEn: newTitle,
                      slug: generateSlug(newTitle),
                    }));
                  } else {
                    setProject((prev) => ({ ...prev, titleEn: newTitle }));
                  }
                }}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Title (Arabic)
              </label>
              <input
                type="text"
                value={project.titleAr}
                onChange={(e) => setProject((prev) => ({ ...prev, titleAr: e.target.value }))}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none text-right"
                dir="rtl"
                placeholder="العنوان بالعربية"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Slug
              </label>
              <input
                type="text"
                value={project.slug}
                onChange={(e) =>
                  setProject({ ...project, slug: e.target.value })
                }
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
              <p className="text-xs text-gray-dark mt-1">
                URL-friendly identifier (auto-generated from title)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={project.location}
                  onChange={(e) =>
                    setProject({ ...project, location: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="e.g., Dubai, UAE"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Category
                </label>
                <select
                  value={project.category}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      category: e.target.value as ProjectFormData["category"],
                    })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  required
                >
                  <option value="MODERN_WOODEN">Modern Wooden</option>
                  <option value="CLASSIC_WOODEN">Classic Wooden</option>
                  <option value="ALUMINUM">Aluminum</option>
                  <option value="BEDROOMS">Bedrooms</option>
                </select>
              </div>
            </div>

            <div>
              <RichTextEditor
                label="Description (English)"
                value={project.descriptionEn}
                onChange={(html) =>
                  setProject({ ...project, descriptionEn: html })
                }
                placeholder="Brief description of the project..."
                minHeight="150px"
              />
            </div>

            <div>
              <RichTextEditor
                label="Description (Arabic)"
                value={project.descriptionAr}
                onChange={(html) =>
                  setProject({ ...project, descriptionAr: html })
                }
                placeholder="وصف المشروع بالعربية..."
                minHeight="150px"
              />
            </div>
          </div>

          {/* Images - NEW UPLOAD INTERFACE */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-6">
            <h2 className="text-xl font-serif mb-4 text-white">Images</h2>

            {/* Main Image Upload */}
            <div>
              <ImageUpload
                label="Main Project Image"
                helperText="Primary image shown on project cards (Recommended: 1920x1080px)"
                value={project.image}
                onChange={(url) => setProject({ ...project, image: url })}
                onDelete={() => setProject({ ...project, image: "" })}
                aspectRatio="16/9"
                maxSize={10}
                className="bg-black"
              />
            </div>

            {/* Gallery Images Upload */}
            <div>
              <MultipleImageUpload
                label="Project Gallery"
                helperText="Additional images for the project gallery (drag to reorder)"
                value={project.gallery}
                onChange={(urls) => setProject({ ...project, gallery: urls })}
                maxImages={15}
                maxSize={10}
                className="bg-black"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Project Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Year
                </label>
                <input
                  type="text"
                  value={project.year}
                  onChange={(e) =>
                    setProject({ ...project, year: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Area
                </label>
                <input
                  type="text"
                  value={project.area}
                  onChange={(e) =>
                    setProject({ ...project, area: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="1,200 sq ft"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Budget
                </label>
                <input
                  type="text"
                  value={project.budget}
                  onChange={(e) =>
                    setProject({ ...project, budget: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="$500K - $1M"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={project.duration}
                  onChange={(e) =>
                    setProject({ ...project, duration: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="24 weeks"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Materials (one per line)
              </label>
              <textarea
                value={project.materials.join("\n")}
                onChange={(e) => updateArrayField("materials", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Calacatta Marble&#10;Walnut Cabinetry&#10;Brass Hardware"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Appliances (one per line)
              </label>
              <textarea
                value={project.appliances.join("\n")}
                onChange={(e) => updateArrayField("appliances", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Sub-Zero PRO 48&#10;Wolf Dual Fuel Range&#10;Miele Steam Oven"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Features (one per line)
              </label>
              <textarea
                value={project.features.join("\n")}
                onChange={(e) => updateArrayField("features", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Custom island design&#10;Hidden storage&#10;Smart lighting"
              />
            </div>

            <div>
              <RichTextEditor
                label="Challenges (English)"
                value={project.challengesEn}
                onChange={(html) =>
                  setProject({ ...project, challengesEn: html })
                }
                placeholder="Key challenges faced during the project..."
                minHeight="120px"
              />
            </div>

            <div>
              <RichTextEditor
                label="Challenges (Arabic)"
                value={project.challengesAr}
                onChange={(html) =>
                  setProject({ ...project, challengesAr: html })
                }
                placeholder="التحديات التي واجهت المشروع..."
                minHeight="120px"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Innovations (one per line)
              </label>
              <textarea
                value={project.innovations.join("\n")}
                onChange={(e) =>
                  updateArrayField("innovations", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Custom marble extraction&#10;Hidden appliance integration"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Settings</h2>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) =>
                    setProject({ ...project, featured: e.target.checked })
                  }
                  className="w-4 h-4 text-green-primary focus:ring-green-primary"
                />
                <span className="text-sm text-gray-light">
                  Featured Project
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={project.published}
                  onChange={(e) =>
                    setProject({ ...project, published: e.target.checked })
                  }
                  className="w-4 h-4 text-green-primary focus:ring-green-primary"
                />
                <span className="text-sm text-gray-light">Published</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={project.order}
                onChange={(e) =>
                  setProject({
                    ...project,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="0"
              />
              <p className="text-xs text-gray-dark mt-1">
                Lower numbers appear first
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href={`/${locale}/admin/projects`}
              className="px-6 py-3 border border-gray-dark text-gray-light hover:border-green-primary hover:text-green-primary transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-green-primary text-black hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving
                ? "Saving..."
                : isEditing
                  ? "Update Project"
                  : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
