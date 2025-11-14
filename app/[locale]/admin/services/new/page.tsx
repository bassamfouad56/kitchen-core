'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewServicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [features, setFeatures] = useState<string[]>([''])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      features: features.filter(f => f.trim()),
      order: parseInt(formData.get('order') as string) || 0,
      published: formData.get('published') === 'on',
    }

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to create service')

      router.push('/admin/services')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create service')
      setLoading(false)
    }
  }

  const addFeature = () => setFeatures([...features, ''])
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index))
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">New Service</h1>
          <p className="text-gray-light">Create a new service offering</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-light mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-light mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
            />
          </div>

          {/* Features */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-light">Features</label>
              <button
                type="button"
                onClick={addFeature}
                className="text-sm text-green-primary hover:text-green-vibrant"
              >
                + Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Feature description"
                    className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-4 py-2 text-gray-light hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order */}
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

          {/* Published */}
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

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-dark">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Service'}
            </button>
            <Link
              href={`/${locale}/admin/services"
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
