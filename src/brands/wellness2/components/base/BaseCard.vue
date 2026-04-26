<template>
  <div class="base-card" :class="[`base-card--${variant}`, { 'base-card--hoverable': hoverable }]">
    <slot />
  </div>
</template>
<script setup>
defineProps({ variant:{ type:String, default:'default' }, hoverable:{ type:Boolean, default:true } })
</script>
<style scoped>
.base-card {
  background: var(--bg-glass); backdrop-filter: blur(20px);
  border-radius: var(--radius); overflow: hidden;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.base-card--default  { border: var(--border-glass); box-shadow: var(--glow-card); }
.base-card--elevated { border: var(--border-glass); box-shadow: var(--glow-card-hover); }
.base-card--flat     { background: rgba(13,31,18,0.4); border: var(--border-subtle); }
.base-card--hoverable:hover {
  border-color: rgba(184,245,102,0.25);
  box-shadow: var(--glow-card-hover);
  transform: translateY(-2px);
}
</style>
