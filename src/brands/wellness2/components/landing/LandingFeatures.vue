<template>
  <section class="features-section" id="features">
    <div
      v-for="(card, idx) in cards"
      :key="card.key"
      class="feature-row reveal"
      :class="{ 'feature-row--reverse': idx % 2 !== 0 }"
    >
      <div class="feature-text">
        <span class="feat-num">0{{ idx + 1 }} / Feature</span>
        <div class="feat-title">{{ t(card.titleKey) }}</div>
        <div class="feat-desc">{{ t(card.descKey) }}</div>
        <span class="feat-tag">
          <Icon :icon="card.icon" class="app-icon app-icon--sm" />
          {{ card.tagText }}
        </span>
      </div>
      <div class="feature-visual">
        <img :src="card.image" :alt="card.key" loading="lazy" />
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
  { key: 'meditation', icon: FEATURE_CARD_ICONS.meditation, image: LANDING_IMAGES.featureMeditation, titleKey: 'features.card1_title', descKey: 'features.card1_desc', tagText: '50+ sessions' },
  { key: 'breathing',  icon: FEATURE_CARD_ICONS.breathing,  image: LANDING_IMAGES.featureBreathing,  titleKey: 'features.card2_title', descKey: 'features.card2_desc', tagText: 'Instant relief' },
  { key: 'tracking',   icon: FEATURE_CARD_ICONS.tracking,   image: LANDING_IMAGES.featureTracking,   titleKey: 'features.card3_title', descKey: 'features.card3_desc', tagText: 'Real insights' },
]
</script>

<style scoped>
.features-section {
  background: var(--forest-900);
  padding: 100px 0;
}
.feature-row {
  max-width: var(--container-max); margin: 0 auto;
  padding: 72px var(--container-pad);
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  border-bottom: 1px solid rgba(184,245,102,0.05);
}
.feature-row:last-child { border-bottom: none; }
.feature-row--reverse { direction: rtl; }
.feature-row--reverse > * { direction: ltr; }

.feat-num {
  font-family: var(--font-mono); font-size: 12px; color: var(--text-muted);
  letter-spacing: 2px; margin-bottom: 20px; display: block;
}
.feat-title {
  font-family: var(--font-display); font-size: clamp(28px, 3vw, 40px);
  font-weight: 800; letter-spacing: -1.5px; color: var(--text-primary);
  margin-bottom: 16px; line-height: 1.1;
}
.feat-desc {
  font-size: 16px; color: var(--text-secondary); line-height: 1.75; margin-bottom: 28px;
}
.feat-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 999px;
  background: rgba(184,245,102,0.08); border: 1px solid rgba(184,245,102,0.15);
  color: var(--lime-400); font-size: 13px; font-weight: 600;
}
.feature-visual {
  border-radius: 24px; overflow: hidden;
  aspect-ratio: 4/3; background: var(--forest-700);
  position: relative;
}
.feature-visual img {
  width: 100%; height: 100%; object-fit: cover;
  filter: brightness(0.85) saturate(1.3);
}
.feature-visual::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(160deg, transparent 50%, rgba(7,15,10,0.5));
}

@media (max-width: 1024px) {
  .feature-row { grid-template-columns: 1fr; gap: 36px; }
  .feature-row--reverse { direction: ltr; }
}
</style>
