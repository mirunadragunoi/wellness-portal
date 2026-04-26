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
  width: 190px; height: 190px; border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, rgba(184,245,102,0.2) 0%, rgba(34,197,94,0.08) 50%, rgba(13,31,18,0.9) 100%);
  border: 2px solid rgba(184,245,102,0.3);
  box-shadow: 0 0 48px rgba(184,245,102,0.15);
  display: flex; align-items: center; justify-content: center;
}
.proof-orb { display: flex; flex-direction: column; align-items: center; }
.proof-orb__num { font-family: var(--font-display); font-size: 56px; font-weight: 800; color: var(--lime-500); line-height: 1; letter-spacing: -2px; }
.proof-orb__label { font-size: 12px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 2px; font-weight: 600; }
.proof-title { font-family: var(--font-display); font-size: clamp(22px,3vw,32px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); line-height: 1.15; }
.proof-body { font-size: 15px; color: var(--text-secondary); line-height: 1.7; max-width: 520px; }
.step-btn {
  width: 100%; max-width: 340px; padding: 13px 16px;
  border-radius: var(--radius-pill); border: none;
  background: var(--lime-500); color: var(--forest-900);
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all 200ms; font-family: var(--font-body);
}
.step-btn:hover { background: var(--lime-400); box-shadow: 0 0 28px rgba(184,245,102,0.3); }
</style>
