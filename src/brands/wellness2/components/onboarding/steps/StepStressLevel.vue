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
.step-title { font-family: var(--font-display); font-size: clamp(28px,4vw,40px); font-weight: 300; color: var(--ink-900); text-align: center; line-height: 1.2; }
.options { width: 100%; display: flex; flex-direction: column; gap: 10px; }
.option {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px; border-radius: var(--radius);
  background: #fff; border: 2px solid var(--ink-200);
  box-shadow: 2px 2px 0 var(--ink-100);
}
.option--active { border-color: var(--sage-500); background: var(--sage-50); box-shadow: 3px 3px 0 var(--sage-200); }
.option__label { font-size: 15px; font-weight: 600; color: var(--ink-900); }
.step-btn {
  width: 100%; max-width: 340px;
  padding: 13px 16px; border-radius: var(--radius-sm);
  border: 2px solid var(--sage-600);
  background: var(--sage-500); color: #fff;
  font-size: 15px; font-weight: 700;
}
.step-btn:disabled { opacity: 0.55; cursor: not-allowed; }
</style>
