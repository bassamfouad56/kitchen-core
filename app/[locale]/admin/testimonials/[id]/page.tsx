'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Testimonial {
  id: string
  name: string
  title: string
  location: string
  image: string
  quote: string
  rating: number
  project: string
  featured: boolean
  published: boolean
  order: number
}

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [testimonialId, setTestimonialId] = useState<string | null>(null)

  useEffect(() => {
    params.then(p => {
      setTestimonialId(p.id)
      fetchTestimonial(p.id)
    })
  }, [])

  const fetchTestimonial = async (id: string) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`)
      if (!res.ok) throw new Error('Failed to fetch testimonial')
      const data = await res.json()
      setTestimonial(data)
    } catch (err) {
      setError('Failed to load testimonial')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!testimonial || !testimonialId) return

    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial),
      })

      if (!res.ok) throw new Error('Failed to update testimonial')

      router.push('/admin/testimonials')
      router.refresh()
    } catch (err) {
      setError('Failed to save testimonial. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!testimonialId) return

    try {
      const res = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete testimonial')

      router.push('/admin/testimonials')
      router.refresh()
    } catch (err) {
      setError('Failed to delete testimonial. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!testimonial) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-400">Testimonial not found</p>
          <Link href={`/${locale}/admin/testimonials" className="text-green-primary hover:underline">
            Back to testimonials
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-2">Edit Testimonial</h1>
          <p className="text-gray-light">Update testimonial details</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Name */}
            <div>
              <label className="block text-sm mb-2">Client Name *</label>
              <input
                type="text"
                value={testimonial.name}
                onChange={(e) => setTestimonial({ ...testimonial, name: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            {/* Title/Role */}
            <div>
              <label className="block text-sm mb-2">Title/Role *</label>
              <input
                type="text"
                value={testimonial.title}
                onChange={(e) => setTestimonial({ ...testimonial, title: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm mb-2">Location *</label>
              <input
                type="text"
                value={testimonial.location}
                onChange={(e) => setTestimonial({ ...testimonial, location: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            {/* Project */}
            <div>
              <label className="block text-sm mb-2">Project Name *</label>
              <input
                type="text"
                value={testimonial.project}
                onChange={(e) => setTestimonial({ ...testimonial, project: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm mb-2">Rating (1-5) *</label>
              <input
                type="number"
                min="1"
                max="5"
                value={testimonial.rating}
                onChange={(e) => setTestimonial({ ...testimonial, rating: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm mb-2">Display Order</label>
              <input
                type="number"
                value={testimonial.order}
                onChange={(e) => setTestimonial({ ...testimonial, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm mb-2">Client Image URL *</label>
            <input
              type="url"
              value={testimonial.image}
              onChange={(e) => setTestimonial({ ...testimonial, image: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              required
            />
          </div>

          {/* Quote */}
          <div>
            <label className="block text-sm mb-2">Testimonial Quote *</label>
            <textarea
              value={testimonial.quote}
              onChange={(e) => setTestimonial({ ...testimonial, quote: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              required
            />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={testimonial.featured}
                onChange={(e) => setTestimonial({ ...testimonial, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={testimonial.published}
                onChange={(e) => setTestimonial({ ...testimonial, published: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Published</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-dark">
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-green-primary text-black hover:bg-green-vibrant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link
                href={`/${locale}/admin/testimonials"
                className="px-6 py-3 border border-gray-dark text-gray-light hover:text-white hover:border-white transition-colors"
              >
                Cancel
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 border border-red-500 text-red-400 hover:bg-red-900/20 transition-colors"
            >
              Delete
            </button>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-background-card border border-gray-dark p-8 max-w-md">
              <h2 className="text-2xl font-serif mb-4">Delete Testimonial?</h2>
              <p className="text-gray-light mb-6">
                Are you sure you want to delete this testimonial? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-dark hover:border-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
