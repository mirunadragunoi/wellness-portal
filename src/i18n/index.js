import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en.json'
import { getBrandConfig } from '@/config/brand'

const brand = getBrandConfig()
const localeStorageKey = `${brand.storagePrefix}-locale`
const savedLocale = localStorage.getItem(localeStorageKey) || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en },
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
