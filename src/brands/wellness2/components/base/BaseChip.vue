<template>
  <button class="chip" :class="{ 'chip--active': active, 'chip--small': small }"
    :style="active && color ? { background:color+'18', color, borderColor:color+'66' } : {}"
    @click="emit('click')">
    <Icon v-if="icon" :icon="icon" class="chip__icon app-icon app-icon--sm" />
    <slot />
  </button>
</template>
<script setup>
defineProps({ active:{type:Boolean,default:false}, small:{type:Boolean,default:false}, icon:{type:String,default:''}, color:{type:String,default:''} })
const emit = defineEmits(['click'])
</script>
<style scoped>
.chip {
  display:inline-flex; align-items:center; gap:6px;
  padding:7px 14px; border-radius:var(--radius-sm);
  font-family:var(--font-body); font-size:13px; font-weight:500;
  background:var(--bg-surface); color:var(--text-secondary);
  border:1.5px solid var(--ink-200); cursor:pointer;
  transition:all var(--duration-fast); white-space:nowrap; user-select:none;
}
.chip:hover:not(.chip--active) { border-color:var(--sage-400); color:var(--sage-700); background:var(--sage-50); }
.chip--active { background:var(--sage-100); color:var(--sage-700); border-color:var(--sage-400); font-weight:600; }
.chip--small  { padding:5px 10px; font-size:12px; }
.chip__icon   { color:var(--text-secondary); }
.chip--active .chip__icon { color:inherit; }
</style>
