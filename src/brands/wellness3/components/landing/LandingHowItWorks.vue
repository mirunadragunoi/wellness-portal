<template>
  <section class="how section">
    <div class="container">
      <div class="how__header">
        <span class="section-label" style="color: var(--teal)">{{ t('howItWorks.label') }}</span>
        <h2 class="section-title">
          {{ t('howItWorks.title_1') }}
          <span class="grad-text">{{ t('howItWorks.title_em') }}</span>
        </h2>
      </div>

      <div class="steps">
        <div v-for="(step, i) in steps" :key="i" class="step">
          <div class="step__media" :style="{ backgroundImage: `linear-gradient(180deg, rgba(7,13,26,0.2), rgba(7,13,26,0.72)), url(${step.image})` }" />
          <div class="step__num">{{ nums[i] }}</div>
          <div class="step__content">
            <h3 class="step__title">{{ t(step.titleKey) }}</h3>
            <p class="step__desc">{{ t(step.descKey) }}</p>
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
const { howStep1, howStep2, howStep3 } = LANDING_IMAGES

const nums = ['01', '02', '03']
const steps = [
  { titleKey: 'howItWorks.step1_title', descKey: 'howItWorks.step1_desc', image: howStep1 },
  { titleKey: 'howItWorks.step2_title', descKey: 'howItWorks.step2_desc', image: howStep2 },
  { titleKey: 'howItWorks.step3_title', descKey: 'howItWorks.step3_desc', image: howStep3 },
]
</script>

<style scoped>
.how {
  background: transparent;
}

.how__header {
  margin-bottom: 56px;
}

.grad-text {
  background: linear-gradient(135deg, var(--teal), var(--blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(28px, 5vw, 48px);
}

.step {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.step__media {
  width: 100%;
  height: 120px;
  border-radius: var(--radius);
  margin-bottom: 18px;
  background-size: cover;
  background-position: center;
}

.step__num {
  font-family: var(--font-d);
  font-size: clamp(44px, 5vw, 52px);
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1;
  margin-bottom: 18px;
  opacity: 0.75;
  background: linear-gradient(135deg, var(--violet), var(--teal));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.step__title {
  font-family: var(--font-d);
  font-size: 19px;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.step__desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .step {
    flex-direction: row;
    gap: 14px;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .step__media {
    height: 110px;
    margin-bottom: 0;
  }
  .step__num {
    font-size: 36px;
    flex-shrink: 0;
    margin-bottom: 0;
  }
}
</style>
