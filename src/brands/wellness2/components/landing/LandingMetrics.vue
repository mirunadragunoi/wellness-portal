<template>
  <section class="metrics-section">
    <div class="container">
      <div class="metrics__inner">
        <div class="metrics__headline">
          <h2 class="section-title">{{ t('metrics.title_1') }} <em>{{ t('metrics.title_em') }}</em></h2>
          <p class="section-subtitle">{{ t('metrics.subtitle') }}</p>
        </div>
        <div class="metrics__grid">
          <div v-for="m in metrics" :key="m.labelKey" class="metric-block">
            <div class="metric-block__img" :style="{ backgroundImage:`url(${m.image})` }" />
            <div class="metric-block__val">{{ t(m.valueKey) }}</div>
            <div class="metric-block__label">{{ t(m.labelKey) }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
const { t } = useI18n()
const metrics = [
  { valueKey:'metrics.m1_value', labelKey:'metrics.m1_label', image:LANDING_IMAGES.metric1 },
  { valueKey:'metrics.m2_value', labelKey:'metrics.m2_label', image:LANDING_IMAGES.metric2 },
  { valueKey:'metrics.m3_value', labelKey:'metrics.m3_label', image:LANDING_IMAGES.metric3 },
]
</script>

<style scoped>
.metrics-section {
  background:var(--ink-900);
  padding:80px 0;
}
.metrics__inner {
  display:grid; grid-template-columns:1fr 1fr;
  gap:clamp(32px,5vw,80px); align-items:center;
}
.metrics__headline .section-title { color:var(--parchment); }
.metrics__headline .section-title em { color:var(--sage-300); }
.metrics__headline .section-subtitle { color:var(--ink-400); }

.metrics__grid { display:flex; flex-direction:column; gap:2px; }

.metric-block {
  display:grid; grid-template-columns:64px 100px 1fr;
  align-items:center; gap:20px;
  padding:20px;
  border-top:1px solid rgba(255,255,255,0.08);
  transition:background var(--duration-fast);
}
.metric-block:last-child { border-bottom:1px solid rgba(255,255,255,0.08); }
.metric-block:hover { background:rgba(255,255,255,0.04); }

.metric-block__img {
  width:64px; height:44px; border-radius:var(--radius-sm);
  background-size:cover; background-position:center;
  border:1px solid rgba(255,255,255,0.1); flex-shrink:0;
}
.metric-block__val {
  font-family:var(--font-display); font-size:clamp(28px,3.5vw,42px);
  font-weight:300; color:var(--parchment); letter-spacing:-1px; line-height:1;
}
.metric-block__label { font-size:14px; color:var(--ink-400); line-height:1.5; }

@media (max-width:768px) {
  .metrics__inner { grid-template-columns:1fr; }
  .metric-block { grid-template-columns:56px 80px 1fr; gap:14px; }
}
</style>
