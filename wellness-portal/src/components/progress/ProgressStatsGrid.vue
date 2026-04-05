<template>
  <div class="stats-grid">
    <div v-for="stat in stats" :key="stat.label" class="stat-card">
      <span class="stat-card__icon">{{ stat.icon }}</span>
      <span class="stat-card__value">{{ stat.value }}</span>
      <span class="stat-card__label">{{ t(stat.labelKey) }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress'

const { t }         = useI18n()
const progressStore = useProgressStore()

const stats = computed(() => [
  { icon: '🧘', value: progressStore.totalSessions,        labelKey: 'progress.total_sessions' },
  { icon: '⏱',  value: progressStore.totalTimeFormatted,   labelKey: 'progress.total_time'     },
  { icon: '🔥', value: `${progressStore.streakDays}d`,     labelKey: 'progress.current_streak' },
  { icon: '🏆', value: `${progressStore.longestStreak}d`,  labelKey: 'progress.longest_streak' }
])
</script>

<style scoped>
.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}
.stat-card {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 24px 16px; background: var(--bg-surface);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);
  text-align: center;
}
.stat-card__icon  { font-size: 28px; }
.stat-card__value { font-family: var(--font-display); font-size: 32px; font-weight: 300; color: var(--text-primary); line-height: 1; }
.stat-card__label { font-size: 12px; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }

@media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
