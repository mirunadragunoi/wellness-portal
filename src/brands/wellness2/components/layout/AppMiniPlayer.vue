<template>
  <Transition name="mini-player">
    <div v-if="playerStore.isVisible && !playerStore.isExpanded" class="mini-player" @click="goToPlayer">
      <!-- Thumbnail -->
      <div
        class="mini-player__thumb"
        :style="{ background: playerStore.currentSession?.thumbnailGradient || 'var(--sage-200)' }"
      >
        <Icon
          v-if="!playerStore.currentSession?.thumbnail"
          :icon="thumbIcon"
          class="app-icon app-icon--md"
        />
      </div>

      <!-- Info -->
      <div class="mini-player__info">
        <p class="mini-player__title">{{ playerStore.currentSession?.title }}</p>
        <BaseProgressBar :value="playerStore.progress" :height="2" />
      </div>

      <!-- Controls -->
      <div class="mini-player__controls" @click.stop>
        <button type="button" class="mini-player__btn" @click="toggle" :aria-label="playerStore.isPlaying ? 'Pause' : 'Play'">
          <Icon :icon="playerStore.isPlaying ? 'lucide:pause' : 'lucide:play'" class="app-icon app-icon--sm" />
        </button>
        <button type="button" class="mini-player__btn mini-player__btn--close" @click="playerStore.close()" aria-label="Close">
          <Icon icon="lucide:x" class="app-icon app-icon--xs" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import BaseProgressBar from '@/components/base/BaseProgressBar.vue'
import { sessionTypeIcon } from '@/constants/appIcons'

const playerStore = usePlayerStore()
const thumbIcon = computed(() => sessionTypeIcon(playerStore.currentSession?.type))
const router      = useRouter()
const { toggle }  = useAudioPlayer()

function goToPlayer() {
  if (playerStore.currentSession) {
    router.push({ name: 'session', params: { id: playerStore.currentSession.id } })
  }
}
</script>

<style scoped>
.mini-player {
  position: fixed;
  bottom: calc(var(--bottom-bar-height) + 10px);
  left: 12px; right: 12px;
  max-width: 500px; margin: 0 auto;
  height: var(--mini-player-height);
  background: var(--ink-900);
  border: 2px solid var(--sage-600);
  border-radius: var(--radius);
  box-shadow: 4px 4px 0 var(--sage-700);
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; z-index: 75; cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.mini-player:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--sage-700); }
.mini-player__thumb {
  width: 44px; height: 44px; border-radius: var(--radius-sm);
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.9); overflow: hidden;
  border: 1px solid rgba(255,255,255,0.15);
}
.mini-player__info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.mini-player__title {
  font-size: 13px; font-weight: 600; color: var(--parchment);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.mini-player__controls { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.mini-player__btn {
  width: 34px; height: 34px; border-radius: var(--radius-sm);
  background: rgba(255,255,255,0.1); color: var(--parchment);
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
  transition: background var(--duration-fast);
}
.mini-player__btn:hover { background: var(--sage-600); border-color: var(--sage-500); }
.mini-player__btn--close { background: transparent; color: var(--ink-400); border-color: transparent; }
.mini-player__btn--close:hover { background: rgba(255,255,255,0.08); color: var(--parchment); }
.mini-player-enter-active, .mini-player-leave-active {
  transition: all var(--duration-normal) var(--ease-smooth);
}
.mini-player-enter-from, .mini-player-leave-to { opacity: 0; transform: translateY(20px); }
@media (min-width: 769px) {
  .mini-player { bottom: 20px; left: 50%; transform: translateX(-50%); right: auto; width: 460px; }
  .mini-player:hover { transform: translateX(-50%) translate(-2px,-2px); }
}
</style>
