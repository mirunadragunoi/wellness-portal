<template>
  <div class="search-bar">
    <Icon icon="lucide:search" class="search-bar__icon app-icon app-icon--sm app-icon--muted" aria-hidden="true" />
    <input
      class="search-bar__input"
      :placeholder="t('explore.search_placeholder')"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      type="search"
      autocomplete="off"
    />
    <button v-if="modelValue" type="button" class="search-bar__clear" aria-label="Clear" @click="emit('update:modelValue', '')">
      <Icon icon="lucide:x" class="app-icon app-icon--xs" />
    </button>
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
.search-bar__icon { flex-shrink: 0; }
.search-bar__input {
  flex: 1; border: none; background: none; outline: none;
  font-family: var(--font-body); font-size: 15px; color: var(--text-primary);
}
.search-bar__input::placeholder { color: var(--text-muted); }
.search-bar__clear {
  background: none; border: none; cursor: pointer;
  color: var(--text-muted); width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; transition: all var(--duration-fast);
}
.search-bar__clear:hover { background: var(--bg-muted); color: var(--text-primary); }
</style>
