import { prisma } from '../prisma';

export async function getCompanySettings() {
  try {
    // Get the first (and should be only) company record
    const company = await prisma.company.findFirst({
      select: {
        phone: true,
        email: true,
        whatsappNumber: true,
        instagramUrl: true,
        facebookUrl: true,
        linkedinUrl: true,
        twitterUrl: true,
        youtubeUrl: true,
        tiktokUrl: true,
      },
    });

    return company;
  } catch (error) {
    console.error('Error fetching company settings:', error);
    return null;
  }
}

export async function updateCompanySocialMedia(data: {
  whatsappNumber?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  phone?: string;
  email?: string;
}) {
  try {
    // Update the first company record, or create if doesn't exist
    const company = await prisma.company.upsert({
      where: { id: 'default' },
      create: {
        id: 'default',
        nameEn: 'Kitchen Core',
        nameAr: 'كيتشن كور',
        descriptionEn: 'Premium luxury kitchen and interior design services',
        descriptionAr: 'خدمات تصميم المطابخ والديكور الداخلي الفاخرة',
        valuesEn: [],
        valuesAr: [],
        ...data,
      },
      update: data,
    });

    return company;
  } catch (error) {
    console.error('Error updating company social media:', error);
    throw error;
  }
}
