<template>
  <div class="home-view">
    <div class="container">
      <div class="home-view__grid">

        <!-- Column 1: Main -->
        <div class="home-view__main">
          <HomeGreeting />
          <HomeMoodCheckin />
          <HomeRecommended />

          <div class="home-view__two-col">
            <HomeMomentOfDay />
            <HomePhraseOfDay />
          </div>
        </div>

        <!-- Column 2: Sidebar -->
        <aside class="home-view__aside">
          <HomeStreakCard />
          <HomeCategoriesGrid />

          <!-- Quick breathing shortcuts -->
          <div class="quick-breathing">
            <h3 class="quick-breathing__title">Quick Breathing</h3>
            <div class="quick-breathing__grid">
              <RouterLink
                v-for="b in breathingShortcuts" :key="b.id"
                :to="{ name: 'breathing', params: { type: b.id } }"
                class="quick-b-btn"
                :style="{ background: b.bg, color: b.color }"
              >
                <span>💨</span>
                <span>{{ b.label }}</span>
              </RouterLink>
            </div>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMoodStore } from '@/stores/mood'
import { useProgressStore } from '@/stores/progress'
import HomeGreeting      from '@/components/home/HomeGreeting.vue'
import HomeMoodCheckin   from '@/components/home/HomeMoodCheckin.vue'
import HomeStreakCard     from '@/components/home/HomeStreakCard.vue'
import HomeRecommended   from '@/components/home/HomeRecommended.vue'
import HomeMomentOfDay   from '@/components/home/HomeMomentOfDay.vue'
import HomePhraseOfDay   from '@/components/home/HomePhraseOfDay.vue'
import HomeCategoriesGrid from '@/components/home/HomeCategoriesGrid.vue'

const moodStore     = useMoodStore()
const progressStore = useProgressStore()

onMounted(() => {
  moodStore.syncDay()
  progressStore.syncStreak()
})

const breathingShortcuts = [
  { id: 'box',   label: 'Box 4-4-4', bg: '#e0f2fe', color: '#0369a1' },
  { id: '4-7-8', label: '4-7-8',     bg: '#ede9fe', color: '#5b21b6' },
  { id: 'sos',   label: 'SOS 1min',  bg: '#fee2e2', color: '#991b1b' }
]
</script>

<style scoped>
.home-view {
  padding: 40px 0 120px;
  min-height: 100vh;
}
.home-view__grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}
.home-view__main { display: flex; flex-direction: column; gap: 28px; }
.home-view__two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.home-view__aside { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 88px; }

.quick-breathing { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 20px; }
.quick-breathing__title { font-family: var(--font-display); font-size: 18px; font-weight: 500; color: var(--text-primary); margin-bottom: 14px; }
.quick-breathing__grid { display: flex; flex-direction: column; gap: 8px; }
.quick-b-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; border-radius: var(--radius);
  font-size: 14px; font-weight: 600; text-decoration: none;
  transition: all var(--duration-fast) var(--ease-smooth);
}
.quick-b-btn:hover { filter: brightness(0.95); transform: translateX(3px); }

@media (max-width: 960px) {
  .home-view__grid { grid-template-columns: 1fr; }
  .home-view__aside { position: static; }
}
@media (max-width: 640px) {
  .home-view__two-col { grid-template-columns: 1fr; }
  .home-view { padding-bottom: 80px; }
}
</style>
