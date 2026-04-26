<template>
  <div class="onb-progress">
    <div class="onb-progress__track">
      <div class="onb-progress__fill" :style="{ width: (current / total) * 100 + '%' }" />
    </div>
    <span class="onb-progress__label">{{ t('onboarding.step_of', { current, total }) }}</span>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({ current: Number, total: Number })
</script>

<style scoped>
.onb-progress {
  width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 18px var(--container-pad) 8px;
  background: rgba(7,15,10,0.9); backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(184,245,102,0.08);
}
.onb-progress__track {
  width: min(100%, 560px); height: 4px;
  background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden;
}
.onb-progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--emerald-400), var(--lime-500));
  transition: width var(--duration-slow) var(--ease-smooth);
  border-radius: 999px;
}
.onb-progress__label {
  font-family: var(--font-mono); font-size: 11px; font-weight: 500;
  color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;
}
</style>
