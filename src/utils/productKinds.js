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
    hay.includes('speech')
  )
}

export function inferExploreAudioType(product) {
  if (isMotivationalSpeechProduct(product)) return 'motivational_speeches'
  return /meditation/i.test(product?.title || '') ? 'meditation' : 'soundscape'
}
