<template>
  <section class="hero">
    <div class="hero__content container">
      <!-- Left: Text -->
      <div class="hero__text">
        <div class="hero__badge">
          <span class="hero__badge-star">✦</span>
          {{ t('hero.badge') }}
        </div>

        <h1 class="hero__title">
          {{ t('hero.title_line1') }}<br />
          <span class="hero__title-grad">{{ t('hero.title_em') }}</span><br />
          {{ t('hero.title_line2') }}
        </h1>

        <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>

        <div class="hero__ctas">
          <RouterLink to="/signup" class="hero-btn hero-btn--primary">
            {{ t('hero.cta_primary') }}
          </RouterLink>
          <RouterLink to="/login" class="hero-btn hero-btn--ghost">
            {{ t('hero.cta_secondary') }}
          </RouterLink>
        </div>

        <div class="hero__proof">
          <div class="hero__proof-avatars">
            <span
              v-for="(color, idx) in proofColors"
              :key="idx"
              class="hero__proof-avatar"
              :style="{ background: `radial-gradient(circle at 35% 35%, ${color}, ${color}88)`, boxShadow: `0 0 10px ${color}55` }"
            />
          </div>
          <span class="hero__proof-text">
            Trusted by <strong>12,000+</strong> members
          </span>
        </div>
      </div>

      <!-- Right: Canvas + Now Playing -->
      <div class="hero__visual">
        <div class="hero__canvas-wrap">
          <div class="hero__glow" />
          <MindCanvas :size="canvasSize" />
          <p class="hero__breathe-label">Breathe · Be · Still</p>
        </div>

        <div class="hero__now-playing pulse-glow">
          <div class="hero__now-playing-label">Now Playing</div>
          <div class="hero__now-playing-title">Morning Clarity</div>
          <div class="hero__progress-bar">
            <div class="hero__progress-fill" />
          </div>
        </div>
      </div>
    </div>

    <!-- Floating chips (desktop only) -->
    <div class="hero-chip hero-chip--streak glass hide-mobile">
      <Icon icon="lucide:flame" class="app-icon app-icon--sm" />
      <span>21 day streak</span>
    </div>
    <div class="hero-chip hero-chip--mood glass hide-mobile">
      <Icon icon="lucide:smile" class="app-icon app-icon--sm" />
      <span>Feeling Bright</span>
    </div>
    <div class="hero-chip hero-chip--session glass hide-mobile">
      <Icon icon="lucide:play" class="app-icon app-icon--sm" />
      <span>5 min Calm Session</span>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MindCanvas from '@/components/landing/MindCanvas.vue'

const { t } = useI18n()

const proofColors = ['#a78bfa', '#2dd4bf', '#f9a8d4', '#fbbf24']

const canvasSize = computed(() => {
  if (typeof window === 'undefined') return 370
  return window.innerWidth < 768 ? 270 : 370
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: clamp(80px, 10vh, 120px) 0 clamp(48px, 6vh, 80px);
}

.hero__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}

/* ── Text side ── */
.hero__text {
  animation: fadeUp 0.6s var(--ease) both;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  border-radius: var(--r-full);
  background: rgba(167, 139, 250, 0.1);
  border: 1px solid rgba(167, 139, 250, 0.25);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--violet);
  margin-bottom: 24px;
}

.hero__badge-star {
  font-size: 10px;
}

.hero__title {
  font-family: var(--font-d);
  font-weight: 400;
  line-height: 1.08;
  font-size: clamp(40px, 5.5vw, 72px);
  letter-spacing: 1px;
  color: var(--text);
  margin-bottom: 24px;
}

.hero__title-grad {
  background: linear-gradient(135deg, var(--violet), var(--teal));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  font-size: 18px;
  color: var(--muted);
  line-height: 1.8;
  max-width: 440px;
  margin-bottom: 36px;
}

.hero__ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: var(--r-full);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-decoration: none;
  transition: all 200ms var(--ease);
  white-space: nowrap;
}

.hero-btn--primary {
  background: linear-gradient(135deg, var(--violet), var(--teal));
  color: #070d1a;
  box-shadow: 0 0 20px rgba(167, 139, 250, 0.3);
}
.hero-btn--primary:hover {
  background: linear-gradient(135deg, #b8a5fc, #4de8d8);
  box-shadow: 0 0 40px rgba(167, 139, 250, 0.5), 0 0 60px rgba(45, 212, 191, 0.2);
  transform: translateY(-2px) scale(1.02);
}

.hero-btn--ghost {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
}
.hero-btn--ghost:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(167, 139, 250, 0.3);
}

/* Proof */
.hero__proof {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.hero__proof-avatars {
  display: flex;
}

.hero__proof-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--bg);
  margin-left: -8px;
  flex-shrink: 0;
}
.hero__proof-avatar:first-child {
  margin-left: 0;
}

.hero__proof-text {
  font-size: 13px;
  color: var(--muted);
}

/* ── Visual side ── */
.hero__visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  animation: fadeUp 0.6s var(--ease) 0.15s both;
}

.hero__canvas-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero__glow {
  position: absolute;
  width: clamp(260px, 50%, 360px);
  height: clamp(260px, 50%, 360px);
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(167, 139, 250, 0.14) 0%,
    rgba(45, 212, 191, 0.07) 50%,
    transparent 70%
  );
  filter: blur(24px);
  pointer-events: none;
}

.hero__breathe-label {
  margin-top: -8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(167, 139, 250, 0.5);
  white-space: nowrap;
}

/* Now Playing card */
.hero__now-playing {
  width: 100%;
  max-width: 300px;
  background: rgba(7, 13, 26, 0.85);
  border: 1px solid rgba(167, 139, 250, 0.2);
  border-radius: var(--r);
  padding: 14px 18px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.hero__now-playing-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--violet);
  margin-bottom: 8px;
}

.hero__now-playing-title {
  font-family: var(--font-d);
  font-size: 15px;
  font-weight: 400;
  color: var(--text);
  margin-bottom: 8px;
}

.hero__progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--r-full);
  overflow: hidden;
}

.hero__progress-fill {
  height: 100%;
  width: 43%;
  background: linear-gradient(90deg, var(--violet), var(--teal));
  border-radius: var(--r-full);
}

/* ── Floating chips ── */
.hero-chip {
  position: absolute;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: var(--r-full);
  font-size: 12px;
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.24);
  white-space: nowrap;
}
.hero-chip--streak { top: 30%; left: calc(50% - 44px); }
.hero-chip--mood   { bottom: 18%; left: calc(50% - 48px); }
.hero-chip--session { top: 34%; right: calc(8% + 10px); }

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding: 80px 0 48px;
  }
  .hero__content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero__subtitle { font-size: 16px; }
}

@media (max-width: 640px) {
  .hero__ctas {
    flex-direction: column;
  }
  .hero-btn { width: 100%; }
  .hero__subtitle { font-size: 15px; }
  .hero__now-playing { max-width: 260px; }
}
</style>
