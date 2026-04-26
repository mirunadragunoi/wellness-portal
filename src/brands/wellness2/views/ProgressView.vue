<template>
  <div class="progress-view">
    <div class="progress-wrap">
      <header class="page-header">
        <h1 class="page-title">{{ t('progress.title') }}</h1>
        <p class="page-sub">Track your wellness journey - sessions, moods, and streaks.</p>
      </header>

      <section class="stats-grid">
        <article class="stat-card">
          <Icon icon="lucide:headphones" class="app-icon app-icon--lg stat-icon" />
          <div class="stat-val">{{ progressStore.totalSessions }}</div>
          <div class="stat-label">Total Sessions</div>
        </article>
        <article class="stat-card">
          <Icon icon="lucide:clock-3" class="app-icon app-icon--lg stat-icon" />
          <div class="stat-val">{{ progressStore.totalTimeFormatted }}</div>
          <div class="stat-label">Total Time</div>
        </article>
        <article class="stat-card">
          <Icon icon="lucide:flame" class="app-icon app-icon--lg stat-icon" />
          <div class="stat-val">{{ progressStore.streakDays }}</div>
          <div class="stat-label">Current Streak</div>
        </article>
        <article class="stat-card">
          <Icon icon="lucide:trophy" class="app-icon app-icon--lg stat-icon" />
          <div class="stat-val">{{ progressStore.longestStreak }}</div>
          <div class="stat-label">Longest Streak</div>
        </article>
      </section>

      <div class="bottom-grid">
        <div>
          <section class="chart-card">
            <div class="chart-header">
              <span class="chart-title">Mood history</span>
              <span class="chart-period">Last 7 days</span>
            </div>
            <div class="bar-chart">
              <div v-for="d in moodStore.last7Days" :key="d.date" class="bar-col">
                <div class="bar" :style="{ height: `${(d.value || 1) * 20}%` }"></div>
                <div class="bar-day">{{ d.label }}</div>
              </div>
            </div>
          </section>

          <section class="history-card">
            <h2 class="history-title">Recent sessions</h2>
            <div
              v-for="s in recent"
              :key="`${s.id}-${s.completedAt}`"
              class="history-item"
            >
              <div class="history-icon"><Icon icon="lucide:circle-play" class="app-icon app-icon--sm" /></div>
              <div>
                <div class="history-title-text">{{ s.title }}</div>
                <div class="history-date">{{ formatDate(s.completedAt) }} - {{ s.type }}</div>
              </div>
              <div class="history-dur">{{ Math.round(s.duration / 60) }} min</div>
            </div>
          </section>
        </div>

        <aside class="sidebar-right">
          <section class="streak-big">
            <span class="streak-big-label">Current streak</span>
            <div class="streak-big-val">{{ progressStore.streakDays }}</div>
            <div class="streak-big-unit">days in a row</div>
            <div class="streak-calendar">
              <span
                v-for="d in progressStore.weeklyDays"
                :key="d.date"
                class="cal-day"
                :class="d.completed ? 'cal-done' : 'cal-empty'"
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useProgressStore } from '@/stores/progress'
import { useMoodStore } from '@/stores/mood'
const { t } = useI18n()
const progressStore = useProgressStore()
const moodStore = useMoodStore()
const recent = computed(() => progressStore.recentSessions.slice(0, 6))
const formatDate = (v) => dayjs(v).format('ddd, MMM D')
</script>

<style scoped>
.progress-view {
  min-height: var(--app-min-height);
  background: var(--forest-900);
  padding-bottom: var(--page-pad-bottom-auth);
}
.progress-wrap { max-width: 1280px; margin: 0 auto; padding: calc(var(--navbar-height) + 28px) var(--container-pad) 100px; }
.page-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 2.5vw, 32px); font-weight: 800;
  letter-spacing: -2px; color: var(--text-primary); margin-bottom: 6px;
}
.page-sub { font-size: 15px; color: var(--text-secondary); margin-bottom: 36px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
.stat-card { padding: 28px 24px; border-radius: 20px; background: var(--bg-glass); backdrop-filter: blur(20px); border: var(--border-glass); }
.stat-icon { color: var(--lime-400); margin-bottom: 14px; }
.stat-val { font-family: var(--font-display); font-size: clamp(32px, 3.5vw, 48px); font-weight: 800; letter-spacing: -2px; color: var(--lime-500); line-height: 1; margin-bottom: 6px; }
.stat-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; font-weight: 600; }
.bottom-grid { display: grid; grid-template-columns: 1fr 360px; gap: 20px; }
.chart-card, .history-card { background: var(--bg-glass); backdrop-filter: blur(20px); border: var(--border-glass); border-radius: 20px; padding: 28px; margin-bottom: 20px; }
.chart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.chart-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); }
.chart-period { font-size: 12px; color: var(--text-muted); font-family: var(--font-mono); }
.bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 110px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.bar { width: 100%; border-radius: 6px 6px 0 0; background: linear-gradient(to top, var(--emerald-500), var(--lime-500)); min-height: 8px; }
.bar-day { font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); }
.history-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; }
.history-item { display: grid; grid-template-columns: 36px 1fr auto; gap: 12px; align-items: center; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.history-item:last-child { border-bottom: none; padding-bottom: 0; }
.history-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(184,245,102,0.08); border: 1px solid rgba(184,245,102,0.12); display: flex; align-items: center; justify-content: center; color: var(--lime-400); }
.history-title-text { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
.history-date { font-size: 11px; color: var(--text-muted); text-transform: capitalize; }
.history-dur { font-family: var(--font-mono); font-size: 12px; color: var(--lime-500); }
.streak-big { padding: 28px; background: linear-gradient(160deg, var(--forest-700), var(--forest-600)); border: 1px solid rgba(184,245,102,0.12); border-radius: 20px; }
.streak-big-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: var(--text-muted); margin-bottom: 8px; display: block; }
.streak-big-val { font-family: var(--font-display); font-size: 52px; font-weight: 800; letter-spacing: -3px; color: var(--lime-500); line-height: 1; margin-bottom: 4px; }
.streak-big-unit { font-size: 13px; color: var(--text-secondary); margin-bottom: 20px; }
.streak-calendar { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.cal-day { aspect-ratio: 1; border-radius: 4px; }
.cal-done { background: var(--lime-500); }
.cal-empty { background: rgba(255,255,255,0.04); }
@media (max-width: 1100px) { .bottom-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
