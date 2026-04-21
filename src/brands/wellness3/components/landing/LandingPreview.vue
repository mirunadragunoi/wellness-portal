<template>
  <section class="preview section">
    <div class="container">
      <span class="section-label" style="color: var(--blue)">{{ t('preview.label') }}</span>
      <h2 class="section-title">
        {{ t('preview.title_1') }}
        <span class="grad-text">{{ t('preview.title_em') }}</span>
      </h2>
      <p class="section-subtitle">{{ t('preview.subtitle') }}</p>

      <div class="preview__grid">
        <div
          v-for="card in previewCards"
          :key="card.id"
          class="preview-card"
          @click="$router.push('/signup')"
        >
          <div class="preview-card__img" :style="{ backgroundImage: `${card.gradient}, url(${card.image})` }">
            <div class="preview-card__overlay" />
            <span class="preview-card__badge">{{ card.categoryLabel }}</span>
            <div class="preview-card__play-wrap">
              <button type="button" class="preview-card__play" aria-label="Play">
                <Icon icon="lucide:play" class="app-icon app-icon--sm" />
              </button>
            </div>
            <div class="preview-card__meta-bottom">{{ card.type }} · {{ Math.round(card.duration / 60) }} {{ t('explore.min') }}</div>
          </div>
          <div class="preview-card__body">
            <h4 class="preview-card__title">{{ card.title }}</h4>
          </div>
        </div>
      </div>

      <div class="preview__cta">
        <RouterLink to="/signup" class="cta-btn">
          See all sessions
          <Icon icon="lucide:chevron-right" class="app-icon app-icon--sm" aria-hidden="true" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'

const { t } = useI18n()
const { preview1, preview2, preview3, preview4 } = LANDING_IMAGES

const previewCards = [
  { id: 1, title: '5 Minutes for Calm',  type: 'Meditation',  categoryLabel: 'Stress',      duration: 300,  gradient: 'linear-gradient(145deg, rgba(49,46,129,0.65), rgba(45,212,191,0.25))', image: preview1 },
  { id: 2, title: 'Ocean Night Story',    type: 'Sleep Story', categoryLabel: 'Sleep',       duration: 1200, gradient: 'linear-gradient(145deg, rgba(30,27,75,0.72), rgba(167,139,250,0.22))', image: preview2 },
  { id: 3, title: 'Morning Gratitude',    type: 'Meditation',  categoryLabel: 'Mindfulness', duration: 600,  gradient: 'linear-gradient(145deg, rgba(6,78,59,0.68), rgba(52,211,153,0.22))', image: preview3 },
  { id: 4, title: 'Deep Focus Flow',      type: 'Meditation',  categoryLabel: 'Focus',       duration: 900,  gradient: 'linear-gradient(145deg, rgba(12,74,110,0.72), rgba(125,211,252,0.2))', image: preview4 },
]
</script>

<style scoped>
.preview {
  background: transparent;
}

.grad-text {
  background: linear-gradient(135deg, var(--blue), var(--violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.preview__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 48px;
}

.preview-card {
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius);
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 250ms var(--ease-smooth);
}
.preview-card:hover {
  transform: translateY(-5px) scale(1.01);
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(167, 139, 250, 0.35);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(167, 139, 250, 0.12);
}

.preview-card__img {
  height: 148px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.preview-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(7, 13, 26, 0.65), transparent 55%);
}

.preview-card__badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  padding: 3px 10px;
  border-radius: var(--r-full);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background: rgba(167, 139, 250, 0.18);
  color: #c4b5fd;
  border: 1px solid rgba(167, 139, 250, 0.30);
  backdrop-filter: blur(8px);
}

.preview-card__play-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 180ms;
}
.preview-card:hover .preview-card__play-wrap { opacity: 1; }

.preview-card__play {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  backdrop-filter: blur(8px);
  transition: background 160ms, transform 160ms;
}
.preview-card__play:hover {
  background: linear-gradient(135deg, var(--violet), var(--teal));
  transform: scale(1.08);
}

.preview-card__meta-bottom {
  position: absolute;
  bottom: 10px;
  left: 12px;
  right: 12px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 11px;
  font-weight: 600;
  z-index: 1;
}

.preview-card__body {
  padding: 13px 14px;
}
.preview-card__title {
  font-family: var(--font-d);
  font-size: 16px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.3;
  letter-spacing: 0.2px;
}

.preview__cta {
  text-align: center;
  margin-top: 40px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  border-radius: var(--r-full);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--violet);
  font-family: var(--font-b);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: all 200ms var(--ease-smooth);
  backdrop-filter: blur(12px);
}
.cta-btn:hover {
  background: rgba(167, 139, 250, 0.12);
  border-color: rgba(167, 139, 250, 0.35);
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .preview__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 520px) {
  .preview__grid { grid-template-columns: 1fr; }
}
</style>
