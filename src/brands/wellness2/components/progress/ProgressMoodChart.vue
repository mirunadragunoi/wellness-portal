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
    1: 'linear-gradient(to top, var(--forest-400), var(--forest-300))',
    2: 'linear-gradient(to top, var(--forest-400), var(--forest-300))',
    3: 'linear-gradient(to top, var(--emerald-500), var(--emerald-400))',
    4: 'linear-gradient(to top, var(--emerald-500), var(--lime-500))',
    5: 'linear-gradient(to top, var(--lime-500), var(--lime-400))'
  }
  return colors[value] || 'rgba(255,255,255,0.07)'
}
</script>

<style scoped>
.mood-chart-card {
  background: var(--bg-glass); backdrop-filter: blur(20px);
  border: var(--border-glass); border-radius: 20px; padding: 28px;
  margin-bottom: 20px;
}
.mood-chart-card__header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
}
.mood-chart-card__title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); }
.mood-chart-card__sub {
  font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);
}
.mood-chart-card__chart { width: 100%; }
.mood-bars { display: flex; align-items: flex-end; gap: 8px; height: 100px; margin-bottom: 12px; }
.mood-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.mood-bar-col { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%; height: 100%; }
.mood-bar {
  width: 100%; border-radius: 6px 6px 0 0;
  transition: height var(--duration-slow) var(--ease-smooth); min-height: 4px;
  cursor: pointer;
}
.mood-bar:hover { filter: brightness(1.2); }
.mood-bar-label {
  font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); font-weight: 500;
}

@media (max-width: 640px) { .mood-chart-card { padding: 16px; } }
</style>
