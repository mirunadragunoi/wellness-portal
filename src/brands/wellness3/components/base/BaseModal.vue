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
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-panel {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
}

.modal-panel--sm  { max-width: 400px; }
.modal-panel--md  { max-width: 560px; }
.modal-panel--lg  { max-width: 760px; }
.modal-panel--full { max-width: 100%; max-height: 100%; border-radius: 0; }

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px 0;
  flex-shrink: 0;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 500;
  color: var(--text-primary);
}

.modal-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-muted);
  color: var(--text-secondary);
  cursor: pointer;
  border: none;
  transition: all var(--duration-fast) var(--ease-smooth);
  flex-shrink: 0;
}
.modal-close:hover {
  background: var(--sky-100);
  color: var(--sky-600);
}

.modal-body {
  padding: 24px 28px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 0 28px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-shrink: 0;
}

/* Transition */
.modal-enter-active, .modal-leave-active {
  transition: opacity var(--duration-normal) var(--ease-smooth);
}
.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform var(--duration-normal) var(--ease-smooth);
}
.modal-enter-from { opacity: 0; }
.modal-leave-to   { opacity: 0; }
.modal-enter-from .modal-panel { transform: scale(0.95) translateY(16px); }
.modal-leave-to   .modal-panel { transform: scale(0.95) translateY(16px); }

@media (max-width: 640px) {
  .modal-overlay { align-items: flex-end; padding: 0; }
  .modal-panel { border-radius: var(--radius-xl) var(--radius-xl) 0 0; max-height: 92vh; max-width: 100%; }
  .modal-enter-from .modal-panel { transform: translateY(100%); }
  .modal-leave-to   .modal-panel { transform: translateY(100%); }
}
</style>
