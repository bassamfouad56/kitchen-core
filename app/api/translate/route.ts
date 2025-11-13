import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, from, to } = await request.json();

    if (!text || !from || !to) {
      return NextResponse.json(
        { error: "Missing required fields: text, from, to" },
        { status: 400 },
      );
    }

    // Use MyMemory Translation API (free, no API key required)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`,
    );

    if (!response.ok) {
      throw new Error("Translation API request failed");
    }

    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || "Translation failed");
    }

    return NextResponse.json({
      translatedText: data.responseData.translatedText,
      originalText: text,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Translation failed",
      },
      { status: 500 },
    );
  }
}
