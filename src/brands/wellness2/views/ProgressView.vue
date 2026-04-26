<template>
  <div class="progress-view">

    <!-- Dark header -->
    <div class="progress-view__head">
      <div class="container">
        <h1 class="progress-view__title">{{ t('progress.title') }}</h1>
        <p class="progress-view__sub">Your journey, your data</p>
      </div>
    </div>

    <!-- Body -->
    <div class="container progress-view__body">
      <ProgressStatsGrid />

      <div class="progress-view__two-col">
        <ProgressMoodChart />
        <ProgressSessionHistory />
      </div>
    </div>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import ProgressStatsGrid      from '@/components/progress/ProgressStatsGrid.vue'
import ProgressMoodChart      from '@/components/progress/ProgressMoodChart.vue'
import ProgressSessionHistory from '@/components/progress/ProgressSessionHistory.vue'
const { t } = useI18n()
</script>

<style scoped>
.progress-view {
  min-height: var(--app-min-height);
  background: var(--forest-900);
  padding-bottom: var(--page-pad-bottom-auth);
}
.progress-view__head {
  max-width: var(--container-max); margin: 0 auto;
  padding: 40px var(--container-pad) 28px;
}
.progress-view__title {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 48px); font-weight: 800;
  letter-spacing: -2px; color: var(--text-primary); margin-bottom: 6px;
}
.progress-view__sub { font-size: 15px; color: var(--text-secondary); }
.progress-view__body {
  max-width: var(--container-max); margin: 0 auto;
  padding: 0 var(--container-pad) 100px;
}
.progress-view__two-col {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 20px; align-items: start;
}
@media (max-width: 1100px) { .progress-view__two-col { grid-template-columns: 1fr; } }
</style>
