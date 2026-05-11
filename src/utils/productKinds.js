/**
 * Heuristic bucket for type=6 audio products in Explore.
 * If backend starts sending explicit category labels, this helper can prioritize them.
 */
export function isMotivationalSpeechProduct(product) {
  if (!product || Number(product.rawType) !== 6) return false
  const hay = [
    product.dbCategoryLabel,
    product.code,
    product.title,
    product.descriptionShort,
    product.descriptionLong
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return (
    hay.includes('motivational speeches') ||
    hay.includes('motivational_speeches') ||
    hay.includes('motivational') ||
    hay.includes('motivation') ||
    hay.includes('speech') ||
    hay.includes('discurs') ||
    hay.includes('motiva') ||
    hay.includes('projev')
  )
}

export function inferExploreAudioType(product) {
  if (isMotivationalSpeechProduct(product)) return 'motivational_speeches'
  return /meditation/i.test(product?.title || '') ? 'meditation' : 'soundscape'
}

/**
 * Resolve the correct route for a product based on its type.
 * - type 'article' or motivational speech → text/article view
 * - type 'practice' (rawType=5, yoga/video) → video player
 * - everything else (meditation, sleep, breathing, focus, MP3) → audio session
 */
export function routeForProduct(product) {
  if (!product) return null
  if (product.type === 'article') {
    return { name: 'article', params: { slug: String(product.slug || product.id) } }
  }
  if (isMotivationalSpeechProduct(product)) {
    return { name: 'article', params: { slug: String(product.id) } }
  }
  if (product.type === 'practice') {
    return { name: 'practice-video', params: { id: product.id } }
  }
  return { name: 'session', params: { id: product.id } }
}
