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
  background: var(--bg-surface); border: 2px solid var(--ink-200);
  border-radius: var(--radius-lg); padding: 20px; box-shadow: 3px 3px 0 var(--ink-100);
}
.categories__title { font-family: var(--font-display); font-size: 18px; font-weight: 400; color: var(--ink-900); margin-bottom: 14px; }
.categories__grid  { display: flex; flex-wrap: wrap; gap: 8px; }
.cat-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 14px; border-radius: var(--radius-sm);
  font-size: 13px; font-weight: 600; text-decoration: none;
  transition: all var(--duration-fast);
  border: 2px solid transparent;
}
.cat-btn:hover { transform: translate(-1px,-1px); box-shadow: 2px 2px 0 rgba(0,0,0,0.1); }
</style>
