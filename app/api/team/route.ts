import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// GET /api/team -> returns a list of team image paths from public/team
export async function GET() {
  try {
    const teamDir = path.join(process.cwd(), "public", "team");
    const exists = fs.existsSync(teamDir);
    if (!exists) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(teamDir, { withFileTypes: true });
    const imageExtensions = new Set([
      ".png",
      ".jpg",
      ".jpeg",
      ".webp",
      ".gif",
      ".avif",
      ".svg",
    ]);

    const images = files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => imageExtensions.has(path.extname(name).toLowerCase()))
      .map((name) => `/team/${name}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to read public/team images", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
