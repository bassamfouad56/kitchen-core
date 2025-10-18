'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [service, setService] = useState<{
    id: string;
    title: string;
    description: string;
    features: string[];
    order: number;
    published: boolean;
  } | null>(null)
  const [features, setFeatures] = useState<string[]>([''])

  useEffect(() => {
    fetchService()
  }, [id])

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/services/${id}`)
      if (!res.ok) throw new Error('Failed to fetch service')
      const data = await res.json()
      setService(data)
      setFeatures(data.features.length > 0 ? data.features : [''])
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load service')
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
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
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to update service')

      router.push('/admin/services')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service')
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this service?')) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete service')

      router.push('/admin/services')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete service')
      setDeleting(false)
    }
  }

  const addFeature = () => setFeatures([...features, ''])
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index))
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-gray-light">Loading...</div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4">
            Service not found
          </div>
          <Link href="/admin/services" className="text-green-primary hover:text-green-vibrant mt-4 inline-block">
            ← Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">Edit Service</h1>
          <p className="text-gray-light">Update service details</p>
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
              defaultValue={service.title}
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
              defaultValue={service.description}
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
              defaultValue={service.order}
              className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
            />
          </div>

          {/* Published */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              name="published"
              defaultChecked={service.published}
              className="w-4 h-4"
            />
            <label htmlFor="published" className="text-sm text-gray-light">
              Published
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-dark">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-500 hover:text-red-400 text-sm disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete Service'}
            </button>
            <div className="flex gap-4">
              <Link
                href="/admin/services"
                className="bg-background-card border border-gray-dark px-6 py-3 hover:border-green-primary transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
