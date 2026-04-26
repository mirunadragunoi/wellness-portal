<template>
  <div class="streak-card">
    <div class="streak-card__top">
      <div class="streak-main">
        <Icon icon="lucide:flame" class="streak-fire app-icon app-icon--xl" aria-hidden="true" />
        <div class="streak-info">
          <span class="streak-number">{{ progressStore.streakDays }}</span>
          <span class="streak-label">{{ t('home.streak_label') }}</span>
        </div>
      </div>
      <div class="streak-longest">
        <span class="streak-longest__label">Best</span>
        <span class="streak-longest__value">{{ progressStore.longestStreak }} {{ t('common.days') }}</span>
      </div>
    </div>

    <div class="streak-week">
      <div
        v-for="day in progressStore.weeklyDays" :key="day.date"
        class="streak-day"
        :class="{ 'streak-day--done': day.completed, 'streak-day--today': isToday(day.date) }"
        :title="day.date"
      >
        <div class="streak-day__dot" />
        <span class="streak-day__label">{{ day.label }}</span>
      </div>
    </div>

    <p class="streak-summary">
      {{ t('home.streak_weeks', { n: doneThisWeek }) }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress'
import dayjs from 'dayjs'

const { t }          = useI18n()
const progressStore  = useProgressStore()
const doneThisWeek   = computed(() => progressStore.weeklyDays.filter(d => d.completed).length)
const isToday = (date) => dayjs(date).isSame(dayjs(), 'day')
</script>

<style scoped>
.streak-card {
  padding: 28px;
  background: linear-gradient(160deg, var(--forest-700), var(--forest-600));
  border: 1px solid rgba(184,245,102,0.15); border-radius: 20px;
  display: flex; flex-direction: column; gap: 16px;
  position: relative; overflow: hidden;
}
.streak-card::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 80% 20%, rgba(184,245,102,0.08) 0%, transparent 60%);
  pointer-events: none;
}
.streak-card__top { display: flex; align-items: center; justify-content: space-between; }
.streak-main { display: flex; align-items: center; gap: 14px; }
.streak-fire { color: var(--amber-400); flex-shrink: 0; }
.streak-number { font-family: var(--font-display); font-size: 56px; font-weight: 800; letter-spacing: -3px; color: var(--lime-500); line-height: 1; }
.streak-label  { font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 3px; }
.streak-longest { text-align: right; }
.streak-longest__label { display: block; font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.streak-longest__value { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); }
.streak-week { display: flex; justify-content: space-between; gap: 6px; }
.streak-day { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
.streak-day__dot {
  width: 100%; height: 6px; border-radius: 999px;
  background: rgba(255,255,255,0.08);
  transition: all var(--duration-normal);
}
.streak-day--done .streak-day__dot { background: var(--lime-500); }
.streak-day--today .streak-day__dot { background: rgba(184,245,102,0.4); animation: pulse-dot 2s ease infinite; }
.streak-day__label { font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.streak-summary { font-size: 13px; color: var(--text-secondary); text-align: center; margin: 0; }
@media (max-width: 640px) { .streak-card { padding: 20px; } }
</style>
