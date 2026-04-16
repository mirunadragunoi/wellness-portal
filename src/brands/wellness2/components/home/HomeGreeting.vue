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
  padding: 24px var(--container-pad) 20px;
  background: var(--bg-surface); border-bottom: 2px solid var(--ink-200);
  
}
.greeting__text {
  font-family: var(--font-display); font-size: clamp(24px,3vw,34px);
  font-weight: 300; color: var(--ink-900); line-height: 1.2;
}
.greeting__sub { font-size: 15px; color: var(--text-secondary); margin-top: 4px; }
.greeting__date {
  font-size: 13px; color: var(--text-muted); white-space: nowrap; padding-top: 4px;
  font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
}

@media (max-width: 640px) {
  .greeting {
    padding: 18px 16px 16px;
    gap: 8px;
  }
  .greeting__sub {
    font-size: 14px;
  }
  .greeting__date {
    font-size: 12px;
  }
}
</style>
