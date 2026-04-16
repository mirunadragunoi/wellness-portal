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
.search-bar { position: relative; }
.search-bar__input {
  width: 100%; padding: 10px 16px 10px 42px;
  border: 2px solid var(--ink-200); border-radius: var(--radius-sm);
  background: var(--bg-surface);
  font-family: var(--font-body); font-size: 14px; color: var(--ink-900);
  outline: none; transition: border-color var(--duration-fast);
}
.search-bar__input:focus { border-color: var(--sage-500); background: white; }
.search-bar__input::placeholder { color: var(--ink-300); }
.search-bar__icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: var(--ink-300); pointer-events: none;
}
.search-bar__clear {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: var(--ink-200); border: none; border-radius: var(--radius-sm);
  width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--ink-600); transition: all var(--duration-fast);
}
.search-bar__clear:hover { background: var(--ink-900); color: var(--parchment); }
</style>
