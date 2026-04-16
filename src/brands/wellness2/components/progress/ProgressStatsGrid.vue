<template>
  <div class="stats-grid">
    <div v-for="stat in stats" :key="stat.label" class="stat-card">
      <Icon :icon="stat.icon" class="stat-card__icon app-icon app-icon--xl" />
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
  { icon: 'lucide:headphones', value: progressStore.totalSessions,        labelKey: 'progress.total_sessions' },
  { icon: 'lucide:clock',      value: progressStore.totalTimeFormatted,   labelKey: 'progress.total_time'     },
  { icon: 'lucide:flame',      value: `${progressStore.streakDays}d`,     labelKey: 'progress.current_streak' },
  { icon: 'lucide:trophy',     value: `${progressStore.longestStreak}d`,  labelKey: 'progress.longest_streak' }
])
</script>

<style scoped>
.stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); gap: 16px; }
.stat-card {
  background: var(--bg-surface);
  border: 2px solid var(--ink-200); border-radius: var(--radius-lg);
  padding: 20px; display: flex; flex-direction: column; gap: 10px;
  box-shadow: 3px 3px 0 var(--ink-100); position: relative; overflow: hidden;
}
.stat-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--sage-400);
}
.stat-card__icon { color: var(--sage-500); }
.stat-card__value {
  font-family: var(--font-display); font-size: 36px; font-weight: 300;
  color: var(--ink-900); line-height: 1; letter-spacing: -1px;
}
.stat-card__label { font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.stat-card__sub   { font-size: 13px; color: var(--text-secondary); }
</style>
