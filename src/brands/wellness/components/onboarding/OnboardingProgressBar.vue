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
  display: flex; align-items: center; gap: 16px;
  padding: 20px 32px 0;
}
.onb-progress__track {
  flex: 1; height: 4px;
  background: var(--bg-muted); border-radius: 100px; overflow: hidden;
}
.onb-progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sky-400), var(--sky-600));
  border-radius: 100px;
  transition: width 0.5s var(--ease-smooth);
}
.onb-progress__label { font-size: 13px; color: var(--text-muted); white-space: nowrap; }
</style>
