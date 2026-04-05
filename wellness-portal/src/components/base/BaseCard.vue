<template>
  <div class="base-card" :class="[`base-card--${variant}`, { 'base-card--hoverable': hoverable }]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  variant:   { type: String, default: 'default' }, // default | elevated | flat
  hoverable: { type: Boolean, default: true }
})
</script>

<style scoped>
.base-card {
  background: var(--bg-surface);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform var(--duration-normal) var(--ease-smooth),
              box-shadow var(--duration-normal) var(--ease-smooth);
}
.base-card--default  { border: 1px solid var(--border-subtle); }
.base-card--elevated { box-shadow: var(--shadow-md); }
.base-card--flat     { background: var(--bg-muted); border: none; }

.base-card--hoverable:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
</style>
