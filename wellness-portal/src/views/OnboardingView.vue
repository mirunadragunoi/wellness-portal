<template>
  <div class="onboarding">
    <!-- Progress bar (hidden on loading step) -->
    <OnboardingProgressBar v-if="step < 8" :current="step" :total="7" />

    <!-- Back button -->
    <button v-if="step > 1 && step < 8" class="onboarding__back" @click="step--">← Back</button>

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
  min-height: 100vh; background: var(--bg-base);
  display: flex; flex-direction: column; position: relative;
}
.onboarding__back {
  position: absolute; top: 64px; left: 24px;
  background: none; border: none; cursor: pointer;
  font-size: 14px; color: var(--text-secondary);
  transition: color var(--duration-fast);
}
.onboarding__back:hover { color: var(--sky-600); }

.step-enter-active, .step-leave-active {
  transition: all 0.35s var(--ease-smooth);
}
.step-enter-from { opacity: 0; transform: translateX(40px); }
.step-leave-to   { opacity: 0; transform: translateX(-40px); }
</style>
