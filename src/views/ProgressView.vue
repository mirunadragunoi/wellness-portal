<template>
  <div class="progress-view">
    <div class="container">
      <header class="progress-view__header">
        <h1 class="progress-view__title">{{ t('progress.title') }}</h1>
      </header>

      <div class="progress-view__grid">
        <!-- Stats -->
        <ProgressStatsGrid />

        <!-- Two-col: mood + history -->
        <div class="progress-view__two-col">
          <ProgressMoodChart />

          <div class="progress-view__history-col">
            <ProgressSessionHistory />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress'
import { useMoodStore }     from '@/stores/mood'
import ProgressStatsGrid      from '@/components/progress/ProgressStatsGrid.vue'
import ProgressMoodChart      from '@/components/progress/ProgressMoodChart.vue'
import ProgressSessionHistory from '@/components/progress/ProgressSessionHistory.vue'

const { t }         = useI18n()
const progressStore = useProgressStore()
const moodStore     = useMoodStore()

onMounted(() => {
  progressStore.fetchStats()
  progressStore.fetchHistory()
  moodStore.fetchHistory()
})
</script>

<style scoped>
.progress-view { padding: 40px 0 var(--page-pad-bottom-auth); min-height: var(--app-min-height); }
.progress-view__header { margin-bottom: 32px; }
.progress-view__title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 300; color: var(--text-primary); letter-spacing: -0.5px;
}
.progress-view__grid  { display: flex; flex-direction: column; gap: 32px; }
.progress-view__two-col {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 28px;
  align-items: start;
}
@media (max-width: 768px) {
  .progress-view__two-col { grid-template-columns: 1fr; }
}
</style>
