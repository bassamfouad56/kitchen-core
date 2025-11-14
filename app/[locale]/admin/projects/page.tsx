import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Portfolio Projects</h1>
            <p className="text-gray-light">Manage your project portfolio</p>
          </div>
          <Link
            href={`/${locale}/admin/projects/new"
            className="bg-green-primary text-black px-6 py-3 font-medium hover:bg-green-vibrant transition-colors"
          >
            + New Project
          </Link>
        </div>

        {/* Projects Table */}
        <div className="bg-background-card border border-gray-dark">
          <table className="w-full">
            <thead className="border-b border-gray-dark">
              <tr className="text-left">
                <th className="p-4 text-sm font-medium text-gray-light uppercase">Title</th>
                <th className="p-4 text-sm font-medium text-gray-light uppercase">Location</th>
                <th className="p-4 text-sm font-medium text-gray-light uppercase">Category</th>
                <th className="p-4 text-sm font-medium text-gray-light uppercase">Year</th>
                <th className="p-4 text-sm font-medium text-gray-light uppercase">Status</th>
                <th className="p-4 text-sm font-medium text-gray-light uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-dark hover:bg-black/50">
                  <td className="p-4">
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-gray-light">{project.slug}</div>
                  </td>
                  <td className="p-4 text-gray-light">{project.location}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs bg-green-primary/20 text-green-primary border border-green-primary/30">
                      {project.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-light">{project.year}</td>
                  <td className="p-4">
                    {project.published ? (
                      <span className="text-green-primary text-sm">Published</span>
                    ) : (
                      <span className="text-gray-dark text-sm">Draft</span>
                    )}
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-green-primary hover:text-green-vibrant text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link href={`/${locale}/admin" className="text-gray-light hover:text-green-primary text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
