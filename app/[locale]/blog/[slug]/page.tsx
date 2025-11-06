import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const prisma = new PrismaClient();

async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    });

    if (!post) return null;

    // Increment views
    await prisma.blogPost.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function getRelatedPosts(category: string, currentSlug: string) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
        category,
        slug: { not: currentSlug },
      },
      take: 3,
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        titleEn: true,
        titleAr: true,
        excerptEn: true,
        excerptAr: true,
        featuredImage: true,
        readingTime: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const isArabic = locale === "ar";
  const title = isArabic && post.titleAr ? post.titleAr : post.titleEn;
  const description =
    isArabic && post.excerptAr ? post.excerptAr : post.excerptEn;

  return {
    title: `${title} | Kitchen Core`,
    description: post.seoDescription || description,
    keywords: post.seoKeywords,
    openGraph: {
      title: post.seoTitle || title,
      description: post.seoDescription || description,
      type: "article",
      locale: isArabic ? "ar_SA" : "en_US",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || title,
      description: post.seoDescription || description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const isArabic = locale === "ar";
  const title = isArabic && post.titleAr ? post.titleAr : post.titleEn;
  const content = isArabic && post.contentAr ? post.contentAr : post.contentEn;
  const relatedPosts = await getRelatedPosts(post.category, slug);

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.publishedAt))
    : "";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-dark via-black to-gray-dark" />
          {post.featuredImage && (
            <>
              <Image
                src={post.featuredImage}
                alt={title}
                fill
                className="object-cover opacity-20"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </>
          )}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-green-vibrant hover:text-green-primary transition-colors mb-8 group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isArabic ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
              />
            </svg>
            <span>{isArabic ? "العودة إلى المدونة" : "Back to Blog"}</span>
          </Link>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="px-3 py-1.5 text-xs border border-green-primary/40 text-green-vibrant bg-black/60 backdrop-blur-sm rounded-sm uppercase tracking-wide">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            {title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-light">
            <span>{post.author}</span>
            <span className="w-1 h-1 bg-green-primary/40 rounded-full" />
            <span>{formattedDate}</span>
            <span className="w-1 h-1 bg-green-primary/40 rounded-full" />
            <span>
              {post.readingTime} {isArabic ? "دقيقة" : "min read"}
            </span>
            <span className="w-1 h-1 bg-green-primary/40 rounded-full" />
            <span>
              {post.views} {isArabic ? "مشاهدة" : "views"}
            </span>
          </div>

          <div className="w-24 h-px bg-green-primary mt-8" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-white
              prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-12
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
              prose-p:text-gray-light prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-green-vibrant prose-a:no-underline hover:prose-a:text-green-primary prose-a:transition-colors
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-gray-light prose-ul:mb-6
              prose-ol:text-gray-light prose-ol:mb-6
              prose-li:mb-2
              prose-blockquote:border-l-green-primary prose-blockquote:text-gray-light prose-blockquote:italic
              prose-img:rounded-lg prose-img:shadow-2xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-dark">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs border border-gray-dark text-gray-light hover:border-green-primary/40 hover:text-green-vibrant transition-colors rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-background-card">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-4xl text-white mb-12">
              {isArabic ? "مقالات ذات صلة" : "Related Posts"}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => {
                const relatedTitle =
                  isArabic && relatedPost.titleAr
                    ? relatedPost.titleAr
                    : relatedPost.titleEn;
                const relatedExcerpt =
                  isArabic && relatedPost.excerptAr
                    ? relatedPost.excerptAr
                    : relatedPost.excerptEn;

                return (
                  <Link
                    key={relatedPost.slug}
                    href={`/${locale}/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4">
                      {relatedPost.featuredImage ? (
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedTitle}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-dark via-black to-gray-dark flex items-center justify-center">
                          <div className="text-green-primary/20 text-6xl">📝</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <h3 className="text-xl font-serif text-white group-hover:text-green-vibrant transition-colors mb-2 line-clamp-2">
                      {relatedTitle}
                    </h3>
                    <p className="text-gray-light text-sm line-clamp-2">
                      {relatedExcerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            image: post.featuredImage || "",
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Kitchen Core",
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
              },
            },
            datePublished: post.publishedAt?.toISOString(),
            dateModified: post.updatedAt.toISOString(),
            description:
              post.seoDescription ||
              (isArabic && post.excerptAr ? post.excerptAr : post.excerptEn),
            articleBody: content,
            keywords: post.tags.join(", "),
          }),
        }}
      />
    </div>
  );
}
