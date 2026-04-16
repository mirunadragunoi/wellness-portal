<template>
  <section class="how section">
    <div class="container">
      <div class="how__header">
        <span class="section-label">{{ t('howItWorks.label') }}</span>
        <h2 class="section-title">{{ t('howItWorks.title_1') }} <em>{{ t('howItWorks.title_em') }}</em></h2>
      </div>
      <div class="how__steps">
        <div v-for="(step, i) in steps" :key="i" class="how-step">
          <div class="how-step__num">{{ String(i+1).padStart(2,'0') }}</div>
          <div class="how-step__media" :style="{ backgroundImage:`url(${step.img})` }" />
          <div class="how-step__copy">
            <h3 class="how-step__title">{{ t(step.titleKey) }}</h3>
            <p  class="how-step__desc">{{ t(step.descKey) }}</p>
          </div>
        </div>
        <!-- Connecting line -->
        <div class="how__line" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
const { t } = useI18n()
const steps = [
  { img:LANDING_IMAGES.howStep1, titleKey:'howItWorks.step1_title', descKey:'howItWorks.step1_desc' },
  { img:LANDING_IMAGES.howStep2, titleKey:'howItWorks.step2_title', descKey:'howItWorks.step2_desc' },
  { img:LANDING_IMAGES.howStep3, titleKey:'howItWorks.step3_title', descKey:'howItWorks.step3_desc' },
]
</script>

<style scoped>
.how { background:var(--bg-surface); }
.how__header { margin-bottom:56px; }

.how__steps {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:40px; position:relative;
}
.how__line {
  position:absolute; top:82px; left:calc(16.66% + 8px); right:calc(16.66% + 8px); height:2px;
  background:repeating-linear-gradient(90deg, var(--sage-300) 0, var(--sage-300) 8px, transparent 8px, transparent 16px);
  pointer-events:none; z-index:0;
}

.how-step { position:relative; z-index:1; }
.how-step__num {
  font-family:var(--font-display); font-size:11px; font-weight:600;
  text-transform:uppercase; letter-spacing:3px; color:var(--sage-500);
  margin-bottom:16px;
}
.how-step__media {
  width:100%; aspect-ratio:4/3;
  border-radius:var(--radius-lg); background-size:cover; background-position:center;
  margin-bottom:20px; border:2px solid var(--ink-100);
  transition:transform var(--duration-normal), box-shadow var(--duration-normal);
}
.how-step:hover .how-step__media { transform:translate(-3px,-3px); box-shadow:6px 6px 0 var(--sage-200); }

.how-step__title { font-family:var(--font-display); font-size:22px; font-weight:400; color:var(--ink-900); margin-bottom:10px; }
.how-step__desc  { font-size:14px; color:var(--text-secondary); line-height:1.65; }

@media (max-width:768px) {
  .how__steps { grid-template-columns:1fr; gap:28px; }
  .how__line  { display:none; }
}
</style>
