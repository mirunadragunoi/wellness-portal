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
.toast-container {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  pointer-events: none;
}

.toast {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
  pointer-events: all;
  cursor: pointer;
  white-space: nowrap;
}

.toast--success { background: #ecfdf5; color: #065f46; border: 1px solid #6ee7b7; }
.toast--error   { background: #fef2f2; color: #991b1b; border: 1px solid #fca5a5; }
.toast--info    { background: var(--sky-50); color: var(--sky-700); border: 1px solid var(--sky-200); }
.toast--warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }

.toast__icon { flex-shrink: 0; }
.toast--success .toast__icon { color: #059669; }
.toast--error .toast__icon   { color: #dc2626; }
.toast--info .toast__icon    { color: var(--sky-600); }
.toast--warning .toast__icon { color: #d97706; }

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s var(--ease-smooth);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.9);
}
</style>
