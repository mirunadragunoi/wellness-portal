<template>
  <div class="session-view">
    <Transition name="fade" mode="out-in">
      <PlayerPostSession
        v-if="playerStore.showPostSession"
        :session="playerStore.currentSession"
        key="post"
      />

      <div v-else-if="playerStore.isVisible" key="player" class="session-view__player">
        <Transition name="slide-up" mode="out-in">
          <PlayerPrePlay
            v-if="!hasStarted"
            :session="playerStore.currentSession"
            key="pre"
            @play="startPlay"
            @favorite="progressStore.toggleFavorite(playerStore.currentSession?.id)"
          />
          <PlayerAudio
            v-else
            :session="playerStore.currentSession"
            key="audio"
          />
        </Transition>

        <button type="button" class="session-view__back" @click="goBack">
          <Icon icon="lucide:arrow-left" class="app-icon app-icon--sm" aria-hidden="true" />
          {{ t('common.back') }}
        </button>
      </div>

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
import { useProductsStore } from '@/stores/products'
import { useAudioPlayer }   from '@/composables/useAudioPlayer'
import PlayerPrePlay     from '@/components/player/PlayerPrePlay.vue'
import PlayerAudio       from '@/components/player/PlayerAudio.vue'
import PlayerPostSession from '@/components/player/PlayerPostSession.vue'

const { t }          = useI18n()
const route          = useRoute()
const router         = useRouter()
const playerStore    = usePlayerStore()
const progressStore  = useProgressStore()
const productsStore  = useProductsStore()
const { load, play } = useAudioPlayer()

const hasStarted = ref(false)

onMounted(async () => {
  const id = route.params.id
  if (!playerStore.currentSession || String(playerStore.currentSession.id) !== String(id)) {
    // Try from local cache first, then fetch from API
    let session = productsStore.getById(id)
    if (!session) {
      try {
        session = await productsStore.fetchProductById(id)
      } catch (e) {
        console.warn('Could not load product:', e.message)
      }
    }
    if (session) load(session)
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
.session-view { min-height: var(--app-min-height); display: flex; flex-direction: column; }
.session-view__player { position: relative; flex: 1; display: flex; flex-direction: column; }
.session-view__back {
  position: fixed; top: 20px; left: 24px; z-index: 50;
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 100px;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm); font-family: var(--font-body);
  font-size: 14px; color: var(--text-secondary); cursor: pointer;
  transition: all var(--duration-fast);
}
.session-view__back:hover { color: var(--sky-600); border-color: var(--sky-200); }
.session-view__empty {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 20px; min-height: var(--app-min-height);
  color: var(--text-secondary);
}
.session-view__explore-btn {
  padding: 12px 28px; border-radius: 100px; background: var(--sky-100);
  color: var(--sky-700); text-decoration: none; font-weight: 500;
  transition: all var(--duration-fast);
}
.session-view__explore-btn:hover { background: var(--sky-200); }
</style>
