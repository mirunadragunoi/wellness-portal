<template>
  <div class="step-select">
    <h2 class="step-title">{{ t('onboarding.step6_title') }}</h2>
    <div class="pace-grid">
      <button
        v-for="opt in options" :key="opt.id"
        class="pace-card" :class="{ 'pace-card--active': selected === opt.id }"
        @click="selected = opt.id"
      >
        <Icon :icon="ONBOARDING_PACE_ICONS[opt.id]" class="pace-card__icon app-icon app-icon--lg app-icon--primary" />
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
import { ONBOARDING_PACE_ICONS } from '@/constants/appIcons'

const { t } = useI18n()
const emit = defineEmits(['next'])
const selected = ref('')
const options = [
  { id: 'fast',     labelKey: 'onboarding.pace_fast',     descKey: 'onboarding.pace_fast_desc'     },
  { id: 'balanced', labelKey: 'onboarding.pace_balanced', descKey: 'onboarding.pace_balanced_desc' },
  { id: 'slow',     labelKey: 'onboarding.pace_slow',     descKey: 'onboarding.pace_slow_desc'     }
]
</script>

<style scoped>
.step-select { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 24px var(--container-pad) 48px; min-height: 60vh; justify-content: center; max-width: 780px; margin: 0 auto; }
.step-title { font-family: var(--font-display); font-size: clamp(22px,3vw,32px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); text-align: center; line-height: 1.15; }
.pace-grid { width: 100%; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.pace-card {
  padding: 16px 14px; border-radius: var(--radius);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
  display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center;
  cursor: pointer; transition: all 180ms var(--ease-smooth);
}
.pace-card:hover { background: rgba(184,245,102,0.05); border-color: rgba(184,245,102,0.2); }
.pace-card--active { border-color: rgba(184,245,102,0.4); background: rgba(184,245,102,0.1); box-shadow: 0 0 16px rgba(184,245,102,0.1); }
.pace-card__icon { color: var(--lime-400); }
.pace-card__label { font-size: 15px; font-weight: 700; color: var(--text-primary); }
.pace-card__desc { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }
.step-btn {
  width: 100%; max-width: 340px; padding: 13px 16px;
  border-radius: var(--radius-pill); border: none;
  background: var(--lime-500); color: var(--forest-900);
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all 200ms; font-family: var(--font-body);
}
.step-btn:hover:not(:disabled) { background: var(--lime-400); box-shadow: 0 0 28px rgba(184,245,102,0.3); }
.step-btn:disabled { opacity: 0.45; cursor: not-allowed; }
@media (max-width: 768px) { .pace-grid { grid-template-columns: 1fr; } }
</style>
