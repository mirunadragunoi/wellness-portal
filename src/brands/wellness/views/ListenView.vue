<template>
  <div class="listen-view">
    <div class="container">
      <h1 class="listen-view__title">{{ t('listen.title') }}</h1>
      <p class="listen-view__subtitle">{{ t('listen.subtitle') }}</p>

      <div class="listen-view__placeholder">
        <Icon icon="lucide:radio" class="app-icon app-icon--2xl app-icon--muted" />
        <p>{{ t('listen.coming_soon') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.listen-view { padding: 40px 0 var(--page-pad-bottom-auth); min-height: var(--app-min-height); }
.listen-view__title { font-family: var(--font-display); font-size: clamp(32px, 4vw, 48px); font-weight: 300; }
.listen-view__subtitle { color: var(--text-secondary); margin-top: 6px; }
.listen-view__placeholder { margin-top: 40px; border: 1px dashed var(--border-default); border-radius: var(--radius-lg); padding: 48px 20px; text-align: center; color: var(--text-secondary); display: flex; flex-direction: column; align-items: center; gap: 12px; }
</style>
