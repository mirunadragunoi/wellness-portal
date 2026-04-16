<template>
  <div class="step-select">
    <h2 class="step-title">{{ t('onboarding.step7_title') }}</h2>
    <div class="duration-grid">
      <button
        v-for="opt in options" :key="opt.id"
        class="dur-card" :class="{ 'dur-card--active': selected === opt.id }"
        @click="selected = opt.id"
      >
        <span class="dur-card__time">{{ t(opt.labelKey) }}</span>
        <span class="dur-card__sub">{{ opt.sub }}</span>
      </button>
    </div>
    <button class="step-btn" :disabled="!selected" @click="emit('next', { dailyDuration: selected })">
      {{ t('onboarding.btn_personalize') }}
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
  { id: '2-5',   labelKey: 'onboarding.duration_2_5',    sub: 'Quick daily reset' },
  { id: '5-10',  labelKey: 'onboarding.duration_5_10',   sub: 'Steady practice'   },
  { id: '10-20', labelKey: 'onboarding.duration_10_20',  sub: 'Deeper sessions'   },
  { id: '20+',   labelKey: 'onboarding.duration_20plus', sub: 'Full immersion'    }
]
</script>

<style scoped>
.step-select { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 24px var(--container-pad) 48px; min-height: 60vh; justify-content: center; max-width: 780px; margin: 0 auto; }
.step-title { font-family: var(--font-display); font-size: clamp(28px,4vw,40px); font-weight: 300; color: var(--ink-900); text-align: center; line-height: 1.2; }
.duration-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.dur-card {
  padding: 14px;
  border-radius: var(--radius);
  border: 2px solid var(--ink-200);
  background: #fff;
  box-shadow: 2px 2px 0 var(--ink-100);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  text-align: left;
}
.dur-card--active {
  border-color: var(--sage-500);
  background: var(--sage-50);
  box-shadow: 3px 3px 0 var(--sage-200);
}
.dur-card__time { font-size: 16px; font-weight: 700; color: var(--ink-900); }
.dur-card__sub { font-size: 12px; color: var(--text-secondary); }
.step-btn {
  width: 100%; max-width: 340px;
  padding: 13px 16px; border-radius: var(--radius-sm);
  border: 2px solid var(--sage-600);
  background: var(--sage-500); color: #fff;
  font-size: 15px; font-weight: 700;
}
.step-btn:disabled { opacity: 0.55; cursor: not-allowed; }

@media (max-width: 768px) {
  .duration-grid { grid-template-columns: 1fr; }
}
</style>
