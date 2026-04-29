<template>
  <div class="post-session">
    <div class="post-session__check">
      <Icon icon="lucide:check" class="app-icon app-icon--2xl" />
    </div>
    <h2 class="post-session__title">{{ t('player.completed_title') }}</h2>
    <p class="post-session__body">{{ t('player.completed_body', { title: session?.title }) }}</p>

    <!-- Streak update -->
    <div class="post-session__streak">
      <Icon icon="lucide:flame" class="streak-fire app-icon app-icon--xl" aria-hidden="true" />
      <div>
        <p class="streak-value">{{ progressStore.streakDays }} {{ t('common.days') }}</p>
        <p class="streak-label">{{ t('player.streak_updated') }}</p>
      </div>
    </div>

    <!-- Post mood -->
    <div class="post-session__mood">
      <p class="post-session__mood-q">{{ t('player.post_mood_prompt') }}</p>
      <div class="mood-options">
        <button v-for="m in moodOptions" :key="m.id" class="mood-btn" @click="checkMood(m.id)">
          <Icon :icon="m.icon" class="app-icon app-icon--md app-icon--muted" />
          <span>{{ t(`home.mood_${m.id}`) }}</span>
        </button>
      </div>
    </div>

    <!-- Suggestions -->
    <div class="post-session__suggestions">
      <p class="post-session__suggestions-title">{{ t('player.suggestions_title') }}</p>
      <div class="suggestions-list">
        <div
          v-for="s in suggestions" :key="s.id"
          class="suggestion-card"
          @click="router.push({ name: 'session', params: { id: s.id } })"
        >
          <div class="suggestion-card__img" :style="{ background: s.thumbnailGradient }" />
          <div class="suggestion-card__info">
            <p class="suggestion-card__title">{{ s.title }}</p>
            <p class="suggestion-card__meta">{{ Math.round(s.duration / 60) }} {{ t('explore.min') }}</p>
          </div>
        </div>
      </div>
    </div>

    <RouterLink to="/home" class="back-btn">{{ t('player.back_home') }}</RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useProgressStore } from '@/stores/progress'
import { useMoodStore, moodOptions } from '@/stores/mood'
import { useUIStore } from '@/stores/ui'
import { useProductsStore } from '@/stores/products'

const { t }          = useI18n()
const router         = useRouter()
const progressStore  = useProgressStore()
const moodStore      = useMoodStore()
const uiStore        = useUIStore()
const productsStore  = useProductsStore()

const props = defineProps({ session: Object })

const suggestions = computed(() =>
  productsStore.sessions
    .filter(s => String(s.id) !== String(props.session?.id) && s.category === props.session?.category)
    .slice(0, 3)
)

function checkMood(id) {
  moodStore.checkIn(id)
  uiStore.showToast(t('home.mood_saved'), 'success')
}
</script>

<style scoped>
.post-session {
  display: flex; flex-direction: column; align-items: center;
  gap: 32px; padding: 60px 24px; max-width: 520px; margin: 0 auto; text-align: center;
}
.post-session__check {
  width: 80px; height: 80px; border-radius: 50%;
  background: linear-gradient(135deg, #d1fae5, #6ee7b7);
  display: flex; align-items: center; justify-content: center;
  color: #059669;
  animation: bounceIn 0.6s var(--ease-bounce);
}
@keyframes bounceIn { 0% { transform: scale(0.3); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } }
.post-session__title { font-family: var(--font-display); font-size: 36px; font-weight: 400; color: var(--text-primary); }
.post-session__body  { font-size: 17px; color: var(--text-secondary); }

.post-session__streak {
  display: flex; align-items: center; gap: 16px;
  background: var(--warm-100); border: 1px solid #fde68a;
  border-radius: var(--radius-lg); padding: 20px 28px;
  width: 100%;
}
.streak-fire { color: #ea580c; flex-shrink: 0; }
.streak-value { font-family: var(--font-display); font-size: 28px; font-weight: 300; color: var(--text-primary); }
.streak-label { font-size: 14px; color: var(--text-secondary); }

.post-session__mood-q { font-size: 16px; font-weight: 500; color: var(--text-primary); margin-bottom: 16px; }
.mood-options { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.mood-btn {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 12px 16px; border-radius: var(--radius); border: 1.5px solid var(--border-subtle);
  background: var(--bg-surface); cursor: pointer; font-size: 13px; font-weight: 500; color: var(--text-secondary);
  transition: all var(--duration-fast) var(--ease-smooth);
}
.mood-btn > span:first-child { font-size: 24px; }
.mood-btn:hover { border-color: var(--sky-300); background: var(--sky-50); transform: translateY(-2px); }

.post-session__suggestions-title { font-size: 14px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 500; margin-bottom: 16px; }
.suggestions-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }
.suggestion-card {
  display: flex; align-items: center; gap: 14px;
  padding: 14px; border-radius: var(--radius);
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  cursor: pointer; text-align: left;
  transition: all var(--duration-fast); 
}
.suggestion-card:hover { border-color: var(--sky-200); transform: translateX(4px); }
.suggestion-card__img { width: 48px; height: 48px; border-radius: var(--radius-sm); flex-shrink: 0; }
.suggestion-card__title { font-size: 15px; font-weight: 600; color: var(--text-primary); }
.suggestion-card__meta  { font-size: 13px; color: var(--text-muted); }

.back-btn {
  display: inline-flex; align-items: center; padding: 12px 32px;
  border-radius: 100px; border: 1.5px solid var(--border-default);
  background: var(--bg-surface); color: var(--sky-600);
  font-family: var(--font-body); font-size: 15px; font-weight: 500;
  text-decoration: none; transition: all var(--duration-normal);
}
.back-btn:hover { background: var(--sky-50); border-color: var(--sky-300); }
</style>
