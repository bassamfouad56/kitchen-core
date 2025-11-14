import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

export default async function TestimonialsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Testimonials</h1>
            <p className="text-gray-light">Manage client testimonials</p>
          </div>
          <Link
            href="/admin/testimonials/new"
            className="bg-green-primary text-black px-6 py-3 font-medium hover:bg-green-vibrant transition-colors"
          >
            + New Testimonial
          </Link>
        </div>

        {/* Testimonials List */}
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-dark">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name || 'Client testimonial'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-light">{testimonial.title}</p>
                      <p className="text-xs text-gray-dark">{testimonial.location}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-green-primary">★</span>
                        ))}
                      </div>
                      {testimonial.featured && (
                        <span className="px-2 py-1 text-xs bg-green-primary/20 text-green-primary border border-green-primary/30">
                          Featured
                        </span>
                      )}
                      {testimonial.published ? (
                        <span className="text-green-primary text-xs">Published</span>
                      ) : (
                        <span className="text-gray-dark text-xs">Draft</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-light text-sm mb-3 line-clamp-2">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-dark">{testimonial.project}</p>
                    <Link
                      href={`/admin/testimonials/${testimonial.id}`}
                      className="text-green-primary hover:text-green-vibrant text-sm"
                    >
                      Edit →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-light mb-4">No testimonials yet</p>
            <Link
              href="/admin/testimonials/new"
              className="inline-block px-6 py-3 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-colors"
            >
              Add Your First Testimonial
            </Link>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/admin" className="text-gray-light hover:text-green-primary text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
