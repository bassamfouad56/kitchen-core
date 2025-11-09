import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

export default async function GalleryPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const images = await prisma.galleryImage.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Gallery Images</h1>
            <p className="text-gray-light">Manage your gallery collection</p>
          </div>
          <Link
            href="/admin/gallery/new"
            className="bg-green-primary text-black px-6 py-3 font-medium hover:bg-green-vibrant transition-colors"
          >
            + New Image
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-background-card border border-gray-dark overflow-hidden hover:border-green-primary transition-colors"
            >
              <div className="aspect-video relative bg-black">
                <Image
                  src={img.image}
                  alt={img.title || 'Gallery image'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-medium">{img.title}</h3>
                  <p className="text-sm text-gray-light">{img.location}</p>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs bg-green-primary/20 text-green-primary border border-green-primary/30">
                    {img.category}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-dark/50 text-gray-light">
                    {img.size}
                  </span>
                  {img.published ? (
                    <span className="text-green-primary text-xs">Published</span>
                  ) : (
                    <span className="text-gray-dark text-xs">Draft</span>
                  )}
                </div>
                <Link
                  href={`/admin/gallery/${img.id}`}
                  className="text-green-primary hover:text-green-vibrant text-sm"
                >
                  Edit →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-light mb-4">No gallery images yet</p>
            <Link
              href="/admin/gallery/new"
              className="inline-block px-6 py-3 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-colors"
            >
              Add Your First Image
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
