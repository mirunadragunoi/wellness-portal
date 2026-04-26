<template>
  <div class="mood-card">
    <!-- Already checked in -->
    <div v-if="moodStore.moodCheckedToday" class="mood-done">
      <Icon
        v-if="currentMood?.icon"
        :icon="currentMood.icon"
        class="mood-done__icon app-icon app-icon--2xl app-icon--primary"
      />
      <div class="mood-done__text">
        <span class="mood-done__label">{{ t('home.mood_today') }}</span>
        <strong class="mood-done__value">{{ currentMood?.label }}</strong>
      </div>
      <button class="mood-done__change" @click="moodStore.moodCheckedToday = false">
        {{ t('home.mood_change') }}
      </button>
    </div>

    <!-- Check in prompt -->
    <div v-else class="mood-prompt">
      <p class="mood-prompt__q">{{ t('home.mood_prompt') }}</p>
      <div class="mood-prompt__options">
        <button
          v-for="m in moodOptions" :key="m.id"
          class="mood-btn" :class="{ 'mood-btn--hover': hoveredMood === m.id }"
          :title="m.label"
          @mouseenter="hoveredMood = m.id"
          @mouseleave="hoveredMood = null"
          @click="checkIn(m.id)"
        >
          <Icon :icon="m.icon" class="mood-btn__icon app-icon app-icon--lg app-icon--muted" />
          <span class="mood-btn__label">{{ t(`home.mood_${m.id}`) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMoodStore, moodOptions } from '@/stores/mood'
import { useUIStore } from '@/stores/ui'

const { t }     = useI18n()
const moodStore = useMoodStore()
const uiStore   = useUIStore()
const hoveredMood = ref(null)

const currentMood = computed(() => moodOptions.find(m => m.id === moodStore.todayMood))

function checkIn(id) {
  moodStore.checkIn(id)
  uiStore.showToast(t('home.mood_saved'), 'success')
}
</script>

<style scoped>
.mood-card {
  margin-bottom: 36px;
}
.mood-prompt__q { font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 14px; }
.mood-prompt__options { display: flex; gap: 10px; }
.mood-btn {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 14px 20px; border-radius: 16px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  cursor: pointer; flex: 1; transition: all 200ms var(--ease-smooth);
}
.mood-btn:hover { background: rgba(184,245,102,0.07); border-color: rgba(184,245,102,0.2); transform: translateY(-2px); }
.mood-btn__icon  { color: var(--text-secondary); font-size: 24px; }
.mood-btn:hover .mood-btn__icon { color: var(--lime-400); }
.mood-btn__label { font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.mood-btn:hover .mood-btn__label { color: var(--lime-400); }
.mood-done { display: flex; align-items: center; gap: 14px; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; }
.mood-done__icon { flex-shrink: 0; color: var(--lime-400); }
.mood-done__label { display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.mood-done__value { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text-primary); }
.mood-done__change {
  font-size: 12px; color: var(--lime-400); background: rgba(184,245,102,0.07);
  border: 1px solid rgba(184,245,102,0.2); border-radius: var(--radius-pill);
  padding: 6px 14px; cursor: pointer; transition: all var(--duration-fast); margin-left: auto;
}
.mood-done__change:hover { background: rgba(184,245,102,0.12); }
@media (max-width: 640px) {
  .mood-prompt__options { gap: 6px; }
  .mood-btn { padding: 10px 6px; }
}
</style>
