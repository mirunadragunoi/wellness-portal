<template>
  <Teleport to="body">
    <Transition name="sos-overlay">
      <div v-if="uiStore.sosOpen" class="sos-overlay">
        <div class="sos-panel">
          <!-- Header -->
          <div class="sos-header">
            <div class="sos-badge">
              <Icon icon="lucide:life-buoy" class="app-icon app-icon--3xl app-icon--primary" aria-hidden="true" />
            </div>
            <h2 class="sos-title">{{ t('sos.title') }}</h2>
            <p class="sos-subtitle">{{ t('sos.subtitle') }}</p>
            <button type="button" class="sos-close" :aria-label="t('common.close')" @click="close">
              <Icon icon="lucide:x" class="app-icon app-icon--sm" />
            </button>
          </div>

          <!-- Options -->
          <div v-if="activeMode === null" class="sos-options">
            <button type="button" class="sos-option" @click="activeMode = 'breathing'">
              <span class="sos-option__icon">
                <Icon icon="lucide:wind" class="app-icon app-icon--lg app-icon--primary" aria-hidden="true" />
              </span>
              <div class="sos-option__text">
                <strong>{{ t('sos.option1_title') }}</strong>
                <span>{{ t('sos.option1_desc') }}</span>
              </div>
              <Icon icon="lucide:chevron-right" class="sos-option__arrow app-icon app-icon--md app-icon--muted" aria-hidden="true" />
            </button>
            <button type="button" class="sos-option" @click="activeMode = 'grounding'">
              <span class="sos-option__icon">
                <Icon icon="lucide:sprout" class="app-icon app-icon--lg app-icon--primary" aria-hidden="true" />
              </span>
              <div class="sos-option__text">
                <strong>{{ t('sos.option2_title') }}</strong>
                <span>{{ t('sos.option2_desc') }}</span>
              </div>
              <Icon icon="lucide:chevron-right" class="sos-option__arrow app-icon app-icon--md app-icon--muted" aria-hidden="true" />
            </button>
            <button type="button" class="sos-option" @click="goToSession">
              <span class="sos-option__icon">
                <Icon icon="lucide:headphones" class="app-icon app-icon--lg app-icon--primary" aria-hidden="true" />
              </span>
              <div class="sos-option__text">
                <strong>{{ t('sos.option3_title') }}</strong>
                <span>{{ t('sos.option3_desc') }}</span>
              </div>
              <Icon icon="lucide:chevron-right" class="sos-option__arrow app-icon app-icon--md app-icon--muted" aria-hidden="true" />
            </button>
          </div>

          <!-- Breathing Mode -->
          <div v-else-if="activeMode === 'breathing'" class="sos-breathing">
            <div class="breathing-orb" :class="phaseClass">
              <span class="breathing-orb__phase">{{ currentPhase?.label }}</span>
              <span class="breathing-orb__count">{{ phaseCountdown }}</span>
            </div>
            <p class="breathing-status">{{ isRunning ? formattedRemaining : 'Ready' }}</p>
            <div class="breathing-btns">
              <button v-if="!isRunning" class="sos-btn-primary" @click="start">{{ t('breathing.start') }}</button>
              <template v-else>
                <button class="sos-btn-secondary" @click="pause">{{ isPaused ? t('breathing.start') : t('breathing.pause_btn') }}</button>
                <button class="sos-btn-ghost" @click="stop">{{ t('breathing.stop') }}</button>
              </template>
            </div>
            <div v-if="isComplete" class="sos-check">
              <p>{{ t('sos.feeling_better') }}</p>
              <div class="sos-check__btns">
                <button class="sos-btn-primary" @click="close">{{ t('sos.yes') }}</button>
                <button class="sos-btn-ghost" @click="resetMode">{{ t('sos.no') }}</button>
              </div>
            </div>
          </div>

          <!-- Grounding Mode -->
          <div v-else-if="activeMode === 'grounding'" class="sos-grounding">
            <TransitionGroup name="grounding-step">
              <div class="grounding-step" :key="groundingIndex">
                <div class="grounding-step__number">{{ 5 - groundingIndex }}</div>
                <p class="grounding-step__text">{{ groundingSteps[groundingIndex] }}</p>
              </div>
            </TransitionGroup>

            <div class="grounding-btns">
              <button
                v-if="groundingIndex < groundingSteps.length - 1"
                class="sos-btn-primary"
                @click="groundingIndex++"
              >
                {{ t('sos.grounding_next') }}
              </button>
              <template v-else>
                <p class="sos-done-text">{{ t('sos.grounding_done') }}</p>
                <div class="sos-check__btns">
                  <button class="sos-btn-primary" @click="close">{{ t('sos.yes') }}</button>
                  <button class="sos-btn-ghost"  @click="resetMode">{{ t('sos.no') }}</button>
                </div>
              </template>
            </div>
          </div>

          <!-- Back -->
          <button v-if="activeMode" type="button" class="sos-back" @click="resetMode">
            <Icon icon="lucide:arrow-left" class="app-icon app-icon--xs" aria-hidden="true" />
            {{ t('common.back') }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'
import { useBreathing } from '@/composables/useBreathing'

const { t } = useI18n()
const uiStore = useUIStore()
const router  = useRouter()

const activeMode    = ref(null)
const groundingIndex = ref(0)

const {
  isRunning, isPaused, isComplete,
  currentPhase, phaseCountdown, formattedRemaining,
  start, pause, stop, reset
} = useBreathing('sos')

const phaseClass = computed(() => ({
  'breathing-orb--inhale': currentPhase.value?.phase === 'inhale',
  'breathing-orb--hold':   currentPhase.value?.phase === 'hold',
  'breathing-orb--exhale': currentPhase.value?.phase === 'exhale'
}))

const groundingSteps = computed(() => [
  t('sos.grounding_5'),
  t('sos.grounding_4'),
  t('sos.grounding_3'),
  t('sos.grounding_2'),
  t('sos.grounding_1')
])

function resetMode() {
  activeMode.value = null
  groundingIndex.value = 0
  reset()
}

function close() {
  resetMode()
  uiStore.closeSOS()
}

function goToSession() {
  close()
  router.push({ name: 'session', params: { id: 'med-010' } })
}
</script>

<style scoped>
.sos-overlay {
  position: fixed; inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(6px);
  z-index: 300;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

.sos-panel {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  width: 100%; max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  position: relative;
}

.sos-header {
  text-align: center;
  padding: 40px 32px 24px;
  border-bottom: 1px solid var(--border-subtle);
}
.sos-badge { margin-bottom: 12px; display: flex; justify-content: center; }
.sos-title { font-family: var(--font-display); font-size: 32px; font-weight: 400; color: var(--text-primary); }
.sos-subtitle { font-size: 15px; color: var(--text-secondary); margin-top: 8px; }
.sos-close {
  position: absolute; top: 20px; right: 20px;
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--bg-muted); border: none; cursor: pointer;
  font-size: 14px; color: var(--text-secondary);
  display: flex; align-items: center; justify-content: center;
  transition: all var(--duration-fast);
}
.sos-close:hover { background: var(--sky-100); color: var(--sky-600); }

/* Options */
.sos-options { padding: 20px 24px; display: flex; flex-direction: column; gap: 12px; }
.sos-option {
  display: flex; align-items: center; gap: 16px;
  padding: 20px; border-radius: var(--radius);
  background: var(--bg-muted); border: 1.5px solid var(--border-subtle);
  cursor: pointer; text-align: left; width: 100%;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.sos-option:hover { border-color: var(--sky-300); background: var(--sky-50); transform: translateX(4px); }
.sos-option__icon { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.sos-option__text { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.sos-option__text strong { font-size: 15px; font-weight: 600; color: var(--text-primary); }
.sos-option__text span   { font-size: 13px; color: var(--text-secondary); }
.sos-option__arrow { flex-shrink: 0; }

/* Breathing */
.sos-breathing { padding: 32px 24px; display: flex; flex-direction: column; align-items: center; gap: 24px; }

.breathing-orb {
  width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle, var(--sky-200), var(--sky-400));
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px;
  transition: transform 4s ease-in-out;
  animation: breathe 8s ease-in-out infinite;
}
.breathing-orb--inhale { animation: breathe-in 4s ease-in-out forwards; }
.breathing-orb--exhale { animation: breathe-out 4s ease-in-out forwards; }
.breathing-orb--hold   { animation: none; transform: scale(1.2); }

.breathing-orb__phase { font-size: 15px; color: var(--sky-800); font-weight: 500; }
.breathing-orb__count { font-family: var(--font-display); font-size: 40px; font-weight: 300; color: var(--sky-800); }
.breathing-status { font-size: 14px; color: var(--text-secondary); }

/* Grounding */
.sos-grounding { padding: 32px 24px; display: flex; flex-direction: column; align-items: center; gap: 32px; min-height: 260px; }
.grounding-step { text-align: center; }
.grounding-step__number {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--sky-100); color: var(--sky-700);
  font-family: var(--font-display); font-size: 32px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
}
.grounding-step__text { font-size: 18px; font-weight: 500; color: var(--text-primary); max-width: 280px; }
.grounding-btns { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; }
.sos-done-text { font-family: var(--font-display); font-size: 22px; color: var(--text-primary); text-align: center; }

/* Buttons */
.sos-btn-primary, .sos-btn-secondary, .sos-btn-ghost {
  padding: 12px 32px; border-radius: 100px;
  font-family: var(--font-body); font-size: 15px; font-weight: 500;
  cursor: pointer; border: none; transition: all var(--duration-normal) var(--ease-smooth);
}
.sos-btn-primary { background: linear-gradient(135deg, var(--sky-500), var(--sky-600)); color: white; box-shadow: 0 4px 14px rgba(14,165,233,0.3); }
.sos-btn-primary:hover { transform: translateY(-2px); }
.sos-btn-secondary { background: var(--sky-100); color: var(--sky-700); }
.sos-btn-ghost { background: transparent; color: var(--text-secondary); }
.sos-btn-ghost:hover { color: var(--sky-600); }

.sos-check { text-align: center; display: flex; flex-direction: column; gap: 16px; }
.sos-check p { font-size: 16px; font-weight: 500; color: var(--text-primary); }
.sos-check__btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

.sos-back {
  display: inline-flex; align-items: center; gap: 6px;
  margin: 0 24px 24px; background: none; border: none; color: var(--text-secondary);
  font-size: 14px; cursor: pointer; padding: 8px 0; font-family: var(--font-body);
}
.sos-back:hover { color: var(--sky-600); }

/* Transitions */
.sos-overlay-enter-active, .sos-overlay-leave-active { transition: opacity var(--duration-normal) var(--ease-smooth); }
.sos-overlay-enter-active .sos-panel, .sos-overlay-leave-active .sos-panel { transition: transform var(--duration-normal) var(--ease-smooth); }
.sos-overlay-enter-from { opacity: 0; }
.sos-overlay-leave-to   { opacity: 0; }
.sos-overlay-enter-from .sos-panel { transform: scale(0.92) translateY(20px); }
.sos-overlay-leave-to   .sos-panel { transform: scale(0.92) translateY(20px); }

.grounding-step-enter-active, .grounding-step-leave-active { transition: all 0.4s var(--ease-smooth); }
.grounding-step-enter-from { opacity: 0; transform: translateX(30px); }
.grounding-step-leave-to   { opacity: 0; transform: translateX(-30px); position: absolute; }

@media (max-width: 640px) {
  .sos-overlay { align-items: flex-end; padding: 0; }
  .sos-panel { border-radius: var(--radius-xl) var(--radius-xl) 0 0; max-height: 90vh; max-width: 100%; }
}
</style>
