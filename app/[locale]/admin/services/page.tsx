import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ServicesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">Services</h1>
            <p className="text-gray-light">Manage service offerings</p>
          </div>
          <Link
            href={`/${locale}/admin/services/new"
            className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium"
          >
            + New Service
          </Link>
        </div>

        {/* Services List */}
        <div className="bg-background-card border border-gray-dark">
          <table className="w-full">
            <thead className="border-b border-gray-dark">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-light">Order</th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">Title</th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">Features</th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-dark">
                    No services yet. Create your first service.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="border-b border-gray-dark hover:bg-black/50">
                    <td className="p-4 text-gray-light">{service.order}</td>
                    <td className="p-4">{service.title}</td>
                    <td className="p-4 text-gray-light text-sm">
                      {service.features.length} features
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          service.published
                            ? 'bg-green-primary/20 text-green-primary'
                            : 'bg-gray-dark text-gray-light'
                        }`}
                      >
                        {service.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="text-green-primary hover:text-green-vibrant text-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
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
