import { createI18n } from 'vue-i18n'

import baseEn from '@/i18n/locales/en.json'
import baseRo from '@/i18n/locales/ro.json'
import baseCz from '@/i18n/locales/cz.json'
import baseSk from '@/i18n/locales/sk.json'
import baseLv from '@/i18n/locales/lv.json'
import baseFr from '@/i18n/locales/fr.json'
// 'se' is the project's code for Swedish (country-derived, like 'cz' for
// Czech); the ISO language code 'sv' only appears in <html lang>, see htmlLang().
import baseSe from '@/i18n/locales/se.json'

import wellnessEn from '@/brands/wellness/i18n/locales/en.json'
import wellnessRo from '@/brands/wellness/i18n/locales/ro.json'
import wellnessCz from '@/brands/wellness/i18n/locales/cz.json'
import wellnessSk from '@/brands/wellness/i18n/locales/sk.json'
import wellnessLv from '@/brands/wellness/i18n/locales/lv.json'

import wellness2En from '@/brands/wellness2/i18n/locales/en.json'
import wellness2Ro from '@/brands/wellness2/i18n/locales/ro.json'

import wellness3En from '@/brands/wellness3/i18n/locales/en.json'
import wellness3Ro from '@/brands/wellness3/i18n/locales/ro.json'
import wellness3Cz from '@/brands/wellness3/i18n/locales/cz.json'
import wellness3Fr from '@/brands/wellness3/i18n/locales/fr.json'
import wellness3Se from '@/brands/wellness3/i18n/locales/se.json'

// Market overlays (brand × country), merged last. Calmasoul GB: regulated
// wording (no outcome claims, "Subscribe" CTAs), British spelling.
import wellness3GbEn from '@/brands/wellness3/i18n/markets/gb.en.json'

import { getBrandConfig, getBrandKey, getCountry, getCountryKey } from '@/config/brand'
import { getMarket } from '@/config/market'
import { getCookie, setCookie } from '@/utils/cookies'
import { RTL_SMOKE } from '@/config/platform'

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
  wellness: { en: wellnessEn, ro: wellnessRo, cz: wellnessCz, sk: wellnessSk, lv: wellnessLv },
  wellness2: { en: wellness2En, ro: wellness2Ro },
  wellness3: { en: wellness3En, ro: wellness3Ro, cz: wellness3Cz, fr: wellness3Fr, se: wellness3Se }
}

const BASE_LOCALES = { en: baseEn, ro: baseRo, cz: baseCz, sk: baseSk, lv: baseLv, fr: baseFr, se: baseSe }

const MARKET_LOCALES = {
  wellness3: { GB: { en: wellness3GbEn } }
}

const brand = getBrandConfig()
const brandKey = getBrandKey()
const country = getCountry()
const countryKey = getCountryKey()
const brandOverrides = BRAND_LOCALES[brandKey] || {}
const marketOverrides = MARKET_LOCALES[brandKey]?.[countryKey] || {}

function buildMessages() {
  const out = {}
  for (const [lang, base] of Object.entries(BASE_LOCALES)) {
    out[lang] = mergeMessages(mergeMessages(base, brandOverrides[lang] || {}), marketOverrides[lang] || {})
  }
  return out
}

const cookieName = `${brand.storagePrefix}-locale-${countryKey}`

function readSavedLocale() {
  const saved = getCookie(cookieName)
  if (saved && country.languages.includes(saved)) return saved
  return country.defaultLanguage
}

// Spike V8 (doar VITE_PLATFORM=app + VITE_RTL_SMOKE=1): locale `ar` stub = cheile
// din `en` prefixate cu text arab (ca algoritmul bidi să le trateze RTL) + dir="rtl".
function rtlStub(node) {
  if (typeof node === 'string') return `عربي ${node}`
  if (Array.isArray(node)) return node.map(rtlStub)
  if (node && typeof node === 'object') {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, rtlStub(v)]))
  }
  return node
}

const messages = buildMessages()
if (RTL_SMOKE) messages.ar = rtlStub(messages.en)

const initialLocale = RTL_SMOKE ? 'ar' : readSavedLocale()

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages,
  globalInjection: true
})

if (RTL_SMOKE && typeof document !== 'undefined') {
  document.documentElement.setAttribute('dir', 'rtl')
}

/**
 * What the page declares as its language: the market's value when it has one
 * ('en-GB' on Calmasoul GB, 'sv-SE' on Calmasoul SE), otherwise the bare
 * locale. The market is consulted for EVERY locale, not only 'en' — on SE the
 * locale is 'se', which is Northern Sami to a screen reader and to Google,
 * while the page is written in Swedish.
 */
function htmlLang(locale) {
  return getMarket()?.htmlLang || locale
}

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', htmlLang(initialLocale))
}

export function setLocale(locale) {
  if (!country.languages.includes(locale)) return
  i18n.global.locale.value = locale
  setCookie(cookieName, locale)
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', htmlLang(locale))
  }
}

export function getCurrentLocale() {
  return i18n.global.locale.value
}

export const LOCALE_LABELS = {
  en: 'English',
  ro: 'Română',
  cz: 'Čeština',
  sk: 'Slovenčina',
  lv: 'Latviešu',
  fr: 'Français',
  se: 'Svenska'
}

export const availableLocales = country.languages.map(code => ({
  code,
  label: LOCALE_LABELS[code] || code.toUpperCase()
}))
