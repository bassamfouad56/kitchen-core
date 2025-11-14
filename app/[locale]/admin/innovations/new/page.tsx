'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewInnovationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      titleEn: formData.get('titleEn'),
      titleAr: formData.get('titleAr'),
      descriptionEn: formData.get('descriptionEn'),
      descriptionAr: formData.get('descriptionAr'),
      icon: formData.get('icon'),
      order: parseInt(formData.get('order') as string) || 0,
      published: formData.get('published') === 'on',
    }

    try {
      const res = await fetch('/api/innovations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to create innovation')

      router.push('/admin/innovations')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create innovation')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">New Innovation</h1>
          <p className="text-gray-light">Create a new innovation feature (bilingual)</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* English Fields */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-xl font-serif mb-4 text-green-primary">English Content</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="titleEn" className="block text-sm font-medium text-gray-light mb-2">
                  Title (English) *
                </label>
                <input
                  type="text"
                  id="titleEn"
                  name="titleEn"
                  required
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="descriptionEn" className="block text-sm font-medium text-gray-light mb-2">
                  Description (English) *
                </label>
                <textarea
                  id="descriptionEn"
                  name="descriptionEn"
                  required
                  rows={4}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Arabic Fields */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-xl font-serif mb-4 text-green-primary">Arabic Content (المحتوى العربي)</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="titleAr" className="block text-sm font-medium text-gray-light mb-2">
                  Title (Arabic) * (العنوان)
                </label>
                <input
                  type="text"
                  id="titleAr"
                  name="titleAr"
                  required
                  dir="rtl"
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="descriptionAr" className="block text-sm font-medium text-gray-light mb-2">
                  Description (Arabic) * (الوصف)
                </label>
                <textarea
                  id="descriptionAr"
                  name="descriptionAr"
                  required
                  rows={4}
                  dir="rtl"
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Meta Fields */}
          <div className="border border-gray-dark p-6">
            <h2 className="text-xl font-serif mb-4">Settings</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-light mb-2">
                  Icon Name
                  <span className="text-xs text-gray-dark ml-2">(e.g., "smart-home", "ai-powered")</span>
                </label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-light mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  defaultValue={0}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  defaultChecked
                  className="w-4 h-4"
                />
                <label htmlFor="published" className="text-sm text-gray-light">
                  Published
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-dark">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Innovation'}
            </button>
            <Link
              href={`/${locale}/admin/innovations"
              className="bg-background-card border border-gray-dark px-6 py-3 hover:border-green-primary transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
