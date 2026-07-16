import { getBrandConfig, getCountryKey } from '@/config/brand'
import { i18n } from '@/i18n'

const brand = getBrandConfig()
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || brand.apiBaseUrl).replace(/\/$/, '')
const PORTAL_NAME = brand.portalName

function currentContext() {
  return {
    portal_name: PORTAL_NAME,
    country: getCountryKey(),
    language: i18n.global.locale.value
  }
}

/**
 * Read the logged-in access code from the persisted auth store.
 * The auth Pinia store persists under localStorage key `auth`
 * (pinia-plugin-persistedstate, default key = store id). Read from there
 * instead of importing the store to avoid a circular import (the auth store
 * imports this module). Returns '' when not logged in.
 */
function currentAccessCode() {
  try {
    const raw = localStorage.getItem('auth')
    if (!raw) return ''
    return JSON.parse(raw)?.accessCode || ''
  } catch {
    return ''
  }
}

async function request(method, path, { params = {}, body = null } = {}) {
  let url = `${BASE_URL}${path}`
  const ctx = currentContext()

  if (method === 'GET') {
    params = { ...ctx, ...params }
  } else {
    body = { ...ctx, ...(body || {}) }
  }

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== null && v !== undefined)
  )
  if (Object.keys(filteredParams).length) {
    url += '?' + new URLSearchParams(filteredParams)
  }

  const options = { method, headers: {} }
  if (body !== null) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }

  const res = await fetch(url, options)

  let data
  try {
    data = await res.json()
  } catch {
    throw new Error('Invalid JSON response from server')
  }

  if (!res.ok) {
    const err = new Error(data?.error || `HTTP ${res.status}`)
    err.errorCode = data?.error_code
    err.status = res.status
    throw err
  }

  return data
}

export const api = {
  login: (accessCode) =>
    request('POST', '/wellness/auth/login', { body: { access_code: accessCode } }),

  getProfile: (accessCode) =>
    request('GET', '/wellness/user/profile', { params: { access_code: accessCode } }),

  updateProfile: (accessCode, data) =>
    request('PUT', '/wellness/user/profile', { body: { access_code: accessCode, ...data } }),

  getProducts: (accessCode, productType = null) =>
    request('GET', '/wellness/products', {
      params: { access_code: accessCode, product_type: productType }
    }),

  getProduct: (accessCode, id) =>
    request('GET', `/wellness/products/${id}`, {
      params: { access_code: accessCode }
    }),

  // EVOLUȚIE (încă nu în prod): ruta `about` nu mai folosește `access_code`.
  // Se bazează doar pe `country` + `language`, deja auto-injectate în request().
  // Argumentul e ignorat intenționat ca să rămână compatibil cu apelarea generică
  // din LegalPageView (`loader(auth.accessCode)`).
  getAbout: () =>
    request('GET', '/wellness/about'),

  getLegalFaq: (accessCode = null) =>
    request('GET', '/wellness/legals/faq', {
      params: { access_code: accessCode }
    }),

  getLegalContact: (accessCode = null) =>
    request('GET', '/wellness/legals/contact', {
      params: { access_code: accessCode }
    }),

  getLegalTerms: (accessCode = null) =>
    request('GET', '/wellness/legals/terms', {
      params: { access_code: accessCode }
    }),

  getLegalPrivacy: (accessCode = null) =>
    request('GET', '/wellness/legals/privacy', {
      params: { access_code: accessCode }
    }),

  getLegalCookies: (accessCode = null) =>
    request('GET', '/wellness/legals/cookies_policy', {
      params: { access_code: accessCode }
    }),

  getLegalUnsubscribe: (accessCode = null) =>
    request('GET', '/wellness/legals/unsubscribe', {
      params: { access_code: accessCode }
    }),

  unsubscribePhoneNumber: ({ country, language, phoneNumber, recaptchaToken = null }) =>
    request('GET', '/store/UnsubscribePhoneNumber', {
      params: {
        service: PORTAL_NAME,
        country,
        language,
        phone_number: phoneNumber,
        recaptcha_token: recaptchaToken
      }
    }),

  completeSession: (accessCode, data) =>
    request('POST', '/wellness/progress/complete', { body: { access_code: accessCode, ...data } }),

  getProgressStats: (accessCode) =>
    request('GET', '/wellness/progress/stats', { params: { access_code: accessCode } }),

  getProgressHistory: (accessCode) =>
    request('GET', '/wellness/progress/history', { params: { access_code: accessCode } }),

  toggleFavorite: (accessCode, productId) =>
    request('POST', `/wellness/favorites/${productId}`, { body: { access_code: accessCode } }),

  getFavorites: (accessCode) =>
    request('GET', '/wellness/favorites', { params: { access_code: accessCode } }),

  saveMood: (accessCode, moodScore, moodTag = null) => {
    const body = { access_code: accessCode, mood_score: moodScore }
    if (moodTag) body.mood_tag = moodTag
    return request('POST', '/wellness/mood', { body })
  },

  getMoodHistory: (accessCode, days = 30) =>
    request('GET', '/wellness/mood/history', { params: { access_code: accessCode, days } }),

  completeBreathing: (accessCode, breathingType, durationSeconds) =>
    request('POST', '/wellness/breathing/complete', {
      body: { access_code: accessCode, breathing_type: breathingType, duration_seconds: durationSeconds }
    }),

  /**
   * Log a user action to store.portal_event_log via POST /wellness/logEvent.
   * Fire-and-forget: never throws, never blocks the caller. portal_name /
   * country / language are auto-injected by request(); access_code is added
   * from the persisted auth store when the user is logged in (public pages
   * log anonymously).
   *
   * @param {object}  opts
   * @param {number}  opts.event_type        602 / 603 / 604
   * @param {number} [opts.product]          store.product id (omit when N/A)
   * @param {string} [opts.page]             route name (page_view / 603)
   * @param {number} [opts.duration_seconds] seconds (consumption / 604 only)
   */
  logEvent({ event_type, product, page, duration_seconds } = {}) {
    try {
      const body = { event_type }
      const accessCode = currentAccessCode()
      if (accessCode) body.access_code = accessCode
      if (product !== undefined && product !== null && product !== '') {
        body.product = Number(product)
      }
      if (page !== undefined && page !== null && page !== '') body.page = String(page)
      if (duration_seconds !== undefined && duration_seconds !== null) {
        body.duration_seconds = Number(duration_seconds)
      }
      // fire-and-forget — swallow any network/parse error silently
      request('POST', '/wellness/logEvent', { body }).catch(() => {})
    } catch {
      /* never let logging break a caller */
    }
  }
}
