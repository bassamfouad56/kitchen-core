'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useToast } from '../../components/Toast'
import { useConfirm } from '../../components/ConfirmModal'
import { useLocale } from 'next-intl'

interface ProductServiceImage {
  id: string
  src: string
  altEn: string | null
  altAr: string | null
  order: number
}

interface ProductService {
  id: string
  slug: string
  categoryKey: string
  dbCategory: string
  titleEn: string
  titleAr: string
  taglineEn: string
  taglineAr: string
  descriptionEn: string
  descriptionAr: string
  heroImage: string
  featuresEn: string[]
  featuresAr: string[]
  benefitsEn: string[]
  benefitsAr: string[]
  order: number
  published: boolean
  images: ProductServiceImage[]
}

const categoryOptions = [
  { value: 'MODERN_WOODEN', label: 'Modern Wooden', labelAr: 'خشب عصري' },
  { value: 'CLASSIC_WOODEN', label: 'Classic Wooden', labelAr: 'خشب كلاسيكي' },
  { value: 'ALUMINUM', label: 'Aluminum', labelAr: 'ألمنيوم' },
  { value: 'BEDROOMS', label: 'Bedrooms', labelAr: 'غرف نوم' },
]

export default function EditProductServicePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const { showToast } = useToast()
  const { confirm } = useConfirm()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [service, setService] = useState<ProductService | null>(null)
  const [featuresEn, setFeaturesEn] = useState<string[]>([''])
  const [featuresAr, setFeaturesAr] = useState<string[]>([''])
  const [benefitsEn, setBenefitsEn] = useState<string[]>([''])
  const [benefitsAr, setBenefitsAr] = useState<string[]>([''])
  const [activeTab, setActiveTab] = useState<'details' | 'images'>('details')

  useEffect(() => {
    fetchService()
  }, [id])

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/product-services/${id}`)
      if (!res.ok) throw new Error('Failed to fetch service')
      const data = await res.json()
      setService(data)
      setFeaturesEn(data.featuresEn.length > 0 ? data.featuresEn : [''])
      setFeaturesAr(data.featuresAr.length > 0 ? data.featuresAr : [''])
      setBenefitsEn(data.benefitsEn.length > 0 ? data.benefitsEn : [''])
      setBenefitsAr(data.benefitsAr.length > 0 ? data.benefitsAr : [''])
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
      slug: formData.get('slug'),
      categoryKey: formData.get('categoryKey'),
      dbCategory: formData.get('dbCategory'),
      titleEn: formData.get('titleEn'),
      titleAr: formData.get('titleAr'),
      taglineEn: formData.get('taglineEn'),
      taglineAr: formData.get('taglineAr'),
      descriptionEn: formData.get('descriptionEn'),
      descriptionAr: formData.get('descriptionAr'),
      heroImage: formData.get('heroImage'),
      featuresEn: featuresEn.filter(f => f.trim()),
      featuresAr: featuresAr.filter(f => f.trim()),
      benefitsEn: benefitsEn.filter(b => b.trim()),
      benefitsAr: benefitsAr.filter(b => b.trim()),
      order: parseInt(formData.get('order') as string) || 0,
      published: formData.get('published') === 'on',
    }

    try {
      const res = await fetch(`/api/product-services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to update service')
      }

      showToast({ type: 'success', message: isArabic ? 'تم حفظ الخدمة بنجاح' : 'Service saved successfully' })
      router.push(`/${locale}/admin/product-services`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service')
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: isArabic ? 'حذف الخدمة' : 'Delete Service',
      message: isArabic
        ? 'هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.'
        : 'Are you sure you want to delete this service? This action cannot be undone.',
      confirmText: isArabic ? 'حذف' : 'Delete',
      cancelText: isArabic ? 'إلغاء' : 'Cancel',
      type: 'danger',
    })

    if (!confirmed) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/product-services/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete service')

      showToast({ type: 'success', message: isArabic ? 'تم حذف الخدمة بنجاح' : 'Service deleted successfully' })
      router.push(`/${locale}/admin/product-services`)
      router.refresh()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete service'
      setError(errorMessage)
      showToast({ type: 'error', message: errorMessage })
      setDeleting(false)
    }
  }

  // Array management helpers
  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ''])
  }
  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index))
  }
  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const newItems = [...prev]
      newItems[index] = value
      return newItems
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-gray-light">{isArabic ? 'جاري التحميل...' : 'Loading...'}</div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4">
            {isArabic ? 'الخدمة غير موجودة' : 'Service not found'}
          </div>
          <Link href={`/${locale}/admin/product-services`} className="text-green-primary hover:text-green-vibrant mt-4 inline-block">
            {isArabic ? '← العودة إلى الخدمات' : '← Back to Product Services'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">
            {isArabic ? 'تعديل خدمة المنتج' : 'Edit Product Service'}
          </h1>
          <p className="text-gray-light">
            {isArabic ? service.titleAr : service.titleEn}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 mb-6">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-dark">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-2 text-sm font-medium transition-colors ${
              activeTab === 'details'
                ? 'text-green-primary border-b-2 border-green-primary'
                : 'text-gray-light hover:text-white'
            }`}
          >
            {isArabic ? 'التفاصيل' : 'Details'}
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`pb-3 px-2 text-sm font-medium transition-colors ${
              activeTab === 'images'
                ? 'text-green-primary border-b-2 border-green-primary'
                : 'text-gray-light hover:text-white'
            }`}
          >
            {isArabic ? 'الصور' : 'Images'} ({service.images.length})
          </button>
        </div>

        {activeTab === 'details' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Slug */}
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-light mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  defaultValue={service.slug}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              {/* Category Key */}
              <div>
                <label htmlFor="categoryKey" className="block text-sm font-medium text-gray-light mb-2">
                  Category Key *
                </label>
                <input
                  type="text"
                  id="categoryKey"
                  name="categoryKey"
                  required
                  defaultValue={service.categoryKey}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>

              {/* DB Category */}
              <div>
                <label htmlFor="dbCategory" className="block text-sm font-medium text-gray-light mb-2">
                  {isArabic ? 'فئة قاعدة البيانات' : 'Database Category'} *
                </label>
                <select
                  id="dbCategory"
                  name="dbCategory"
                  required
                  defaultValue={service.dbCategory}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                >
                  {categoryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {isArabic ? opt.labelAr : opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Order */}
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-light mb-2">
                  {isArabic ? 'ترتيب العرض' : 'Display Order'}
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  defaultValue={service.order}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="titleEn" className="block text-sm font-medium text-gray-light mb-2">
                  Title (English) *
                </label>
                <input
                  type="text"
                  id="titleEn"
                  name="titleEn"
                  required
                  defaultValue={service.titleEn}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="titleAr" className="block text-sm font-medium text-gray-light mb-2">
                  العنوان (بالعربية) *
                </label>
                <input
                  type="text"
                  id="titleAr"
                  name="titleAr"
                  required
                  dir="rtl"
                  defaultValue={service.titleAr}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Taglines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="taglineEn" className="block text-sm font-medium text-gray-light mb-2">
                  Tagline (English) *
                </label>
                <input
                  type="text"
                  id="taglineEn"
                  name="taglineEn"
                  required
                  defaultValue={service.taglineEn}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="taglineAr" className="block text-sm font-medium text-gray-light mb-2">
                  الشعار (بالعربية) *
                </label>
                <input
                  type="text"
                  id="taglineAr"
                  name="taglineAr"
                  required
                  dir="rtl"
                  defaultValue={service.taglineAr}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="descriptionEn" className="block text-sm font-medium text-gray-light mb-2">
                  Description (English) *
                </label>
                <textarea
                  id="descriptionEn"
                  name="descriptionEn"
                  required
                  rows={4}
                  defaultValue={service.descriptionEn}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="descriptionAr" className="block text-sm font-medium text-gray-light mb-2">
                  الوصف (بالعربية) *
                </label>
                <textarea
                  id="descriptionAr"
                  name="descriptionAr"
                  required
                  dir="rtl"
                  rows={4}
                  defaultValue={service.descriptionAr}
                  className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Hero Image */}
            <div>
              <label htmlFor="heroImage" className="block text-sm font-medium text-gray-light mb-2">
                {isArabic ? 'صورة الغلاف' : 'Hero Image URL'} *
              </label>
              <input
                type="text"
                id="heroImage"
                name="heroImage"
                required
                defaultValue={service.heroImage}
                className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
              />
              {service.heroImage && (
                <div className="mt-2 relative h-32 w-48">
                  <Image
                    src={service.heroImage}
                    alt="Hero preview"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>

            {/* Features English */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-light">
                  Features (English)
                </label>
                <button
                  type="button"
                  onClick={() => addItem(setFeaturesEn)}
                  className="text-sm text-green-primary hover:text-green-vibrant"
                >
                  + Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {featuresEn.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateItem(setFeaturesEn, index, e.target.value)}
                      placeholder="Feature description"
                      className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(setFeaturesEn, index)}
                      className="px-4 py-2 text-gray-light hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Arabic */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-light">
                  المميزات (بالعربية)
                </label>
                <button
                  type="button"
                  onClick={() => addItem(setFeaturesAr)}
                  className="text-sm text-green-primary hover:text-green-vibrant"
                >
                  + أضف ميزة
                </button>
              </div>
              <div className="space-y-2">
                {featuresAr.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      dir="rtl"
                      onChange={(e) => updateItem(setFeaturesAr, index, e.target.value)}
                      placeholder="وصف الميزة"
                      className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(setFeaturesAr, index)}
                      className="px-4 py-2 text-gray-light hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits English */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-light">
                  Benefits (English)
                </label>
                <button
                  type="button"
                  onClick={() => addItem(setBenefitsEn)}
                  className="text-sm text-green-primary hover:text-green-vibrant"
                >
                  + Add Benefit
                </button>
              </div>
              <div className="space-y-2">
                {benefitsEn.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateItem(setBenefitsEn, index, e.target.value)}
                      placeholder="Benefit description"
                      className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(setBenefitsEn, index)}
                      className="px-4 py-2 text-gray-light hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Arabic */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-light">
                  الفوائد (بالعربية)
                </label>
                <button
                  type="button"
                  onClick={() => addItem(setBenefitsAr)}
                  className="text-sm text-green-primary hover:text-green-vibrant"
                >
                  + أضف فائدة
                </button>
              </div>
              <div className="space-y-2">
                {benefitsAr.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={benefit}
                      dir="rtl"
                      onChange={(e) => updateItem(setBenefitsAr, index, e.target.value)}
                      placeholder="وصف الفائدة"
                      className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(setBenefitsAr, index)}
                      className="px-4 py-2 text-gray-light hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
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
                {isArabic ? 'منشور' : 'Published'}
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
                {deleting
                  ? (isArabic ? 'جاري الحذف...' : 'Deleting...')
                  : (isArabic ? 'حذف الخدمة' : 'Delete Service')}
              </button>
              <div className="flex gap-4">
                <Link
                  href={`/${locale}/admin/product-services`}
                  className="bg-background-card border border-gray-dark px-6 py-3 hover:border-green-primary transition-colors"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50"
                >
                  {saving
                    ? (isArabic ? 'جاري الحفظ...' : 'Saving...')
                    : (isArabic ? 'حفظ التغييرات' : 'Save Changes')}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Images Tab */
          <div>
            <div className="mb-6">
              <p className="text-gray-light text-sm">
                {isArabic
                  ? `إجمالي ${service.images.length} صورة في معرض هذه الخدمة`
                  : `Total ${service.images.length} images in this service gallery`}
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {service.images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="relative aspect-square bg-gray-dark rounded overflow-hidden">
                    <Image
                      src={image.src}
                      alt={isArabic ? (image.altAr || '') : (image.altEn || '')}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs text-white">#{image.order}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-light mt-1 truncate">
                    {image.src.split('/').pop()}
                  </p>
                </div>
              ))}
            </div>

            {service.images.length === 0 && (
              <div className="bg-background-card border border-gray-dark p-8 text-center text-gray-light">
                {isArabic ? 'لا توجد صور لهذه الخدمة' : 'No images for this service'}
              </div>
            )}

            {/* Back Link */}
            <div className="mt-8">
              <Link href={`/${locale}/admin/product-services`} className="text-gray-light hover:text-green-primary text-sm">
                {isArabic ? '← العودة إلى الخدمات' : '← Back to Product Services'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
