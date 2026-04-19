<template>
  <div class="progress-bar" :class="`progress-bar--${variant}`">
    <div class="progress-bar__track">
      <div class="progress-bar__fill" :style="{ width:`${Math.min(100,Math.max(0,value))}%` }" />
    </div>
    <span v-if="showLabel" class="progress-bar__label">{{ Math.round(value) }}%</span>
  </div>
</template>
<script setup>
defineProps({ value:{type:Number,default:0}, variant:{type:String,default:'default'}, showLabel:{type:Boolean,default:false} })
</script>
<style scoped>
.progress-bar { display:flex; align-items:center; gap:10px; }
.progress-bar__track {
  flex:1; height:6px; background:var(--ink-100); border-radius:1px; overflow:hidden;
}
.progress-bar__fill {
  height:100%; background:var(--sage-500); border-radius:1px;
  transition:width var(--duration-slow) var(--ease-smooth);
}
.progress-bar--sage .progress-bar__fill { background:var(--sage-400); }
.progress-bar--accent .progress-bar__fill { background:var(--terracotta); }
.progress-bar__label { font-size:12px; font-weight:600; color:var(--text-secondary); min-width:36px; text-align:right; }
</style>
