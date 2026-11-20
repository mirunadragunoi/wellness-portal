import wellness from './brands/wellness'
import wellness2 from './brands/wellness2'
import wellness3 from './brands/wellness3'
import { COUNTRIES, subdomainToCountry, getCountryConfig } from './countries'
import { IS_APP, native } from './platform'

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
  const allowed = brand.countries || ['GB']

  // App: nu există subdomeniu, țara e fixată de build-ul aplicației (app.brand.json).
  if (IS_APP) {
    const fixed = String(native()?.config?.country || import.meta.env.VITE_APP_COUNTRY || '').toUpperCase()
    if (allowed.includes(fixed) && COUNTRIES[fixed]) return fixed
  }

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

/**
 * Active country config. A brand may narrow the languages of a country it
 * serves (`countryLanguages`), e.g. Calmasoul GB is English only while the
 * other brands keep en + ro on their GB (www) instance.
 */
export function getCountry() {
  const country = getCountryConfig(getCountryKey())
  const languages = getBrandConfig().countryLanguages?.[country.code]
  if (!languages) return country
  return { ...country, languages, defaultLanguage: languages[0] }
}

/**
 * External registration ("premium landing") URL for the active brand +
 * country, or null. Keyed by COUNTRY (resolved from subdomain): each premium
 * landing is a dedicated country instance — Harmonoria SK (sk.), Calmasoul CZ
 * (cz.), Calmasoul RO (ro.). The GB instances have no entry and fall back to
 * the internal /signup flow.
 *
 * When set, signup CTAs lead here instead of the internal /signup flow.
 */
export function getRegistrationUrl() {
  // App: fără trimitere spre plată externă (regulile App Store / Google Play).
  if (IS_APP) return null
  const urls = getBrandConfig().registrationUrls || {}
  return urls[getCountryKey()] || null
}
