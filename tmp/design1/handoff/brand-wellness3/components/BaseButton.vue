<template>
  <!--
    BaseButton.vue v3 — "Midnight Bloom" glass style
    Înlocuiește: src/components/base/BaseButton.vue
    API identic cu versiunea existentă (variant, size, loading, disabled, full, tag)
  -->
  <component
    :is="tag"
    class="btn"
    :class="[
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--loading': loading, 'btn--full': full }
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <slot />
  </component>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({
  tag:      { type: String,  default: 'button' },
  variant:  { type: String,  default: 'primary' },
  size:     { type: String,  default: 'md' },
  loading:  { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  full:     { type: Boolean, default: false },
})
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-body);
  font-weight: 700;
  border-radius: var(--radius-full);
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-smooth);
  white-space: nowrap;
  position: relative;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  letter-spacing: 0.3px;
}

.btn:disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }

/* ── Sizes ── */
.btn--sm { padding: 8px 20px;  font-size: 13px; }
.btn--md { padding: 12px 28px; font-size: 14px; }
.btn--lg { padding: 16px 40px; font-size: 16px; }
.btn--full { width: 100%; }

/* ── Primary — gradient violet → teal ── */
.btn--primary {
  background: linear-gradient(135deg, var(--violet), var(--teal));
  color: #070d1a;
  box-shadow: 0 0 20px rgba(167, 139, 250, 0.3);
}
.btn--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #b8a5fc, #4de8d8);
  box-shadow: 0 0 40px rgba(167,139,250,.5), 0 0 60px rgba(45,212,191,.2);
  transform: translateY(-2px) scale(1.02);
}
.btn--primary:active:not(:disabled) {
  transform: none;
  box-shadow: 0 0 20px rgba(167, 139, 250, 0.3);
}

/* ── Secondary / Ghost — glass ── */
.btn--secondary,
.btn--ghost {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
}
.btn--secondary:hover:not(:disabled),
.btn--ghost:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(167, 139, 250, 0.3);
}

/* ── Outline ── */
.btn--outline {
  background: transparent;
  color: var(--violet);
  border: 1.5px solid rgba(167, 139, 250, 0.4);
}
.btn--outline:hover:not(:disabled) {
  box-shadow: 0 0 20px rgba(167, 139, 250, 0.2);
  border-color: rgba(167, 139, 250, 0.7);
}

/* ── Soft ── */
.btn--soft {
  background: rgba(167, 139, 250, 0.10);
  color: var(--violet);
  border: none;
}
.btn--soft:hover:not(:disabled) {
  background: rgba(167, 139, 250, 0.20);
}

/* ── Danger ── */
.btn--danger {
  background: rgba(248, 113, 113, 0.10);
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.25);
}
.btn--danger:hover:not(:disabled) {
  background: rgba(248, 113, 113, 0.20);
}

/* ── Loading spinner ── */
.btn__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.btn--ghost .btn__spinner,
.btn--secondary .btn__spinner {
  border-color: rgba(167, 139, 250, 0.2);
  border-top-color: var(--violet);
}

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 640px) {
  .btn--md { padding: 11px 22px; font-size: 14px; }
  .btn--lg { padding: 14px 28px; font-size: 15px; }
}
</style>
