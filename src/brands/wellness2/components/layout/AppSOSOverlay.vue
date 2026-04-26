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
/* ── Overlay ── */
.sos-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(2,10,4,0.75);
  backdrop-filter: blur(16px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}

/* ── Panel ── */
.sos-panel {
  background: var(--forest-800);
  width: 100%; max-width: 540px;
  border: 1px solid rgba(184,245,102,0.12);
  border-radius: 24px; padding: 28px;
  box-shadow: 0 24px 60px rgba(2,10,4,0.8), 0 0 60px rgba(184,245,102,0.06);
}

/* ── Header ── */
.sos-header { position: relative; padding-right: 46px; margin-bottom: 20px; }
.sos-badge {
  width: 48px; height: 48px; border-radius: 14px;
  display: inline-flex; align-items: center; justify-content: center;
  background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25);
  margin-bottom: 12px; color: #f87171;
}
.sos-title {
  font-family: var(--font-display); font-size: clamp(22px,3vw,28px);
  font-weight: 800; letter-spacing: -1px; color: var(--text-primary); margin: 0;
}
.sos-subtitle { margin: 8px 0 0; color: var(--text-secondary); font-size: 14px; line-height: 1.55; }
.sos-close {
  position: absolute; top: 0; right: 0;
  width: 36px; height: 36px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05);
  color: var(--text-muted); display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all var(--duration-fast);
}
.sos-close:hover { background: rgba(255,255,255,0.1); color: var(--text-primary); }

/* ── Option list ── */
.sos-options { display: grid; gap: 8px; }
.sos-option {
  width: 100%; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;
  padding: 14px 16px; background: rgba(255,255,255,0.04);
  display: flex; align-items: center; gap: 12px; text-align: left;
  cursor: pointer; transition: all var(--duration-fast);
}
.sos-option:hover { border-color: rgba(184,245,102,0.25); background: rgba(184,245,102,0.06); transform: translateY(-1px); }
.sos-option__icon {
  width: 40px; height: 40px; border-radius: 12px;
  display: inline-flex; align-items: center; justify-content: center;
  background: rgba(184,245,102,0.08); border: 1px solid rgba(184,245,102,0.15);
  color: var(--lime-400); flex-shrink: 0;
}
.sos-option__text { flex: 1; min-width: 0; display: grid; gap: 3px; }
.sos-option__text strong { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.sos-option__text span  { font-size: 12px; color: var(--text-secondary); line-height: 1.45; }
.sos-option__arrow { color: var(--text-muted); }

/* ── Breathing orb ── */
.breathing-orb {
  width: 190px; height: 190px; margin: 12px auto 16px;
  border-radius: 50%; border: 2px solid rgba(184,245,102,0.25);
  background: radial-gradient(circle at 40% 35%, rgba(184,245,102,0.15) 0%, rgba(34,197,94,0.08) 40%, rgba(13,31,18,0.95) 100%);
  box-shadow: 0 0 40px rgba(184,245,102,0.1);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: transform 900ms ease, box-shadow 900ms ease;
}
.breathing-orb--inhale { transform: scale(1.08); box-shadow: 0 0 60px rgba(184,245,102,0.18); }
.breathing-orb--hold   { transform: scale(1.08); box-shadow: 0 0 60px rgba(184,245,102,0.18); }
.breathing-orb--exhale { transform: scale(0.92); box-shadow: 0 0 20px rgba(184,245,102,0.06); }
.breathing-orb__phase {
  font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--lime-400);
}
.breathing-orb__count {
  font-family: var(--font-mono); font-size: 48px; font-weight: 400; color: var(--text-primary); line-height: 1;
}
.breathing-status { text-align: center; color: var(--text-secondary); margin-bottom: 12px; font-size: 14px; }
.breathing-btns { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }

/* ── Grounding ── */
.sos-grounding { display: grid; gap: 10px; }
.grounding-step {
  border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04);
  border-radius: 14px; padding: 14px; display: flex; align-items: center; gap: 12px;
}
.grounding-step__number {
  width: 34px; height: 34px; border-radius: 10px;
  background: rgba(184,245,102,0.1); border: 1px solid rgba(184,245,102,0.2);
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--lime-400); font-weight: 700; font-family: var(--font-display); flex-shrink: 0;
}
.grounding-step__text { margin: 0; color: var(--text-primary); font-size: 14px; }
.grounding-btns { display: grid; gap: 10px; }
.sos-done-text { margin: 0; color: var(--text-secondary); font-size: 14px; }

/* ── Buttons ── */
.sos-btn-primary, .sos-btn-secondary, .sos-btn-ghost {
  height: 42px; border-radius: var(--radius-pill);
  padding: 0 20px; font-weight: 700; font-family: var(--font-body);
  cursor: pointer; transition: all var(--duration-fast); border: 1px solid transparent;
}
.sos-btn-primary { background: var(--lime-500); color: var(--forest-900); }
.sos-btn-primary:hover { background: var(--lime-400); box-shadow: 0 0 20px rgba(184,245,102,0.3); }
.sos-btn-secondary { background: rgba(255,255,255,0.08); color: var(--text-primary); border-color: rgba(255,255,255,0.12); }
.sos-btn-secondary:hover { background: rgba(255,255,255,0.12); }
.sos-btn-ghost { background: transparent; color: var(--text-secondary); border-color: rgba(255,255,255,0.1); }
.sos-btn-ghost:hover { color: var(--text-primary); border-color: rgba(255,255,255,0.2); }

/* ── Check / back ── */
.sos-check { margin-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; }
.sos-check p { margin: 0 0 8px; color: var(--text-secondary); font-size: 14px; }
.sos-check__btns { display: flex; gap: 8px; flex-wrap: wrap; }
.sos-back {
  margin-top: 14px; border: none; background: none;
  color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px;
}
.sos-back:hover { color: var(--text-primary); }

/* ── Transitions ── */
.grounding-step-enter-active, .grounding-step-leave-active { transition: all 220ms ease; }
.grounding-step-enter-from, .grounding-step-leave-to { opacity: 0; transform: translateY(6px); }
.sos-overlay-enter-active, .sos-overlay-leave-active { transition: all var(--duration-normal) var(--ease-smooth); }
.sos-overlay-enter-from, .sos-overlay-leave-to { opacity: 0; transform: scale(0.97); }

@media (max-width: 640px) {
  .sos-panel { max-width: none; padding: 20px; border-radius: 20px; }
  .sos-option { padding: 12px; }
  .breathing-orb { width: 160px; height: 160px; }
}
</style>
