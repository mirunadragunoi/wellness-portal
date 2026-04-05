<template>
  <div class="streak-card">
    <div class="streak-card__top">
      <div class="streak-main">
        <span class="streak-fire">🔥</span>
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
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  display: flex; flex-direction: column; gap: 20px;
}
.streak-card__top { display: flex; align-items: center; justify-content: space-between; }
.streak-main { display: flex; align-items: center; gap: 14px; }
.streak-fire { font-size: 36px; }
.streak-info { display: flex; flex-direction: column; gap: 2px; }
.streak-number { font-family: var(--font-display); font-size: 36px; font-weight: 300; color: var(--text-primary); line-height: 1; }
.streak-label  { font-size: 13px; color: var(--text-muted); font-weight: 500; }
.streak-longest { text-align: right; }
.streak-longest__label { display: block; font-size: 12px; color: var(--text-muted); }
.streak-longest__value { font-size: 15px; font-weight: 600; color: var(--text-secondary); }

.streak-week { display: flex; justify-content: space-between; gap: 4px; }
.streak-day {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  flex: 1;
}
.streak-day__dot {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--bg-muted);
  border: 2px solid var(--border-subtle);
  transition: all var(--duration-normal) var(--ease-smooth);
}
.streak-day--done .streak-day__dot {
  background: var(--sky-400);
  border-color: var(--sky-500);
  box-shadow: 0 0 0 3px rgba(14,165,233,0.15);
}
.streak-day--today .streak-day__dot {
  border-color: var(--sky-400);
  background: var(--sky-100);
}
.streak-day__label { font-size: 11px; color: var(--text-muted); font-weight: 500; text-transform: uppercase; }
.streak-summary { font-size: 13px; color: var(--text-secondary); text-align: center; margin: 0; }
</style>
