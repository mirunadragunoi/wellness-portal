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
  background: var(--ink-900); border: 2px solid var(--ink-700);
  border-radius: var(--radius-lg); padding: 28px;
  position: relative; overflow: hidden; min-width: 0;
  box-shadow: 4px 4px 0 var(--sage-700);
}
.phrase-card__quote {
  font-family: var(--font-display); font-size: 80px; font-weight: 300;
  color: rgba(255,255,255,0.12); line-height: 0.7; margin-bottom: 14px;
}
.phrase-card__text {
  font-family: var(--font-display); font-size: 18px; font-weight: 300;
  font-style: italic; color: var(--parchment); line-height: 1.65; margin-bottom: 14px;
}
.phrase-card__author { font-size: 13px; color: var(--ink-400); font-weight: 600; }
@media (max-width: 640px) {
  .phrase-card { padding: 18px 16px; }
  .phrase-card__text { font-size: 16px; }
}
</style>
