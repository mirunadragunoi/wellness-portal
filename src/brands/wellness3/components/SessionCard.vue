<template>
  <!--
    SessionCard.vue v3 — Glass morphism session card
    Înlocuiește: src/components/explore/ExploreSessionCard.vue
    API identic: prop session + emit play, favorite
    Thumbnails: CSS gradient (session.thumbnailGradient) SAU imagine (session.imageUrl)
  -->
  <div class="session-card" @click="emit('play', session)">
    <!-- Thumbnail cu suport pentru imagine reală -->
    <div
      class="session-card__img"
      :style="{ background: session.thumbnailGradient || fallbackGradient }"
    >
      <!-- Când adaugi imagini: setează session.imageUrl -->
      <img
        v-if="session.imageUrl"
        :src="session.imageUrl"
        :alt="session.title"
        class="session-card__photo"
      />

      <div class="session-card__overlay" />

      <span class="session-card__badge">{{ session.category }}</span>

      <div class="session-card__play-wrap">
        <button
          type="button"
          class="session-card__play"
          :aria-label="'Play ' + session.title"
          @click.stop="emit('play', session)"
        >
          <Icon icon="lucide:play" class="app-icon app-icon--sm" />
        </button>
      </div>

      <div class="session-card__meta-bottom">
        {{ session.type }} · {{ durationLabel }}
      </div>
    </div>

    <!-- Body -->
    <div class="session-card__body">
      <h4 class="session-card__title">{{ session.title }}</h4>
      <p class="session-card__instructor">{{ session.instructor }}</p>
    </div>

    <!-- Favorite -->
    <button
      class="session-card__fav"
      :class="{ 'session-card__fav--active': isFavorite }"
      @click.stop="emit('favorite', session.id)"
      :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
      <Icon
        :icon="isFavorite ? 'mdi:heart' : 'lucide:heart'"
        class="app-icon app-icon--sm"
      />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProgressStore } from '@/stores/progress'

const props = defineProps({
  session: { type: Object, required: true },
})
const emit = defineEmits(['play', 'favorite'])

const progressStore = useProgressStore()
const isFavorite = computed(() => progressStore.isFavorite(props.session.id))

// Gradient fallback pentru fiecare tip de sesiune
const TYPE_GRADIENTS = {
  Meditation:   'linear-gradient(135deg, #312e81, #7c3aed, #2dd4bf)',
  Sleep:        'linear-gradient(135deg, #1e1b4b, #4338ca, #a78bfa)',
  Breathing:    'linear-gradient(135deg, #064e3b, #059669, #34d399)',
  Soundscape:   'linear-gradient(135deg, #78350f, #d97706, #fbbf24)',
  Motivational: 'linear-gradient(135deg, #7f1d1d, #dc2626, #f9a8d4)',
  Focus:        'linear-gradient(135deg, #0c4a6e, #0284c7, #7dd3fc)',
}
const fallbackGradient = computed(() =>
  TYPE_GRADIENTS[props.session.type] ||
  'linear-gradient(135deg, #1e1b4b, #4c1d95, #a78bfa)'
)

const durationLabel = computed(() => {
  const m = Math.round(props.session.duration / 60)
  return `${m} min`
})
</script>

<style scoped>
.session-card {
  position: relative;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.30);
  transition:
    transform var(--duration-normal) var(--ease-smooth),
    box-shadow var(--duration-normal) var(--ease-smooth),
    border-color var(--duration-normal) var(--ease-smooth),
    background var(--duration-normal) var(--ease-smooth);
}

.session-card:hover {
  transform: translateY(-5px) scale(1.01);
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(167, 139, 250, 0.35);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.50),
    0 0 40px rgba(167, 139, 250, 0.12);
}

/* ── Thumbnail ── */
.session-card__img {
  height: 148px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.session-card__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.session-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(7, 13, 26, 0.65), transparent 55%);
}

/* ── Badge ── */
.session-card__badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background: rgba(167, 139, 250, 0.18);
  color: #c4b5fd;
  border: 1px solid rgba(167, 139, 250, 0.30);
  backdrop-filter: blur(8px);
}

/* ── Play button (apare la hover) ── */
.session-card__play-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-smooth);
}
.session-card:hover .session-card__play-wrap { opacity: 1; }

.session-card__play {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  backdrop-filter: blur(8px);
  transition: background var(--duration-fast), transform var(--duration-fast);
}
.session-card__play:hover {
  background: linear-gradient(135deg, var(--violet), var(--teal));
  transform: scale(1.08);
}

/* ── Meta bottom ── */
.session-card__meta-bottom {
  position: absolute;
  bottom: 10px;
  left: 12px;
  right: 12px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 11px;
  font-weight: 600;
  z-index: 1;
}

/* ── Body ── */
.session-card__body {
  padding: 13px 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.session-card__title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.3;
  letter-spacing: 0.2px;
}

.session-card__instructor {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

/* ── Favorite button ── */
.session-card__fav {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  transition: color var(--duration-fast), background var(--duration-fast);
}
.session-card__fav:hover { color: var(--rose); background: rgba(249, 168, 212, 0.15); }
.session-card__fav--active { color: var(--rose); }

@media (max-width: 640px) {
  .session-card__img { height: 120px; }
  .session-card__title { font-size: 15px; }
}
</style>
