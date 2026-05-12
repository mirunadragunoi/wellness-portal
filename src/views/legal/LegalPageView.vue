<template>
  <main class="legal-page">
    <section class="legal-hero">
      <RouterLink to="/" class="legal-back">{{ t('legal.back_home') }}</RouterLink>
      <p class="legal-eyebrow">{{ t('legal.eyebrow') }}</p>
      <h1>{{ title }}</h1>
      <p class="legal-summary">{{ summary }}</p>
    </section>

    <section class="legal-card">
      <p>{{ t('legal.placeholder') }}</p>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

const pageKey = computed(() => route.meta.legalKey || 'about')
const title = computed(() => t(`legal.pages.${pageKey.value}.title`))
const summary = computed(() => t(`legal.pages.${pageKey.value}.summary`))
</script>

<style scoped>
.legal-page {
  width: min(900px, calc(100% - 32px));
  margin: 0 auto;
  padding: 72px 0 96px;
}

.legal-hero {
  margin-bottom: 28px;
}

.legal-back {
  display: inline-flex;
  margin-bottom: 28px;
  color: var(--text-secondary);
  font-size: 14px;
  text-decoration: none;
}

.legal-back:hover {
  color: var(--text-primary);
}

.legal-eyebrow {
  margin: 0 0 12px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.legal-hero h1 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(36px, 7vw, 64px);
  line-height: 1.05;
}

.legal-summary {
  max-width: 720px;
  margin: 20px 0 0;
  color: var(--text-secondary);
  font-size: 18px;
  line-height: 1.7;
}

.legal-card {
  padding: 32px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  background: var(--bg-surface);
  color: var(--text-secondary);
  line-height: 1.8;
}

.legal-card p {
  margin: 0;
}

@media (max-width: 640px) {
  .legal-page {
    padding: 48px 0 72px;
  }

  .legal-card {
    padding: 24px;
  }
}
</style>
