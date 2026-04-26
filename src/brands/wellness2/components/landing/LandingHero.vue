<template>
  <section class="hero">
    <HeroShader />

    <!-- Left: content -->
    <div class="hero__left">
      <div class="hero__kicker">
        <span class="hero__kicker-dot" />
        {{ t('hero.badge') }}
      </div>

      <h1 class="hero__title">
        {{ t('hero.title_line1') }}<br>
        <span class="hero__title-lime">{{ t('hero.title_em') }}</span><br>
        <span class="hero__title-stroke">{{ t('hero.title_line2') }}</span>
      </h1>

      <p class="hero__sub">{{ t('hero.subtitle') }}</p>

      <div class="hero__actions">
        <RouterLink to="/signup" class="hero__btn-primary">
          {{ t('hero.cta_primary') }}
          <Icon icon="lucide:arrow-right" class="app-icon app-icon--sm" />
        </RouterLink>
        <RouterLink to="/explore" class="hero__btn-ghost">
          {{ t('hero.cta_secondary') }}
        </RouterLink>
      </div>

      <!-- Social proof -->
      <div class="hero__proof">
        <div class="hero__proof-avatars">
          <span
            v-for="(av, i) in proofAvatars" :key="i"
            class="hero__proof-av"
          >
            <img :src="av" alt="" />
          </span>
        </div>
        <p class="hero__proof-text">
          <strong>12,000+</strong> {{ t('hero.proof_label', 'people finding calm') }}
        </p>
      </div>
    </div>

    <!-- Right: floating session cards -->
    <div class="hero__right">
      <div
        v-for="(card, i) in floatCards"
        :key="i"
        class="hero__float-card"
        :style="{ animationDelay: `${i * 1.5}s` }"
      >
        <div class="hfc-type">{{ card.type }}</div>
        <div class="hfc-title">{{ card.title }}</div>
        <div class="hfc-meta">
          <span>{{ card.category }}</span>
          <span>{{ card.duration }}</span>
        </div>
        <RouterLink to="/explore" class="hfc-play">
          <Icon icon="lucide:play" class="app-icon app-icon--xs" />
          {{ t('home.play', 'Play now') }}
        </RouterLink>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll-hint">
      <div class="hero__scroll-line" />
      <span class="hero__scroll-label">Scroll</span>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import HeroShader from './HeroShader.vue'

import proof1 from '@/brands/wellness2/assets/landing/hero-proof-1.png'
import proof2 from '@/brands/wellness2/assets/landing/hero-proof-2.png'

const { t } = useI18n()

const proofAvatars = [proof1, proof2, proof1, proof2]

const floatCards = [
  { type: 'Meditation', title: 'Morning Clarity',   category: 'Focus',  duration: '10 min' },
  { type: 'Sleep Story', title: 'Forest at Night',  category: 'Sleep',  duration: '25 min' },
  { type: 'Breathing',  title: 'Box 4-4-4-4',       category: 'Anxiety', duration: '5 min'  },
]
</script>

<style scoped>
/* ── Hero layout ── */
.hero {
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 400px;
  overflow: hidden;
}

/* ── Left panel ── */
.hero__left {
  position: relative; z-index: 2;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 120px clamp(24px,4vw,60px) 80px;
}
.hero__left > * { width: 100%; max-width: 560px; }

.hero__kicker {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: var(--radius-pill);
  background: rgba(184,245,102,0.07); border: 1px solid rgba(184,245,102,0.2);
  font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px;
  color: var(--lime-400); width: fit-content; margin-bottom: 32px;
  animation: fadeInUp 0.7s var(--ease-smooth) 0.1s both;
}
.hero__kicker-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--lime-500); flex-shrink: 0;
  animation: pulse-dot 2s ease infinite;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(48px,6.5vw,100px);
  font-weight: 800; line-height: 0.95; letter-spacing: -4px;
  color: var(--text-primary); margin-bottom: 28px;
  animation: fadeInUp 0.8s var(--ease-smooth) 0.2s both;
}
.hero__title-lime   { color: var(--lime-500); display: inline-block; }
.hero__title-stroke { -webkit-text-stroke: 2px rgba(184,245,102,0.55); color: transparent; }

.hero__sub {
  font-size: clamp(15px,1.8vw,18px); line-height: 1.75;
  color: var(--text-secondary); max-width: 440px; margin-bottom: 44px;
  animation: fadeInUp 0.8s var(--ease-smooth) 0.3s both;
}

.hero__actions {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  margin-bottom: 48px;
  animation: fadeInUp 0.8s var(--ease-smooth) 0.4s both;
}

.hero__btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 32px; border-radius: var(--radius-pill);
  background: var(--lime-500); color: var(--forest-900);
  font-size: 16px; font-weight: 700; text-decoration: none;
  transition: all 250ms var(--ease-smooth);
}
.hero__btn-primary:hover {
  background: var(--lime-400);
  box-shadow: 0 0 48px rgba(184,245,102,0.4);
  transform: translateY(-2px);
}

.hero__btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 24px; border-radius: var(--radius-pill);
  background: rgba(255,255,255,0.05); color: var(--text-primary);
  font-size: 16px; font-weight: 500; text-decoration: none;
  border: 1px solid rgba(255,255,255,0.12); backdrop-filter: blur(8px);
  transition: all 200ms;
}
.hero__btn-ghost:hover { background: rgba(255,255,255,0.09); }

/* Social proof */
.hero__proof {
  display: flex; align-items: center; gap: 12px;
  animation: fadeInUp 0.8s var(--ease-smooth) 0.5s both;
}
.hero__proof-avatars { display: flex; }
.hero__proof-av {
  width: 30px; height: 30px; border-radius: 50%;
  border: 2px solid var(--forest-900); overflow: hidden;
  margin-left: -7px; background: var(--forest-600);
}
.hero__proof-av:first-child { margin-left: 0; }
.hero__proof-av img { width: 100%; height: 100%; object-fit: cover; }
.hero__proof-text { font-size: 13px; color: var(--text-secondary); }
.hero__proof-text strong { color: var(--lime-400); }

/* ── Right: floating cards ── */
.hero__right {
  position: relative; z-index: 2;
  display: flex; flex-direction: column;
  justify-content: center; align-items: flex-end;
  padding: 120px 40px 80px 0; gap: 14px;
  animation: fadeInUp 1s var(--ease-smooth) 0.6s both;
}

.hero__float-card {
  width: 220px; padding: 16px 18px;
  background: rgba(13,31,18,0.75); backdrop-filter: blur(20px);
  border: 1px solid rgba(184,245,102,0.15); border-radius: 16px;
  box-shadow: 0 8px 32px rgba(2,10,4,0.5);
  animation: float 7s ease-in-out infinite;
}
.hero__float-card:nth-child(2) { transform: translateX(-20px); animation-duration: 9s; }
.hero__float-card:nth-child(3) { transform: translateX(-8px);  animation-duration: 6s; }

.hfc-type {
  font-size: 10px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 2px; color: var(--lime-500); margin-bottom: 6px;
}
.hfc-title {
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
  color: var(--text-primary); margin-bottom: 4px;
}
.hfc-meta {
  font-size: 11px; color: var(--text-muted);
  display: flex; justify-content: space-between; margin-bottom: 10px;
}
.hfc-play {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600; color: var(--lime-400);
  text-decoration: none; transition: gap 150ms;
}
.hfc-play:hover { gap: 8px; }

/* ── Scroll hint ── */
.hero__scroll-hint {
  position: absolute; bottom: 28px; left: clamp(24px,4vw,60px); z-index: 2;
  display: flex; align-items: center; gap: 10px;
  animation: fadeInUp 1s var(--ease-smooth) 1.4s both;
}
.hero__scroll-line {
  width: 48px; height: 1px;
  background: linear-gradient(to right, rgba(184,245,102,0.6), transparent);
}
.hero__scroll-label {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--text-muted);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; }
  .hero__right { display: none; }
  .hero__left { padding: 120px var(--container-pad) 80px; align-items: flex-start; }
}
@media (max-width: 600px) {
  .hero__title { font-size: clamp(42px,10vw,64px); letter-spacing: -3px; }
  .hero__actions { flex-direction: column; align-items: stretch; }
  .hero__btn-primary, .hero__btn-ghost { justify-content: center; }
}
</style>
