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
.step-title { font-family: var(--font-display); font-size: clamp(28px,4vw,40px); font-weight: 300; color: var(--ink-900); text-align: center; line-height: 1.2; }
.pace-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.pace-card {
  padding: 16px 14px;
  border-radius: var(--radius);
  border: 2px solid var(--ink-200);
  background: #fff;
  box-shadow: 2px 2px 0 var(--ink-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}
.pace-card--active {
  border-color: var(--sage-500);
  background: var(--sage-50);
  box-shadow: 3px 3px 0 var(--sage-200);
}
.pace-card__label { font-size: 15px; color: var(--ink-900); }
.pace-card__desc { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }
.step-btn {
  width: 100%; max-width: 340px;
  padding: 13px 16px; border-radius: var(--radius-sm);
  border: 2px solid var(--sage-600);
  background: var(--sage-500); color: #fff;
  font-size: 15px; font-weight: 700;
}
.step-btn:disabled { opacity: 0.55; cursor: not-allowed; }

@media (max-width: 768px) {
  .pace-grid { grid-template-columns: 1fr; }
}
</style>
