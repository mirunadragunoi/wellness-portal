import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en.json'
import wellness2En from '@/brands/wellness2/i18n/locales/en.json'
import wellness3En from '@/brands/wellness3/i18n/locales/en.json'
import { getBrandConfig, getBrandKey } from '@/config/brand'

function mergeMessages(base, override) {
  const out = { ...base }
  for (const [k, v] of Object.entries(override || {})) {
    const baseVal = out[k]
    if (baseVal && typeof baseVal === 'object' && !Array.isArray(baseVal) && typeof v === 'object' && !Array.isArray(v)) {
      out[k] = mergeMessages(baseVal, v)
    } else {
      out[k] = v
    }
  }
  return out
}

const brand = getBrandConfig()
const brandKey = getBrandKey()
const brandLocales = {
  wellness2: wellness2En,
  wellness3: wellness3En
}
const brandOverride = brandLocales[brandKey] || {}
const enMessages = mergeMessages(en, brandOverride)
const localeStorageKey = `${brand.storagePrefix}-locale`
const savedLocale = localStorage.getItem(localeStorageKey) || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en: enMessages },
  globalInjection: true
})

export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(localeStorageKey, locale)
  document.documentElement.setAttribute('lang', locale)
}

export const availableLocales = [
  { code: 'en', label: 'English' },
  { code: 'ro', label: 'Română' }
]
