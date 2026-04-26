<template>
  <section class="how-section" id="how">
    <div class="how-inner">
      <span class="section-label reveal">{{ t('howItWorks.label') }}</span>
      <h2 class="section-title reveal reveal-1">
        {{ t('howItWorks.title_1') }} <span class="lime">{{ t('howItWorks.title_em') }}</span>
      </h2>

      <div class="how-steps">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="how-step-row reveal"
          :class="`reveal-${i}`"
        >
          <div class="how-step-num">0{{ i + 1 }}</div>
          <div class="how-step-content">
            <div class="step-title">{{ t(step.titleKey) }}</div>
            <div class="step-desc">{{ t(step.descKey) }}</div>
          </div>
          <div class="how-step-img" :style="{ backgroundImage: `url(${step.img})` }" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
const { t } = useI18n()
const steps = [
  { img: LANDING_IMAGES.howStep1, titleKey: 'howItWorks.step1_title', descKey: 'howItWorks.step1_desc' },
  { img: LANDING_IMAGES.howStep2, titleKey: 'howItWorks.step2_title', descKey: 'howItWorks.step2_desc' },
  { img: LANDING_IMAGES.howStep3, titleKey: 'howItWorks.step3_title', descKey: 'howItWorks.step3_desc' },
]
</script>

<style scoped>
.how-section { background: var(--forest-800); }
.how-inner { max-width: var(--container-max); margin: 0 auto; padding: 100px var(--container-pad); }

.section-label {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 3px; color: var(--lime-500); display: block; margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-display); font-size: clamp(36px,4vw,56px);
  font-weight: 800; letter-spacing: -2px; color: var(--text-primary); margin-bottom: 56px;
}
.lime { color: var(--lime-500); }

.how-steps { display: flex; flex-direction: column; }
.how-step-row {
  display: grid; grid-template-columns: 80px 1fr 360px; gap: 40px; align-items: center;
  padding: 48px 0; border-top: 1px solid rgba(184,245,102,0.06);
  transition: background 300ms;
}
.how-step-row:hover {
  background: rgba(184,245,102,0.015);
  margin: 0 -24px; padding-left: 24px; padding-right: 24px; border-radius: 16px;
}

.how-step-num {
  font-family: var(--font-display); font-size: 64px; font-weight: 800;
  color: rgba(184,245,102,0.15); line-height: 1; letter-spacing: -3px;
}
.step-title {
  font-family: var(--font-display); font-size: 26px; font-weight: 800;
  letter-spacing: -1px; color: var(--text-primary); margin-bottom: 10px;
}
.step-desc { font-size: 15px; color: var(--text-secondary); line-height: 1.75; max-width: 420px; }

.how-step-img {
  width: 100%; height: 180px; border-radius: 16px; overflow: hidden;
  background: var(--forest-700);
  background-size: cover; background-position: center;
  filter: brightness(0.8) saturate(1.2);
}

@media (max-width: 1024px) {
  .how-step-row { grid-template-columns: 60px 1fr; }
  .how-step-img { display: none; }
}
@media (max-width: 640px) {
  .how-step-row { grid-template-columns: 1fr; gap: 16px; padding: 32px 0; }
  .how-step-num { font-size: 48px; }
}
</style>
