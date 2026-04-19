<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="closeOnBackdrop && emit('update:modelValue', false)">
        <div class="modal-panel" :class="`modal-panel--${size}`" role="dialog" aria-modal="true">
          <!-- Header -->
          <div v-if="$slots.header || title" class="modal-header">
            <slot name="header">
              <h3 class="modal-title">{{ title }}</h3>
            </slot>
            <button v-if="showClose" class="modal-close" @click="emit('update:modelValue', false)" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue:       { type: Boolean, default: false },
  title:            { type: String,  default: '' },
  size:             { type: String,  default: 'md' }, // sm | md | lg | full
  showClose:        { type: Boolean, default: true },
  closeOnBackdrop:  { type: Boolean, default: true }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(28,26,22,0.65);
  backdrop-filter: blur(3px);
  z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal-panel {
  background: var(--bg-surface);
  border: 2px solid var(--ink-200);
  border-radius: var(--radius-lg);
  box-shadow: 8px 8px 0 var(--ink-200);
  width: 100%; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden;
}
.modal-panel--sm  { max-width: 400px; }
.modal-panel--md  { max-width: 560px; }
.modal-panel--lg  { max-width: 760px; }
.modal-panel--full { max-width: 100%; max-height: 100%; border-radius: 0; }
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 28px 0; flex-shrink: 0;
}
.modal-title { font-family: var(--font-display); font-size: 24px; font-weight: 400; color: var(--text-primary); }
.modal-close {
  width: 34px; height: 34px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  background: var(--parchment-2); color: var(--text-secondary);
  cursor: pointer; border: 1.5px solid var(--ink-200);
  transition: all var(--duration-fast);
}
.modal-close:hover { background: var(--ink-900); color: var(--parchment); border-color: var(--ink-900); }
.modal-body { flex: 1; overflow-y: auto; padding: 20px 28px 28px; }
.modal-footer {
  display: flex; justify-content: flex-end; gap: 12px;
  padding: 16px 28px; border-top: 1px solid var(--ink-100); flex-shrink: 0;
}
.modal-enter-active, .modal-leave-active { transition: all var(--duration-normal) var(--ease-smooth); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96) translateY(12px); }
</style>
