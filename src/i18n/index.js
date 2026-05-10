import { createI18n } from 'vue-i18n'

import baseEn from '@/i18n/locales/en.json'
import baseRo from '@/i18n/locales/ro.json'
import baseCz from '@/i18n/locales/cz.json'
import baseSk from '@/i18n/locales/sk.json'

import wellnessEn from '@/brands/wellness/i18n/locales/en.json'
import wellnessRo from '@/brands/wellness/i18n/locales/ro.json'
import wellnessCz from '@/brands/wellness/i18n/locales/cz.json'
import wellnessSk from '@/brands/wellness/i18n/locales/sk.json'

import wellness2En from '@/brands/wellness2/i18n/locales/en.json'
import wellness2Ro from '@/brands/wellness2/i18n/locales/ro.json'

import wellness3En from '@/brands/wellness3/i18n/locales/en.json'
import wellness3Ro from '@/brands/wellness3/i18n/locales/ro.json'
import wellness3Cz from '@/brands/wellness3/i18n/locales/cz.json'

import { getBrandConfig, getBrandKey, getCountry, getCountryKey } from '@/config/brand'
import { getCookie, setCookie } from '@/utils/cookies'

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

const BRAND_LOCALES = {
  wellness: { en: wellnessEn, ro: wellnessRo, cz: wellnessCz, sk: wellnessSk },
  wellness2: { en: wellness2En, ro: wellness2Ro },
  wellness3: { en: wellness3En, ro: wellness3Ro, cz: wellness3Cz }
}

const BASE_LOCALES = { en: baseEn, ro: baseRo, cz: baseCz, sk: baseSk }

const brand = getBrandConfig()
const brandKey = getBrandKey()
const country = getCountry()
const countryKey = getCountryKey()
const brandOverrides = BRAND_LOCALES[brandKey] || {}

function buildMessages() {
  const out = {}
  for (const [lang, base] of Object.entries(BASE_LOCALES)) {
    out[lang] = mergeMessages(base, brandOverrides[lang] || {})
  }
  return out
}

const cookieName = `${brand.storagePrefix}-locale-${countryKey}`

function readSavedLocale() {
  const saved = getCookie(cookieName)
  if (saved && country.languages.includes(saved)) return saved
  return country.defaultLanguage
}

const initialLocale = readSavedLocale()

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: buildMessages(),
  globalInjection: true
})

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', initialLocale)
}

export function setLocale(locale) {
  if (!country.languages.includes(locale)) return
  i18n.global.locale.value = locale
  setCookie(cookieName, locale)
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', locale)
  }
}

export function getCurrentLocale() {
  return i18n.global.locale.value
}

export const LOCALE_LABELS = {
  en: 'English',
  ro: 'Română',
  cz: 'Čeština',
  sk: 'Slovenčina'
}

export const availableLocales = country.languages.map(code => ({
  code,
  label: LOCALE_LABELS[code] || code.toUpperCase()
}))
