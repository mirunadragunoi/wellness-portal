<template>
  <div class="step-proof">
    <div class="proof-visual">
      <div class="proof-orb">
        <span class="proof-orb__num">95%</span>
        <span class="proof-orb__label">less stress</span>
      </div>
    </div>
    <h2 class="proof-title">{{ t('onboarding.step2_title') }}</h2>
    <p class="proof-body">{{ t('onboarding.step2_body') }}</p>
    <button class="step-btn" @click="emit('next')">{{ t('onboarding.btn_continue') }}</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['next'])
</script>

<style scoped>
.step-proof { display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 24px var(--container-pad) 48px; min-height: 65vh; justify-content: center; text-align: center; }
.proof-visual {
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffffff, var(--sage-100));
  border: 3px solid var(--sage-200);
  box-shadow: 7px 7px 0 var(--sage-100);
  display: flex;
  align-items: center;
  justify-content: center;
}
.proof-orb { display: flex; flex-direction: column; align-items: center; }
.proof-orb__num { font-family: var(--font-display); font-size: 56px; color: var(--sage-700); line-height: 1; }
.proof-orb__label { font-size: 14px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; }
.proof-title { font-family: var(--font-display); font-size: clamp(28px,4vw,40px); font-weight: 300; color: var(--ink-900); line-height: 1.2; }
.proof-body { font-size: 16px; color: var(--text-secondary); line-height: 1.7; max-width: 520px; }
.step-btn {
  width: 100%;
  max-width: 340px;
  padding: 13px 16px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--sage-600);
  background: var(--sage-500);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
}
</style>
