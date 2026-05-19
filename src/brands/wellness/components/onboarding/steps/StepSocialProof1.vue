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
.step-proof { display: flex; flex-direction: column; align-items: center; gap: 0; padding: 48px 32px 40px; max-width: 480px; margin: 0 auto; text-align: center; }
.proof-visual { margin-bottom: 36px; }
.proof-orb {
  width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, rgba(186,230,253,0.9), rgba(14,165,233,0.3));
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  animation: breathe 6s ease-in-out infinite;
  box-shadow: 0 0 0 20px rgba(186,230,253,0.15), 0 0 0 40px rgba(186,230,253,0.08);
}
.proof-orb__num { font-family: var(--font-display); font-size: 52px; font-weight: 300; color: var(--sky-700); line-height: 1; }
.proof-orb__label { font-size: 14px; color: var(--sky-600); font-weight: 500; }
.proof-title { font-family: var(--font-display); font-size: 32px; font-weight: 400; color: var(--text-primary); margin-bottom: 16px; }
.proof-body { font-size: 17px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 40px; }
.step-btn {
  width: 100%; max-width: 360px; padding: 16px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600)); color: white;
  font-family: var(--font-body); font-size: 16px; font-weight: 500;
  box-shadow: 0 4px 16px rgba(14,165,233,0.3);
  transition: all var(--duration-normal) var(--ease-smooth);
}
.step-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.4); }
@keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
</style>
