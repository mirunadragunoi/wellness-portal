<template>
  <section class="features section">
    <div class="container">
      <div class="features__header">
        <span class="section-label">{{ t('features.label') }}</span>
        <h2 class="section-title">
          {{ t('features.title_1') }} <span class="grad-text">{{ t('features.title_em') }}</span>
        </h2>
        <p class="section-subtitle">{{ t('features.subtitle') }}</p>
      </div>

      <div class="features__grid">
        <div
          v-for="card in cards"
          :key="card.key"
          class="feature-card"
          :style="{ background: card.bg, border: `1px solid ${card.border}` }"
        >
          <div
            class="feature-card__media"
            :style="{ background: card.mediaBg }"
          >
            <span class="feature-card__emoji">{{ card.emoji }}</span>
          </div>
          <div class="feature-card__body">
            <div class="feature-card__heading">
              <span class="feature-card__emoji-sm">{{ card.emoji }}</span>
              <h3 class="feature-card__title">{{ t(card.titleKey) }}</h3>
            </div>
            <p class="feature-card__desc">{{ t(card.descKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const cards = [
  {
    key: 'meditation',
    emoji: '🧘',
    bg: 'rgba(167,139,250,.08)',
    border: 'rgba(167,139,250,.15)',
    mediaBg: 'linear-gradient(135deg, rgba(167,139,250,.3), rgba(7,13,26,.6))',
    titleKey: 'features.card1_title',
    descKey: 'features.card1_desc',
  },
  {
    key: 'breathing',
    emoji: '💨',
    bg: 'rgba(45,212,191,.08)',
    border: 'rgba(45,212,191,.15)',
    mediaBg: 'linear-gradient(135deg, rgba(45,212,191,.3), rgba(7,13,26,.6))',
    titleKey: 'features.card2_title',
    descKey: 'features.card2_desc',
  },
  {
    key: 'sleep',
    emoji: '🌙',
    bg: 'rgba(124,159,255,.08)',
    border: 'rgba(124,159,255,.15)',
    mediaBg: 'linear-gradient(135deg, rgba(124,159,255,.3), rgba(7,13,26,.6))',
    titleKey: 'features.card3_title',
    descKey: 'features.card3_desc',
  },
  {
    key: 'tracking',
    emoji: '✦',
    bg: 'rgba(251,191,36,.08)',
    border: 'rgba(251,191,36,.15)',
    mediaBg: 'linear-gradient(135deg, rgba(251,191,36,.3), rgba(7,13,26,.6))',
    titleKey: 'features.card4_title',
    descKey: 'features.card4_desc',
  },
]
</script>

<style scoped>
.features {
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.features__header {
  margin-bottom: 48px;
}

.grad-text {
  background: linear-gradient(135deg, var(--violet), var(--teal));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.feature-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  backdrop-filter: blur(12px);
  transition: transform 220ms var(--ease-smooth);
}
.feature-card:hover {
  transform: translateY(-4px);
}

.feature-card__media {
  height: 140px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-card__emoji {
  font-size: 44px;
  opacity: 0.3;
}

.feature-card__body {
  padding: 20px 22px;
}

.feature-card__heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.feature-card__emoji-sm {
  font-size: 24px;
}

.feature-card__title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: 0.3px;
}

.feature-card__desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 640px) {
  .features__grid {
    grid-template-columns: 1fr;
  }
}
</style>
