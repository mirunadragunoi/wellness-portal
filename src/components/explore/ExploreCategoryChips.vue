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
  display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;
}
</style>
