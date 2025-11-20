"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PaginatedDataTable from "@/app/components/PaginatedDataTable";
import { Column } from "@/app/components/DataTable";

type Project = {
  id: string;
  title: string | null;
  slug: string;
  location: string;
  category: string;
  year: string;
  published: boolean;
  featured: boolean;
  order: number;
  image: string;
};

interface ProjectsListClientProps {
  projects: Project[];
  locale: string;
}

export default function ProjectsListClient({
  projects,
  locale,
}: ProjectsListClientProps) {
  const router = useRouter();

  const columns: Column<Project>[] = [
    {
      key: "title",
      label: "Project",
      labelAr: "المشروع",
      sortable: true,
      render: (project) => (
        <div>
          <div className="font-medium text-gray-900">
            {project.title || "Untitled"}
          </div>
          <div className="text-sm text-gray-500">{project.slug}</div>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      labelAr: "الموقع",
      sortable: true,
      hiddenOnMobile: true,
      render: (project) => (
        <span className="text-gray-700">{project.location}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      labelAr: "الفئة",
      sortable: true,
      render: (project) => (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {project.category}
        </span>
      ),
    },
    {
      key: "year",
      label: "Year",
      labelAr: "السنة",
      sortable: true,
      hiddenOnMobile: true,
      render: (project) => (
        <span className="text-gray-700">{project.year}</span>
      ),
    },
    {
      key: "published",
      label: "Status",
      labelAr: "الحالة",
      sortable: true,
      render: (project) =>
        project.published ? (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Published
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            Draft
          </span>
        ),
    },
  ];

  const handleRowClick = (project: Project) => {
    router.push(`/${locale}/admin/projects/${project.id}`);
  };

  // Custom mobile card render for better UX
  const mobileCardRender = (project: Project) => (
    <div className="space-y-3">
      {/* Project Title & Image */}
      <div className="flex items-start gap-3">
        {project.image && (
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={project.image}
              alt={project.title || "Project image"}
              fill
              className="object-cover rounded-lg"
              sizes="80px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {project.title || "Untitled"}
          </h3>
          <p className="text-sm text-gray-500 truncate">{project.slug}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {project.category}
            </span>
            {project.published ? (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Published
              </span>
            ) : (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                Draft
              </span>
            )}
            {project.featured && (
              <span className="text-yellow-500 text-sm">⭐</span>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
        <div className="text-gray-600">
          <span className="font-medium">Location:</span> {project.location}
        </div>
        <div className="text-gray-600">
          <span className="font-medium">Year:</span> {project.year}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/${locale}/admin/projects/${project.id}`);
          }}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Delete "${project.title}"?`)) {
              // Handle delete
            }
          }}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <PaginatedDataTable
        data={projects}
        columns={columns}
        keyExtractor={(project) => project.id}
        onRowClick={handleRowClick}
        mobileCardRender={mobileCardRender}
        emptyMessage="No projects found"
        emptyMessageAr="لم يتم العثور على مشاريع"
        locale={locale}
        searchable
        searchPlaceholder={
          locale === "ar" ? "البحث عن مشاريع..." : "Search projects..."
        }
        searchKeys={["title", "location", "category", "year"]}
        actions={(project) => (
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/admin/projects/${project.id}`}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              Edit
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Delete "${project.title}"?`)) {
                  // Handle delete
                }
              }}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Delete
            </button>
          </div>
        )}
        pageSize={10}
        showPageSizeSelector
        pageSizeOptions={[10, 25, 50]}
      />
    </div>
  );
}
