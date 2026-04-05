// ═══════════════════════════════════════════════
// SESSIONS DATA — Mock (V1)
// Replace audioUrl with real files in content phase
// ═══════════════════════════════════════════════

export const sessions = [
  // ─── MEDITATIONS ────────────────────────────
  {
    id: 'med-001',
    type: 'meditation',
    category: 'stress',
    title: '5 Minutes for Calm',
    description: 'A gentle guided meditation to release tension and restore your natural state of calm. Perfect for a midday reset or whenever stress arises.',
    duration: 300,
    level: 'beginner',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #bae6fd, #93c5fd)',
    audioUrl: null,
    featured: true,
    popular: true,
    tags: ['stress', 'quick', 'beginner'],
    dateAdded: '2026-01-01'
  },
  {
    id: 'med-002',
    type: 'meditation',
    category: 'focus',
    title: 'Deep Focus Flow',
    description: 'Sharpen your concentration with this mindfulness-based attention training session. Ideal before work or study.',
    duration: 900,
    level: 'intermediate',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    audioUrl: null,
    featured: true,
    popular: true,
    tags: ['focus', 'productivity', 'intermediate'],
    dateAdded: '2026-01-02'
  },
  {
    id: 'med-003',
    type: 'meditation',
    category: 'mindfulness',
    title: 'Morning Gratitude',
    description: 'Start your day with intention. This guided gratitude practice sets a positive tone for the hours ahead.',
    duration: 600,
    level: 'beginner',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #d4e6d0, #a7c4a0)',
    audioUrl: null,
    featured: true,
    popular: false,
    tags: ['morning', 'gratitude', 'mindfulness', 'beginner'],
    dateAdded: '2026-01-03'
  },
  {
    id: 'med-004',
    type: 'meditation',
    category: 'anxiety',
    title: 'Anxiety Release',
    description: 'Let go of anxious thoughts and find your center. This session uses body scan techniques to dissolve tension.',
    duration: 720,
    level: 'beginner',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #c7d2fe, #a5b4fc)',
    audioUrl: null,
    featured: false,
    popular: true,
    tags: ['anxiety', 'body scan', 'beginner'],
    dateAdded: '2026-01-04'
  },
  {
    id: 'med-005',
    type: 'meditation',
    category: 'sleep',
    title: 'Evening Wind Down',
    description: 'Prepare your mind and body for deep, restorative sleep. A gentle journey into stillness.',
    duration: 1200,
    level: 'beginner',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #1e1b4b, #3730a3)',
    audioUrl: null,
    featured: false,
    popular: true,
    tags: ['sleep', 'evening', 'relaxation'],
    dateAdded: '2026-01-05'
  },
  {
    id: 'med-006',
    type: 'meditation',
    category: 'stress',
    title: 'Midday Reset',
    description: 'A quick 3-minute pause to clear your head and recharge your energy for the afternoon.',
    duration: 180,
    level: 'beginner',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #cffafe, #67e8f9)',
    audioUrl: null,
    featured: false,
    popular: false,
    tags: ['stress', 'quick', 'beginner'],
    dateAdded: '2026-01-06'
  },
  {
    id: 'med-007',
    type: 'meditation',
    category: 'energy',
    title: 'Morning Energy Boost',
    description: 'Wake up your mind and body with this energizing breath and visualization practice.',
    duration: 480,
    level: 'beginner',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #fde68a, #f59e0b)',
    audioUrl: null,
    featured: false,
    popular: false,
    tags: ['energy', 'morning', 'visualization'],
    dateAdded: '2026-01-07'
  },
  {
    id: 'med-008',
    type: 'meditation',
    category: 'mindfulness',
    title: 'Body Scan Relaxation',
    description: 'A progressive relaxation through each part of your body, releasing stored tension.',
    duration: 1500,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #d4e6d0, #6b9e63)',
    audioUrl: null,
    featured: false,
    popular: true,
    tags: ['body scan', 'relaxation', 'mindfulness'],
    dateAdded: '2026-01-08'
  },
  {
    id: 'med-009',
    type: 'meditation',
    category: 'focus',
    title: 'Clarity & Purpose',
    description: 'Connect with your deeper intentions and move through your day with clarity and direction.',
    duration: 1200,
    level: 'intermediate',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #ede9fe, #a78bfa)',
    audioUrl: null,
    featured: false,
    popular: false,
    tags: ['focus', 'purpose', 'intermediate'],
    dateAdded: '2026-01-09'
  },
  {
    id: 'med-010',
    type: 'meditation',
    category: 'anxiety',
    title: '2-Minute Calm',
    description: 'When anxiety strikes, this ultra-short session gives you immediate tools to find your ground.',
    duration: 120,
    level: 'beginner',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #e0f2fe, #7dd3fc)',
    audioUrl: null,
    featured: false,
    popular: false,
    tags: ['anxiety', 'sos', 'quick', 'beginner'],
    dateAdded: '2026-01-10'
  },

  // ─── SLEEP STORIES ────────────────────────────
  {
    id: 'sleep-001',
    type: 'sleep-story',
    category: 'sleep',
    title: 'Ocean Night',
    description: 'Drift into sleep as gentle waves carry you through a moonlit ocean voyage. Soft, immersive narration.',
    duration: 1800,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #0c4a6e, #0369a1)',
    audioUrl: null,
    featured: true,
    popular: true,
    tags: ['sleep', 'nature', 'ocean'],
    dateAdded: '2026-01-01'
  },
  {
    id: 'sleep-002',
    type: 'sleep-story',
    category: 'sleep',
    title: 'The Forest Cottage',
    description: 'Find yourself in a cozy cabin surrounded by ancient trees. Rain on the roof, a warm fire within.',
    duration: 2400,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #14532d, #166534)',
    audioUrl: null,
    featured: false,
    popular: true,
    tags: ['sleep', 'nature', 'forest', 'cozy'],
    dateAdded: '2026-01-02'
  },
  {
    id: 'sleep-003',
    type: 'sleep-story',
    category: 'sleep',
    title: 'Starlight Train',
    description: 'Board a midnight train traveling through mountains and stars. A hypnotic journey to deep sleep.',
    duration: 2100,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    audioUrl: null,
    featured: false,
    popular: false,
    tags: ['sleep', 'journey', 'stars'],
    dateAdded: '2026-01-03'
  },

  // ─── SOUNDSCAPES ────────────────────────────
  {
    id: 'sound-001',
    type: 'soundscape',
    category: 'focus',
    title: 'Forest Rain',
    description: 'The gentle sound of rain through leaves. Perfect for focus, reading, or deep work.',
    duration: 3600,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #d4e6d0, #4ade80)',
    audioUrl: null,
    featured: true,
    popular: true,
    tags: ['rain', 'nature', 'focus', 'ambient'],
    dateAdded: '2026-01-01'
  },
  {
    id: 'sound-002',
    type: 'soundscape',
    category: 'sleep',
    title: 'Deep Ocean',
    description: 'The immersive sound of underwater — gentle, enveloping, and deeply calming.',
    duration: 3600,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)',
    audioUrl: null,
    featured: false,
    popular: true,
    tags: ['ocean', 'sleep', 'ambient'],
    dateAdded: '2026-01-02'
  },
  {
    id: 'sound-003',
    type: 'soundscape',
    category: 'stress',
    title: 'Crackling Fire',
    description: 'Warm and comforting. The sound of a fireplace to ease your mind and warm your spirit.',
    duration: 3600,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #7c2d12, #ea580c)',
    audioUrl: null,
    featured: false,
    popular: false,
    tags: ['fire', 'cozy', 'ambient'],
    dateAdded: '2026-01-03'
  },
  {
    id: 'sound-004',
    type: 'soundscape',
    category: 'focus',
    title: 'White Noise',
    description: 'Pure white noise to block distractions and help you enter a deep state of flow.',
    duration: 3600,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
    audioUrl: null,
    featured: false,
    popular: false,
    tags: ['white noise', 'focus', 'ambient'],
    dateAdded: '2026-01-04'
  },

  // ─── MOTIVATIONAL ────────────────────────────
  {
    id: 'motiv-001',
    type: 'motivational',
    category: 'energy',
    title: 'Start Strong',
    description: 'A powerful 3-minute morning talk to ignite your motivation and set the tone for an extraordinary day.',
    duration: 180,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #fef3c7, #f59e0b)',
    audioUrl: null,
    featured: true,
    popular: true,
    tags: ['morning', 'motivation', 'energy'],
    dateAdded: '2026-01-01'
  },
  {
    id: 'motiv-002',
    type: 'motivational',
    category: 'mindfulness',
    title: 'The Present Moment',
    description: 'A reflection on why right now is the only moment that matters — and how to embrace it fully.',
    duration: 240,
    level: 'all',
    thumbnail: null,
    thumbnailGradient: 'linear-gradient(135deg, #d4e6d0, #6b9e63)',
    audioUrl: null,
    featured: false,
    popular: false,
    tags: ['mindfulness', 'presence', 'reflection'],
    dateAdded: '2026-01-02'
  }
]

export function getSessionById(id) {
  return sessions.find(s => s.id === id) || null
}

export function getSessionsByCategory(category) {
  if (!category || category === 'all') return sessions
  return sessions.filter(s => s.category === category)
}

export function getSessionsByType(type) {
  if (!type || type === 'all') return sessions
  return sessions.filter(s => s.type === type)
}

export function getFeaturedSessions() {
  return sessions.filter(s => s.featured)
}

export function getPopularSessions() {
  return sessions.filter(s => s.popular)
}
