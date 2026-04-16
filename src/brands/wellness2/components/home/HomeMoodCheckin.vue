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
  background: var(--bg-surface); border: 2px solid var(--ink-200);
  border-radius: var(--radius-lg); padding: 22px; box-shadow: 3px 3px 0 var(--ink-100);
}
.mood-prompt__q { font-family: var(--font-display); font-size: 19px; font-weight: 400; color: var(--ink-900); margin-bottom: 18px; }
.mood-prompt__options { display: flex; gap: 8px; flex-wrap: wrap; }
.mood-btn {
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  padding: 12px 14px; border-radius: var(--radius);
  background: var(--parchment-2); border: 2px solid var(--ink-100);
  cursor: pointer; flex: 1; min-width: 60px; transition: all var(--duration-fast);
}
.mood-btn:hover { background: var(--sage-50); border-color: var(--sage-300); transform: translateY(-2px); }
.mood-btn__icon  { color: var(--text-secondary); }
.mood-btn:hover .mood-btn__icon { color: var(--sage-600); }
.mood-btn__label { font-size: 10px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.mood-done { display: flex; align-items: center; gap: 14px; }
.mood-done__icon { flex-shrink: 0; color: var(--sage-500); }
.mood-done__label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 2px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.mood-done__value { font-family: var(--font-display); font-size: 20px; font-weight: 400; color: var(--ink-900); }
.mood-done__change {
  font-size: 13px; color: var(--sage-600); background: var(--sage-50);
  border: 1.5px solid var(--sage-200); border-radius: var(--radius-sm);
  padding: 5px 12px; cursor: pointer; transition: all var(--duration-fast); margin-left: auto;
}
.mood-done__change:hover { background: var(--sage-100); }
@media (max-width: 640px) {
  .mood-card { padding: 16px; }
  .mood-prompt__options { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
  .mood-btn { min-width: 0; padding: 10px 6px; }
}
</style>
