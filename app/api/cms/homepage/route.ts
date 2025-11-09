import { NextRequest, NextResponse } from 'next/server';
import { getHomepageData } from '@/lib/db/homepage';

export async function GET(request: NextRequest) {
  try {
    // Get locale from query params or default to 'en'
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Fetch all homepage data
    const data = await getHomepageData(locale);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching homepage CMS data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CMS data' },
      { status: 500 }
    );
  }
}
