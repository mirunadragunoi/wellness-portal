<template>
  <section class="preview section">
    <div class="container">
      <span class="section-label">{{ t('preview.label') }}</span>
      <h2 class="section-title">{{ t('preview.title_1') }} <em>{{ t('preview.title_em') }}</em></h2>
      <p class="section-subtitle">{{ t('preview.subtitle') }}</p>

      <div class="preview__grid">
        <div v-for="card in previewCards" :key="card.id" class="preview-card">
          <div class="preview-card__img" :style="{ background: card.gradient }">
            <span class="preview-card__badge" :class="`badge--${card.category}`">{{ card.categoryLabel }}</span>
            <button class="preview-card__play" @click="$router.push('/signup')">▶</button>
          </div>
          <div class="preview-card__body">
            <h4 class="preview-card__title">{{ card.title }}</h4>
            <div class="preview-card__meta">
              <span>{{ card.type }}</span>
              <span>·</span>
              <span>{{ Math.round(card.duration / 60) }} {{ t('explore.min') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="preview__cta">
        <RouterLink to="/signup" class="btn">See all sessions →</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const previewCards = [
  { id: 1, title: '5 Minutes for Calm',    type: 'Meditation',  category: 'stress',      categoryLabel: 'Stress',      duration: 300,  gradient: 'linear-gradient(135deg, #bae6fd, #93c5fd)' },
  { id: 2, title: 'Ocean Night Story',      type: 'Sleep Story', category: 'sleep',       categoryLabel: 'Sleep',       duration: 1200, gradient: 'linear-gradient(135deg, #c7d2fe, #a5b4fc)' },
  { id: 3, title: 'Morning Gratitude',      type: 'Meditation',  category: 'mindfulness', categoryLabel: 'Mindfulness', duration: 600,  gradient: 'linear-gradient(135deg, #d4e6d0, #a7c4a0)' },
  { id: 4, title: 'Deep Focus Flow',        type: 'Meditation',  category: 'focus',       categoryLabel: 'Focus',       duration: 900,  gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)' }
]
</script>

<style scoped>
.preview { background: var(--bg-base); }
.preview__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 48px;
}
.preview-card {
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: all var(--duration-normal) var(--ease-smooth);
  cursor: pointer;
}
.preview-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

.preview-card__img {
  width: 100%; height: 160px;
  position: relative;
  display: flex; align-items: center; justify-content: center;
}
.preview-card__badge {
  position: absolute; top: 12px; left: 12px;
  padding: 4px 10px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
  text-transform: uppercase;
}
.badge--stress      { background: #dbeafe; color: #1e40af; }
.badge--sleep       { background: #ede9fe; color: #5b21b6; }
.badge--mindfulness { background: #dcfce7; color: #166534; }
.badge--focus       { background: #fef9c3; color: #854d0e; }

.preview-card__play {
  width: 48px; height: 48px; border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none; cursor: pointer; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all var(--duration-fast) var(--ease-bounce);
  padding-left: 3px;
}
.preview-card:hover .preview-card__play { transform: scale(1.1); background: white; }

.preview-card__body { padding: 16px; }
.preview-card__title { font-family: var(--font-display); font-size: 18px; font-weight: 500; color: var(--text-primary); margin-bottom: 6px; }
.preview-card__meta { display: flex; gap: 6px; font-size: 13px; color: var(--text-muted); }

.preview__cta { text-align: center; margin-top: 40px; }
.btn {
  display: inline-flex; align-items: center; padding: 12px 28px;
  border-radius: 100px; background: var(--bg-surface);
  border: 1.5px solid var(--border-default); color: var(--sky-600);
  font-family: var(--font-body); font-size: 15px; font-weight: 500;
  text-decoration: none; transition: all var(--duration-normal);
}
.btn:hover { background: var(--sky-50); border-color: var(--sky-300); transform: translateY(-2px); }

@media (max-width: 900px) { .preview__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .preview__grid { grid-template-columns: 1fr; } }
</style>
