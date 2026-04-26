<template>
  <div class="categories">
    <h2 class="categories__title">{{ t('home.categories_title') }}</h2>
    <div class="categories__grid">
      <RouterLink
        v-for="cat in userCategories" :key="cat.id"
        :to="{ name: 'explore', query: { category: cat.id } }"
        class="cat-btn"
        :style="{ background: cat.bg, color: cat.color }"
      >
        <Icon :icon="cat.icon" class="cat-btn__icon app-icon app-icon--sm" />
        <span class="cat-btn__label">{{ cat.label }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { categories } from '@/data/phrases'

const { t } = useI18n()
const userStore = useUserStore()
const userCategories = computed(() => {
  const ids = userStore.categories.map(c => c.id)
  if (!ids.length) return categories
  return categories.filter(c => ids.includes(c.id))
})
</script>

<style scoped>
.categories {
  background: var(--bg-glass); backdrop-filter: blur(16px);
  border: var(--border-glass); border-radius: 18px; padding: 20px;
}
.categories__title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 14px; }
.categories__grid  { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
.cat-btn {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 14px 8px; border-radius: 14px; text-align: center;
  font-size: 11px; font-weight: 600; text-decoration: none;
  color: var(--text-secondary);
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  transition: all 200ms var(--ease-smooth);
}
.cat-btn:hover { background: rgba(184,245,102,0.07); border-color: rgba(184,245,102,0.18); color: var(--lime-400); transform: translateY(-2px); }
</style>
