import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSocialMedia() {
  try {
    console.log('Updating social media links...');

    // Update or create company record with social media links
    const company = await prisma.company.upsert({
      where: { id: 'default' },
      create: {
        id: 'default',
        nameEn: 'Kitchen Core',
        nameAr: 'كيتشن كور',
        descriptionEn: 'Premium luxury kitchen and interior design services in the UAE',
        descriptionAr: 'خدمات تصميم المطابخ والديكور الداخلي الفاخرة في الإمارات',
        valuesEn: [],
        valuesAr: [],
        whatsappNumber: '+971567888640',
        instagramUrl: 'https://www.instagram.com/kitchen_core_uae',
        phone: '+971567888640',
        email: 'info@kitchencore.ae',
      },
      update: {
        whatsappNumber: '+971567888640',
        instagramUrl: 'https://www.instagram.com/kitchen_core_uae',
        phone: '+971567888640',
        email: 'info@kitchencore.ae',
      },
    });

    console.log('✅ Social media links updated successfully!');
    console.log(company);
  } catch (error) {
    console.error('❌ Error updating social media:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSocialMedia();
