'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useToast } from '../../components/Toast'
import { useConfirm } from '../../components/ConfirmModal'
import { useLocale } from 'next-intl'
import { getIconNames, iconMap } from '@/lib/icons'

interface CustomerService {
  id: string
  slug: string
  icon: string
  titleEn: string
  titleAr: string
  taglineEn: string
  taglineAr: string
  descriptionEn: string
  descriptionAr: string
  image: string
  stepsEn: string[]
  stepsAr: string[]
  benefitsEn: string[]
  benefitsAr: string[]
  order: number
  published: boolean
}

export default function EditCustomerServicePage() {
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
  const [service, setService] = useState<CustomerService | null>(null)
  const [stepsEn, setStepsEn] = useState<string[]>([''])
  const [stepsAr, setStepsAr] = useState<string[]>([''])
  const [benefitsEn, setBenefitsEn] = useState<string[]>([''])
  const [benefitsAr, setBenefitsAr] = useState<string[]>([''])
  const [selectedIcon, setSelectedIcon] = useState('')

  const iconNames = getIconNames()

  useEffect(() => {
    fetchService()
  }, [id])

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/customer-services/${id}`)
      if (!res.ok) throw new Error('Failed to fetch service')
      const data = await res.json()
      setService(data)
      setStepsEn(data.stepsEn.length > 0 ? data.stepsEn : [''])
      setStepsAr(data.stepsAr.length > 0 ? data.stepsAr : [''])
      setBenefitsEn(data.benefitsEn.length > 0 ? data.benefitsEn : [''])
      setBenefitsAr(data.benefitsAr.length > 0 ? data.benefitsAr : [''])
      setSelectedIcon(data.icon)
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
      icon: selectedIcon,
      titleEn: formData.get('titleEn'),
      titleAr: formData.get('titleAr'),
      taglineEn: formData.get('taglineEn') || '',
      taglineAr: formData.get('taglineAr') || '',
      descriptionEn: formData.get('descriptionEn'),
      descriptionAr: formData.get('descriptionAr'),
      image: formData.get('image') || '',
      stepsEn: stepsEn.filter(s => s.trim()),
      stepsAr: stepsAr.filter(s => s.trim()),
      benefitsEn: benefitsEn.filter(b => b.trim()),
      benefitsAr: benefitsAr.filter(b => b.trim()),
      order: parseInt(formData.get('order') as string) || 0,
      published: formData.get('published') === 'on',
    }

    try {
      const res = await fetch(`/api/customer-services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to update service')
      }

      showToast({ type: 'success', message: isArabic ? 'تم حفظ الخدمة بنجاح' : 'Service saved successfully' })
      router.push(`/${locale}/admin/customer-services`)
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
      const res = await fetch(`/api/customer-services/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete service')

      showToast({ type: 'success', message: isArabic ? 'تم حذف الخدمة بنجاح' : 'Service deleted successfully' })
      router.push(`/${locale}/admin/customer-services`)
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
          <Link href={`/${locale}/admin/customer-services`} className="text-green-primary hover:text-green-vibrant mt-4 inline-block">
            {isArabic ? '← العودة إلى الخدمات' : '← Back to Customer Services'}
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = iconMap[selectedIcon]

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">
            {isArabic ? 'تعديل خدمة العملاء' : 'Edit Customer Service'}
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

          {/* Icon Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-light mb-2">
              {isArabic ? 'الأيقونة' : 'Icon'} *
            </label>
            <div className="flex items-start gap-4">
              {/* Selected Icon Preview */}
              <div className="w-16 h-16 bg-green-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {IconComponent ? (
                  <IconComponent className="w-8 h-8 text-green-primary" />
                ) : (
                  <span className="text-xs text-gray-light">{selectedIcon}</span>
                )}
              </div>

              {/* Icon Grid */}
              <div className="flex-1 grid grid-cols-8 gap-2 max-h-32 overflow-y-auto p-2 bg-background-card border border-gray-dark rounded">
                {iconNames.map((name) => {
                  const Icon = iconMap[name]
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelectedIcon(name)}
                      className={`p-2 rounded transition-colors ${
                        selectedIcon === name
                          ? 'bg-green-primary/20 text-green-primary'
                          : 'hover:bg-gray-dark text-gray-light'
                      }`}
                      title={name}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </button>
                  )
                })}
              </div>
            </div>
            <p className="text-xs text-gray-dark mt-1">
              {isArabic ? `الأيقونة المحددة: ${selectedIcon}` : `Selected: ${selectedIcon}`}
            </p>
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
                Tagline (English)
              </label>
              <input
                type="text"
                id="taglineEn"
                name="taglineEn"
                defaultValue={service.taglineEn}
                className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="taglineAr" className="block text-sm font-medium text-gray-light mb-2">
                الشعار (بالعربية)
              </label>
              <input
                type="text"
                id="taglineAr"
                name="taglineAr"
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

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-light mb-2">
              {isArabic ? 'رابط الصورة' : 'Image URL'}
            </label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={service.image}
              className="w-full bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
            />
            {service.image && (
              <div className="mt-2 relative h-32 w-48">
                <Image
                  src={service.image}
                  alt="Service preview"
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* Steps English */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-light">
                Process Steps (English)
              </label>
              <button
                type="button"
                onClick={() => addItem(setStepsEn)}
                className="text-sm text-green-primary hover:text-green-vibrant"
              >
                + Add Step
              </button>
            </div>
            <div className="space-y-2">
              {stepsEn.map((step, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="text-gray-dark text-sm w-6">{index + 1}.</span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => updateItem(setStepsEn, index, e.target.value)}
                    placeholder="Step description"
                    className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setStepsEn, index)}
                    className="px-4 py-2 text-gray-light hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Steps Arabic */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-light">
                خطوات العملية (بالعربية)
              </label>
              <button
                type="button"
                onClick={() => addItem(setStepsAr)}
                className="text-sm text-green-primary hover:text-green-vibrant"
              >
                + أضف خطوة
              </button>
            </div>
            <div className="space-y-2">
              {stepsAr.map((step, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="text-gray-dark text-sm w-6">{index + 1}.</span>
                  <input
                    type="text"
                    value={step}
                    dir="rtl"
                    onChange={(e) => updateItem(setStepsAr, index, e.target.value)}
                    placeholder="وصف الخطوة"
                    className="flex-1 bg-background-card border border-gray-dark px-4 py-2 text-white focus:border-green-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setStepsAr, index)}
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
                href={`/${locale}/admin/customer-services`}
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
      </div>
    </div>
  )
}
