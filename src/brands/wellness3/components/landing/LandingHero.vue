<template>
  <section class="hero">
    <div class="hero__background" :style="{ backgroundImage: `url(${heroMain})` }" />
    <div class="hero__overlay" />

    <div class="hero__content container">
      <div class="hero__panel glass">
        <p class="hero__badge">
          <span class="hero__badge-dot" />
          {{ t('hero.badge') }}
        </p>

        <h1 class="hero__title">
          {{ t('hero.title_line1') }}
          <em>{{ t('hero.title_em') }}</em>
          {{ t('hero.title_line2') }}
        </h1>

        <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>

        <div class="hero__ctas">
          <RouterLink to="/signup" class="hero-btn hero-btn--primary">
            {{ t('hero.cta_primary') }}
          </RouterLink>
          <RouterLink to="/explore" class="hero-btn hero-btn--ghost">
            {{ t('hero.cta_secondary') }}
          </RouterLink>
        </div>

        <div class="hero__proof">
          <div class="hero__proof-avatars">
            <span v-for="(avatar, idx) in proofAvatars" :key="idx" class="hero__proof-avatar">
              <img :src="avatar" alt="" />
            </span>
          </div>
          <span class="hero__proof-text"><strong>12,000+</strong> calming journeys started</span>
        </div>
      </div>

      <div class="hero__visual glass">
        <MindCanvas :size="340" />
      </div>
    </div>

    <div class="hero-chip hero-chip--streak glass">
      <Icon icon="lucide:flame" class="app-icon app-icon--sm" />
      <span>21 day streak</span>
    </div>
    <div class="hero-chip hero-chip--mood glass">
      <Icon icon="lucide:smile" class="app-icon app-icon--sm" />
      <span>Feeling Bright</span>
    </div>
    <div class="hero-chip hero-chip--session glass">
      <Icon icon="lucide:play" class="app-icon app-icon--sm" />
      <span>5 min Calm Session</span>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
import MindCanvas from '@/components/landing/MindCanvas.vue'

const { t } = useI18n()
const { heroMain, heroProof1, heroProof2 } = LANDING_IMAGES

const proofAvatars = [heroProof1, heroProof2, heroMain, heroProof1, heroProof2]
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-top: 108px;
  padding-bottom: 48px;
  min-height: 86vh;
  isolation: isolate;
}

.hero__background,
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__background {
  background-size: cover;
  background-position: center;
  filter: saturate(1.1) contrast(1.05);
}

.hero__overlay {
  background:
    radial-gradient(900px 500px at 75% 25%, rgba(167, 139, 250, 0.22), transparent 70%),
    radial-gradient(700px 440px at 22% 70%, rgba(45, 212, 191, 0.18), transparent 75%),
    linear-gradient(120deg, rgba(7, 13, 26, 0.68), rgba(7, 13, 26, 0.54));
}

.hero__content {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(20px, 4vw, 44px);
  align-items: stretch;
  position: relative;
  z-index: 2;
}

.hero__panel {
  border-radius: var(--r-xl);
  padding: clamp(20px, 4.6vw, 38px);
  border-color: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 18px;
}
.hero__badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 16px rgba(45, 212, 191, 0.7);
}

.hero__title {
  font-family: var(--font-d);
  font-size: clamp(38px, 6vw, 74px);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: 0.01em;
  color: var(--text-primary);
  margin-bottom: 16px;
}
.hero__title em {
  display: block;
  font-style: italic;
  color: var(--violet);
  text-shadow: 0 0 26px rgba(167, 139, 250, 0.4);
}

.hero__subtitle {
  font-size: 16px;
  line-height: 1.75;
  color: var(--text-secondary);
  max-width: 560px;
  margin-bottom: 24px;
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 18px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 24px;
  border-radius: var(--r-full);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform var(--duration-fast) var(--ease), box-shadow var(--duration-fast) var(--ease), background var(--duration-fast) var(--ease);
}

.hero-btn--primary {
  color: #070d1a;
  background: linear-gradient(135deg, var(--violet), var(--teal));
  box-shadow: 0 8px 26px rgba(167, 139, 250, 0.35);
}

.hero-btn--ghost {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid var(--glass-border);
}

.hero-btn:hover {
  transform: translateY(-2px);
}

.hero__proof {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.hero__proof-avatars {
  display: flex;
}

.hero__proof-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(7, 13, 26, 0.9);
  overflow: hidden;
  margin-left: -7px;
}

.hero__proof-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero__proof-avatar:first-child {
  margin-left: 0;
}
.hero__proof-text {
  font-size: 12px;
  color: var(--text-secondary);
}

.hero__visual {
  display: grid;
  place-items: center;
  min-height: 460px;
  border-radius: var(--r-xl);
}

.hero-chip {
  position: absolute;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: var(--r-full);
  font-size: 12px;
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.24);
  white-space: nowrap;
}

.hero-chip--streak {
  top: 30%;
  left: calc(50% - 44px);
}
.hero-chip--mood {
  bottom: 18%;
  left: calc(50% - 48px);
}
.hero-chip--session {
  top: 34%;
  right: calc(8% + 10px);
}

@media (max-width: 960px) {
  .hero {
    min-height: auto;
    padding-top: 94px;
    padding-bottom: 34px;
  }
  .hero__content {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .hero__visual {
    min-height: 340px;
  }
  .hero-chip {
    display: none;
  }
}
@media (max-width: 640px) {
  .hero__panel {
    border-radius: var(--r-lg);
    padding: 16px;
  }
  .hero__title {
    font-size: clamp(34px, 12vw, 52px);
  }
  .hero__ctas {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-btn {
    width: 100%;
  }
  .hero__visual {
    min-height: 300px;
  }
}
</style>
