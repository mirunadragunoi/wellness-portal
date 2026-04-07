<template>
  <section class="features section">
    <div class="container">
      <div class="features__header">
        <span class="section-label">{{ t('features.label') }}</span>
        <h2 class="section-title">{{ t('features.title_1') }} <em>{{ t('features.title_em') }}</em></h2>
        <p class="section-subtitle">{{ t('features.subtitle') }}</p>
      </div>

      <div class="features__grid">
        <div v-for="card in cards" :key="card.key" class="feature-card">
          <div class="feature-card__media" :style="{ backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.08), rgba(15,23,42,0.28)), url(${card.image})` }" />
          <div class="feature-card__icon" :class="`feature-card__icon--${card.color}`">
            <Icon :icon="card.icon" class="app-icon app-icon--lg" />
          </div>
          <h3 class="feature-card__title">{{ t(card.titleKey) }}</h3>
          <p class="feature-card__desc">{{ t(card.descKey) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { FEATURE_CARD_ICONS } from '@/constants/appIcons'
import { LANDING_IMAGES } from '@/constants/landingImages'

const { t } = useI18n()

const cards = [
  { key: 'meditation', icon: FEATURE_CARD_ICONS.meditation, color: 'blue',   image: LANDING_IMAGES.featureMeditation, titleKey: 'features.card1_title', descKey: 'features.card1_desc' },
  { key: 'breathing',  icon: FEATURE_CARD_ICONS.breathing,  color: 'green',  image: LANDING_IMAGES.featureBreathing,  titleKey: 'features.card2_title', descKey: 'features.card2_desc' },
  { key: 'tracking',   icon: FEATURE_CARD_ICONS.tracking,   color: 'amber',  image: LANDING_IMAGES.featureTracking,   titleKey: 'features.card3_title', descKey: 'features.card3_desc' },
  { key: 'personal',   icon: FEATURE_CARD_ICONS.personal,   color: 'purple', image: LANDING_IMAGES.featurePlan,       titleKey: 'features.card4_title', descKey: 'features.card4_desc' }
]
</script>

<style scoped>
.features { background: var(--bg-base); }
.features__header { margin-bottom: 56px; }
.features__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.feature-card {
  padding: 0 28px 30px;
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: all var(--duration-normal) var(--ease-smooth);
  position: relative; overflow: hidden;
}
.feature-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--sky-300), var(--sky-500));
  opacity: 0; transition: opacity var(--duration-normal);
}
.feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--sky-200); }
.feature-card:hover::before { opacity: 1; }
.feature-card__media {
  height: 120px;
  margin: 0 -28px 18px;
  background-size: cover;
  background-position: center;
}

.feature-card__icon {
  width: 52px; height: 52px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
.feature-card__icon--blue   { background: var(--sky-100);    color: var(--sky-700); }
.feature-card__icon--green  { background: var(--sage-light); color: #3f6212; }
.feature-card__icon--amber  { background: var(--warm-100);  color: #92400e; }
.feature-card__icon--purple { background: var(--purple-soft); color: #5b21b6; }

.feature-card__title {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 500;
  color: var(--text-primary); margin-bottom: 10px;
}
.feature-card__desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

@media (max-width: 900px) { .features__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .features__grid { grid-template-columns: 1fr; } }
</style>
