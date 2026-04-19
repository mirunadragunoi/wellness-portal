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
  position: fixed; inset: 0; z-index: 300;
  background: rgba(28, 26, 22, 0.62);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.sos-panel {
  background: var(--bg-surface);
  width: 100%;
  max-width: 560px;
  border: 1px solid var(--ink-200);
  border-radius: 22px;
  padding: 22px;
  box-shadow: 0 20px 44px rgba(28, 26, 22, 0.22);
}

.sos-header {
  position: relative;
  padding-right: 46px;
  margin-bottom: 16px;
}
.sos-badge {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--sage-100), var(--sage-200));
  border: 1px solid var(--sage-300);
  margin-bottom: 10px;
}
.sos-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 3.8vw, 34px);
  font-weight: 400;
  color: var(--text-primary);
  margin: 0;
}
.sos-subtitle {
  margin: 8px 0 0;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.55;
}
.sos-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--ink-200);
  background: var(--parchment);
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-fast);
}
.sos-close:hover {
  background: var(--sage-100);
  color: var(--text-primary);
}

.sos-options {
  display: grid;
  gap: 10px;
}
.sos-option {
  width: 100%;
  border: 1px solid var(--ink-200);
  border-radius: 14px;
  padding: 12px;
  background: var(--parchment);
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  transition: all var(--duration-fast);
}
.sos-option:hover {
  border-color: var(--sage-300);
  background: var(--sage-50);
  transform: translateY(-1px);
}
.sos-option__icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--sage-100);
  border: 1px solid var(--sage-200);
  flex-shrink: 0;
}
.sos-option__text {
  flex: 1;
  min-width: 0;
  display: grid;
  gap: 3px;
}
.sos-option__text strong {
  font-size: 14px;
  color: var(--text-primary);
}
.sos-option__text span {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.45;
}
.sos-option__arrow { color: var(--text-muted); }

.breathing-orb {
  width: 190px;
  height: 190px;
  margin: 8px auto 14px;
  border-radius: 50%;
  border: 1px solid var(--sage-300);
  background: radial-gradient(circle at 35% 30%, #ffffff 0%, #ecf8f0 40%, #d8f0e1 100%);
  box-shadow: inset 0 0 0 8px rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 900ms ease, box-shadow 900ms ease;
}
.breathing-orb--inhale { transform: scale(1.06); }
.breathing-orb--hold { transform: scale(1.03); }
.breathing-orb--exhale { transform: scale(0.94); }
.breathing-orb__phase {
  font-family: var(--font-display);
  font-size: 22px;
  font-style: italic;
  color: var(--sage-700);
}
.breathing-orb__count {
  font-family: var(--font-display);
  font-size: 46px;
  font-weight: 400;
  color: var(--ink-900);
  line-height: 1;
}
.breathing-status {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 10px;
}
.breathing-btns {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.sos-grounding {
  display: grid;
  gap: 12px;
}
.grounding-step {
  border: 1px solid var(--ink-200);
  background: var(--parchment);
  border-radius: 14px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.grounding-step__number {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--sage-100);
  border: 1px solid var(--sage-300);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--sage-700);
  font-weight: 700;
}
.grounding-step__text {
  margin: 0;
  color: var(--text-primary);
  font-size: 14px;
}
.grounding-btns { display: grid; gap: 10px; }
.sos-done-text {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.sos-btn-primary,
.sos-btn-secondary,
.sos-btn-ghost {
  height: 40px;
  border-radius: 10px;
  padding: 0 14px;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--duration-fast);
}
.sos-btn-primary {
  background: var(--sage-500);
  color: #fff;
  border-color: var(--sage-600);
}
.sos-btn-primary:hover { background: var(--sage-600); }
.sos-btn-secondary {
  background: var(--ink-900);
  color: var(--parchment);
}
.sos-btn-secondary:hover { background: #1d2a22; }
.sos-btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border-color: var(--ink-200);
}
.sos-btn-ghost:hover {
  color: var(--text-primary);
  border-color: var(--sage-300);
  background: var(--sage-50);
}

.sos-check {
  margin-top: 14px;
  border-top: 1px solid var(--ink-100);
  padding-top: 12px;
}
.sos-check p {
  margin: 0 0 8px;
  color: var(--text-secondary);
}
.sos-check__btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.sos-back {
  margin-top: 14px;
  border: none;
  background: none;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.sos-back:hover { color: var(--text-primary); }

.grounding-step-enter-active,
.grounding-step-leave-active {
  transition: all 220ms ease;
}
.grounding-step-enter-from,
.grounding-step-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.sos-overlay-enter-active, .sos-overlay-leave-active { transition: all var(--duration-normal) var(--ease-smooth); }
.sos-overlay-enter-from, .sos-overlay-leave-to { opacity: 0; transform: scale(0.96); }

@media (max-width: 640px) {
  .sos-panel {
    max-width: none;
    padding: 16px;
    border-radius: 18px;
  }
  .sos-option { padding: 10px; }
  .breathing-orb {
    width: 166px;
    height: 166px;
  }
}
</style>
