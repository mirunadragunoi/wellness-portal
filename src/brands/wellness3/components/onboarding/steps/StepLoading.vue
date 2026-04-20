<template>
  <div class="step-loading">
    <div class="loading-orb" :class="{ 'loading-orb--done': phase >= 3 }">
      <span v-if="phase < 3" class="loading-orb__spinner" />
      <Icon v-else icon="lucide:check" class="loading-orb__check app-icon app-icon--2xl" />
    </div>

    <TransitionGroup name="message" tag="div" class="loading-messages">
      <p v-if="phase >= 1" key="1" class="loading-msg">{{ t('onboarding.step8_loading_1') }}</p>
      <p v-if="phase >= 2" key="2" class="loading-msg">{{ t('onboarding.step8_loading_2') }}</p>
      <p v-if="phase >= 3" key="3" class="loading-msg loading-msg--done">{{ t('onboarding.step8_loading_3') }}</p>
    </TransitionGroup>

    <BaseProgressBar :value="progress" :height="6" style="max-width:300px;width:100%" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BaseProgressBar from '@/components/base/BaseProgressBar.vue'

const { t } = useI18n()
const router   = useRouter()
const emit     = defineEmits(['done'])
const phase    = ref(0)
const progress = ref(0)

onMounted(() => {
  // Animate progress
  const interval = setInterval(() => {
    progress.value = Math.min(progress.value + 1.5, 100)
  }, 40)

  setTimeout(() => { phase.value = 1 }, 400)
  setTimeout(() => { phase.value = 2 }, 1800)
  setTimeout(() => {
    phase.value = 3
    clearInterval(interval)
    progress.value = 100
  }, 3200)
  setTimeout(() => emit('done'), 4000)
})
</script>

<style scoped>
.step-loading {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 32px; padding: 80px 32px; min-height: 60vh;
}
.loading-orb {
  width: 120px; height: 120px; border-radius: 50%;
  background: linear-gradient(135deg, var(--sky-100), var(--sky-200));
  display: flex; align-items: center; justify-content: center;
  transition: all 0.5s var(--ease-smooth);
  animation: breathe 3s ease-in-out infinite;
}
.loading-orb--done {
  background: linear-gradient(135deg, #d1fae5, #6ee7b7);
  animation: bounceIn 0.6s var(--ease-bounce) forwards;
}
.loading-orb__spinner {
  width: 40px; height: 40px;
  border: 3px solid rgba(14,165,233,0.2);
  border-top-color: var(--sky-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.loading-orb__check { color: #059669; }

.loading-messages { display: flex; flex-direction: column; gap: 10px; text-align: center; min-height: 80px; }
.loading-msg { font-size: 16px; color: var(--text-secondary); }
.loading-msg--done { font-family: var(--font-display); font-size: 22px; color: var(--text-primary); font-weight: 500; }

.message-enter-active { transition: all 0.4s var(--ease-smooth); }
.message-enter-from   { opacity: 0; transform: translateY(10px); }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
@keyframes bounceIn { 0% { transform: scale(0.7); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } }
</style>
