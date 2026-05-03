/** Escape text for safe HTML insertion */
export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** ~200 wpm reading speed */
export function estimateReadMinutes(text) {
  const words = String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/** Treat as pre-rendered HTML (e.g. mock articles or CMS HTML) */
export function looksLikeTrustedHtml(s) {
  const t = String(s || '').trim()
  return /^<[a-z][\s\S]*>/i.test(t)
}

/**
 * Plain text from DB → semantic HTML: one <p> per non-empty line,
 * optional "Self-Reflection Questions:" + numbered lines as <ol>.
 */
export function plainTextToArticleHtml(raw) {
  const text = String(raw || '').trim()
  if (!text) return ''
  const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean)
  let html = ''
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (/^self-reflection questions:?\s*$/i.test(line)) {
      const heading = line.replace(/:\s*$/, '')
      html += `<h2>${escapeHtml(heading)}</h2>`
      i++
      const items = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''))
        i++
      }
      if (items.length) {
        html +=
          '<ol class="article-reflect">' +
          items.map((it) => `<li>${escapeHtml(it)}</li>`).join('') +
          '</ol>'
      }
      continue
    }
    if (/^\d+\.\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''))
        i++
      }
      html +=
        '<ol class="article-reflect">' +
        items.map((it) => `<li>${escapeHtml(it)}</li>`).join('') +
        '</ol>'
      continue
    }
    html += `<p>${escapeHtml(line)}</p>`
    i++
  }
  return html
}

export function formatArticleBody(raw) {
  const t = String(raw || '').trim()
  if (!t) return ''
  if (looksLikeTrustedHtml(t)) return t
  return plainTextToArticleHtml(t)
}
