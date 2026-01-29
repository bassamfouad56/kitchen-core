import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const founderData = {
  name: "Eng. Esam Odeh",
  nameAr: "المهندس عصام عودة",
  title: "Founder & Chief Executive Officer",
  titleAr: "المؤسس والرئيس التنفيذي",
  image: "/founder.jpeg",
  bio: `Eng. Esam Odeh leads Kitchen Core with a strategic engineering vision that combines technical precision with comprehensive professional management. His leadership philosophy stems from a deep belief that institutional success begins with attention to detail.

His approach is built on four core pillars:

• Project Management: Precise oversight of all execution phases to ensure project delivery according to the highest standards and on schedule.

• Human Resource Development: Investing in training and qualifying the team, honing their skills to ensure innovative solutions worthy of the company's name.

• Total Quality Management: Strict adherence to international quality standards in manufacturing and material selection, ensuring product sustainability and beauty.

• Customer Satisfaction: Placing customer aspirations at the heart of the design process, building relationships based on transparency and service excellence.

Our Journey of Expansion and Ambition:

Our journey began under Eng. Esam's leadership from the United Arab Emirates, where we established the foundations of excellence and innovation. From there, we expanded to make our mark in the Hashemite Kingdom of Jordan. Today, we continue our rapid growth within the UAE market, with an ambitious vision for expansion into the Gulf region, the Arab world, and beyond to global markets.

At Kitchen Core, we don't just design kitchens — we build a future that transcends geographical boundaries to offer a new concept of elegance and quality everywhere.`,
  bioAr: `يقود المهندس عصام عودة شركة "كيتشن كور" (Kitchen Core) برؤية هندسية استراتيجية تجمع بين الدقة الفنية والاحترافية الإدارية الشاملة. تنطلق فلسفته القيادية من إيمان عميق بأن النجاح المؤسسي يبدأ من التفاصيل، حيث يرتكز نهجه على أربعة محاور أساسية:

• إدارة المشاريع: الإشراف الدقيق على كافة مراحل التنفيذ لضمان تسليم المشاريع وفق أعلى المعايير وفي المواعيد المحددة.

• تطوير الكفاءات البشرية: الاستثمار في تدريب وتأهيل فريق العمل، وصقل مهاراتهم لضمان تقديم حلول مبتكرة تليق باسم الشركة.

• إدارة الجودة الشاملة: الالتزام الصارم بمعايير الجودة العالمية في التصنيع واختيار المواد، لضمان استدامة المنتج وجماله.

• رضى العملاء: وضع تطلعات العميل في قلب العملية التصميمية، وبناء علاقات قائمة على الشفافية والتميز في الخدمة.

مسيرة التوسع والطموح:

انطلقت رحلتنا بقيادة المهندس عصام من دولة الإمارات العربية المتحدة، حيث أرسينا قواعد التميز والابتكار، ومنها توسعنا لنضع بصمتنا في المملكة الأردنية الهاشمية. واليوم، نواصل نمونا المتسارع داخل السوق الإماراتي، واضعين نصب أعيننا رؤية طموحة للتوسع في منطقة الخليج والوطن العربي، وصولاً إلى العالمية.

نحن في "كيتشن كور" لا نصمم مطابخ فحسب، بل نبني مستقبلاً يتجاوز الحدود الجغرافية ليقدم مفهوماً جديداً للأناقة والجودة في كل مكان.`,
  quote: "At Kitchen Core, we don't just design kitchens — we build a future that transcends geographical boundaries to offer a new concept of elegance and quality everywhere.",
  quoteAr: "نحن في كيتشن كور لا نصمم مطابخ فحسب، بل نبني مستقبلاً يتجاوز الحدود الجغرافية ليقدم مفهوماً جديداً للأناقة والجودة في كل مكان.",
  education: [
    "Engineering Degree",
    "Strategic Management",
  ],
  educationAr: [
    "شهادة هندسية",
    "إدارة استراتيجية",
  ],
  recognition: [
    "UAE Market Leader",
    "Jordan Market Expansion",
    "Gulf Region Vision",
  ],
  recognitionAr: [
    "ريادة السوق الإماراتي",
    "التوسع في السوق الأردني",
    "رؤية منطقة الخليج",
  ],
  published: true,
};

export async function GET() {
  try {
    // Delete existing founders
    await prisma.founder.deleteMany();

    // Create new founder
    const founder = await prisma.founder.create({
      data: founderData,
    });

    return NextResponse.json({
      success: true,
      message: "Founder data updated successfully!",
      founder: {
        id: founder.id,
        name: founder.name,
        title: founder.title,
      },
    });
  } catch (error) {
    console.error("Error seeding founder:", error);
    return NextResponse.json(
      { error: "Failed to seed founder", details: String(error) },
      { status: 500 }
    );
  }
}
