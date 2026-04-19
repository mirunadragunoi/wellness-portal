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
  background: linear-gradient(90deg, var(--parchment-2) 25%, var(--parchment) 50%, var(--parchment-2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: var(--radius-sm);
}
@keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
</style>
