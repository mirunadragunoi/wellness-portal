<template>
  <div class="skeleton" :style="{ width, height, borderRadius: radius }" />
</template>

<script setup>
defineProps({
  width:  { type: String, default: '100%' },
  height: { type: String, default: '20px' },
  radius: { type: String, default: '8px' }
})
</script>

<style scoped>
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-muted) 25%,
    var(--slate-200) 50%,
    var(--bg-muted) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}
[data-theme="dark"] .skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-muted) 25%,
    var(--bg-elevated) 50%,
    var(--bg-muted) 75%
  );
  background-size: 200% 100%;
}
@keyframes skeleton-shimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}
</style>
