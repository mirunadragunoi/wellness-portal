<template>
  <div class="mood-chart-card">
    <div class="mood-chart-card__header">
      <h3 class="mood-chart-card__title">{{ t('progress.mood_history') }}</h3>
      <span class="mood-chart-card__sub">{{ t('progress.last_7_days') }}</span>
    </div>

    <div class="mood-chart-card__chart">
      <div class="mood-bars">
        <div v-for="day in moodStore.last7Days" :key="day.date" class="mood-bar-wrap">
          <div class="mood-bar-col">
            <Icon
              v-if="day.icon"
              :icon="day.icon"
              class="mood-bar-icon app-icon app-icon--sm app-icon--muted"
            />
            <div
              class="mood-bar"
              :style="{
                height: day.value ? (day.value / 5 * 100) + '%' : '4px',
                background: day.value ? moodGradient(day.value) : 'var(--bg-muted)'
              }"
            />
          </div>
          <span class="mood-bar-label">{{ day.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useMoodStore } from '@/stores/mood'

const { t }     = useI18n()
const moodStore = useMoodStore()

function moodGradient(value) {
  const colors = {
    1: '#94a3b8',
    2: '#64748b',
    3: '#38bdf8',
    4: '#0ea5e9',
    5: '#f59e0b'
  }
  return colors[value] || '#e2e8f0'
}
</script>

<style scoped>
.mood-chart-card {
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); padding: 24px 28px;
}
.mood-chart-card__header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 24px; }
.mood-chart-card__title  { font-family: var(--font-display); font-size: 22px; font-weight: 500; color: var(--text-primary); }
.mood-chart-card__sub    { font-size: 13px; color: var(--text-muted); }

.mood-bars { display: flex; gap: 8px; align-items: flex-end; height: 120px; }
.mood-bar-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; height: 100%; }
.mood-bar-col  { flex: 1; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 6px; }
.mood-bar-icon { margin-bottom: 2px; }
.mood-bar {
  width: 100%; max-width: 36px; border-radius: 6px 6px 0 0;
  min-height: 4px; transition: height 0.6s var(--ease-smooth);
}
.mood-bar-label { font-size: 11px; color: var(--text-muted); font-weight: 500; text-transform: uppercase; }
</style>
