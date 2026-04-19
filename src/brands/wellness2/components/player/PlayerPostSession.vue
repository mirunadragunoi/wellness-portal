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
import { sessions } from '@/data/sessions'

const { t }          = useI18n()
const router         = useRouter()
const progressStore  = useProgressStore()
const moodStore      = useMoodStore()
const uiStore        = useUIStore()

const props = defineProps({ session: Object })

const suggestions = computed(() =>
  sessions
    .filter(s => s.id !== props.session?.id && s.category === props.session?.category)
    .slice(0, 3)
)

function checkMood(id) {
  moodStore.checkIn(id)
  uiStore.showToast(t('home.mood_saved'), 'success')
}
</script>

<style scoped>
.post-session {
  min-height: var(--app-min-height); display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  background: var(--parchment); padding: 34px var(--container-pad); text-align: center;
}
.post-session__check {
  width: 72px; height: 72px; border-radius: var(--radius);
  background: var(--sage-500); border: 3px solid var(--sage-400);
  display: flex; align-items: center; justify-content: center;
  color: white; animation: bounceIn 0.6s var(--ease-bounce);
  box-shadow: 4px 4px 0 var(--sage-700); margin-bottom: 14px;
}
.post-session__title { font-family: var(--font-display); font-size: 36px; font-weight: 300; color: var(--ink-900); margin-bottom: 8px; }
.post-session__body   { font-size: 16px; color: var(--text-secondary); max-width: 420px; line-height: 1.7; margin-bottom: 20px; }
.post-session__mood  { margin-bottom: 26px; }
.post-session__mood-q { font-size: 14px; color: var(--text-secondary); margin-bottom: 12px; font-weight: 600; }
.mood-options { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.mood-btn {
  display: flex; flex-direction: column; align-items: center; gap: 5px; min-width: 86px;
  padding: 10px 12px; border-radius: var(--radius-sm);
  background: #fff; border: 2px solid var(--ink-200);
  cursor: pointer; transition: all var(--duration-fast); color: var(--ink-700);
}
.mood-btn:hover { border-color: var(--sage-400); color: var(--sage-700); background: var(--sage-50); }
.post-session__streak {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 24px; border: 2px solid var(--sage-200);
  border-radius: var(--radius); margin-bottom: 20px;
  background: var(--sage-50);
}
.streak-fire { color: #f59e0b; }
.streak-value { font-family: var(--font-display); font-size: 24px; font-weight: 300; color: var(--ink-900); text-align: left; }
.streak-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; text-align: left; }

.post-session__suggestions {
  width: min(100%, 520px);
  text-align: left;
  margin-bottom: 18px;
}
.post-session__suggestions-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 10px; }
.suggestions-list { display: flex; flex-direction: column; gap: 8px; }
.suggestion-card {
  display: flex; align-items: center; gap: 10px;
  padding: 10px; border-radius: var(--radius);
  background: #fff; border: 1.5px solid var(--ink-100);
}
.suggestion-card__img {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-sm);
  background-size: cover;
  background-position: center;
}
.suggestion-card__title { font-size: 14px; font-weight: 600; color: var(--ink-900); }
.suggestion-card__meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

.back-btn {
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--sage-600);
  background: var(--sage-500);
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
}
@keyframes bounceIn { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
</style>
