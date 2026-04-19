<template>
  <div class="onboarding">
    <!-- Progress bar (hidden on loading step) -->
    <OnboardingProgressBar v-if="step < 8" :current="step" :total="7" />

    <!-- Back button -->
    <button v-if="step > 1 && step < 8" type="button" class="onboarding__back" @click="step--">
      <Icon icon="lucide:arrow-left" class="app-icon app-icon--xs" aria-hidden="true" />
      {{ t('common.back') }}
    </button>

    <!-- Steps -->
    <Transition name="step" mode="out-in">
      <component
        :is="currentStepComponent"
        :key="step"
        @next="handleNext"
        @done="finish"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'

import OnboardingProgressBar from '@/components/onboarding/OnboardingProgressBar.vue'
import StepObjectives    from '@/components/onboarding/steps/StepObjectives.vue'
import StepSocialProof1  from '@/components/onboarding/steps/StepSocialProof1.vue'
import StepStressLevel   from '@/components/onboarding/steps/StepStressLevel.vue'
import StepSocialProof2  from '@/components/onboarding/steps/StepSocialProof2.vue'
import StepMeditationExp from '@/components/onboarding/steps/StepMeditationExp.vue'
import StepLearningPace  from '@/components/onboarding/steps/StepLearningPace.vue'
import StepDuration      from '@/components/onboarding/steps/StepDuration.vue'
import StepLoading       from '@/components/onboarding/steps/StepLoading.vue'

const { t }     = useI18n()
const router    = useRouter()
const userStore = useUserStore()
const step      = ref(1)
const responses = ref({})

const stepComponents = {
  1: StepObjectives,
  2: StepSocialProof1,
  3: StepStressLevel,
  4: StepSocialProof2,
  5: StepMeditationExp,
  6: StepLearningPace,
  7: StepDuration,
  8: StepLoading
}

const currentStepComponent = computed(() => stepComponents[step.value])

function handleNext(data = {}) {
  Object.assign(responses.value, data)
  step.value++
}

function finish() {
  userStore.completeOnboarding(responses.value)
  router.push({ name: 'home' })
}
</script>

<style scoped>
.onboarding {
  min-height: var(--app-min-height); background: var(--parchment);
  display: flex; flex-direction: column; position: relative;
}
.onboarding__nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px var(--container-pad);
  border-bottom: 2px solid var(--ink-200);
  background: var(--bg-surface);
}
.onboarding__logo {
  font-family: var(--font-display); font-size: 20px; font-weight: 400;
  color: var(--text-primary);
}
.onboarding__back {
  display: inline-flex; align-items: center; gap: 6px;
  margin: 14px var(--container-pad) 4px;
  align-self: flex-start;
  padding: 7px 14px; border: 2px solid var(--ink-200); border-radius: var(--radius-sm);
  font-size: 13px; font-weight: 600; color: var(--text-secondary);
  background: none; cursor: pointer; transition: all var(--duration-fast);
}
.onboarding__back:hover { background: var(--ink-900); color: var(--parchment); border-color: var(--ink-900); }
.step-enter-active, .step-leave-active { transition: all 0.3s var(--ease-smooth); }
.step-enter-from { opacity: 0; transform: translateX(32px); }
.step-leave-to   { opacity: 0; transform: translateX(-32px); }

@media (max-width: 640px) {
  .onboarding__back {
    margin: 10px 16px 0;
  }
}
</style>
