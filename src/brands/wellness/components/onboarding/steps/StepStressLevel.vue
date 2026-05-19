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
.step-select { display: flex; flex-direction: column; align-items: center; padding: 48px 32px 40px; max-width: 480px; margin: 0 auto; }
.step-title { font-family: var(--font-display); font-size: 34px; font-weight: 400; color: var(--text-primary); text-align: center; margin-bottom: 40px; }
.options { display: flex; flex-direction: column; gap: 14px; width: 100%; margin-bottom: 40px; }
.option {
  display: flex; align-items: center; gap: 16px;
  padding: 20px 24px; border-radius: var(--radius);
  background: var(--bg-surface); border: 2px solid var(--border-subtle);
  cursor: pointer; text-align: left; width: 100%;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.option:hover { border-color: var(--sky-300); background: var(--sky-50); transform: translateX(4px); }
.option--active { border-color: var(--sky-500); background: var(--sky-50); box-shadow: 0 0 0 3px rgba(14,165,233,0.12); }
.option__icon { flex-shrink: 0; }
.option__label { font-size: 16px; font-weight: 500; color: var(--text-primary); }
.step-btn {
  width: 100%; max-width: 360px; padding: 16px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600)); color: white;
  font-family: var(--font-body); font-size: 16px; font-weight: 500;
  box-shadow: 0 4px 16px rgba(14,165,233,0.3); transition: all var(--duration-normal) var(--ease-smooth);
}
.step-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.4); }
.step-btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
