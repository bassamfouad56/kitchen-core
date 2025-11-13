import { prisma } from "../prisma";

export interface UITranslations {
  [key: string]: string;
}

/**
 * Get all UI translations for a specific locale
 * Returns a flat object with keys and translated values
 */
export async function getUITranslations(
  locale: "en" | "ar",
): Promise<UITranslations> {
  const translations = await prisma.uITranslation.findMany({
    where: {
      published: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  const result: UITranslations = {};

  translations.forEach((translation) => {
    result[translation.key] =
      locale === "ar" ? translation.textAr : translation.textEn;
  });

  return result;
}

/**
 * Get UI translations by category
 */
export async function getUITranslationsByCategory(
  category: string,
  locale: "en" | "ar",
): Promise<UITranslations> {
  const translations = await prisma.uITranslation.findMany({
    where: {
      category,
      published: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  const result: UITranslations = {};

  translations.forEach((translation) => {
    result[translation.key] =
      locale === "ar" ? translation.textAr : translation.textEn;
  });

  return result;
}

/**
 * Get a single UI translation by key
 */
export async function getUITranslation(
  key: string,
  locale: "en" | "ar",
): Promise<string | null> {
  const translation = await prisma.uITranslation.findUnique({
    where: {
      key,
      published: true,
    },
  });

  if (!translation) return null;

  return locale === "ar" ? translation.textAr : translation.textEn;
}
