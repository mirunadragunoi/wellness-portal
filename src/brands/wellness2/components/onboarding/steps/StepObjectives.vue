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
.step { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 24px var(--container-pad) 48px; min-height: 60vh; justify-content: center; max-width: 760px; margin: 0 auto; }
.step__title { font-family: var(--font-display); font-size: clamp(28px,4vw,40px); font-weight: 300; color: var(--ink-900); text-align: center; line-height: 1.2; }
.step__sub   { font-size: 16px; color: var(--text-secondary); text-align: center; line-height: 1.7; max-width: 640px; }
.objectives__grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.obj-card {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  padding: 14px;
  border-radius: var(--radius);
  border: 2px solid var(--ink-200);
  background: #fff;
  box-shadow: 2px 2px 0 var(--ink-100);
}
.obj-card--active {
  border-color: var(--sage-500);
  background: var(--sage-50);
  box-shadow: 3px 3px 0 var(--sage-200);
}
.obj-card__label { font-size: 14px; font-weight: 600; color: var(--ink-900); }
.step__btn {
  width: 100%;
  max-width: 360px;
  padding: 13px 16px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--sage-600);
  background: var(--sage-500);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
}
.step__btn:disabled { opacity: .55; cursor: not-allowed; }

@media (max-width: 640px) {
  .step {
    padding: 16px 16px 32px;
    gap: 14px;
  }
  .objectives__grid {
    grid-template-columns: 1fr;
  }
}
</style>
