<template>
  <div class="how-section">
    <div class="container">
      <div class="how-section__header">
        <span class="section-label">{{ t('howItWorks.label') }}</span>
        <h2 class="section-title">{{ t('howItWorks.title_1') }} <em>{{ t('howItWorks.title_em') }}</em></h2>
      </div>

      <div class="steps-grid">
        <div v-for="(step, i) in steps" :key="i" class="step">
          <div class="step__number">{{ i + 1 }}</div>
          <h3 class="step__title">{{ t(step.titleKey) }}</h3>
          <p class="step__desc">{{ t(step.descKey) }}</p>
          <div v-if="i < steps.length - 1" class="step__connector" aria-hidden="true">
            <Icon icon="lucide:chevron-right" class="app-icon app-icon--md app-icon--muted" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const steps = [
  { titleKey: 'howItWorks.step1_title', descKey: 'howItWorks.step1_desc' },
  { titleKey: 'howItWorks.step2_title', descKey: 'howItWorks.step2_desc' },
  { titleKey: 'howItWorks.step3_title', descKey: 'howItWorks.step3_desc' }
]
</script>

<style scoped>
.how-section {
  padding: 80px 0;
  background: var(--bg-base);
}
.how-section .container {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-subtle);
  padding: 72px 64px;
  position: relative; overflow: hidden;
}
.how-section .container::after {
  content: '';
  position: absolute; top: -80px; right: -80px;
  width: 250px; height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(186,230,253,0.3) 0%, transparent 70%);
  pointer-events: none;
}
.how-section__header { text-align: center; margin-bottom: 56px; }

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  position: relative; z-index: 1;
}
.step { text-align: center; position: relative; }
.step__number {
  width: 56px; height: 56px; border-radius: 50%;
  background: linear-gradient(135deg, var(--sky-100), var(--sky-200));
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 24px; font-weight: 600;
  color: var(--sky-600);
  margin: 0 auto 20px;
}
.step__title {
  font-family: var(--font-display); font-size: 24px; font-weight: 500;
  color: var(--text-primary); margin-bottom: 12px;
}
.step__desc { font-size: 15px; color: var(--text-secondary); line-height: 1.65; max-width: 280px; margin: 0 auto; }
.step__connector {
  position: absolute; top: 27px; right: -24px;
  display: flex; align-items: center; color: var(--sky-300);
}

@media (max-width: 768px) {
  .how-section .container { padding: 40px 24px; }
  .steps-grid { grid-template-columns: 1fr; gap: 36px; }
  .step__connector { display: none; }
}
</style>
