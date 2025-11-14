'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface GalleryImageFormData {
  title: string
  image: string
  category: 'PALACE' | 'VILLA' | 'ESTATE' | 'PENTHOUSE'
  location: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'WIDE' | 'TALL'
  description: string
  order: number
  published: boolean
}

export default function NewGalleryImagePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [image, setImage] = useState<GalleryImageFormData>({
    title: '',
    image: '',
    category: 'VILLA',
    location: '',
    size: 'MEDIUM',
    description: '',
    order: 0,
    published: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image),
      })

      if (!res.ok) throw new Error('Failed to create image')

      router.push('/admin/gallery')
      router.refresh()
    } catch (err) {
      setError('Failed to create image. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-2">Add Gallery Image</h1>
          <p className="text-gray-light">Add a new image to your gallery</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Image Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Title</label>
              <input
                type="text"
                value={image.title}
                onChange={(e) => setImage({ ...image, title: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Royal Palace Kitchen"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Image URL</label>
              <input
                type="text"
                value={image.image}
                onChange={(e) => setImage({ ...image, image: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="/images/gallery/image.jpg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Category</label>
                <select
                  value={image.category}
                  onChange={(e) => setImage({ ...image, category: e.target.value as GalleryImageFormData['category'] })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  required
                >
                  <option value="PALACE">Palace</option>
                  <option value="VILLA">Villa</option>
                  <option value="ESTATE">Estate</option>
                  <option value="PENTHOUSE">Penthouse</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Size</label>
                <select
                  value={image.size}
                  onChange={(e) => setImage({ ...image, size: e.target.value as GalleryImageFormData['size'] })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  required
                >
                  <option value="SMALL">Small</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LARGE">Large</option>
                  <option value="WIDE">Wide</option>
                  <option value="TALL">Tall</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Location</label>
              <input
                type="text"
                value={image.location}
                onChange={(e) => setImage({ ...image, location: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Dubai, UAE"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Description</label>
              <textarea
                value={image.description}
                onChange={(e) => setImage({ ...image, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Italian marble countertops with custom brass fixtures"
                required
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Settings</h2>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={image.published}
                  onChange={(e) => setImage({ ...image, published: e.target.checked })}
                  className="w-4 h-4 bg-black border-gray-dark"
                />
                <span className="text-gray-light">Published</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={image.order}
                onChange={(e) => setImage({ ...image, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
              <p className="text-xs text-gray-dark mt-1">Lower numbers appear first</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            <Link
              href="/admin/gallery"
              className="text-gray-light hover:text-green-primary"
            >
              ← Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Adding...' : 'Add Image'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
