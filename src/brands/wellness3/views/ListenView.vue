<template>
  <div class="listen-view">
    <div class="container">
      <h1 class="listen-title">{{ t('listen.title') }}</h1>
      <p class="listen-sub">{{ t('listen.subtitle') }}</p>
      <div class="listen-empty">
        <Icon icon="lucide:radio" class="app-icon app-icon--2xl app-icon--muted" />
        <span>{{ t('listen.coming_soon') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.listen-view { min-height: var(--app-min-height); padding: 34px 0 var(--page-pad-bottom-auth); }
.listen-title { font-family: var(--font-d); font-size: clamp(26px, 3.5vw, 38px); font-weight: 400; letter-spacing: 0.03em; }
.listen-sub { margin-top: 6px; color: var(--text-secondary); }
.listen-empty { margin-top: 22px; border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--r-lg); padding: 48px 20px; text-align: center; display: flex; flex-direction: column; gap: 10px; color: var(--text-secondary); align-items: center; }
</style>
