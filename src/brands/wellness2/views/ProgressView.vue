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
  background: var(--parchment);
  padding-bottom: var(--page-pad-bottom-auth);
}
.progress-view__head {
  background: linear-gradient(180deg, var(--sage-100), var(--parchment));
  padding: 28px 0;
  border-bottom: 2px solid var(--ink-200);
}
.progress-view__title {
  font-family: var(--font-display);
  font-size: clamp(26px, 3.5vw, 40px); font-weight: 300;
  color: var(--ink-900); letter-spacing: -0.5px;
}
.progress-view__sub { font-size: 14px; color: var(--text-secondary); margin-top: 4px; }
.progress-view__body { padding-top: 28px; display: flex; flex-direction: column; gap: 24px; }
.progress-view__two-col {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(0,1fr);
  gap: 20px; align-items: start;
}
@media (max-width: 768px) {
  .progress-view__two-col { grid-template-columns: 1fr; }
  .progress-view__body {
    padding-top: 18px;
    gap: 16px;
  }
}
</style>
