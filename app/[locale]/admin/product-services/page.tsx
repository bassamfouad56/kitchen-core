import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProductServicesPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${locale}/admin/login`)
  }

  const productServices = await prisma.productService.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { images: true }
      }
    }
  })

  const isArabic = locale === 'ar'

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              {isArabic ? 'خدمات المنتجات' : 'Product Services'}
            </h1>
            <p className="text-gray-light">
              {isArabic ? 'إدارة فئات خدمات المنتجات (المطابخ وغرف النوم)' : 'Manage product service categories (kitchens & bedrooms)'}
            </p>
          </div>
          <Link
            href={`/${locale}/admin/product-services/new`}
            className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium"
          >
            {isArabic ? '+ خدمة جديدة' : '+ New Service'}
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productServices.length === 0 ? (
            <div className="col-span-2 bg-background-card border border-gray-dark p-8 text-center text-gray-light">
              {isArabic ? 'لا توجد خدمات بعد. قم بإنشاء أول خدمة.' : 'No product services yet. Create your first service.'}
            </div>
          ) : (
            productServices.map((service) => (
              <Link
                key={service.id}
                href={`/${locale}/admin/product-services/${service.id}`}
                className="group bg-background-card border border-gray-dark hover:border-green-primary transition-all overflow-hidden"
              >
                {/* Hero Image */}
                <div className="relative h-48 bg-gray-dark">
                  {service.heroImage ? (
                    <Image
                      src={service.heroImage}
                      alt={isArabic ? service.titleAr : service.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-light">
                      {isArabic ? 'لا توجد صورة' : 'No Image'}
                    </div>
                  )}
                  {/* Status Badge */}
                  <span
                    className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} text-xs px-2 py-1 rounded ${
                      service.published
                        ? 'bg-green-primary/20 text-green-primary'
                        : 'bg-gray-dark text-gray-light'
                    }`}
                  >
                    {service.published
                      ? (isArabic ? 'منشور' : 'Published')
                      : (isArabic ? 'مسودة' : 'Draft')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-green-primary transition-colors">
                      {isArabic ? service.titleAr : service.titleEn}
                    </h3>
                    <span className="text-xs text-gray-light bg-background-card border border-gray-dark px-2 py-1">
                      #{service.order}
                    </span>
                  </div>
                  <p className="text-sm text-gray-light mb-4">
                    {isArabic ? service.taglineAr : service.taglineEn}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 text-xs text-gray-light">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {service._count.images} {isArabic ? 'صورة' : 'images'}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {service.featuresEn.length} {isArabic ? 'ميزة' : 'features'}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.benefitsEn.length} {isArabic ? 'فائدة' : 'benefits'}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-dark">
                    <span className="text-xs px-2 py-1 bg-green-primary/10 text-green-primary">
                      {service.dbCategory.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-dark ms-2">
                      slug: {service.slug}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link href={`/${locale}/admin`} className="text-gray-light hover:text-green-primary text-sm">
            {isArabic ? '← العودة إلى لوحة التحكم' : '← Back to Dashboard'}
          </Link>
        </div>
      </div>
    </div>
  )
}
