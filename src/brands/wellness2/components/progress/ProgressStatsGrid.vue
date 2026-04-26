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
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
.stat-card {
  padding: 28px 24px; border-radius: 20px;
  background: var(--bg-glass); backdrop-filter: blur(20px);
  border: var(--border-glass);
  position: relative; overflow: hidden;
  transition: all 280ms var(--ease-smooth);
}
.stat-card:hover { border-color: rgba(184,245,102,0.22); box-shadow: var(--glow-card-hover); transform: translateY(-2px); }
.stat-card::before {
  content: ''; position: absolute; top: -40px; right: -40px;
  width: 120px; height: 120px;
  background: radial-gradient(circle, rgba(184,245,102,0.06) 0%, transparent 70%);
  pointer-events: none;
}
.stat-card__icon { font-size: 22px; margin-bottom: 14px; color: var(--text-muted); }
.stat-card__value {
  font-family: var(--font-display); font-size: clamp(32px, 3.5vw, 48px); font-weight: 800;
  letter-spacing: -2px; color: var(--lime-500); line-height: 1; margin-bottom: 6px;
}
.stat-card__label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; font-weight: 600; }
.stat-card__sub   { margin-top: 10px; font-size: 12px; color: var(--emerald-400); font-weight: 600; }

@media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px)  { .stats-grid { grid-template-columns: 1fr 1fr; } }
</style>
