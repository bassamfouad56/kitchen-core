import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This endpoint adds the missing Arabic columns to the Founder table
export async function GET() {
  try {
    // Execute raw SQL to add the new columns if they don't exist
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Founder"
      ADD COLUMN IF NOT EXISTS "nameAr" TEXT,
      ADD COLUMN IF NOT EXISTS "titleAr" TEXT,
      ADD COLUMN IF NOT EXISTS "bioAr" TEXT,
      ADD COLUMN IF NOT EXISTS "educationAr" TEXT[] DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS "recognitionAr" TEXT[] DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS "quoteAr" TEXT;
    `);

    return NextResponse.json({
      success: true,
      message: "Founder table migration completed! Arabic columns added.",
    });
  } catch (error) {
    console.error("Error migrating Founder table:", error);
    return NextResponse.json(
      { error: "Failed to migrate Founder table", details: String(error) },
      { status: 500 }
    );
  }
}
