'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface GalleryImage {
  id: string
  title: string
  image: string
  category: 'PALACE' | 'VILLA' | 'ESTATE' | 'PENTHOUSE'
  location: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'WIDE' | 'TALL'
  description: string
  order: number
  published: boolean
}

export default function EditGalleryImagePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [image, setImage] = useState<GalleryImage | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [imageId, setImageId] = useState<string | null>(null)

  useEffect(() => {
    params.then(p => {
      setImageId(p.id)
      fetchImage(p.id)
    })
  }, [])

  const fetchImage = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery/${id}`)
      if (!res.ok) throw new Error('Failed to fetch image')
      const data = await res.json()
      setImage(data)
    } catch (err) {
      setError('Failed to load image')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image || !imageId) return

    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/gallery/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image),
      })

      if (!res.ok) throw new Error('Failed to update image')

      router.push('/admin/gallery')
      router.refresh()
    } catch (err) {
      setError('Failed to save image. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!imageId) return

    try {
      const res = await fetch(`/api/gallery/${imageId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete image')

      router.push('/admin/gallery')
      router.refresh()
    } catch (err) {
      setError('Failed to delete image')
      setShowDeleteModal(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-light">Loading image...</div>
      </div>
    )
  }

  if (!image) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>
          <div className="text-xl mb-4">Image not found</div>
          <Link href={`/${locale}/admin/gallery" className="text-green-primary hover:text-green-vibrant">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Edit Gallery Image</h1>
            <p className="text-gray-light">{image.title}</p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            Delete Image
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400">
            {error}
          </div>
        )}

        {/* Image Preview */}
        <div className="mb-6 aspect-video relative bg-black border border-gray-dark overflow-hidden">
          <Image
            src={image.image}
            alt={image.title}
            fill
            className="object-cover"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Details */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Image Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Title</label>
              <input
                type="text"
                value={image.title}
                onChange={(e) => setImage({ ...image, title: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
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
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Category</label>
                <select
                  value={image.category}
                  onChange={(e) => setImage({ ...image, category: e.target.value as GalleryImage['category'] })}
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
                  onChange={(e) => setImage({ ...image, size: e.target.value as GalleryImage['size'] })}
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
              href={`/${locale}/admin/gallery"
              className="text-gray-light hover:text-green-primary"
            >
              ← Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-background-card border border-gray-dark p-8 max-w-md">
              <h3 className="text-xl font-serif mb-4">Delete Image?</h3>
              <p className="text-gray-light mb-6">
                Are you sure you want to delete "{image.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-dark text-gray-light hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
