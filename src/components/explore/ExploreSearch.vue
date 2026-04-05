<template>
  <div class="search-bar">
    <span class="search-bar__icon">🔍</span>
    <input
      class="search-bar__input"
      :placeholder="t('explore.search_placeholder')"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      type="search"
      autocomplete="off"
    />
    <button v-if="modelValue" class="search-bar__clear" @click="emit('update:modelValue', '')">✕</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-bar {
  display: flex; align-items: center; gap: 12px;
  background: var(--bg-surface);
  border: 1.5px solid var(--border-subtle);
  border-radius: 100px; padding: 12px 20px;
  transition: border-color var(--duration-fast);
}
.search-bar:focus-within { border-color: var(--sky-400); box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
.search-bar__icon  { font-size: 16px; flex-shrink: 0; }
.search-bar__input {
  flex: 1; border: none; background: none; outline: none;
  font-family: var(--font-body); font-size: 15px; color: var(--text-primary);
}
.search-bar__input::placeholder { color: var(--text-muted); }
.search-bar__clear {
  background: none; border: none; cursor: pointer; font-size: 12px;
  color: var(--text-muted); width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; transition: all var(--duration-fast);
}
.search-bar__clear:hover { background: var(--bg-muted); color: var(--text-primary); }
</style>
