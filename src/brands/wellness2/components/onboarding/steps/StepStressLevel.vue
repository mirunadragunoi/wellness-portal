<template>
  <div class="step-select">
    <h2 class="step-title">{{ t('onboarding.step3_title') }}</h2>
    <div class="options">
      <button
        v-for="opt in options" :key="opt.id"
        class="option" :class="{ 'option--active': selected === opt.id }"
        @click="selected = opt.id"
      >
        <Icon :icon="ONBOARDING_STRESS_ICONS[opt.id]" class="option__icon app-icon app-icon--md app-icon--primary" />
        <span class="option__label">{{ t(opt.labelKey) }}</span>
      </button>
    </div>
    <button class="step-btn" :disabled="!selected" @click="emit('next', { stressFrequency: selected })">
      {{ t('onboarding.btn_continue') }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ONBOARDING_STRESS_ICONS } from '@/constants/appIcons'

const { t } = useI18n()
const emit = defineEmits(['next'])
const selected = ref('')
const options = [
  { id: 'always',    labelKey: 'onboarding.stress_always'    },
  { id: 'often',     labelKey: 'onboarding.stress_often'     },
  { id: 'sometimes', labelKey: 'onboarding.stress_sometimes' },
  { id: 'rarely',    labelKey: 'onboarding.stress_rarely'    }
]
</script>

<style scoped>
.step-select { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 24px var(--container-pad) 48px; min-height: 60vh; justify-content: center; max-width: 640px; margin: 0 auto; }
.step-title { font-family: var(--font-display); font-size: clamp(22px,3vw,32px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); text-align: center; line-height: 1.15; }
.options { width: 100%; display: flex; flex-direction: column; gap: 10px; }
.option {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: var(--radius);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
  cursor: pointer; transition: all 180ms var(--ease-smooth);
}
.option:hover { background: rgba(184,245,102,0.05); border-color: rgba(184,245,102,0.2); }
.option--active { border-color: rgba(184,245,102,0.4); background: rgba(184,245,102,0.1); box-shadow: 0 0 16px rgba(184,245,102,0.1); }
.option__icon { color: var(--lime-400); flex-shrink: 0; }
.option__label { font-size: 15px; font-weight: 600; color: var(--text-primary); }
.step-btn {
  width: 100%; max-width: 340px; padding: 13px 16px;
  border-radius: var(--radius-pill); border: none;
  background: var(--lime-500); color: var(--forest-900);
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all 200ms; font-family: var(--font-body);
}
.step-btn:hover:not(:disabled) { background: var(--lime-400); box-shadow: 0 0 28px rgba(184,245,102,0.3); }
.step-btn:disabled { opacity: 0.45; cursor: not-allowed; }
</style>
