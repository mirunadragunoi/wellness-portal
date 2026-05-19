import wellness from './brands/wellness'
import wellness2 from './brands/wellness2'
import wellness3 from './brands/wellness3'
import { COUNTRIES, subdomainToCountry, getCountryConfig } from './countries'

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

function detectSubdomain() {
  if (typeof window === 'undefined') return ''
  const host = window.location.hostname
  if (!host || host === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return ''
  const parts = host.split('.')
  if (parts.length <= 2) return ''
  return parts[0]
}

function readQueryCountryOverride() {
  if (typeof window === 'undefined') return null
  try {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get('country')
    return raw ? raw.toUpperCase() : null
  } catch {
    return null
  }
}

/**
 * Resolve country for current request. Priority:
 *   1. ?country= URL param (dev/test override)
 *   2. subdomain prefix (cz./sk./www./apex)
 *   3. brand's first allowed country (fallback)
 *
 * Returns a country code that is ALWAYS in the brand's allow-list.
 */
export function getCountryKey() {
  const brand = getBrandConfig()
  const allowed = brand.countries || ['UK']

  const queryOverride = readQueryCountryOverride()
  if (queryOverride && allowed.includes(queryOverride) && COUNTRIES[queryOverride]) {
    return queryOverride
  }

  const fromSubdomain = subdomainToCountry(detectSubdomain())
  if (fromSubdomain && allowed.includes(fromSubdomain)) {
    return fromSubdomain
  }

  return allowed[0]
}

export function getCountry() {
  return getCountryConfig(getCountryKey())
}

/**
 * External registration URL for the active brand + country, or null.
 * When set, signup CTAs lead here instead of the internal /signup flow.
 */
export function getRegistrationUrl() {
  const urls = getBrandConfig().registrationUrls || {}
  return urls[getCountryKey()] || null
}
