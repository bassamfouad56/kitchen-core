import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { iconMap } from '@/lib/icons'

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerServicesPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${locale}/admin/login`)
  }

  const customerServices = await prisma.customerService.findMany({
    orderBy: { order: 'asc' },
  })

  const isArabic = locale === 'ar'

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">
              {isArabic ? 'خدمات العملاء' : 'Customer Services'}
            </h1>
            <p className="text-gray-light">
              {isArabic ? 'إدارة خدمات ما قبل وبعد البيع' : 'Manage pre and post-sales customer services'}
            </p>
          </div>
          <Link
            href={`/${locale}/admin/customer-services/new`}
            className="bg-green-primary text-black px-6 py-3 hover:bg-green-vibrant transition-colors font-medium"
          >
            {isArabic ? '+ خدمة جديدة' : '+ New Service'}
          </Link>
        </div>

        {/* Services List */}
        <div className="bg-background-card border border-gray-dark">
          <table className="w-full">
            <thead className="border-b border-gray-dark">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-light">
                  {isArabic ? 'الترتيب' : 'Order'}
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">
                  {isArabic ? 'الأيقونة' : 'Icon'}
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">
                  {isArabic ? 'العنوان' : 'Title'}
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">
                  {isArabic ? 'الوصف' : 'Description'}
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">
                  {isArabic ? 'الخطوات' : 'Steps'}
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">
                  {isArabic ? 'الحالة' : 'Status'}
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-light">
                  {isArabic ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody>
              {customerServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-dark">
                    {isArabic
                      ? 'لا توجد خدمات عملاء بعد. قم بإنشاء أول خدمة.'
                      : 'No customer services yet. Create your first service.'}
                  </td>
                </tr>
              ) : (
                customerServices.map((service) => {
                  const IconComponent = iconMap[service.icon]
                  return (
                    <tr key={service.id} className="border-b border-gray-dark hover:bg-black/50">
                      <td className="p-4 text-gray-light">{service.order}</td>
                      <td className="p-4">
                        <div className="w-10 h-10 bg-green-primary/10 rounded-lg flex items-center justify-center">
                          {IconComponent ? (
                            <IconComponent className="w-5 h-5 text-green-primary" />
                          ) : (
                            <span className="text-xs text-gray-light">{service.icon}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">
                            {isArabic ? service.titleAr : service.titleEn}
                          </p>
                          <p className="text-xs text-gray-dark">slug: {service.slug}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-light text-sm max-w-xs truncate">
                        {isArabic
                          ? service.descriptionAr.substring(0, 60) + '...'
                          : service.descriptionEn.substring(0, 60) + '...'}
                      </td>
                      <td className="p-4 text-gray-light text-sm">
                        {isArabic
                          ? `${service.stepsAr.length} خطوات`
                          : `${service.stepsEn.length} steps`}
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            service.published
                              ? 'bg-green-primary/20 text-green-primary'
                              : 'bg-gray-dark text-gray-light'
                          }`}
                        >
                          {service.published
                            ? (isArabic ? 'منشور' : 'Published')
                            : (isArabic ? 'مسودة' : 'Draft')}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/${locale}/admin/customer-services/${service.id}`}
                          className="text-green-primary hover:text-green-vibrant text-sm"
                        >
                          {isArabic ? 'تعديل' : 'Edit'}
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
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
