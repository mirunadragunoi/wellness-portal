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
  display: flex; flex-direction: column;
  background: var(--forest-950);
  position: relative; overflow: hidden;
}
.audio-player__bg {
  position: absolute; inset: 0;
  background: linear-gradient(160deg, var(--forest-800) 0%, var(--forest-950) 100%);
}
.audio-player__overlay {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 30%, rgba(184,245,102,0.06) 0%, transparent 60%);
}
.audio-player__inner {
  position: relative; z-index: 1;
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 24px;
  justify-content: center; padding: 36px var(--container-pad) 26px;
  max-width: 520px; margin: 0 auto; width: 100%;
}
.audio-player__cover {
  width: clamp(160px, 35vw, 240px); aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, rgba(184,245,102,0.2) 0%, rgba(34,197,94,0.1) 40%, rgba(13,31,18,0.9) 80%);
  border: 2px solid rgba(184,245,102,0.2);
  box-shadow: 0 0 80px rgba(184,245,102,0.1);
  display: flex; align-items: center; justify-content: center;
  animation: breathe 6s ease-in-out infinite;
}
.audio-player__cover-icon { color: var(--lime-400); }
.audio-player__info { text-align: center; }
.audio-player__title {
  font-family: var(--font-display); font-size: clamp(24px,3vw,36px); font-weight: 800;
  letter-spacing: -1.5px; color: var(--text-primary); margin-bottom: 6px; line-height: 1.1;
}
.audio-player__meta { font-size: 14px; color: var(--text-muted); }

.audio-player__progress { width: 100%; max-width: 460px; cursor: pointer; }
.progress-track {
  position: relative; height: 4px; border-radius: 999px;
  background: rgba(255,255,255,0.08);
}
.progress-fill {
  height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, var(--emerald-400), var(--lime-500));
  position: relative;
}
.progress-thumb {
  position: absolute; right: -6px; top: 50%; transform: translateY(-50%);
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--lime-500); box-shadow: 0 0 8px rgba(184,245,102,0.6);
}
.progress-times {
  margin-top: 8px; display: flex; justify-content: space-between;
  font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);
}

.audio-player__controls { display: flex; align-items: center; gap: 20px; }
.ctrl-btn {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
  cursor: pointer; color: var(--text-secondary);
  width: 48px; height: 48px; border-radius: 50%; font-family: var(--font-mono);
  font-size: 13px; transition: all 200ms; display: flex; align-items: center; justify-content: center;
}
.ctrl-btn:hover { color: var(--text-primary); background: rgba(255,255,255,0.09); }
.ctrl-btn--play {
  width: 68px; height: 68px; border-radius: 50%;
  background: var(--lime-500); color: var(--forest-900); border: none;
  box-shadow: 0 0 0 0 rgba(184,245,102,0);
  transition: all 250ms var(--ease-smooth);
}
.ctrl-btn--play:hover { background: var(--lime-400); box-shadow: 0 0 40px rgba(184,245,102,0.4); transform: scale(1.05); }

.audio-player__volume { width: 100%; max-width: 360px; display: flex; align-items: center; gap: 10px; }
.volume-slider { width: 100%; accent-color: var(--lime-500); }

@media (max-width: 640px) {
  .audio-player__inner { padding: 24px 16px 18px; gap: 20px; }
}
</style>
