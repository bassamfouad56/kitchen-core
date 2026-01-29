'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import MultipleImageUpload from '@/app/components/MultipleImageUpload'
import RichTextEditor from '@/app/components/RichTextEditor'

interface Project {
  id: string
  titleEn: string
  titleAr: string
  slug: string
  location: string
  category: 'MODERN_WOODEN' | 'CLASSIC_WOODEN' | 'ALUMINUM' | 'BEDROOMS'
  image: string
  gallery: string[]
  descriptionEn: string
  descriptionAr: string
  year: string
  area: string
  budget: string
  materials: string[]
  appliances: string[]
  features: string[]
  duration: string
  challengesEn: string
  challengesAr: string
  innovations: string[]
  featured: boolean
  published: boolean
  order: number
}

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId)
    }
  }, [projectId])

  const fetchProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`)
      if (!res.ok) throw new Error('Failed to fetch project')
      const json = await res.json()
      // API returns { success: true, data: project }
      setProject(json.data || json)
    } catch (err) {
      setError('Failed to load project')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project || !projectId) return

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      })

      if (!res.ok) {
        let errorMessage = 'Failed to update project'
        try {
          const data = await res.json()
          errorMessage = data.error || data.message || errorMessage
        } catch {
          errorMessage = `Server error: ${res.status} ${res.statusText}`
        }
        throw new Error(errorMessage)
      }

      setSuccess('Project updated successfully!')
      setTimeout(() => {
        router.push(`/${locale}/admin/projects`)
        router.refresh()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!projectId) return

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete project')

      router.push(`/${locale}/admin/projects`)
      router.refresh()
    } catch (err) {
      setError('Failed to delete project')
      setShowDeleteModal(false)
    }
  }

  const updateArrayField = (field: keyof Project, value: string) => {
    if (!project) return
    const items = value.split('\n').filter(item => item.trim())
    setProject({ ...project, [field]: items })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-light">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>
          <div className="text-xl mb-4">Project not found</div>
          <Link href={`/${locale}/admin/projects`} className="text-green-primary hover:text-green-vibrant">
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Edit Project</h1>
            <p className="text-gray-light">{project.titleEn || project.titleAr}</p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            Delete Project
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 text-green-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Title (English)</label>
              <input
                type="text"
                value={project.titleEn}
                onChange={(e) => setProject({ ...project, titleEn: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Title (Arabic)</label>
              <input
                type="text"
                value={project.titleAr}
                onChange={(e) => setProject({ ...project, titleAr: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none text-right"
                dir="rtl"
                placeholder="العنوان بالعربية"
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Location</label>
                <input
                  type="text"
                  value={project.location}
                  onChange={(e) => setProject({ ...project, location: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Category</label>
                <select
                  value={project.category}
                  onChange={(e) => setProject({ ...project, category: e.target.value as Project['category'] })}
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  required
                >
                  <option value="MODERN_WOODEN">Modern Wooden</option>
                  <option value="CLASSIC_WOODEN">Classic Wooden</option>
                  <option value="ALUMINUM">Aluminum</option>
                  <option value="BEDROOMS">Bedrooms</option>
                </select>
              </div>
            </div>

            <div>
              <RichTextEditor
                label="Description (English)"
                value={project.descriptionEn}
                onChange={(html) => setProject({ ...project, descriptionEn: html })}
                placeholder="Brief description of the project..."
                minHeight="150px"
              />
            </div>

            <div>
              <RichTextEditor
                label="Description (Arabic)"
                value={project.descriptionAr}
                onChange={(html) => setProject({ ...project, descriptionAr: html })}
                placeholder="وصف المشروع بالعربية..."
                minHeight="150px"
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-6">
            <h2 className="text-xl font-serif mb-4 text-white">Images</h2>

            <div>
              <ImageUpload
                label="Main Project Image"
                helperText="Primary image shown on project cards (Recommended: 1920x1080px)"
                value={project.image}
                onChange={(url) => setProject({ ...project, image: url })}
                onDelete={() => setProject({ ...project, image: '' })}
                aspectRatio="16/9"
                maxSize={10}
                className="bg-black"
              />
            </div>

            <div>
              <MultipleImageUpload
                label="Project Gallery"
                helperText="Additional images for the project gallery (drag to reorder)"
                value={project.gallery}
                onChange={(urls) => setProject({ ...project, gallery: urls })}
                maxImages={15}
                maxSize={10}
                className="bg-black"
              />
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
                  placeholder="e.g., 1,200 sq ft"
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
                  placeholder="e.g., $500K - $1M"
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
                  placeholder="e.g., 24 weeks"
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
              />
            </div>

            <div>
              <RichTextEditor
                label="Challenges (English)"
                value={project.challengesEn}
                onChange={(html) => setProject({ ...project, challengesEn: html })}
                placeholder="Key challenges faced during the project..."
                minHeight="120px"
              />
            </div>

            <div>
              <RichTextEditor
                label="Challenges (Arabic)"
                value={project.challengesAr}
                onChange={(html) => setProject({ ...project, challengesAr: html })}
                placeholder="التحديات التي واجهت المشروع..."
                minHeight="120px"
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
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-background-card border border-gray-dark p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Settings</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) => setProject({ ...project, featured: e.target.checked })}
                  className="w-4 h-4 bg-black border-gray-dark"
                />
                <span className="text-gray-light">Featured Project</span>
              </label>

              <label className="flex items-center gap-3">
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
              href={`/${locale}/admin/projects`}
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
              <h3 className="text-xl font-serif mb-4">Delete Project?</h3>
              <p className="text-gray-light mb-6">
                Are you sure you want to delete &quot;{project.titleEn || project.titleAr}&quot;? This action cannot be undone.
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
