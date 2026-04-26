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
.step__title { font-family: var(--font-display); font-size: clamp(22px,3vw,32px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); text-align: center; line-height: 1.15; }
.step__sub   { font-size: 15px; color: var(--text-secondary); text-align: center; line-height: 1.7; max-width: 640px; }
.objectives__grid { width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.obj-card {
  display: flex; align-items: center; gap: 12px; text-align: left;
  padding: 14px 16px; border-radius: var(--radius);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
  cursor: pointer; transition: all 180ms var(--ease-smooth);
}
.obj-card:hover { background: rgba(184,245,102,0.05); border-color: rgba(184,245,102,0.2); }
.obj-card--active { border-color: rgba(184,245,102,0.4); background: rgba(184,245,102,0.1); box-shadow: 0 0 16px rgba(184,245,102,0.1); }
.obj-card__icon { color: var(--lime-400); flex-shrink: 0; }
.obj-card__label { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.step__btn {
  width: 100%; max-width: 360px; padding: 13px 16px;
  border-radius: var(--radius-pill); border: none;
  background: var(--lime-500); color: var(--forest-900);
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all 200ms; font-family: var(--font-body);
}
.step__btn:hover:not(:disabled) { background: var(--lime-400); box-shadow: 0 0 28px rgba(184,245,102,0.3); }
.step__btn:disabled { opacity: .45; cursor: not-allowed; }
@media (max-width: 640px) { .step { padding: 16px 16px 32px; gap: 14px; } .objectives__grid { grid-template-columns: 1fr; } }
</style>
