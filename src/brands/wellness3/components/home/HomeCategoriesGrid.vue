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
.categories__title { font-family: var(--font-display); font-size: 22px; font-weight: 500; color: var(--text-primary); margin-bottom: 16px; }
.categories__grid  { display: flex; flex-wrap: wrap; gap: 10px; }
.cat-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px; border-radius: 100px;
  font-size: 14px; font-weight: 600; text-decoration: none;
  transition: all var(--duration-normal) var(--ease-smooth);
  border: none; cursor: pointer;
}
.cat-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); filter: brightness(0.95); }
.cat-btn__icon { opacity: 0.95; }
</style>
