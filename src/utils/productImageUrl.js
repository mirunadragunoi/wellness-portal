/**
 * Optional env: VITE_MEDIA_BASE_URL — prepended to relative image paths (e.g. /store/...).
 */
const MEDIA_BASE = (import.meta.env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '')

/**
 * Picks first usable image URL from API fields (snake_case + optional camelCase).
 * Skips empty strings, whitespace, and literal "null" / "undefined" placeholders.
 */
export function coalesceProductImageUrl(product, fieldNames) {
  if (!product || !fieldNames?.length) return null
  for (const name of fieldNames) {
    const raw = product[name]
    if (raw == null) continue
    const s = String(raw).trim()
    if (!s) continue
    const lower = s.toLowerCase()
    if (lower === 'null' || lower === 'undefined' || lower === 'none') continue
    return s
  }
  return null
}

export function normalizeProductImageUrl(url) {
  if (url == null || url === '') return null
  const u = String(url).trim()
  if (!u) return null
  if (/^https?:\/\//i.test(u)) return u
  if (u.startsWith('//')) {
    if (typeof window !== 'undefined' && window.location?.protocol) {
      return `${window.location.protocol}${u}`
    }
    return `https:${u}`
  }
  if (MEDIA_BASE && u.startsWith('/')) {
    return `${MEDIA_BASE}${u}`
  }
  return u
}

/**
 * Inline style fragment for background image; uses JSON.stringify so query strings
 * with quotes/parens do not break CSS.
 */
export function cssBackgroundFromImageUrl(url, { size = 'cover', backgroundColor } = {}) {
  const n = normalizeProductImageUrl(url)
  if (!n) return {}
  const style = {
    backgroundImage: `url(${JSON.stringify(n)})`,
    backgroundSize: size,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
  if (backgroundColor) style.backgroundColor = backgroundColor
  return style
}

/** First usable art URL on a mapped product (after normalize). */
export function productPrimaryImageUrl(session) {
  if (!session) return null
  return (
    normalizeProductImageUrl(session.thumbnail) ||
    normalizeProductImageUrl(session.banner) ||
    null
  )
}

export function sessionHasCoverImage(session) {
  return !!productPrimaryImageUrl(session)
}

/** Cover / card background: prefers thumbnail then banner, else gradient. */
export function sessionCoverStyle(session, { size = 'cover', backgroundColor } = {}) {
  if (!session) return {}
  const raw = session.thumbnail || session.banner
  const img = cssBackgroundFromImageUrl(raw, { size, backgroundColor })
  if (Object.keys(img).length) return img
  return { background: session.thumbnailGradient }
}
