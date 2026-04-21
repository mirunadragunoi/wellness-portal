<template>
  <section class="metrics section">
    <div class="container">
      <div class="metrics__grid">
        <div v-for="m in metrics" :key="m.valueKey" class="metric">
          <div class="metric__media" :style="{ backgroundImage: `linear-gradient(180deg, rgba(7,13,26,0.15), rgba(7,13,26,0.68)), url(${m.image})` }" />
          <div class="metric__value" :style="{ '--accent': m.color }">
            {{ t(m.valueKey) }}
            <Icon v-if="m.star" icon="mdi:star" class="metric__star app-icon app-icon--md" aria-hidden="true" />
          </div>
          <div class="metric__label">{{ t(m.labelKey) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'

const { t } = useI18n()
const { metric1, metric2, metric3 } = LANDING_IMAGES

const metrics = [
  { valueKey: 'metrics.m1_value', labelKey: 'metrics.m1_label', color: 'var(--violet)', image: metric1 },
  { valueKey: 'metrics.m2_value', labelKey: 'metrics.m2_label', color: 'var(--teal)', image: metric2 },
  { valueKey: 'metrics.m3_value', labelKey: 'metrics.m3_label', color: 'var(--amber)', star: true, image: metric3 },
]
</script>

<style scoped>
.metrics {
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.metrics__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.metric {
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  backdrop-filter: blur(12px);
}
.metric__media {
  width: calc(100% + 48px);
  height: 96px;
  margin: -28px -24px 18px;
  background-size: cover;
  background-position: center;
}

.metric__value {
  font-family: var(--font-d);
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--accent), white);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex-wrap: wrap;
  width: 100%;
}

.metric__star {
  color: var(--amber);
  width: clamp(22px, 3vw, 32px);
  height: clamp(22px, 3vw, 32px);
  flex-shrink: 0;
  /* override gradient clip for the icon */
  -webkit-text-fill-color: var(--amber);
}

.metric__label {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.65;
}

@media (max-width: 640px) {
  .metrics__grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
