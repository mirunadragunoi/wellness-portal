<template>
  <div class="listen-view">
    <div class="listen-wrap">
      <h1>{{ t('listen.title') }}</h1>
      <p>{{ t('listen.subtitle') }}</p>
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
.listen-view { min-height: var(--app-min-height); background: var(--forest-900); }
.listen-wrap { max-width: 1280px; margin: 0 auto; padding: calc(var(--navbar-height) + 28px) var(--container-pad) 100px; }
h1 { font-family: var(--font-display); font-size: clamp(24px, 3vw, 34px); letter-spacing: -1px; }
p { color: var(--text-secondary); margin-top: 6px; }
.listen-empty { margin-top: 28px; border: var(--border-glass); border-radius: 16px; background: var(--bg-glass); text-align: center; padding: 48px 20px; display: flex; flex-direction: column; gap: 10px; color: var(--text-secondary); }
</style>
