<template>
  <div class="metrics-band reveal">
    <div class="metrics-inner">
      <div v-for="(m, i) in metrics" :key="i" class="metric-cell">
        <div class="metric-img" :style="{ backgroundImage: `url(${m.image})` }" />
        <span class="metric-val">{{ m.value }}</span>
        <div class="metric-lbl">{{ t(m.labelKey) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
const { t } = useI18n()
const metrics = [
  { value: '87%',  labelKey: 'metrics.m1_label', image: LANDING_IMAGES.metric1 },
  { value: '12k+', labelKey: 'metrics.m2_label', image: LANDING_IMAGES.metric2 },
  { value: '4.8★', labelKey: 'metrics.m3_label', image: LANDING_IMAGES.metric3 },
]
</script>

<style scoped>
.metrics-band {
  background: var(--forest-800);
  padding: 80px var(--container-pad);
}
.metrics-inner {
  max-width: var(--container-max); margin: 0 auto;
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: rgba(184,245,102,0.06);
  border-radius: 24px; overflow: hidden;
}
.metric-cell {
  padding: 56px 48px;
  background: var(--forest-800);
  position: relative; overflow: hidden;
}
.metric-cell::after {
  content: ''; position: absolute; top: -60px; right: -60px;
  width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(184,245,102,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.metric-img {
  width: 48px; height: 48px; border-radius: 50%; overflow: hidden;
  margin-bottom: 20px; background: var(--forest-700);
  background-size: cover; background-position: center;
  filter: saturate(0) brightness(0.6);
}
.metric-val {
  font-family: var(--font-display);
  font-size: clamp(56px, 7vw, 88px); font-weight: 800;
  letter-spacing: -4px; color: var(--lime-500); line-height: 1;
  margin-bottom: 12px; display: block;
}
.metric-lbl { font-size: 15px; color: var(--text-secondary); line-height: 1.6; max-width: 200px; }

@media (max-width: 1024px) { .metrics-inner { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .metric-cell { padding: 36px 28px; } }
</style>
