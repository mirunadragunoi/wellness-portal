<template>
  <button
    class="chip"
    :class="{ 'chip--active': active, 'chip--small': small }"
    :style="active && color ? { background: color + '22', color, borderColor: color + '55' } : {}"
    @click="emit('click')"
  >
    <Icon v-if="icon" :icon="icon" class="chip__icon app-icon app-icon--sm" />
    <slot />
  </button>
</template>

<script setup>
defineProps({
  active: { type: Boolean, default: false },
  small:  { type: Boolean, default: false },
  icon:   { type: String,  default: '' },
  color:  { type: String,  default: '' }
})
const emit = defineEmits(['click'])
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  background: var(--bg-surface);
  color: var(--text-secondary);
  border: 1.5px solid var(--border-subtle);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-smooth);
  white-space: nowrap;
  user-select: none;
}
.chip:hover:not(.chip--active) {
  border-color: var(--sky-300);
  color: var(--sky-600);
  background: var(--sky-50);
}
.chip--active {
  background: var(--sky-100);
  color: var(--sky-700);
  border-color: var(--sky-300);
}
.chip--small { padding: 6px 12px; font-size: 13px; }
.chip__icon { color: var(--text-secondary); }
.chip--active .chip__icon { color: inherit; }
</style>
