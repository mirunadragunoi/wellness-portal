<template>
  <section class="hero">
    <!-- Blobs clipped here only so .hero never becomes its own scroll container
         (overflow-x:hidden on the section forces overflow-y:auto in many browsers). -->
    <div class="hero__blobs" aria-hidden="true">
      <div class="hero__blob hero__blob--1" />
      <div class="hero__blob hero__blob--2" />
    </div>

    <div class="hero__content container">
      <!-- Text side -->
      <div class="hero__text">
        <div class="hero__badge anim-fade-up">
          <span class="hero__badge-dot" />
          {{ t('hero.badge') }}
        </div>

        <h1 class="hero__title anim-fade-up-1">
          {{ t('hero.title_line1') }}
          <em>{{ t('hero.title_em') }}</em>
          {{ t('hero.title_line2') }}
        </h1>

        <p class="hero__subtitle anim-fade-up-2">{{ t('hero.subtitle') }}</p>

        <div class="hero__ctas anim-fade-up-3">
          <RouterLink to="/signup" class="btn btn--primary btn--lg">
            {{ t('hero.cta_primary') }}
          </RouterLink>
          <RouterLink to="/explore" class="btn btn--secondary btn--lg">
            {{ t('hero.cta_secondary') }}
          </RouterLink>
        </div>

        <!-- Social proof mini -->
        <div class="hero__proof anim-fade-up-4">
          <div class="hero__proof-avatars">
            <span
              v-for="(ic, idx) in proofIcons"
              :key="idx"
              class="hero__proof-avatar"
            >
              <Icon :icon="ic" class="app-icon app-icon--sm" />
            </span>
          </div>
          <span class="hero__proof-text">Joined by <strong>12,000+</strong> people finding their calm</span>
        </div>
      </div>

      <!-- Visual side -->
      <div class="hero__visual anim-fade-up-2">
        <div class="hero__orb-wrapper">
          <div class="hero__orb-ring hero__orb-ring--1" />
          <div class="hero__orb-ring hero__orb-ring--2" />
          <div class="hero__orb">
            <span class="hero__orb-text">Breathe...</span>
            <span class="hero__orb-hint">Inhale · Hold · Exhale</span>
          </div>
        </div>

        <!-- Floating cards -->
        <div class="hero__card hero__card--streak">
          <Icon icon="lucide:flame" class="hero__card-icon app-icon app-icon--sm" />
          <strong>21 day streak</strong>
        </div>
        <div class="hero__card hero__card--mood">
          <Icon icon="lucide:smile" class="hero__card-icon app-icon app-icon--sm" />
          <span>Feeling <strong>Bright</strong></span>
        </div>
        <div class="hero__card hero__card--session">
          <Icon icon="lucide:play" class="hero__card-icon app-icon app-icon--sm" />
          5 min Calm Session
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const proofIcons = [
  'lucide:user-round',
  'lucide:heart',
  'lucide:leaf',
  'lucide:sparkles',
  'lucide:feather'
]
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  /* Top padding clears fixed public navbar; no full-viewport min-height — one page scroll only */
  padding: clamp(88px, 12vh, 120px) 0 clamp(48px, 8vh, 80px);
  position: relative;
  overflow: visible;
}

.hero__blobs {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.hero__blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hero__blob--1 {
  top: -20%; right: -15%;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(186,230,253,0.5) 0%, rgba(224,242,254,0.2) 50%, transparent 70%);
  animation: float-slow 20s ease-in-out infinite;
}
.hero__blob--2 {
  bottom: -20%; left: -10%;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(167,196,160,0.25) 0%, transparent 60%);
  animation: float-slow 25s ease-in-out infinite reverse;
}

.hero__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Text */
.hero__badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px 6px 8px;
  background: white; border-radius: 100px;
  font-size: 13px; color: var(--text-secondary);
  margin-bottom: 28px;
  border: 1px solid var(--sky-200);
  box-shadow: var(--shadow-sm);
}
.hero__badge-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--sage);
  animation: pulse-dot 2s ease infinite;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(44px, 5.5vw, 68px);
  font-weight: 300;
  line-height: 1.08;
  color: var(--text-primary);
  margin-bottom: 24px;
  letter-spacing: -1.5px;
}
.hero__title em { font-style: italic; color: var(--sky-600); font-weight: 400; }

.hero__subtitle {
  font-size: 18px; line-height: 1.75;
  color: var(--text-secondary);
  margin-bottom: 36px;
  max-width: 480px;
}

.hero__ctas { display: flex; gap: 16px; align-items: center; margin-bottom: 32px; }

.btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 8px; border-radius: 100px;
  font-family: var(--font-body); font-weight: 500;
  text-decoration: none; cursor: pointer; border: none;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.btn--primary {
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white; box-shadow: 0 4px 16px rgba(14,165,233,0.3);
}
.btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.4); }
.btn--secondary {
  background: white; color: var(--sky-600);
  border: 1.5px solid var(--sky-200);
}
.btn--secondary:hover { background: var(--sky-50); border-color: var(--sky-300); }
.btn--lg { padding: 16px 40px; font-size: 17px; }

.hero__proof { display: flex; align-items: center; gap: 12px; }
.hero__proof-avatars { display: flex; }
.hero__proof-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--sky-100);
  border: 2px solid white;
  display: flex; align-items: center; justify-content: center;
  color: var(--sky-700);
  margin-left: -8px;
}
.hero__proof-avatar:first-child { margin-left: 0; }
.hero__proof-text { font-size: 13px; color: var(--text-secondary); }
.hero__proof-text strong { color: var(--text-primary); }

/* Visual */
.hero__visual {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  height: 460px;
}

.hero__orb-wrapper { position: relative; display: flex; align-items: center; justify-content: center; }

.hero__orb-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(14, 165, 233, 0.15);
}
.hero__orb-ring--1 { width: 360px; height: 360px; animation: breathe 8s ease-in-out infinite; }
.hero__orb-ring--2 { width: 420px; height: 420px; animation: breathe 8s ease-in-out infinite 1s; opacity: 0.5; }

.hero__orb {
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%,
    rgba(186,230,253,0.85) 0%,
    rgba(125,211,252,0.5) 40%,
    rgba(14,165,233,0.15) 70%,
    transparent 100%
  );
  animation: breathe 8s ease-in-out infinite;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px;
  position: relative;
}
.hero__orb::before {
  content: '';
  position: absolute; inset: 20px;
  border-radius: 50%;
  background: radial-gradient(circle at 45% 45%,
    rgba(255,255,255,0.9) 0%,
    rgba(224,242,254,0.7) 50%,
    rgba(186,230,253,0.3) 100%
  );
  animation: breathe 8s ease-in-out infinite 0.5s;
}
.hero__orb-text {
  position: relative; z-index: 2;
  font-family: var(--font-display); font-size: 22px;
  font-style: italic; color: var(--sky-700); opacity: 0.9;
}
.hero__orb-hint {
  position: relative; z-index: 2;
  font-size: 13px; color: var(--slate-400); letter-spacing: 0.5px;
}

/* Floating cards */
.hero__card {
  position: absolute;
  background: white;
  border: 1px solid var(--sky-100);
  border-radius: var(--radius);
  padding: 12px 18px;
  font-size: 13px; font-weight: 500;
  color: var(--text-primary);
  box-shadow: var(--shadow-md);
  display: flex; align-items: center; gap: 8px;
  white-space: nowrap;
  animation: float-slow 6s ease-in-out infinite;
}
.hero__card-icon { flex-shrink: 0; color: var(--sky-600); }
.hero__card--streak { top: 10%;  left: -5%;  animation-delay: 0s; }
.hero__card--mood   { bottom: 20%; left: -8%; animation-delay: 2s; }
.hero__card--session { top: 15%; right: -5%; animation-delay: 4s; font-size: 12px; }

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.14); }
}

@media (max-width: 960px) {
  .hero__content { grid-template-columns: 1fr; gap: 48px; }
  .hero__visual { height: 320px; }
  .hero__orb { width: 220px; height: 220px; }
  .hero__orb-ring--1 { width: 270px; height: 270px; }
  .hero__orb-ring--2 { width: 320px; height: 320px; }
  .hero__card { display: none; }
}
@media (max-width: 640px) {
  .hero { padding: 100px 0 60px; }
  .hero__ctas { flex-direction: column; align-items: stretch; }
  .btn--lg { padding: 14px 28px; font-size: 16px; text-align: center; }
  .hero__visual { height: 260px; }
  .hero__orb { width: 180px; height: 180px; }
  .hero__orb-ring--1 { width: 220px; height: 220px; }
  .hero__orb-ring--2 { width: 260px; height: 260px; }
}
</style>
