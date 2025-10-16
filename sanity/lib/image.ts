import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper function to get optimized image URL
export function getImageUrl(
  source: SanityImageSource,
  width?: number,
  height?: number
): string {
  let imageBuilder = urlFor(source).auto('format').fit('max')

  if (width) {
    imageBuilder = imageBuilder.width(width)
  }

  if (height) {
    imageBuilder = imageBuilder.height(height)
  }

  return imageBuilder.url()
}
