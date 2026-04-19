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
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  font-family:var(--font-body); font-weight:600;
  border-radius:var(--radius-sm);
  cursor:pointer; border:2px solid transparent;
  text-decoration:none;
  transition:all var(--duration-fast) var(--ease-smooth);
  white-space:nowrap; position:relative;
  user-select:none; -webkit-tap-highlight-color:transparent;
  letter-spacing:0.2px;
}
.btn:disabled { opacity:0.5; cursor:not-allowed; pointer-events:none; }

.btn--sm { padding:7px 18px;  font-size:13px; }
.btn--md { padding:11px 26px; font-size:14px; }
.btn--lg { padding:15px 36px; font-size:16px; }
.btn--full { width:100%; }

/* Primary — solid ink */
.btn--primary {
  background:var(--sage-500); color:#fff;
  border-color:var(--sage-600);
  box-shadow:var(--shadow-sm);
}
.btn--primary:hover:not(:disabled) {
  background:var(--sage-600); border-color:var(--sage-700);
  box-shadow:var(--shadow-md);
  transform:translate(-1px,-2px);
}
.btn--primary:active:not(:disabled) { transform:translate(0,0); box-shadow:none; }

/* Secondary — outlined */
.btn--secondary {
  background:#fff; color:var(--sage-700);
  border-color:var(--sage-300);
}
.btn--secondary:hover:not(:disabled) {
  background:var(--sage-50); color:var(--sage-700);
  box-shadow:var(--shadow-sm);
  transform:translate(-1px,-2px);
}

/* Ghost */
.btn--ghost {
  background:transparent; color:var(--text-secondary);
  border-color:transparent;
}
.btn--ghost:hover:not(:disabled) { color:var(--sage-700); background:var(--sage-50); }

/* Sage */
.btn--sage {
  background:var(--sage-500); color:white;
  border-color:var(--sage-600);
  box-shadow:var(--shadow-sm);
}
.btn--sage:hover:not(:disabled) {
  background:var(--sage-600);
  box-shadow:var(--shadow-md);
  transform:translate(-1px,-2px);
}

/* Danger */
.btn--danger { background:#fee2e2; color:#dc2626; border-color:#fca5a5; }
.btn--danger:hover:not(:disabled) { background:#fecaca; }

/* Spinner */
.btn__spinner {
  width:15px; height:15px; border:2px solid rgba(255,255,255,0.35);
  border-top-color:white; border-radius:50%;
  animation:spin 0.7s linear infinite;
}
.btn--secondary .btn__spinner,
.btn--ghost .btn__spinner {
  border-color:rgba(28,26,22,0.2); border-top-color:var(--ink-800);
}
@keyframes spin { to { transform:rotate(360deg); } }

@media (max-width:640px) {
  .btn--md { padding:10px 20px; font-size:14px; }
  .btn--lg { padding:13px 24px; font-size:15px; }
}
</style>
