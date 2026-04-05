import { createI18n } from 'vue-i18n'
import en from './locales/en.json'

const savedLocale = localStorage.getItem('wellness-locale') || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en },
  globalInjection: true
})

export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('wellness-locale', locale)
  document.documentElement.setAttribute('lang', locale)
}

export const availableLocales = [
  { code: 'en', label: 'English' },
  { code: 'ro', label: 'Română' }
]
