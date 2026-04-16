<template>
  <div class="category-chips no-scrollbar">
    <BaseChip
      :active="modelValue === 'all'"
      @click="emit('update:modelValue', 'all')"
    >
      {{ t('explore.all') }}
    </BaseChip>
    <BaseChip
      v-for="cat in categories"
      :key="cat.id"
      :active="modelValue === cat.id"
      :icon="cat.icon"
      :color="cat.color"
      @click="emit('update:modelValue', cat.id)"
    >
      {{ cat.label }}
    </BaseChip>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { categories } from '@/data/phrases'
import BaseChip from '@/components/base/BaseChip.vue'
const { t } = useI18n()
defineProps({ modelValue: { type: String, default: 'all' } })
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.category-chips {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  padding: 12px var(--container-pad);
  border-bottom: 2px solid var(--ink-200);
  background: var(--bg-surface);
}

@media (max-width: 640px) {
  .category-chips {
    gap: 8px;
    padding: 10px 16px;
  }
}
</style>
