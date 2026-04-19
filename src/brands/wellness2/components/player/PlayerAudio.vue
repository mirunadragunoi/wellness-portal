<template>
  <div class="audio-player">
    <!-- Background blurred cover -->
    <div class="audio-player__bg" :style="{ background: session?.thumbnailGradient }" />
    <div class="audio-player__overlay" />

    <div class="audio-player__inner">
      <!-- Cover art -->
      <div class="audio-player__cover" :style="{ background: session?.thumbnailGradient }">
        <Icon :icon="coverIcon" class="audio-player__cover-icon app-icon app-icon--3xl" />
      </div>

      <!-- Track info -->
      <div class="audio-player__info">
        <h2 class="audio-player__title">{{ session?.title }}</h2>
        <p class="audio-player__meta">{{ session?.category }} · {{ session?.type }}</p>
      </div>

      <!-- Progress bar -->
      <div class="audio-player__progress" @click="onProgressClick" ref="progressRef">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: playerStore.progress + '%' }" />
          <div class="progress-thumb" :style="{ left: playerStore.progress + '%' }" />
        </div>
        <div class="progress-times">
          <span>{{ playerStore.formattedCurrent }}</span>
          <span>{{ playerStore.formattedDuration }}</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="audio-player__controls">
        <button class="ctrl-btn ctrl-btn--sm" @click="player.skipBack()" title="Back 15s">
          ⟨15
        </button>
        <button type="button" class="ctrl-btn ctrl-btn--play" @click="toggle" :aria-label="playerStore.isPlaying ? 'Pause' : 'Play'">
          <Icon :icon="playerStore.isPlaying ? 'lucide:pause' : 'lucide:play'" class="app-icon app-icon--xl" />
        </button>
        <button class="ctrl-btn ctrl-btn--sm" @click="player.skipForward()" title="Forward 15s">
          15⟩
        </button>
      </div>

      <!-- Volume -->
      <div class="audio-player__volume">
        <Icon :icon="volumeIcon" class="volume-icon app-icon app-icon--md app-icon--muted" aria-hidden="true" />
        <input
          class="volume-slider"
          type="range" min="0" max="1" step="0.01"
          :value="playerStore.volume"
          @input="player.setVolume(+$event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { sessionTypeIcon } from '@/constants/appIcons'

const props = defineProps({ session: Object })
const playerStore  = usePlayerStore()
const { toggle, seek } = useAudioPlayer()
const player       = usePlayerStore()
const progressRef  = ref(null)

const coverIcon = computed(() => sessionTypeIcon(props.session?.type))

const volumeIcon = computed(() => {
  const v = playerStore.volume
  if (v > 0.5) return 'lucide:volume-2'
  if (v > 0) return 'lucide:volume-1'
  return 'lucide:volume-x'
})

function onProgressClick(e) {
  const rect = progressRef.value?.getBoundingClientRect()
  if (!rect) return
  const pct = (e.clientX - rect.left) / rect.width
  seek(pct * playerStore.duration)
}
</script>

<style scoped>
.audio-player {
  min-height: var(--app-min-height);
  display: flex;
  flex-direction: column;
  background: var(--parchment);
  position: relative;
  overflow: hidden;
}
.audio-player__bg {
  position: absolute; inset: 0; background-size: cover; background-position: center;
  opacity: 0.14; filter: blur(18px); transform: scale(1.06);
}
.audio-player__overlay {
  position: absolute;
  inset: 0;
  background: rgba(250, 246, 238, 0.88);
}
.audio-player__inner {
  position: relative; z-index: 1;
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 18px;
  justify-content: center; padding: 36px var(--container-pad) 26px;
  max-width: 520px; margin: 0 auto; width: 100%;
}
.audio-player__cover {
  width: clamp(160px, 40vw, 240px); aspect-ratio: 1;
  border-radius: var(--radius-lg); background-size: cover; background-position: center;
  border: 2px solid var(--ink-200);
  box-shadow: 8px 8px 0 var(--ink-100);
  display: flex; align-items: center; justify-content: center;
}
.audio-player__cover-icon {
  color: rgba(255,255,255,0.9);
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}
.audio-player__info { text-align: center; }
.audio-player__title { font-family: var(--font-display); font-size: 30px; font-weight: 300; color: var(--ink-900); margin-bottom: 6px; }
.audio-player__meta { font-size: 14px; color: var(--text-secondary); }

.audio-player__progress { width: 100%; max-width: 460px; cursor: pointer; }
.progress-track {
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: var(--ink-200);
}
.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--sage-400), var(--sage-600));
}
.progress-thumb {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--sage-600);
  transform: translate(-50%, -50%);
}
.progress-times {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
}

.audio-player__controls { display: flex; align-items: center; gap: 16px; }
.ctrl-btn {
  background: none; border: none; cursor: pointer; color: var(--ink-700);
  padding: 8px; border-radius: var(--radius-sm); transition: all var(--duration-fast);
  display: flex; align-items: center; justify-content: center;
}
.ctrl-btn:hover { color: var(--sage-700); background: var(--sage-50); }
.ctrl-btn--play {
  width: 60px; height: 60px; border-radius: var(--radius);
  background: var(--sage-500); color: white; border: 2px solid var(--sage-400);
  box-shadow: 3px 3px 0 var(--sage-700);
}
.ctrl-btn--play:hover { background: var(--sage-400); transform: translate(-1px,-1px); box-shadow: 4px 4px 0 var(--sage-700); }

.audio-player__volume {
  width: 100%;
  max-width: 360px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.volume-slider {
  width: 100%;
}

@media (max-width: 640px) {
  .audio-player__inner {
    padding: 24px 16px 18px;
  }
  .audio-player__title {
    font-size: 25px;
  }
}
</style>
