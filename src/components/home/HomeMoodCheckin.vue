<template>
  <div class="mood-card">
    <!-- Already checked in -->
    <div v-if="moodStore.moodCheckedToday" class="mood-done">
      <span class="mood-done__emoji">{{ currentMood?.emoji }}</span>
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
          <span class="mood-btn__emoji">{{ m.emoji }}</span>
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
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 24px 28px;
}
.mood-prompt__q {
  font-family: var(--font-display); font-size: 20px; font-weight: 400;
  color: var(--text-primary); margin-bottom: 20px;
}
.mood-prompt__options { display: flex; gap: 8px; flex-wrap: wrap; }
.mood-btn {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 14px 16px; border-radius: var(--radius);
  background: var(--bg-muted); border: 2px solid transparent;
  cursor: pointer; flex: 1; min-width: 64px;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.mood-btn:hover, .mood-btn--hover {
  background: var(--sky-50); border-color: var(--sky-200); transform: translateY(-3px);
}
.mood-btn__emoji { font-size: 28px; }
.mood-btn__label { font-size: 11px; color: var(--text-secondary); font-weight: 500; }

.mood-done {
  display: flex; align-items: center; gap: 16px;
}
.mood-done__emoji { font-size: 40px; }
.mood-done__text { flex: 1; }
.mood-done__label { display: block; font-size: 13px; color: var(--text-muted); margin-bottom: 2px; }
.mood-done__value { font-family: var(--font-display); font-size: 22px; font-weight: 500; color: var(--text-primary); }
.mood-done__change {
  font-size: 13px; color: var(--sky-600); background: var(--sky-50);
  border: 1px solid var(--sky-200); border-radius: 100px;
  padding: 6px 14px; cursor: pointer; transition: all var(--duration-fast);
}
.mood-done__change:hover { background: var(--sky-100); }
</style>
