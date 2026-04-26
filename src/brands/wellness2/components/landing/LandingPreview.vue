<template>
  <section class="sessions-section" id="sessions">
    <div class="sessions-inner">
      <div class="sessions-header">
        <div>
          <span class="section-label reveal">{{ t('preview.label') }}</span>
          <h2 class="section-title reveal reveal-1">
            {{ t('preview.title_1') }} <span class="lime">{{ t('preview.title_em') }}</span>
          </h2>
        </div>
        <RouterLink to="/explore" class="sessions-link-all reveal">
          See all
          <Icon icon="lucide:arrow-right" class="app-icon app-icon--sm" />
        </RouterLink>
      </div>

      <div class="sessions-grid reveal">
        <!-- Featured card -->
        <div class="featured-card" @click="router.push('/explore')">
          <div class="feat-thumb" :style="{ backgroundImage: `url(${LANDING_IMAGES.preview1})` }">
            <div class="feat-thumb-overlay" />
            <div class="feat-type">Meditation</div>
            <button class="feat-play-btn" aria-label="Play">
              <Icon icon="lucide:play" class="app-icon app-icon--md" />
            </button>
          </div>
          <div class="feat-body">
            <div class="feat-body-title">Morning Clarity</div>
            <div class="feat-body-desc">Start your day grounded and focused with this gentle wake-up meditation designed for busy mornings.</div>
            <div class="feat-body-meta">
              <span class="chip chip-active">Focus</span>
              <span class="chip chip-default">10 min</span>
            </div>
          </div>
        </div>

        <!-- Sessions list -->
        <div class="sessions-list">
          <div
            v-for="s in sessionRows" :key="s.title"
            class="sess-row"
            @click="router.push('/explore')"
          >
            <div class="sess-row-thumb" :style="s.image ? { backgroundImage: `url(${s.image})` } : { background: s.gradient }" />
            <div>
              <div class="sess-row-title">{{ s.title }}</div>
              <div class="sess-row-cat">{{ s.type }}</div>
            </div>
            <div class="sess-row-dur">{{ s.duration }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { LANDING_IMAGES } from '@/constants/landingImages'
const { t } = useI18n()
const router = useRouter()
const sessionRows = [
  { title: 'Forest at Night',     type: 'Sleep Story',   duration: '25 min', image: LANDING_IMAGES.preview2 },
  { title: 'Box Breathing 4-4-4', type: 'Breathing',     duration: '5 min',  gradient: 'linear-gradient(135deg,var(--forest-600),var(--forest-400))' },
  { title: 'Rain on Leaves',      type: 'Soundscape',    duration: '∞',      gradient: 'linear-gradient(135deg,var(--forest-700),var(--forest-300))' },
  { title: 'Your Inner Strength', type: 'Motivational',  duration: '8 min',  gradient: 'linear-gradient(135deg,#1a3d21,#3d8b43)' },
]
</script>

<style scoped>
.sessions-section {
  background: var(--forest-950);
  padding: 100px 0;
}
.sessions-inner { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad); }
.sessions-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; }

.sessions-link-all {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14px; font-weight: 700; color: var(--lime-500);
  text-decoration: none; transition: gap 150ms;
}
.sessions-link-all:hover { gap: 10px; }

.sessions-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: start; }

/* Featured card */
.featured-card {
  background: var(--bg-glass); backdrop-filter: blur(20px);
  border: var(--border-glass); border-radius: 24px; overflow: hidden;
  cursor: pointer; transition: all 300ms var(--ease-smooth);
  box-shadow: var(--glow-card);
}
.featured-card:hover { border-color: rgba(184,245,102,0.28); box-shadow: var(--glow-card-hover); transform: translateY(-4px); }
.feat-thumb {
  height: 300px; background: linear-gradient(160deg, var(--forest-600), var(--forest-400));
  position: relative; overflow: hidden;
  background-size: cover; background-position: center;
}
.feat-thumb-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(7,15,10,0.8) 0%, transparent 50%); }
.feat-type {
  position: absolute; top: 16px; left: 16px;
  padding: 5px 14px; border-radius: 999px;
  background: rgba(7,15,10,0.7); backdrop-filter: blur(8px);
  font-size: 11px; font-weight: 700; color: var(--lime-400);
  letter-spacing: 1.5px; text-transform: uppercase;
  border: 1px solid rgba(184,245,102,0.2);
}
.feat-play-btn {
  position: absolute; bottom: 20px; right: 20px;
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--lime-500); display: flex; align-items: center; justify-content: center;
  color: var(--forest-900); box-shadow: 0 0 24px rgba(184,245,102,0.4);
  transition: all 200ms; border: none; cursor: pointer;
}
.feat-play-btn:hover { transform: scale(1.08); box-shadow: 0 0 40px rgba(184,245,102,0.6); }
.feat-body { padding: 24px 28px; }
.feat-body-title { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; letter-spacing: -0.5px; }
.feat-body-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 16px; }
.feat-body-meta { display: flex; gap: 10px; }

/* Sessions list */
.sessions-list { display: flex; flex-direction: column; gap: 12px; }
.sess-row {
  display: grid; grid-template-columns: 80px 1fr auto; gap: 14px; align-items: center;
  padding: 14px 16px; background: var(--bg-glass); backdrop-filter: blur(12px);
  border: var(--border-glass); border-radius: 16px; cursor: pointer;
  transition: all 250ms var(--ease-smooth);
}
.sess-row:hover { border-color: rgba(184,245,102,0.22); box-shadow: var(--glow-card-hover); transform: translateX(4px); }
.sess-row-thumb {
  width: 80px; height: 60px; border-radius: 10px; overflow: hidden;
  background: var(--forest-700); flex-shrink: 0;
  background-size: cover; background-position: center;
}
.sess-row-title { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.sess-row-cat { font-size: 11px; color: var(--lime-500); font-weight: 600; }
.sess-row-dur { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); flex-shrink: 0; }

.section-title { font-family: var(--font-display); font-size: clamp(36px,4vw,56px); font-weight: 800; letter-spacing: -2px; color: var(--text-primary); margin-bottom: 0; }
.lime { color: var(--lime-500); }

@media (max-width: 1024px) { .sessions-grid { grid-template-columns: 1fr; } }
</style>
