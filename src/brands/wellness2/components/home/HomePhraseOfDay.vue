<template>
  <div class="phrase-card">
    <div class="phrase-card__quote">"</div>
    <p class="phrase-card__text">{{ phrase.text }}</p>
    <p class="phrase-card__author">— {{ phrase.author }}</p>
  </div>
</template>

<script setup>
import { getPhraseOfDay } from '@/data/phrases'
const phrase = getPhraseOfDay()
</script>

<style scoped>
.phrase-card {
  background: var(--bg-glass); backdrop-filter: blur(16px);
  border: var(--border-glass); border-radius: 18px; padding: 24px;
  position: relative; overflow: hidden; min-width: 0;
}
.phrase-card__quote {
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--lime-500); text-transform: uppercase; letter-spacing: 3px;
  margin-bottom: 10px;
}
.phrase-card__text {
  font-family: var(--font-display); font-size: 15px; font-weight: 600;
  color: var(--text-primary); line-height: 1.5; margin-bottom: 10px;
  font-style: italic;
}
.phrase-card__author { font-size: 12px; color: var(--text-muted); }
@media (max-width: 640px) {
  .phrase-card { padding: 18px 16px; }
}
</style>
