const CATEGORY_KEYS = new Set([
  'stress',
  'anxiety',
  'sleep',
  'focus',
  'mindfulness',
  'energy',
  'habits'
])

const TYPE_KEYS = new Set([
  'article',
  'meditation',
  'breathing',
  'sleep',
  'soundscape',
  'motivational_speeches',
  'motivational'
])

const LABEL_ALIASES = {
  sleep_story: 'sleep',
  sleep_stories: 'sleep',
  soundscapes: 'soundscape',
  motivational_speech: 'motivational_speeches',
  motivational_speeches: 'motivational_speeches',
  motivational_speeches_: 'motivational_speeches',
  motivational_speeche: 'motivational_speeches'
}

const LOCALE_MAP = {
  en: 'en-US',
  ro: 'ro-RO',
  cz: 'cs-CZ',
  sk: 'sk-SK'
}

export function normalizeLabelKey(value = '') {
  const key = String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

  return LABEL_ALIASES[key] || key
}

export function translateTaxonomyLabel(t, value) {
  const key = normalizeLabelKey(value)
  if (!key) return ''
  if (CATEGORY_KEYS.has(key)) return t(`explore.cat_${key}`)
  if (TYPE_KEYS.has(key)) return t(`explore.type_${key}`)
  return value
}

export function formatLocalizedDate(date, locale, options = {}) {
  const formatterLocale = LOCALE_MAP[locale] || LOCALE_MAP.en
  const resolvedOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  for (const [key, value] of Object.entries(options)) {
    if (value === undefined) delete resolvedOptions[key]
    else resolvedOptions[key] = value
  }
  return new Intl.DateTimeFormat(formatterLocale, resolvedOptions).format(date)
}
