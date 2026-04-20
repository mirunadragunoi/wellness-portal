<template>
  <div class="home-view">
    <div class="home-header">
      <div class="container">
        <p class="home-header__eyebrow">Midnight Bloom</p>
        <h1 class="home-header__title">Good {{ greetingPart }}, {{ displayName }}</h1>
        <p class="home-header__subtitle">Consistency over intensity. Keep your nervous system steady.</p>
      </div>
    </div>

    <div class="container home-content">
      <section class="home-top-grid">
        <article class="card card--streak">
          <p class="card__label">Current streak</p>
          <div class="card__big">{{ progressStore.streakDays }} <span>days</span></div>
          <div class="streak-row">
            <span v-for="d in progressStore.weeklyDays" :key="d.date" class="streak-dot" :class="{ 'streak-dot--on': d.completed }">{{ d.label }}</span>
          </div>
        </article>

        <article class="card card--mood">
          <p class="card__label">How are you now?</p>
          <div class="mood-row">
            <button v-for="m in moodOptions" :key="m.id" class="mood-btn" :class="{ 'mood-btn--active': moodStore.todayMood === m.id }" @click="setMood(m.id)">
              <Icon :icon="m.icon" class="app-icon app-icon--md" />
              <span>{{ m.label }}</span>
            </button>
          </div>
        </article>
      </section>

      <section class="home-section">
        <div class="section-head">
          <h2>Recommended sessions</h2>
          <RouterLink to="/explore">See all</RouterLink>
        </div>
        <div class="session-grid">
          <ExploreSessionCard
            v-for="s in recommended"
            :key="s.id"
            :session="s"
            @play="playSession"
            @favorite="progressStore.toggleFavorite($event)"
          />
        </div>
      </section>

      <section class="home-section">
        <div class="section-head">
          <h2>Quick breathing</h2>
        </div>
        <div class="breathing-grid">
          <RouterLink v-for="b in breathingShortcuts" :key="b.id" :to="{ name: 'breathing', params: { type: b.id } }" class="breathing-chip">
            <Icon icon="lucide:wind" class="app-icon app-icon--sm" />
            <span>{{ b.label }}</span>
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useMoodStore, moodOptions } from '@/stores/mood'
import { useProgressStore } from '@/stores/progress'
import { useUserStore } from '@/stores/user'
import { usePlayerStore } from '@/stores/player'
import { sessions } from '@/data/sessions'
import ExploreSessionCard from '@/components/explore/ExploreSessionCard.vue'

const moodStore = useMoodStore()
const progressStore = useProgressStore()
const userStore = useUserStore()
const playerStore = usePlayerStore()
const router = useRouter()

onMounted(() => {
  moodStore.syncDay()
  progressStore.syncStreak()
})

const displayName = computed(() => userStore.firstName || 'friend')
const greetingPart = computed(() => {
  const h = dayjs().hour()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
})

const recommended = computed(() => sessions.slice(0, 4))

const breathingShortcuts = [
  { id: 'box', label: 'Box 4-4-4' },
  { id: '4-7-8', label: '4-7-8 calming' },
  { id: 'sos', label: 'SOS reset 1 min' }
]

function setMood(id) {
  moodStore.checkIn(id)
}

function playSession(session) {
  playerStore.loadSession(session)
  router.push({ name: 'session', params: { id: session.id } })
}
</script>

<style scoped>
.home-view { min-height: var(--app-min-height); padding-bottom: var(--page-pad-bottom-auth); }
.home-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: linear-gradient(180deg, rgba(167, 139, 250, 0.12), transparent);
  padding: 24px 0 18px;
}
.home-header__eyebrow { font-size: 10px; letter-spacing: .24em; text-transform: uppercase; color: var(--violet); font-weight: 700; }
.home-header__title { font-family: var(--font-d); font-size: clamp(26px, 3.5vw, 38px); font-weight: 400; margin-top: 6px; }
.home-header__subtitle { font-size: 14px; color: var(--text-secondary); margin-top: 4px; }

.home-content { padding-top: 18px; display: flex; flex-direction: column; gap: 18px; }
.home-top-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.card {
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--r-lg);
  backdrop-filter: blur(14px);
  padding: 16px;
}
.card__label { font-size: 10px; text-transform: uppercase; letter-spacing: .2em; color: var(--text-muted); font-weight: 700; }
.card__big { margin-top: 8px; font-family: var(--font-d); font-size: 34px; }
.card__big span { font-size: 14px; color: var(--text-secondary); }

.streak-row { margin-top: 10px; display: flex; gap: 6px; }
.streak-dot { width: 100%; text-align: center; font-size: 9px; color: var(--text-muted); padding: 6px 2px; border-radius: 8px; background: rgba(255,255,255,.05); }
.streak-dot--on { background: linear-gradient(135deg, var(--violet), var(--teal)); color: #07111e; font-weight: 700; }

.mood-row { margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap; }
.mood-btn { border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04); color: var(--text-secondary); border-radius: var(--r-full); padding: 7px 10px; display: inline-flex; gap: 6px; align-items: center; font-size: 12px; }
.mood-btn--active { border-color: rgba(167,139,250,.65); color: #d7ccff; background: rgba(167,139,250,.2); }

.home-section {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--r-lg);
  padding: 14px;
}
.section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.section-head h2 { font-family: var(--font-d); font-weight: 400; font-size: 22px; }
.section-head a { color: var(--violet); font-size: 12px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }

.session-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 14px; }
.breathing-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.breathing-chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 14px; border-radius: var(--r-full);
  border: 1px solid rgba(45, 212, 191, 0.28);
  background: rgba(45, 212, 191, 0.08);
  color: #8cf3e2; font-size: 12px; font-weight: 700; letter-spacing: .03em;
}

@media (max-width: 900px) {
  .home-top-grid { grid-template-columns: 1fr; }
}
</style>
