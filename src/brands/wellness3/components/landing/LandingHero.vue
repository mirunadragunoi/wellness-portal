<template>
  <section class="hero" :style="{ backgroundImage: `linear-gradient(118deg, rgba(7,13,26,0.72), rgba(7,13,26,0.42)), url(${heroMain})` }">
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
          <RouterLink v-if="authStore.isLoggedIn" to="/home" class="hero-btn hero-btn--primary">
            Go to Dashboard
          </RouterLink>
          <template v-else>
            <RouterLink to="/signup" class="hero-btn hero-btn--primary">
              {{ t('hero.cta_primary') }}
            </RouterLink>
            <RouterLink to="/login" class="hero-btn hero-btn--ghost">
              {{ t('hero.cta_secondary') }}
            </RouterLink>
          </template>
        </div>

        <div class="hero__proof">
          <div class="hero__proof-avatars">
            <span
              v-for="(avatar, idx) in proofAvatars"
              :key="idx"
              class="hero__proof-avatar"
            >
              <img :src="avatar" alt="" />
            </span>
          </div>
          <span class="hero__proof-text">
            Trusted by <strong>12,000+</strong> members
          </span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { LANDING_IMAGES } from '@/constants/landingImages'

const { t } = useI18n()
const authStore = useAuthStore()

const { heroMain, heroProof1, heroProof2, heroProof3, heroProof4 } = LANDING_IMAGES
const proofAvatars = [heroProof1, heroProof2, heroProof3, heroProof4]
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: clamp(80px, 10vh, 120px) 0 clamp(48px, 6vh, 80px);
  background-size: cover;
  background-position: center;
}

.hero__content {
  width: 100%;
}

.hero__text {
  max-width: 700px;
}

/* ── Text side ── */
.hero__text { animation: fadeUp 0.6s var(--ease) both; }

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
  overflow: hidden;
}
.hero__proof-avatar:first-child {
  margin-left: 0;
}
.hero__proof-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__proof-text {
  font-size: 13px;
  color: var(--muted);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding: 80px 0 48px;
    background-position: 72% center;
  }
  .hero__subtitle { font-size: 16px; }
}

@media (max-width: 640px) {
  .hero__ctas {
    flex-direction: column;
  }
  .hero-btn { width: 100%; }
  .hero__subtitle { font-size: 15px; }
}
</style>
