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
  width: 100%; padding: 14px 20px 14px 46px;
  border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
  background: rgba(255,255,255,0.04);
  font-family: var(--font-body); font-size: 15px; color: var(--text-primary);
  outline: none; transition: all 200ms;
}
.search-bar__input:focus {
  border-color: rgba(184,245,102,0.35); background: rgba(255,255,255,0.06);
  box-shadow: 0 0 0 3px rgba(184,245,102,0.08);
}
.search-bar__input::placeholder { color: var(--text-muted); }
.search-bar__icon {
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  color: var(--text-muted); pointer-events: none;
}
.search-bar__clear {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: rgba(184,245,102,0.1); border: 1px solid rgba(184,245,102,0.2);
  border-radius: 6px; width: 22px; height: 22px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--lime-400); transition: all 150ms;
}
.search-bar__clear:hover { background: rgba(184,245,102,0.18); }
</style>
