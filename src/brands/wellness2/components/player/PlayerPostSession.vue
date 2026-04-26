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
  background: var(--forest-900); padding: 48px var(--container-pad); text-align: center;
}
.post-session__check {
  width: 80px; height: 80px; border-radius: 50%;
  background: rgba(184,245,102,0.12); border: 2px solid rgba(184,245,102,0.4);
  display: flex; align-items: center; justify-content: center;
  color: var(--lime-400); animation: bounceIn 0.6s var(--ease-bounce);
  box-shadow: 0 0 40px rgba(184,245,102,0.2); margin-bottom: 16px;
}
.post-session__title { font-family: var(--font-display); font-size: clamp(28px,4vw,44px); font-weight: 800; letter-spacing: -2px; color: var(--text-primary); margin-bottom: 8px; }
.post-session__body   { font-size: 15px; color: var(--text-secondary); max-width: 420px; line-height: 1.7; margin-bottom: 36px; }
.post-session__mood  { margin-bottom: 32px; }
.post-session__mood-q { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }
.mood-options { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.mood-btn {
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  padding: 12px 16px; border-radius: 14px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  cursor: pointer; transition: all 200ms; font-size: 22px;
}
.mood-btn:hover { background: rgba(184,245,102,0.08); border-color: rgba(184,245,102,0.2); transform: translateY(-2px); }
.post-session__streak {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 24px; border: 1px solid rgba(184,245,102,0.15);
  border-radius: var(--radius); margin-bottom: 28px;
  background: rgba(13,31,18,0.6); backdrop-filter: blur(16px);
}
.streak-fire { color: var(--amber-400); }
.streak-value { font-family: var(--font-display); font-size: 24px; font-weight: 800; color: var(--lime-500); text-align: left; letter-spacing: -1px; }
.streak-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; text-align: left; font-weight: 600; }

.post-session__suggestions { width: min(100%, 520px); text-align: left; margin-bottom: 28px; }
.post-session__suggestions-title {
  font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px;
  color: var(--lime-500); margin-bottom: 14px;
}
.suggestions-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.suggestion-card {
  padding: 14px 16px; border-radius: 14px; cursor: pointer;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  transition: all 200ms;
}
.suggestion-card:hover { border-color: rgba(184,245,102,0.18); background: rgba(184,245,102,0.05); }
.suggestion-card__img { display: none; }
.suggestion-card__title { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; }
.suggestion-card__meta { font-size: 11px; color: var(--text-muted); }

.back-btn {
  display: inline-flex; align-items: center;
  padding: 13px 30px; border-radius: 999px;
  background: var(--lime-500); color: var(--forest-900);
  text-decoration: none; font-size: 15px; font-weight: 700;
  transition: all 220ms;
}
.back-btn:hover { background: var(--lime-400); box-shadow: 0 0 40px rgba(184,245,102,0.35); }
@keyframes bounceIn { 0%{transform:scale(0.3);opacity:0} 60%{transform:scale(1.1)} 80%{transform:scale(0.95)} 100%{transform:scale(1);opacity:1} }
</style>
