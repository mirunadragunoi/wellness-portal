<template>
  <div class="step">
    <h2 class="step__title">{{ t('onboarding.step1_title') }}</h2>
    <p class="step__sub">{{ t('onboarding.step1_subtitle') }}</p>
    <div class="objectives__grid">
      <button
        v-for="obj in objectives" :key="obj.id"
        class="obj-card"
        :class="{ 'obj-card--active': selected.includes(obj.id) }"
        @click="toggle(obj.id)"
      >
        <Icon :icon="ONBOARDING_OBJECTIVE_ICONS[obj.id]" class="obj-card__icon app-icon app-icon--lg app-icon--primary" />
        <span class="obj-card__label">{{ t(obj.labelKey) }}</span>
      </button>
    </div>
    <button class="step__btn" :disabled="!selected.length" @click="emit('next', { objectives: selected })">
      {{ t('onboarding.btn_continue') }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ONBOARDING_OBJECTIVE_ICONS } from '@/constants/appIcons'

const { t } = useI18n()
const emit = defineEmits(['next'])
const selected = ref([])

const objectives = [
  { id: 'stress',   labelKey: 'onboarding.obj_stress'   },
  { id: 'sleep',    labelKey: 'onboarding.obj_sleep'    },
  { id: 'focus',    labelKey: 'onboarding.obj_focus'    },
  { id: 'mood',     labelKey: 'onboarding.obj_mood'     },
  { id: 'meditate', labelKey: 'onboarding.obj_meditate' },
  { id: 'growth',   labelKey: 'onboarding.obj_growth'   }
]

function toggle(id) {
  const idx = selected.value.indexOf(id)
  if (idx >= 0) selected.value.splice(idx, 1)
  else selected.value.push(id)
}
</script>

<style scoped>
.step { display: flex; flex-direction: column; align-items: center; gap: 0; padding: 48px 32px 40px; max-width: 560px; margin: 0 auto; }
.step__title { font-family: var(--font-display); font-size: 36px; font-weight: 400; color: var(--text-primary); text-align: center; margin-bottom: 10px; }
.step__sub   { font-size: 15px; color: var(--text-secondary); text-align: center; margin-bottom: 40px; }
.objectives__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; width: 100%; margin-bottom: 40px; }
.obj-card {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 24px 16px; border-radius: var(--radius);
  background: var(--bg-surface); border: 2px solid var(--border-subtle);
  cursor: pointer; transition: all var(--duration-normal) var(--ease-smooth);
}
.obj-card:hover { border-color: var(--sky-300); background: var(--sky-50); transform: translateY(-2px); }
.obj-card--active { border-color: var(--sky-500); background: var(--sky-50); box-shadow: 0 0 0 3px rgba(14,165,233,0.15); }
.obj-card__icon { flex-shrink: 0; }
.obj-card__label { font-size: 14px; font-weight: 500; color: var(--text-primary); text-align: center; }
.step__btn {
  width: 100%; max-width: 360px; padding: 16px;
  border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white; font-family: var(--font-body); font-size: 16px; font-weight: 500;
  box-shadow: 0 4px 16px rgba(14,165,233,0.3);
  transition: all var(--duration-normal) var(--ease-smooth);
}
.step__btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.4); }
.step__btn:disabled { opacity: 0.4; cursor: not-allowed; }
@media (max-width: 480px) { .objectives__grid { grid-template-columns: repeat(2, 1fr); } }
</style>
