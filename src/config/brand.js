import wellness from './brands/wellness'
import wellness2 from './brands/wellness2'
import wellness3 from './brands/wellness3'

const BRAND_MAP = {
  wellness,
  wellness2,
  wellness3
}

export function getBrandKey() {
  const envBrand = (import.meta.env.VITE_BRAND || '').toLowerCase()
  const modeBrand = (import.meta.env.MODE || '').toLowerCase()
  if (BRAND_MAP[envBrand]) return envBrand
  if (BRAND_MAP[modeBrand]) return modeBrand
  return 'wellness'
}

export function getBrandConfig() {
  return BRAND_MAP[getBrandKey()]
}
