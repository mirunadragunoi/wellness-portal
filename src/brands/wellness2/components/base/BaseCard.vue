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
  background:var(--bg-surface); border-radius:var(--radius);
  overflow:hidden;
  transition:transform var(--duration-normal), box-shadow var(--duration-normal);
}
.base-card--default  { border:2px solid var(--ink-100); }
.base-card--elevated { box-shadow:var(--shadow-md); border:1px solid var(--ink-100); }
.base-card--flat     { background:var(--parchment-2); border:none; }
.base-card--hoverable:hover { transform:translate(-1px,-2px); box-shadow:4px 4px 0 var(--sage-100); }
</style>
