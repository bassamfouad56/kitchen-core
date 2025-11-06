'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface TestimonialFormData {
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

export default function NewTestimonialPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [testimonial, setTestimonial] = useState<TestimonialFormData>({
    name: '',
    title: '',
    location: '',
    image: '',
    quote: '',
    rating: 5,
    project: '',
    featured: false,
    published: true,
    order: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial),
      })

      if (!res.ok) throw new Error('Failed to create testimonial')

      router.push('/admin/testimonials')
      router.refresh()
    } catch (err) {
      setError('Failed to create testimonial. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-2">Create New Testimonial</h1>
          <p className="text-gray-light">Add a new client testimonial</p>
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
                placeholder="e.g., CEO, Homeowner"
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
                placeholder="e.g., Dubai, UAE"
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
                placeholder="e.g., Dubai Palace Kitchen"
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
              placeholder="https://..."
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
              placeholder="Enter the client's testimonial..."
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
          <div className="flex gap-4 pt-6 border-t border-gray-dark">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-green-primary text-black hover:bg-green-vibrant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Creating...' : 'Create Testimonial'}
            </button>
            <Link
              href="/admin/testimonials"
              className="px-6 py-3 border border-gray-dark text-gray-light hover:text-white hover:border-white transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
