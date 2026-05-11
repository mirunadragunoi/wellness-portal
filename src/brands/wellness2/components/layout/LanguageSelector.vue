<template>
  <div v-if="availableLocales.length > 1" class="lang-selector" :class="{ 'lang-selector--open': open }">
    <button
      type="button"
      class="lang-selector__trigger"
      :aria-expanded="open"
      :aria-label="t('nav.language')"
      @click="toggle"
    >
      <Icon icon="lucide:globe" class="app-icon app-icon--sm" aria-hidden="true" />
      <span class="lang-selector__current">{{ currentLabel }}</span>
      <Icon icon="lucide:chevron-down" class="app-icon app-icon--xs lang-selector__chev" aria-hidden="true" />
    </button>

    <ul v-if="open" class="lang-selector__menu" role="listbox">
      <li v-for="loc in availableLocales" :key="loc.code">
        <button
          type="button"
          class="lang-selector__option"
          :class="{ 'lang-selector__option--active': loc.code === current }"
          role="option"
          :aria-selected="loc.code === current"
          @click="select(loc.code)"
        >
          <span>{{ loc.label }}</span>
          <Icon v-if="loc.code === current" icon="lucide:check" class="app-icon app-icon--xs" aria-hidden="true" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLocales, setLocale, LOCALE_LABELS } from '@/i18n'
import { useProductsStore } from '@/stores/products'

const { t, locale } = useI18n()
const productsStore = useProductsStore()

const open = ref(false)
const current = computed(() => locale.value)
const currentLabel = computed(() => LOCALE_LABELS[current.value] || current.value.toUpperCase())

function toggle() { open.value = !open.value }
function close() { open.value = false }

function select(code) {
  if (code !== current.value) {
    setLocale(code)
    if (productsStore.loaded) {
      productsStore.loaded = false
      productsStore.fetchProducts()
    }
  }
  close()
}

function onDocClick(e) {
  if (!e.target.closest?.('.lang-selector')) close()
}

onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))
</script>

<style scoped>
.lang-selector { position: relative; display: inline-block; }

.lang-selector__trigger {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 10px; border-radius: var(--radius);
  background: transparent; border: 1px solid var(--border-subtle);
  color: var(--text-primary); cursor: pointer;
  font-size: 13px; font-weight: 500;
  transition: background var(--duration-fast), border-color var(--duration-fast);
}
.lang-selector__trigger:hover { background: var(--bg-muted); }
.lang-selector__current { line-height: 1; }
.lang-selector__chev { transition: transform var(--duration-fast); }
.lang-selector--open .lang-selector__chev { transform: rotate(180deg); }

.lang-selector__menu {
  position: absolute; top: calc(100% + 6px); right: 0;
  min-width: 160px; padding: 6px;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: var(--radius); box-shadow: var(--shadow-md);
  list-style: none; margin: 0; z-index: 90;
}

.lang-selector__option {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  gap: 10px; padding: 8px 10px;
  background: transparent; border: none; border-radius: var(--radius-sm);
  color: var(--text-primary); cursor: pointer;
  font-size: 13px; text-align: left;
  transition: background var(--duration-fast);
}
.lang-selector__option:hover { background: var(--bg-muted); }
.lang-selector__option--active { font-weight: 600; color: var(--sky-700); }
</style>
