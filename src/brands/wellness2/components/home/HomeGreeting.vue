<template>
  <div class="greeting">
    <div class="greeting__main">
      <h1 class="greeting__text">{{ greeting }}</h1>
      <p class="greeting__sub">{{ subtitle }}</p>
    </div>
    <p class="greeting__date">{{ formattedDate }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useGreeting } from '@/composables/useGreeting'
import dayjs from 'dayjs'

const userStore = useUserStore()
const firstName = computed(() => userStore.firstName)
const { greeting, subtitle } = useGreeting(firstName)
const formattedDate = dayjs().format('dddd, MMMM D')
</script>

<style scoped>
.greeting { display: flex; flex-direction: column; gap: 6px; margin-bottom: 32px; }
.greeting__text {
  font-family: var(--font-display);
  font-size: clamp(28px,3.5vw,44px);
  font-weight: 800; letter-spacing: -1.5px; color: var(--text-primary); line-height: 1.1;
}
.greeting__sub { font-size: 15px; color: var(--text-secondary); }
.greeting__date {
  font-family: var(--font-mono);
  font-size: 11px; color: var(--lime-500); font-weight: 600;
  text-transform: uppercase; letter-spacing: 3px; display: block; margin-bottom: 8px;
}
</style>
