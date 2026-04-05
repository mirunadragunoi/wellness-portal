<template>
  <div class="audio-player">
    <!-- Background blurred cover -->
    <div class="audio-player__bg" :style="{ background: session?.thumbnailGradient }" />
    <div class="audio-player__overlay" />

    <div class="audio-player__inner">
      <!-- Cover art -->
      <div class="audio-player__cover" :style="{ background: session?.thumbnailGradient }">
        <span class="audio-player__cover-emoji">{{ typeEmoji }}</span>
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
        <button class="ctrl-btn ctrl-btn--play" @click="toggle">
          <span>{{ playerStore.isPlaying ? '⏸' : '▶' }}</span>
        </button>
        <button class="ctrl-btn ctrl-btn--sm" @click="player.skipForward()" title="Forward 15s">
          15⟩
        </button>
      </div>

      <!-- Volume -->
      <div class="audio-player__volume">
        <span class="volume-icon">{{ playerStore.volume > 0.5 ? '🔊' : playerStore.volume > 0 ? '🔉' : '🔇' }}</span>
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

const props = defineProps({ session: Object })
const playerStore  = usePlayerStore()
const { toggle, seek } = useAudioPlayer()
const player       = usePlayerStore()
const progressRef  = ref(null)

const typeEmojiMap = { meditation: '🧘', 'sleep-story': '🌙', soundscape: '🎵', motivational: '⚡', breathing: '💨' }
const typeEmoji    = computed(() => typeEmojiMap[props.session?.type] || '🧘')

function onProgressClick(e) {
  const rect = progressRef.value?.getBoundingClientRect()
  if (!rect) return
  const pct = (e.clientX - rect.left) / rect.width
  seek(pct * playerStore.duration)
}
</script>

<style scoped>
.audio-player {
  position: relative; min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.audio-player__bg {
  position: absolute; inset: -40px;
  filter: blur(60px) saturate(1.5);
  opacity: 0.4;
}
.audio-player__overlay {
  position: absolute; inset: 0;
  background: rgba(248,250,252,0.88);
}
[data-theme="dark"] .audio-player__overlay { background: rgba(11,18,32,0.88); }

.audio-player__inner {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  gap: 32px; width: 100%; max-width: 420px; padding: 40px 24px;
}

.audio-player__cover {
  width: 240px; height: 240px; border-radius: var(--radius-xl);
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-xl);
  animation: breathe-idle 8s ease-in-out infinite;
}
.audio-player__cover-emoji { font-size: 80px; }

.audio-player__info { text-align: center; }
.audio-player__title {
  font-family: var(--font-display); font-size: 28px; font-weight: 400;
  color: var(--text-primary); margin-bottom: 6px;
}
.audio-player__meta { font-size: 14px; color: var(--text-muted); text-transform: capitalize; }

.audio-player__progress { width: 100%; cursor: pointer; }
.progress-track {
  height: 5px; background: var(--bg-muted);
  border-radius: 100px; position: relative; margin-bottom: 10px;
}
.progress-fill {
  height: 100%; background: linear-gradient(90deg, var(--sky-400), var(--sky-600));
  border-radius: 100px; transition: width 1s linear;
}
.progress-thumb {
  position: absolute; top: 50%; transform: translate(-50%, -50%);
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--sky-600); box-shadow: 0 2px 6px rgba(14,165,233,0.4);
  transition: left 1s linear;
}
.progress-times { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); }

.audio-player__controls { display: flex; align-items: center; gap: 20px; }
.ctrl-btn {
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border: none; transition: all var(--duration-fast) var(--ease-smooth);
}
.ctrl-btn--sm {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--bg-muted); color: var(--text-secondary);
  font-size: 12px; font-weight: 600; font-family: var(--font-body);
}
.ctrl-btn--sm:hover { background: var(--sky-100); color: var(--sky-600); }
.ctrl-btn--play {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white; font-size: 24px;
  box-shadow: 0 6px 20px rgba(14,165,233,0.4);
  padding-left: 3px;
}
.ctrl-btn--play:hover { transform: scale(1.08); box-shadow: 0 10px 28px rgba(14,165,233,0.5); }

.audio-player__volume { display: flex; align-items: center; gap: 12px; width: 100%; max-width: 260px; }
.volume-icon { font-size: 18px; flex-shrink: 0; }
.volume-slider {
  flex: 1; -webkit-appearance: none; height: 4px;
  background: var(--bg-muted); border-radius: 100px; outline: none; cursor: pointer;
}
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 14px; height: 14px;
  border-radius: 50%; background: var(--sky-500); cursor: pointer;
  box-shadow: 0 2px 6px rgba(14,165,233,0.3);
}

@keyframes breathe-idle { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
</style>
