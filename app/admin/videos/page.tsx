import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function VideosPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const videos = await prisma.video.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">Videos</h1>
            <p className="text-gray-light">Manage video showcase content</p>
          </div>
          <Link
            href="/admin/videos/new"
            className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium"
          >
            + New Video
          </Link>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length === 0 ? (
            <div className="col-span-full bg-background-card border border-gray-dark p-8 text-center text-gray-dark">
              No videos yet. Create your first video.
            </div>
          ) : (
            videos.map((video) => (
              <div key={video.id} className="bg-background-card border border-gray-dark overflow-hidden">
                {video.thumbnail && (
                  <div className="aspect-video bg-gray-dark">
                    <img
                      src={video.thumbnail}
                      alt={video.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{video.titleEn}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        video.published
                          ? 'bg-green-primary/20 text-green-primary'
                          : 'bg-gray-dark text-gray-light'
                      }`}
                    >
                      {video.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-light mb-2 line-clamp-2">
                    {video.descriptionEn}
                  </p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-dark">
                    <span className="text-xs text-gray-dark">Order: {video.order}</span>
                    <Link
                      href={`/admin/videos/${video.id}`}
                      className="text-green-primary hover:text-green-vibrant text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

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
