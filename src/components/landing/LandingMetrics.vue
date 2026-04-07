<template>
  <div class="metrics-section">
    <div class="container">
      <h2 class="section-title">{{ t('metrics.title_1') }} <em>{{ t('metrics.title_em') }}</em></h2>
      <div class="metrics__grid">
        <div v-for="m in metrics" :key="m.valueKey" class="metric">
          <div class="metric__media" :style="{ backgroundImage: `linear-gradient(180deg, rgba(2,132,199,0.05), rgba(2,132,199,0.35)), url(${m.image})` }" />
          <div class="metric__value">
            {{ t(m.valueKey) }}
            <Icon v-if="m.star" icon="mdi:star" class="metric__star app-icon app-icon--md" aria-hidden="true" />
          </div>
          <div class="metric__label">{{ t(m.labelKey) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
const { t } = useI18n()
const metrics = [
  { valueKey: 'metrics.m1_value', labelKey: 'metrics.m1_label', image: LANDING_IMAGES.metric1 },
  { valueKey: 'metrics.m2_value', labelKey: 'metrics.m2_label', image: LANDING_IMAGES.metric2 },
  { valueKey: 'metrics.m3_value', labelKey: 'metrics.m3_label', image: LANDING_IMAGES.metric3, star: true }
]
</script>

<style scoped>
.metrics-section {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--sky-600) 0%, var(--sky-700) 100%);
  position: relative; overflow: hidden;
}
.metrics-section::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 60%);
  pointer-events: none;
}
.metrics-section .container { position: relative; z-index: 1; }
.section-title { color: white; text-align: center; margin-bottom: 56px; }
.section-title em { color: rgba(255,255,255,0.7); }
.metrics__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}
.metric {
  text-align: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: var(--radius-lg);
  overflow: hidden;
  padding-bottom: 20px;
}
.metric__media {
  height: 120px;
  margin-bottom: 14px;
  background-size: cover;
  background-position: center;
}
.metric__value {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 300;
  color: white;
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: -2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.metric__star { color: rgba(255, 255, 255, 0.9); width: clamp(28px, 4vw, 40px); height: clamp(28px, 4vw, 40px); }
.metric__label { font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.5; max-width: 220px; margin: 0 auto; }

@media (max-width: 640px) {
  .metrics__grid { grid-template-columns: 1fr; gap: 36px; }
}
</style>
