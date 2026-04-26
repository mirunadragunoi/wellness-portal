<template>
  <component :is="tag" class="btn" :class="[`btn--${variant}`, `btn--${size}`, { 'btn--loading': loading, 'btn--full': full }]"
    :disabled="disabled || loading" v-bind="$attrs">
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <slot />
  </component>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
const props = defineProps({
  tag:      { type: String,  default: 'button' },
  variant:  { type: String,  default: 'primary' },
  size:     { type: String,  default: 'md' },
  loading:  { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  full:     { type: Boolean, default: false }
})
</script>

<style scoped>
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-body); font-weight: 700;
  border-radius: var(--radius-pill);
  cursor: pointer; border: 1px solid transparent;
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-smooth);
  white-space: nowrap; position: relative;
  user-select: none; -webkit-tap-highlight-color: transparent;
}
.btn:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }

.btn--sm { padding: 8px 18px;  font-size: 13px; }
.btn--md { padding: 12px 26px; font-size: 14px; }
.btn--lg { padding: 15px 36px; font-size: 16px; }
.btn--full { width: 100%; }

/* Primary — lime */
.btn--primary {
  background: var(--lime-500); color: var(--forest-900);
}
.btn--primary:hover:not(:disabled) {
  background: var(--lime-400);
  box-shadow: 0 0 32px rgba(184,245,102,0.35);
  transform: translateY(-1px);
}
.btn--primary:active:not(:disabled) { transform: scale(0.97); box-shadow: none; }

/* Secondary — lime outline */
.btn--secondary {
  background: transparent; color: var(--lime-400);
  border-color: rgba(184,245,102,0.35);
}
.btn--secondary:hover:not(:disabled) {
  background: rgba(184,245,102,0.08);
  border-color: rgba(184,245,102,0.6);
}

/* Ghost */
.btn--ghost {
  background: rgba(255,255,255,0.05); color: var(--text-primary);
  border-color: rgba(255,255,255,0.12); backdrop-filter: blur(8px);
}
.btn--ghost:hover:not(:disabled) { background: rgba(255,255,255,0.09); }

/* Danger */
.btn--danger {
  background: rgba(239,68,68,0.12); color: #f87171;
  border-color: rgba(239,68,68,0.25);
}
.btn--danger:hover:not(:disabled) { background: rgba(239,68,68,0.2); }

/* Spinner */
.btn__spinner {
  width: 15px; height: 15px; border: 2px solid rgba(7,15,10,0.2);
  border-top-color: var(--forest-900); border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.btn--secondary .btn__spinner,
.btn--ghost .btn__spinner {
  border-color: rgba(240,250,242,0.2); border-top-color: var(--text-primary);
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 640px) {
  .btn--md { padding: 11px 20px; }
  .btn--lg { padding: 13px 28px; font-size: 15px; }
}
</style>
