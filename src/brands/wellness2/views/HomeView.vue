<template>
  <div class="home-view">
    <div class="home-wrap">
      <section class="greeting">
        <span class="greeting-eyebrow">Good {{ dayPart }}</span>
        <h1 class="greeting-title">Welcome back, {{ displayName }}.</h1>
        <p class="greeting-sub">Take a moment for yourself today. Even 5 minutes can change your day.</p>
      </section>

      <section class="mood-section">
        <p class="mood-label">How are you feeling right now?</p>
        <div class="mood-row">
          <button
            v-for="m in moodOptions"
            :key="m.id"
            class="mood-btn"
            :class="{ active: moodStore.todayMood === m.id }"
            @click="setMood(m.id)"
          >
            <Icon :icon="m.icon" class="app-icon app-icon--lg" />
            <span class="mood-name">{{ m.label }}</span>
          </button>
        </div>
      </section>

      <section class="section-head">
        <h2 class="section-head-title">Recommended for you</h2>
        <RouterLink to="/explore" class="see-all">See all</RouterLink>
      </section>
      <section class="rec-scroll">
        <article
          v-for="s in recommended"
          :key="s.id"
          class="rec-card"
          @click="playSession(s)"
        >
          <div class="rec-thumb" :style="{ background: s.thumbnailGradient }">
            <span class="rec-badge">{{ s.type.replace('-', ' ') }}</span>
            <span class="rec-play"><Icon icon="lucide:play" class="app-icon app-icon--sm" /></span>
          </div>
          <div class="rec-info">
            <h3 class="rec-title">{{ s.title }}</h3>
            <div class="rec-meta">
              <span class="rec-cat">{{ s.category }}</span>
              <span class="rec-dur">{{ Math.round(s.duration / 60) }} min</span>
            </div>
          </div>
        </article>
      </section>

      <section class="section-head">
        <h2 class="section-head-title">Your Categories</h2>
      </section>
      <section class="cat-grid">
        <RouterLink
          v-for="c in categories"
          :key="c.id"
          to="/explore"
          class="cat-tile"
        >
          <Icon :icon="c.icon" class="app-icon app-icon--lg cat-icon" />
          <span class="cat-name">{{ c.label }}</span>
        </RouterLink>
      </section>

      <section class="moment-card">
        <p class="moment-title">Moment of the Day</p>
        <h3 class="moment-label">Evening Wind-Down</h3>
        <div class="moment-sessions">
          <RouterLink class="chip chip-active" :to="{ name: 'breathing', params: { type: '4-7-8' } }">4-7-8 breathing</RouterLink>
          <RouterLink class="chip chip-default" :to="{ name: 'session', params: { id: 'med-008' } }">Body scan</RouterLink>
          <RouterLink class="chip chip-default" :to="{ name: 'session', params: { id: 'sleep-001' } }">Sleep story</RouterLink>
        </div>
      </section>

      <aside class="sidebar">
        <section class="streak-card">
          <div class="streak-top">
            <span class="streak-label">Day streak</span>
            <Icon icon="lucide:flame" class="app-icon app-icon--lg" />
          </div>
          <div class="streak-val">{{ progressStore.streakDays }}</div>
          <p class="streak-unit">days in a row</p>
          <div class="streak-dots">
            <span
              v-for="d in progressStore.weeklyDays"
              :key="d.date"
              class="streak-dot"
              :class="{ done: d.completed }"
            />
          </div>
        </section>

        <section class="phrase-card">
          <p class="phrase-label">Phrase of the day</p>
          <p class="phrase-text">"Even 5 minutes can change your day. Your calm is closer than you think."</p>
        </section>

        <section class="prog-mini">
          <p class="prog-mini-title">This week</p>
          <div class="prog-stat-row">
            <span class="prog-stat-label">Sessions</span>
            <span class="prog-stat-val">{{ progressStore.totalSessions }} <span class="unit">sessions</span></span>
          </div>
          <div class="prog-stat-row">
            <span class="prog-stat-label">Time</span>
            <span class="prog-stat-val">{{ progressStore.totalTimeFormatted }}</span>
          </div>
          <div class="prog-stat-row">
            <span class="prog-stat-label">Avg mood</span>
            <span class="prog-stat-val mood-val">{{ avgMoodLabel }}</span>
          </div>
          <RouterLink to="/progress" class="see-all see-all--block">View full progress</RouterLink>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMoodStore, moodOptions } from '@/stores/mood'
import { useProgressStore } from '@/stores/progress'
import { usePlayerStore } from '@/stores/player'
import { useProductsStore } from '@/stores/products'
import { CATEGORY_ICONS } from '@/constants/appIcons'

const router = useRouter()
const userStore = useUserStore()
const moodStore = useMoodStore()
const progressStore = useProgressStore()
const playerStore = usePlayerStore()
const productsStore = useProductsStore()

onMounted(() => {
  moodStore.syncDay()
  progressStore.syncStreak()
  if (!productsStore.loaded) productsStore.fetchProducts()
  progressStore.fetchStats()
  moodStore.fetchHistory()
  progressStore.fetchFavorites()
})

const displayName = computed(() => userStore.firstName || 'friend')
const hour = new Date().getHours()
const dayPart = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'

const recommended = computed(() => productsStore.sessions.filter(s => s.featured).slice(0, 5))

const categories = [
  { id: 'stress', label: 'Stress', icon: CATEGORY_ICONS.stress },
  { id: 'sleep', label: 'Sleep', icon: CATEGORY_ICONS.sleep },
  { id: 'focus', label: 'Focus', icon: CATEGORY_ICONS.focus },
  { id: 'anxiety', label: 'Anxiety', icon: CATEGORY_ICONS.anxiety },
  { id: 'mindfulness', label: 'Mindfulness', icon: CATEGORY_ICONS.mindfulness },
  { id: 'energy', label: 'Energy', icon: CATEGORY_ICONS.energy }
]

const avgMoodLabel = computed(() => {
  const recent = moodStore.last7Days.filter((d) => d.value !== null)
  if (!recent.length) return 'No check-in'
  const avg = recent.reduce((acc, d) => acc + d.value, 0) / recent.length
  if (avg < 2) return 'Low'
  if (avg < 3) return 'Foggy'
  if (avg < 4) return 'Okay'
  if (avg < 4.5) return 'Bright'
  return 'Glowing'
})

function setMood(id) {
  moodStore.checkIn(id)
}

function playSession(session) {
  playerStore.loadSession(session)
  router.push({ name: 'session', params: { id: session.id } })
}
</script>

<style scoped>
.home-view { min-height: var(--app-min-height); background: var(--forest-900); padding-bottom: var(--page-pad-bottom-auth); }
.home-wrap { max-width: 1280px; margin: 0 auto; padding: calc(var(--navbar-height) + 28px) var(--container-pad) 100px; display: grid; grid-template-columns: 1fr 320px; gap: 32px; }
.greeting, .mood-section, .section-head, .rec-scroll, .cat-grid, .moment-card { grid-column: 1 / 2; }
.sidebar { grid-column: 2 / 3; display: flex; flex-direction: column; gap: 16px; }

.greeting-eyebrow { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: var(--lime-500); margin-bottom: 8px; display: block; }
.greeting-title { font-family: var(--font-display); font-size: clamp(22px, 2.2vw, 30px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); margin-bottom: 6px; }
.greeting-sub { font-size: 15px; color: var(--text-secondary); }

.mood-section { margin-top: 10px; margin-bottom: 16px; }
.mood-label { font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 14px; }
.mood-row { display: flex; gap: 10px; }
.mood-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 16px; border-radius: 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); color: var(--text-muted); cursor: pointer; transition: all 200ms var(--ease-out); flex: 1; }
.mood-btn:hover { background: rgba(184,245,102,0.07); border-color: rgba(184,245,102,0.2); transform: translateY(-2px); }
.mood-btn.active { background: rgba(184,245,102,0.1); border-color: rgba(184,245,102,0.3); color: var(--lime-300); }
.mood-name { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

.section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.section-head-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--text-primary); }
.see-all { font-size: 13px; font-weight: 600; color: var(--lime-500); text-decoration: none; transition: opacity 150ms; }
.see-all:hover { opacity: 0.7; }
.see-all--block { display: block; margin-top: 14px; }

.rec-scroll { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 36px; }
.rec-card { flex-shrink: 0; width: 200px; background: var(--bg-glass); backdrop-filter: blur(16px); border: var(--border-glass); border-radius: 18px; overflow: hidden; cursor: pointer; transition: all 250ms var(--ease-out); }
.rec-card:hover { border-color: rgba(184,245,102,0.25); transform: translateY(-3px); box-shadow: var(--glow-card-hover); }
.rec-thumb { height: 120px; position: relative; }
.rec-thumb::after { content: ''; position: absolute; inset: 0; background: linear-gradient(160deg, rgba(184,245,102,0.12), rgba(13,31,18,0.45)); }
.rec-badge { position: absolute; top: 8px; left: 8px; z-index: 2; padding: 2px 8px; border-radius: 999px; background: rgba(7,15,10,0.7); font-size: 9px; font-weight: 700; color: var(--lime-400); letter-spacing: 1px; text-transform: uppercase; border: 1px solid rgba(184,245,102,0.2); }
.rec-play { position: absolute; bottom: 8px; right: 8px; z-index: 2; width: 30px; height: 30px; border-radius: 50%; background: var(--lime-500); display: flex; align-items: center; justify-content: center; color: var(--forest-900); opacity: 0; transform: scale(0.6); transition: all 200ms; }
.rec-card:hover .rec-play { opacity: 1; transform: scale(1); }
.rec-info { padding: 12px 14px; }
.rec-title { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; line-height: 1.2; }
.rec-meta { display: flex; justify-content: space-between; }
.rec-cat { font-size: 11px; color: var(--lime-500); font-weight: 600; text-transform: capitalize; }
.rec-dur { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }

.cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 36px; }
.cat-tile { padding: 18px 16px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); transition: all 200ms var(--ease-out); text-align: center; text-decoration: none; }
.cat-tile:hover { background: rgba(184,245,102,0.07); border-color: rgba(184,245,102,0.18); transform: translateY(-2px); }
.cat-icon { color: var(--lime-500); margin: 0 auto 6px; }
.cat-name { font-size: 13px; font-weight: 600; color: var(--text-secondary); }

.moment-card { padding: 24px; background: linear-gradient(135deg, var(--forest-700), var(--forest-600)); border: var(--border-glass); border-radius: 18px; position: relative; overflow: hidden; }
.moment-card::before { content: ''; position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; background: radial-gradient(circle, rgba(184,245,102,0.1) 0%, transparent 70%); pointer-events: none; }
.moment-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: var(--lime-500); margin-bottom: 10px; }
.moment-label { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 14px; }
.moment-sessions { display: flex; gap: 8px; flex-wrap: wrap; }

.streak-card { padding: 28px; background: linear-gradient(160deg, var(--forest-700), var(--forest-600)); border: 1px solid rgba(184,245,102,0.15); border-radius: 20px; position: relative; overflow: hidden; }
.streak-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; color: var(--lime-400); }
.streak-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: var(--text-muted); }
.streak-val { font-family: var(--font-display); font-size: 56px; font-weight: 800; letter-spacing: -3px; color: var(--lime-500); line-height: 1; margin-bottom: 4px; }
.streak-unit { font-size: 14px; color: var(--text-secondary); margin-bottom: 16px; }
.streak-dots { display: flex; gap: 6px; }
.streak-dot { width: 28px; height: 6px; border-radius: 999px; background: rgba(255,255,255,0.08); }
.streak-dot.done { background: var(--lime-500); }

.phrase-card, .prog-mini { padding: 24px; background: var(--bg-glass); backdrop-filter: blur(16px); border: var(--border-glass); border-radius: 18px; }
.phrase-label, .prog-mini-title { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: var(--lime-500); margin-bottom: 10px; }
.phrase-text { font-family: var(--font-display); font-size: 17px; font-weight: 600; color: var(--text-primary); line-height: 1.5; font-style: italic; }
.prog-stat-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.prog-stat-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
.prog-stat-label { font-size: 14px; color: var(--text-secondary); }
.prog-stat-val { font-family: var(--font-display); font-size: 20px; font-weight: 800; color: var(--text-primary); }
.prog-stat-val .unit { font-size: 12px; font-weight: 500; color: var(--text-muted); }
.mood-val { color: var(--lime-500); }

@media (max-width: 1024px) {
  .home-wrap { grid-template-columns: 1fr; }
  .sidebar { grid-column: 1 / 2; display: grid; grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .home-wrap { padding: 24px 16px 88px; }
  .mood-row { gap: 6px; }
  .mood-btn { padding: 10px 8px; }
  .cat-grid { grid-template-columns: repeat(3, 1fr); }
  .sidebar { grid-template-columns: 1fr; }
}
</style>
