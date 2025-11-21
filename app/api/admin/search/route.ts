import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim().toLowerCase();

    // Search across multiple content types in parallel
    const [projects, users, customers, uiTranslations] = await Promise.all([
      // Search Projects
      prisma.project.findMany({
        where: {
          OR: [
            { titleEn: { contains: searchTerm, mode: "insensitive" } },
            { titleAr: { contains: searchTerm, mode: "insensitive" } },
            { descriptionEn: { contains: searchTerm, mode: "insensitive" } },
            { location: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          titleEn: true,
          descriptionEn: true,
          category: true,
        },
        take: 10,
      }),

      // Search Users
      prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
        take: 10,
      }),

      // Search Customers
      prisma.customer.findMany({
        where: {
          OR: [
            { firstName: { contains: searchTerm, mode: "insensitive" } },
            { lastName: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
            { phone: { contains: searchTerm, mode: "insensitive" } },
            { company: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          company: true,
        },
        take: 10,
      }),

      // Search UITranslations
      prisma.uITranslation.findMany({
        where: {
          OR: [
            { key: { contains: searchTerm, mode: "insensitive" } },
            { textEn: { contains: searchTerm, mode: "insensitive" } },
            { textAr: { contains: searchTerm, mode: "insensitive" } },
            { category: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          key: true,
          textEn: true,
          textAr: true,
          category: true,
        },
        take: 10,
      }),
    ]);

    // Transform results into unified format
    const results = [
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        title: project.titleEn,
        description: project.descriptionEn?.substring(0, 150),
        type: "project" as const,
        url: `/en/admin/projects`,
        category: project.category,
      })),

      ...users.map((user) => ({
        id: `user-${user.id}`,
        title: user.name || user.email,
        description: user.email,
        type: "user" as const,
        url: `/en/admin/users/${user.id}`,
        category: user.role,
      })),

      ...customers.map((customer) => ({
        id: `customer-${customer.id}`,
        title: `${customer.firstName} ${customer.lastName}`,
        description: customer.email,
        type: "customer" as const,
        url: `/en/admin/customers/${customer.id}`,
        category: customer.company || undefined,
      })),

      ...uiTranslations.map((translation) => ({
        id: `translation-${translation.id}`,
        title: translation.key,
        description: `EN: ${translation.textEn?.substring(0, 100)}`,
        type: "translation" as const,
        url: `/en/admin/translations`,
        category: translation.category,
      })),
    ];

    // Sort results by relevance (exact matches first)
    const sortedResults = results.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      // Exact match
      if (aTitle === searchTerm && bTitle !== searchTerm) return -1;
      if (bTitle === searchTerm && aTitle !== searchTerm) return 1;

      // Starts with
      if (aTitle.startsWith(searchTerm) && !bTitle.startsWith(searchTerm))
        return -1;
      if (bTitle.startsWith(searchTerm) && !aTitle.startsWith(searchTerm))
        return 1;

      // Alphabetical
      return aTitle.localeCompare(bTitle);
    });

    // Limit to 20 total results
    const limitedResults = sortedResults.slice(0, 20);

    return NextResponse.json({ results: limitedResults });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed", results: [] },
      { status: 500 },
    );
  }
}
