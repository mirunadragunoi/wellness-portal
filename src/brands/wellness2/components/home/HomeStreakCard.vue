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
  background: var(--ink-900); color: var(--parchment);
  border: 2px solid var(--ink-700); border-radius: var(--radius-lg);
  padding: 24px 28px; display: flex; flex-direction: column; gap: 20px;
}
.streak-card__top { display: flex; align-items: center; justify-content: space-between; }
.streak-main { display: flex; align-items: center; gap: 14px; }
.streak-fire { color: #f97316; flex-shrink: 0; }
.streak-number { font-family: var(--font-display); font-size: 42px; font-weight: 300; color: var(--parchment); line-height: 1; }
.streak-label  { font-size: 12px; color: var(--ink-400); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.streak-longest { text-align: right; }
.streak-longest__label { display: block; font-size: 11px; color: var(--ink-400); text-transform: uppercase; letter-spacing: 1px; }
.streak-longest__value { font-size: 16px; font-weight: 700; color: var(--parchment); }
.streak-week { display: flex; justify-content: space-between; gap: 4px; }
.streak-day { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
.streak-day__dot {
  width: 26px; height: 26px; border-radius: var(--radius-sm);
  background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.12);
  transition: all var(--duration-normal);
}
.streak-day--done .streak-day__dot { background: var(--sage-500); border-color: var(--sage-400); }
.streak-day--today .streak-day__dot { border-color: var(--sage-400); background: rgba(71,127,60,0.2); }
.streak-day__label { font-size: 10px; color: var(--ink-400); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.streak-summary { font-size: 13px; color: var(--ink-400); text-align: center; margin: 0; }
@media (max-width: 640px) { .streak-card { padding: 16px; } }
</style>
