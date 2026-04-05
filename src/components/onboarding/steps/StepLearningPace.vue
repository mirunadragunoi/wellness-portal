<template>
  <div class="step-select">
    <h2 class="step-title">{{ t('onboarding.step6_title') }}</h2>
    <div class="pace-grid">
      <button
        v-for="opt in options" :key="opt.id"
        class="pace-card" :class="{ 'pace-card--active': selected === opt.id }"
        @click="selected = opt.id"
      >
        <span class="pace-card__emoji">{{ opt.emoji }}</span>
        <strong class="pace-card__label">{{ t(opt.labelKey) }}</strong>
        <span class="pace-card__desc">{{ t(opt.descKey) }}</span>
      </button>
    </div>
    <button class="step-btn" :disabled="!selected" @click="emit('next', { learningPace: selected })">
      {{ t('onboarding.btn_continue') }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['next'])
const selected = ref('')
const options = [
  { id: 'fast',     emoji: '⚡', labelKey: 'onboarding.pace_fast',     descKey: 'onboarding.pace_fast_desc'     },
  { id: 'balanced', emoji: '🌊', labelKey: 'onboarding.pace_balanced', descKey: 'onboarding.pace_balanced_desc' },
  { id: 'slow',     emoji: '🌸', labelKey: 'onboarding.pace_slow',     descKey: 'onboarding.pace_slow_desc'     }
]
</script>

<style scoped>
.step-select { display: flex; flex-direction: column; align-items: center; padding: 48px 32px 40px; max-width: 520px; margin: 0 auto; }
.step-title { font-family: var(--font-display); font-size: 34px; font-weight: 400; color: var(--text-primary); text-align: center; margin-bottom: 40px; }
.pace-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; width: 100%; margin-bottom: 40px; }
.pace-card {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 28px 20px; border-radius: var(--radius-lg);
  background: var(--bg-surface); border: 2px solid var(--border-subtle);
  cursor: pointer; transition: all var(--duration-normal) var(--ease-smooth);
}
.pace-card:hover { border-color: var(--sky-300); background: var(--sky-50); transform: translateY(-3px); }
.pace-card--active { border-color: var(--sky-500); background: var(--sky-50); box-shadow: 0 0 0 3px rgba(14,165,233,0.12); }
.pace-card__emoji { font-size: 32px; }
.pace-card__label { font-size: 16px; font-weight: 600; color: var(--text-primary); }
.pace-card__desc  { font-size: 13px; color: var(--text-secondary); text-align: center; }
.step-btn {
  width: 100%; max-width: 360px; padding: 16px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600)); color: white;
  font-family: var(--font-body); font-size: 16px; font-weight: 500;
  box-shadow: 0 4px 16px rgba(14,165,233,0.3); transition: all var(--duration-normal) var(--ease-smooth);
}
.step-btn:hover:not(:disabled) { transform: translateY(-2px); }
.step-btn:disabled { opacity: 0.4; cursor: not-allowed; }
@media (max-width: 420px) { .pace-grid { grid-template-columns: 1fr; } }
</style>
