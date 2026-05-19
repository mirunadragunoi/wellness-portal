<template>
  <component
    :is="tag"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--loading': loading, 'btn--full': full }]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <slot />
  </component>
</template>

<script setup>
defineOptions({ inheritAttrs: false })

const props = defineProps({
  tag:      { type: String,  default: 'button' },
  variant:  { type: String,  default: 'primary' }, // primary | secondary | ghost | danger
  size:     { type: String,  default: 'md' },       // sm | md | lg
  loading:  { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  full:     { type: Boolean, default: false }
})
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-body);
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all var(--duration-normal) var(--ease-smooth);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Sizes */
.btn--sm { padding: 8px 20px;  font-size: 13px; }
.btn--md { padding: 12px 28px; font-size: 15px; }
.btn--lg { padding: 16px 40px; font-size: 17px; }

/* Full width */
.btn--full { width: 100%; }

/* Primary */
.btn--primary {
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white;
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3);
}
.btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.4);
}
.btn--primary:active:not(:disabled) {
  transform: translateY(0);
}

/* Secondary */
.btn--secondary {
  background: var(--bg-surface);
  color: var(--sky-600);
  border: 1.5px solid var(--border-default);
}
.btn--secondary:hover:not(:disabled) {
  background: var(--sky-50);
  border-color: var(--sky-300);
  transform: translateY(-1px);
}

/* Ghost */
.btn--ghost {
  background: transparent;
  color: var(--text-secondary);
  padding-left: 16px;
  padding-right: 16px;
}
.btn--ghost:hover:not(:disabled) {
  color: var(--sky-600);
  background: var(--sky-50);
}

/* Danger */
.btn--danger {
  background: #fee2e2;
  color: #dc2626;
  border: 1.5px solid #fca5a5;
}
.btn--danger:hover:not(:disabled) {
  background: #fecaca;
}

/* Spinner */
.btn__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.btn--secondary .btn__spinner,
.btn--ghost .btn__spinner {
  border-color: rgba(14, 165, 233, 0.3);
  border-top-color: var(--sky-500);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
