<template>
  <div class="progress-view">
    <header class="progress-header">
      <div class="container">
        <h1 class="progress-header__title">Your progress</h1>
      </div>
    </header>

    <div class="container progress-content">
      <section class="stats-grid">
        <article class="stat-card">
          <p>Total sessions</p>
          <h2>{{ progressStore.totalSessions }}</h2>
        </article>
        <article class="stat-card">
          <p>Total mindful time</p>
          <h2>{{ progressStore.totalTimeFormatted }}</h2>
        </article>
        <article class="stat-card">
          <p>Current streak</p>
          <h2>{{ progressStore.streakDays }}d</h2>
        </article>
        <article class="stat-card">
          <p>Longest streak</p>
          <h2>{{ progressStore.longestStreak }}d</h2>
        </article>
      </section>

      <section class="progress-panels">
        <article class="panel">
          <h3>Mood history</h3>
          <div class="mood-bars">
            <div v-for="d in moodStore.last7Days" :key="d.date" class="mood-col">
              <div class="mood-col__bar" :style="{ height: `${((d.value || 1) / 5) * 72}px` }" />
              <span>{{ d.label }}</span>
            </div>
          </div>
        </article>

        <article class="panel">
          <h3>Recent sessions</h3>
          <div class="recent-list">
            <div v-for="(s, idx) in recent" :key="`${s.id}-${idx}`" class="recent-item">
              <div class="recent-item__thumb" />
              <div class="recent-item__meta">
                <p>{{ s.title }}</p>
                <small>{{ formatDate(s.completedAt) }} · {{ Math.round((s.duration || 0) / 60) }} min</small>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useMoodStore } from '@/stores/mood'
import { useProgressStore } from '@/stores/progress'

const moodStore = useMoodStore()
const progressStore = useProgressStore()

const recent = computed(() => progressStore.recentSessions.slice(0, 6))

function formatDate(date) {
  if (!date) return 'Today'
  return dayjs(date).format('ddd, HH:mm')
}
</script>

<style scoped>
.progress-view { min-height: var(--app-min-height); padding-bottom: var(--page-pad-bottom-auth); }
.progress-header {
  padding: 24px 0 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: linear-gradient(180deg, rgba(251, 191, 36, 0.08), transparent);
}
.progress-header__title { font-family: var(--font-d); font-size: clamp(26px, 3.5vw, 38px); font-weight: 400; }

.progress-content { padding-top: 18px; display: flex; flex-direction: column; gap: 18px; }
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.stat-card {
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--r);
  padding: 14px;
  backdrop-filter: blur(12px);
}
.stat-card p { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--text-muted); font-weight: 700; }
.stat-card h2 { margin-top: 8px; font-family: var(--font-d); font-size: 30px; font-weight: 400; }

.progress-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.panel {
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--r-lg);
  padding: 16px;
  backdrop-filter: blur(12px);
}
.panel h3 { font-family: var(--font-d); font-size: 22px; font-weight: 400; margin-bottom: 10px; }

.mood-bars { display: flex; align-items: end; gap: 8px; height: 92px; }
.mood-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.mood-col__bar {
  width: 100%;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(to top, var(--violet), var(--blue));
  box-shadow: 0 0 10px rgba(167, 139, 250, 0.25);
  min-height: 8px;
}
.mood-col span { font-size: 9px; color: var(--text-muted); font-weight: 700; }

.recent-list { display: flex; flex-direction: column; gap: 8px; }
.recent-item {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: var(--r-sm);
  background: rgba(255, 255, 255, 0.04);
}
.recent-item__thumb {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--violet), var(--teal));
  flex-shrink: 0;
}
.recent-item__meta p { font-size: 13px; color: var(--text-primary); }
.recent-item__meta small { font-size: 11px; color: var(--text-muted); }

@media (max-width: 900px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .progress-panels { grid-template-columns: 1fr; }
}
</style>
