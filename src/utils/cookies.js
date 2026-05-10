const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export function getCookie(name) {
  if (typeof document === 'undefined') return null
  const target = encodeURIComponent(name) + '='
  for (const raw of document.cookie.split(';')) {
    const entry = raw.trim()
    if (entry.startsWith(target)) {
      return decodeURIComponent(entry.slice(target.length))
    }
  }
  return null
}

export function setCookie(name, value, { maxAgeSeconds = ONE_YEAR_SECONDS, path = '/' } = {}) {
  if (typeof document === 'undefined') return
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `path=${path}`,
    `max-age=${maxAgeSeconds}`,
    'SameSite=Lax'
  ]
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    parts.push('Secure')
  }
  document.cookie = parts.join('; ')
}

export function removeCookie(name, { path = '/' } = {}) {
  if (typeof document === 'undefined') return
  document.cookie = `${encodeURIComponent(name)}=; path=${path}; max-age=0`
}
