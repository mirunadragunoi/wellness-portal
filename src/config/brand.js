import wellness from './brands/wellness'
import wellness2 from './brands/wellness2'

const BRAND_MAP = {
  wellness,
  wellness2
}

export function getBrandKey() {
  const key = (import.meta.env.VITE_BRAND || 'wellness').toLowerCase()
  return BRAND_MAP[key] ? key : 'wellness'
}

export function getBrandConfig() {
  return BRAND_MAP[getBrandKey()]
}
