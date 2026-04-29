const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001').replace(/\/$/, '')

async function request(method, path, { params = {}, body = null } = {}) {
  let url = `${BASE_URL}${path}`

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== null && v !== undefined)
  )
  if (Object.keys(filteredParams).length) {
    url += '?' + new URLSearchParams(filteredParams)
  }

  const options = { method, headers: { 'Content-Type': 'application/json' } }
  if (body !== null) options.body = JSON.stringify(body)

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

  getProducts: (accessCode, language = 'en', productType = null) =>
    request('GET', '/wellness/products', {
      params: { access_code: accessCode, language, product_type: productType }
    }),

  getProduct: (accessCode, id, language = 'en') =>
    request('GET', `/wellness/products/${id}`, {
      params: { access_code: accessCode, language }
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
    })
}
