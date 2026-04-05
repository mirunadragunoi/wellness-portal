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
.greeting {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 16px; flex-wrap: wrap;
  padding-bottom: 8px;
}
.greeting__text {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 300; color: var(--text-primary); line-height: 1.2;
}
.greeting__sub { font-size: 16px; color: var(--text-secondary); margin-top: 6px; }
.greeting__date { font-size: 14px; color: var(--text-muted); white-space: nowrap; padding-top: 4px; }
</style>
