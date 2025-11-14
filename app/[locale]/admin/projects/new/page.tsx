'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ProjectFormData {
  title: string
  slug: string
  location: string
  category: 'PALACE' | 'VILLA' | 'ESTATE' | 'PENTHOUSE'
  image: string
  gallery: string[]
  description: string
  year: string
  area: string
  budget: string
  materials: string[]
  appliances: string[]
  features: string[]
  duration: string
  challenges: string
  innovations: string[]
  featured: boolean
  published: boolean
  order: number
}

export default function NewProjectPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [project, setProject] = useState<ProjectFormData>({
    title: '',
    slug: '',
    location: '',
    category: 'VILLA',
    image: '',
    gallery: [],
    description: '',
    year: new Date().getFullYear().toString(),
    area: '',
    budget: '',
    materials: [],
    appliances: [],
    features: [],
    duration: '',
    challenges: '',
    innovations: [],
    featured: false,
    published: true,
    order: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      })

      if (!res.ok) throw new Error('Failed to create project')

      router.push('/admin/projects')
      router.refresh()
    } catch (err) {
      setError('Failed to create project. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const updateArrayField = (field: keyof ProjectFormData, value: string) => {
    const items = value.split('\n').filter(item => item.trim())
    setProject({ ...project, [field]: items })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-2">Create New Project</h1>
          <p className="text-gray-light">Add a new portfolio project</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => {
                  setProject({ ...project, title: e.target.value })
                  if (!project.slug) {
                    setProject(prev => ({ ...prev, slug: generateSlug(e.target.value) }))
                  }
                }}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Slug</label>
              <input
                type="text"
                value={project.slug}
                onChange={(e) => setProject({ ...project, slug: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
              <p className="text-xs text-gray-dark mt-1">URL-friendly identifier (auto-generated from title)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Location</label>
                <input
                  type="text"
                  value={project.location}
                  onChange={(e) => setProject({ ...project, location: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="e.g., Dubai, UAE"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Category</label>
                <select
                  value={project.category}
                  onChange={(e) => setProject({ ...project, category: e.target.value as ProjectFormData['category'] })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  required
                >
                  <option value="PALACE">Palace</option>
                  <option value="VILLA">Villa</option>
                  <option value="ESTATE">Estate</option>
                  <option value="PENTHOUSE">Penthouse</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Brief description of the project"
                required
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Images</h2>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Main Image URL</label>
              <input
                type="text"
                value={project.image}
                onChange={(e) => setProject({ ...project, image: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="/images/project-main.jpg"
                required
              />
              <p className="text-xs text-gray-dark mt-1">Primary image for project card</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Gallery URLs (one per line)
              </label>
              <textarea
                value={project.gallery.join('\n')}
                onChange={(e) => updateArrayField('gallery', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none font-mono text-sm"
                placeholder="/image1.jpg&#10;/image2.jpg&#10;/image3.jpg"
              />
              <p className="text-xs text-gray-dark mt-1">Additional images for project gallery</p>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Project Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Year</label>
                <input
                  type="text"
                  value={project.year}
                  onChange={(e) => setProject({ ...project, year: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Area</label>
                <input
                  type="text"
                  value={project.area}
                  onChange={(e) => setProject({ ...project, area: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="1,200 sq ft"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Budget</label>
                <input
                  type="text"
                  value={project.budget}
                  onChange={(e) => setProject({ ...project, budget: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="$500K - $1M"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Duration</label>
                <input
                  type="text"
                  value={project.duration}
                  onChange={(e) => setProject({ ...project, duration: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  placeholder="24 weeks"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Materials (one per line)
              </label>
              <textarea
                value={project.materials.join('\n')}
                onChange={(e) => updateArrayField('materials', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Calacatta Marble&#10;Walnut Cabinetry&#10;Brass Hardware"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Appliances (one per line)
              </label>
              <textarea
                value={project.appliances.join('\n')}
                onChange={(e) => updateArrayField('appliances', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Sub-Zero PRO 48&#10;Wolf Dual Fuel Range&#10;Miele Steam Oven"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Features (one per line)
              </label>
              <textarea
                value={project.features.join('\n')}
                onChange={(e) => updateArrayField('features', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Smart Home Integration&#10;Custom Wine Cellar&#10;Butler's Pantry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Challenges</label>
              <textarea
                value={project.challenges}
                onChange={(e) => setProject({ ...project, challenges: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Describe the main challenges encountered during the project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Innovations (one per line)
              </label>
              <textarea
                value={project.innovations.join('\n')}
                onChange={(e) => updateArrayField('innovations', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                placeholder="Custom marble extraction&#10;Hidden appliance panels&#10;Voice-activated lighting"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Settings</h2>

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) => setProject({ ...project, featured: e.target.checked })}
                  className="w-4 h-4 bg-black border-gray-dark"
                />
                <span className="text-gray-light">Featured Project</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={project.published}
                  onChange={(e) => setProject({ ...project, published: e.target.checked })}
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
                value={project.order}
                onChange={(e) => setProject({ ...project, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
              <p className="text-xs text-gray-dark mt-1">Lower numbers appear first</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            <Link
              href={`/${locale}/admin/projects"
              className="text-gray-light hover:text-green-primary"
            >
              ← Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
