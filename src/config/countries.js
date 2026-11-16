/**
 * Country registry. Keys are ISO 3166-1 alpha-2 uppercase. The United Kingdom
 * is 'GB' (billing.country id 1 was renamed from the legacy 'UK' on 2026-11-09;
 * the backend matches on this code, so 'UK' no longer resolves).
 *
 * Language codes are lowercase ISO 639-1 except 'cz' (Czech, ISO 'cs') and
 * 'se' (Swedish, ISO 'sv' — plain 'se' is the code of Northern Sami): both are
 * the project's country-derived codes, kept because the backend stores the
 * content under them. What the page declares in <html lang> is a separate
 * value, `htmlLang` in config/markets/*.
 */
export const COUNTRIES = {
  GB: { code: 'GB', defaultLanguage: 'en', languages: ['en', 'ro'] },
  CZ: { code: 'CZ', defaultLanguage: 'cz', languages: ['cz'] },
  SK: { code: 'SK', defaultLanguage: 'sk', languages: ['sk'] },
  RO: { code: 'RO', defaultLanguage: 'ro', languages: ['ro'] },
  LV: { code: 'LV', defaultLanguage: 'lv', languages: ['lv'] },
  FR: { code: 'FR', defaultLanguage: 'fr', languages: ['fr'] },
  SE: { code: 'SE', defaultLanguage: 'se', languages: ['se'] }
}

/**
 * Subdomain prefix → country code. 'www', empty (apex), 'gb' and the legacy
 * 'uk' all map to GB.
 */
const SUBDOMAIN_COUNTRY = {
  '': 'GB',
  www: 'GB',
  gb: 'GB',
  uk: 'GB',
  cz: 'CZ',
  sk: 'SK',
  ro: 'RO',
  lv: 'LV',
  fr: 'FR',
  se: 'SE'
}

export function subdomainToCountry(subdomain) {
  const key = (subdomain || '').toLowerCase()
  return SUBDOMAIN_COUNTRY[key] || null
}

export function getCountryConfig(code) {
  return COUNTRIES[code] || null
}

export function isLanguageAvailable(countryCode, language) {
  const country = COUNTRIES[countryCode]
  if (!country) return false
  return country.languages.includes(language)
}
