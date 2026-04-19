<template>
  <div class="session-view">
    <Transition name="fade" mode="out-in">
      <!-- Post session -->
      <PlayerPostSession
        v-if="playerStore.showPostSession"
        :session="playerStore.currentSession"
        key="post"
      />

      <!-- Active player -->
      <div v-else-if="playerStore.isVisible" key="player" class="session-view__player">
        <Transition name="slide-up" mode="out-in">
          <!-- Pre-play screen -->
          <PlayerPrePlay
            v-if="!hasStarted"
            :session="playerStore.currentSession"
            key="pre"
            @play="startPlay"
            @favorite="progressStore.toggleFavorite(playerStore.currentSession?.id)"
          />
          <!-- Full audio player -->
          <PlayerAudio
            v-else
            :session="playerStore.currentSession"
            key="audio"
          />
        </Transition>

        <!-- Back nav -->
        <button type="button" class="session-view__back" @click="goBack">
          <Icon icon="lucide:arrow-left" class="app-icon app-icon--sm" aria-hidden="true" />
          {{ t('common.back') }}
        </button>
      </div>

      <!-- Fallback: no session -->
      <div v-else key="empty" class="session-view__empty">
        <p>No session selected.</p>
        <RouterLink to="/explore" class="session-view__explore-btn">Browse sessions</RouterLink>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePlayerStore }   from '@/stores/player'
import { useProgressStore } from '@/stores/progress'
import { useAudioPlayer }   from '@/composables/useAudioPlayer'
import { getSessionById }   from '@/data/sessions'
import PlayerPrePlay     from '@/components/player/PlayerPrePlay.vue'
import PlayerAudio       from '@/components/player/PlayerAudio.vue'
import PlayerPostSession from '@/components/player/PlayerPostSession.vue'

const { t }         = useI18n()
const route         = useRoute()
const router        = useRouter()
const playerStore   = usePlayerStore()
const progressStore = useProgressStore()
const { load, play, toggle } = useAudioPlayer()

const hasStarted = ref(false)

onMounted(() => {
  const id = route.params.id
  if (!playerStore.currentSession || playerStore.currentSession.id !== id) {
    const session = getSessionById(id)
    if (session) {
      load(session)
    }
  }
})

function startPlay() {
  hasStarted.value = true
  play()
}

function goBack() {
  playerStore.pause?.()
  router.back()
}
</script>

<style scoped>
.session-view { min-height: var(--app-min-height); display: flex; flex-direction: column; background: var(--parchment); }
.session-view__player { position: relative; flex: 1; display: flex; flex-direction: column; }
.session-view__back {
  position: fixed; top: 20px; left: 24px; z-index: 50;
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: var(--radius-sm);
  background: var(--parchment); border: 2px solid var(--ink-200);
  box-shadow: 3px 3px 0 var(--ink-200);
  font-family: var(--font-body); font-size: 13px; font-weight: 600;
  color: var(--ink-800); cursor: pointer; transition: all var(--duration-fast);
}
.session-view__back:hover { background: var(--sage-500); color: white; border-color: var(--sage-600); box-shadow: 3px 3px 0 var(--sage-700); }
.session-view__empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 20px; min-height: var(--app-min-height); color: var(--ink-900); background: var(--parchment);
}
.session-view__empty p { font-size: 16px; color: var(--text-secondary); }
.session-view__explore-btn {
  padding: 12px 28px; border-radius: var(--radius-sm);
  background: var(--sage-500); color: white; border: 2px solid var(--sage-600);
  text-decoration: none; font-weight: 600; font-size: 14px;
  box-shadow: 3px 3px 0 var(--sage-700); transition: all var(--duration-fast);
}
.session-view__explore-btn:hover { background: var(--sage-600); transform: translate(-1px,-1px); box-shadow: 4px 4px 0 var(--sage-700); }

@media (max-width: 640px) {
  .session-view__back {
    top: calc(10px + env(safe-area-inset-top, 0px));
    left: 12px;
    padding: 7px 12px;
    font-size: 12px;
  }
}
</style>
