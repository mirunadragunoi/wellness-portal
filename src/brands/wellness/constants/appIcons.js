/**
 * Iconify icon ids (Lucide set) — replaces emoji for a calmer, product-style UI.
 */
export const BRAND_ICON = 'lucide:leaf'

export const SESSION_TYPE_ICON = {
  meditation: 'lucide:headphones',
  'sleep-story': 'lucide:moon',
  soundscape: 'lucide:audio-lines',
  motivational: 'lucide:zap',
  breathing: 'lucide:wind'
}

export function sessionTypeIcon(type) {
  return SESSION_TYPE_ICON[type] || 'lucide:activity'
}

export const AVATAR_ICONS = {
  'avatar-1': 'lucide:user',
  'avatar-2': 'lucide:heart',
  'avatar-3': 'lucide:leaf',
  'avatar-4': 'lucide:sparkles',
  'avatar-5': 'lucide:feather',
  'avatar-6': 'lucide:waves'
}

export const CATEGORY_ICONS = {
  stress: 'lucide:cloud-rain',
  anxiety: 'lucide:shield',
  sleep: 'lucide:moon',
  focus: 'lucide:target',
  mindfulness: 'lucide:brain',
  energy: 'lucide:zap'
}

export const MOOD_ICONS = {
  low: 'lucide:cloud-rain',
  foggy: 'lucide:cloud',
  okay: 'lucide:minus',
  bright: 'lucide:sun-medium',
  glowing: 'lucide:star'
}

export const ONBOARDING_OBJECTIVE_ICONS = {
  stress: 'lucide:cloud-rain',
  sleep: 'lucide:moon',
  focus: 'lucide:target',
  mood: 'lucide:smile',
  meditate: 'lucide:brain',
  growth: 'lucide:trending-up'
}

/** Stress frequency step (onboarding) */
export const ONBOARDING_STRESS_ICONS = {
  always: 'lucide:cloud-lightning',
  often: 'lucide:cloud-rain',
  sometimes: 'lucide:cloud',
  rarely: 'lucide:sun'
}

/** Meditation experience step */
export const ONBOARDING_MEDITATION_EXP_ICONS = {
  new: 'lucide:sprout',
  tried: 'lucide:leaf',
  occasional: 'lucide:trees',
  regular: 'lucide:headphones'
}

/** Learning pace step */
export const ONBOARDING_PACE_ICONS = {
  fast: 'lucide:zap',
  balanced: 'lucide:equal',
  slow: 'lucide:timer'
}

/** Social proof avatar row — cycles Lucide user-style marks */
export const COMMUNITY_PROOF_ICONS = [...Object.values(AVATAR_ICONS), ...Object.values(AVATAR_ICONS)]

export const FEATURE_CARD_ICONS = {
  meditation: 'lucide:headphones',
  breathing: 'lucide:wind',
  tracking: 'lucide:line-chart',
  personal: 'lucide:user-cog'
}
