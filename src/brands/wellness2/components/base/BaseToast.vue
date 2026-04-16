<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast" tag="div">
        <div
          v-for="toast in uiStore.toasts"
          :key="toast.id"
          class="toast"
          :class="`toast--${toast.type}`"
          @click="uiStore.removeToast(toast.id)"
        >
          <Icon :icon="toastIcons[toast.type] || toastIcons.info" class="toast__icon app-icon app-icon--sm" />
          <span class="toast__message">{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()
const toastIcons = {
  success: 'lucide:check',
  error: 'lucide:x',
  info: 'lucide:info',
  warning: 'lucide:triangle-alert'
}
</script>

<style scoped>
.toast-list {
  position: fixed; bottom: 24px; right: 20px; z-index: 300;
  display: flex; flex-direction: column; gap: 10px; pointer-events: none;
}
.toast {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px 18px; max-width: 340px;
  background: var(--ink-900); color: var(--parchment);
  border: 2px solid var(--ink-700);
  border-radius: var(--radius); pointer-events: all;
  box-shadow: 4px 4px 0 var(--ink-700);
}
.toast--success { border-color: var(--sage-600); box-shadow: 4px 4px 0 var(--sage-700); }
.toast--error   { border-color: #dc2626; box-shadow: 4px 4px 0 #991b1b; }
.toast--info    { border-color: var(--ink-600); }
.toast__icon { flex-shrink: 0; margin-top: 1px; }
.toast--success .toast__icon { color: var(--sage-300); }
.toast--error   .toast__icon { color: #fca5a5; }
.toast--info    .toast__icon { color: var(--ink-300); }
.toast__body { flex: 1; }
.toast__title   { font-size: 14px; font-weight: 600; color: var(--parchment); margin-bottom: 2px; }
.toast__message { font-size: 13px; color: var(--ink-300); line-height: 1.5; }
.toast__close {
  background: none; border: none; cursor: pointer; color: var(--ink-400);
  padding: 2px; border-radius: var(--radius-sm); transition: color var(--duration-fast);
  flex-shrink: 0;
}
.toast__close:hover { color: var(--parchment); }
.toast-enter-active, .toast-leave-active { transition: all var(--duration-normal) var(--ease-smooth); }
.toast-enter-from { opacity: 0; transform: translateX(20px); }
.toast-leave-to   { opacity: 0; transform: translateX(20px); }
</style>
