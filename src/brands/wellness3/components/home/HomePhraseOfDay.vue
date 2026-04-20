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
  background: linear-gradient(135deg, var(--sky-600), var(--sky-700));
  border-radius: var(--radius-lg); padding: 32px;
  position: relative; overflow: hidden;
  min-width: 0;
}
.phrase-card::before {
  content: '';
  position: absolute; top: -30px; right: -30px;
  width: 150px; height: 150px; border-radius: 50%;
  background: rgba(255,255,255,0.06);
}
.phrase-card__quote {
  font-family: var(--font-display); font-size: 80px; font-weight: 300;
  color: rgba(255,255,255,0.3); line-height: 0.7; margin-bottom: 16px;
}
.phrase-card__text {
  font-family: var(--font-display); font-size: 20px; font-weight: 400;
  font-style: italic; color: white; line-height: 1.6; margin-bottom: 16px;
  position: relative; z-index: 1;
}
.phrase-card__author { font-size: 14px; color: rgba(255,255,255,0.7); position: relative; z-index: 1; }

@media (max-width: 640px) {
  .phrase-card {
    padding: 18px 16px;
  }
  .phrase-card__quote {
    font-size: 54px;
    margin-bottom: 8px;
  }
  .phrase-card__text {
    font-size: 17px;
    line-height: 1.45;
    margin-bottom: 10px;
  }
  .phrase-card__author {
    font-size: 13px;
  }
}
</style>
