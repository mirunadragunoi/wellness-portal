<template>
  <section class="features section">
    <div class="container">
      <div class="features__header">
        <span class="section-label">{{ t('features.label') }}</span>
        <h2 class="section-title">{{ t('features.title_1') }} <em>{{ t('features.title_em') }}</em></h2>
      </div>

      <!-- Horizontal stacked cards — very different from original grid -->
      <div class="features__list">
        <div v-for="(card, idx) in cards" :key="card.key" class="feature-row">
          <div class="feature-row__num">0{{ idx+1 }}</div>
          <div class="feature-row__media" :style="{ backgroundImage: `url(${card.image})` }" />
          <div class="feature-row__body">
            <div class="feature-row__tag">
              <Icon :icon="card.icon" class="app-icon app-icon--md" />
              {{ t(card.titleKey) }}
            </div>
            <p class="feature-row__desc">{{ t(card.descKey) }}</p>
          </div>
          <div class="feature-row__arrow">
            <Icon icon="lucide:arrow-right" class="app-icon app-icon--lg" />
          </div>
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
  { key:'meditation', icon:FEATURE_CARD_ICONS.meditation, image:LANDING_IMAGES.featureMeditation, titleKey:'features.card1_title', descKey:'features.card1_desc' },
  { key:'breathing',  icon:FEATURE_CARD_ICONS.breathing,  image:LANDING_IMAGES.featureBreathing,  titleKey:'features.card2_title', descKey:'features.card2_desc' },
  { key:'tracking',   icon:FEATURE_CARD_ICONS.tracking,   image:LANDING_IMAGES.featureTracking,   titleKey:'features.card3_title', descKey:'features.card3_desc' },
  { key:'personal',   icon:FEATURE_CARD_ICONS.personal,   image:LANDING_IMAGES.featurePlan,       titleKey:'features.card4_title', descKey:'features.card4_desc' },
]
</script>

<style scoped>
.features { background:var(--bg-surface); }
.features__header { margin-bottom:48px; }
.features__list { display:flex; flex-direction:column; }

.feature-row {
  display:grid;
  grid-template-columns:56px 100px 1fr 48px;
  align-items:center; gap:28px;
  padding:24px 0;
  border-top:1px solid var(--ink-100);
  cursor:pointer;
  transition:background var(--duration-fast), padding var(--duration-fast);
}
.feature-row:last-child { border-bottom:1px solid var(--ink-100); }
.feature-row:hover { padding-left:12px; padding-right:8px; background:var(--parchment); border-radius:var(--radius); }

.feature-row__num {
  font-family:var(--font-display); font-size:32px; font-weight:300;
  color:var(--ink-200); line-height:1; user-select:none; flex-shrink:0;
}
.feature-row:hover .feature-row__num { color:var(--sage-300); }

.feature-row__media {
  width:100px; height:64px; border-radius:var(--radius);
  background-size:cover; background-position:center;
  flex-shrink:0; border:1px solid var(--ink-100);
}

.feature-row__body { min-width:0; }
.feature-row__tag {
  display:inline-flex; align-items:center; gap:8px;
  font-size:17px; font-weight:600; color:var(--ink-900); margin-bottom:6px;
}
.feature-row__tag .app-icon { color:var(--sage-500); }
.feature-row__desc { font-size:14px; color:var(--text-secondary); line-height:1.6; }

.feature-row__arrow { color:var(--ink-200); transition:all var(--duration-fast); flex-shrink:0; }
.feature-row:hover .feature-row__arrow { color:var(--sage-500); transform:translateX(4px); }

@media (max-width:640px) {
  .feature-row { grid-template-columns:1fr; gap:12px; }
  .feature-row__num { display:none; }
  .feature-row__media { width:100%; height:120px; }
  .feature-row__arrow { display:none; }
}
</style>
