<template>
  <div class="home-view">
    <HomeGreeting />
    <div class="container">
      <div class="home-view__grid">

        <!-- Column 1: Main -->
        <div class="home-view__main">
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
                <Icon icon="lucide:wind" class="app-icon app-icon--sm" />
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
  { id: 'box',   label: 'Box 4-4-4', bg: 'var(--sage-100)', color: 'var(--sage-700)' },
  { id: '4-7-8', label: '4-7-8',     bg: '#f0f7ee', color: 'var(--sage-700)' },
  { id: 'sos',   label: 'SOS 1min',  bg: '#fee2e2', color: '#991b1b' }
]
</script>

<style scoped>
.home-view { padding-bottom: var(--page-pad-bottom-auth); min-height: var(--app-min-height); background: var(--parchment); }
.home-view__grid {
  display: grid; grid-template-columns: minmax(0,1fr) minmax(260px,320px);
  gap: 24px; align-items: start; padding: 28px var(--container-pad);
}
.home-view__main { min-width: 0; display: flex; flex-direction: column; gap: 20px; }
.home-view__two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.home-view__aside {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: calc(var(--navbar-height) + 16px);
}

.quick-breathing {
  background: var(--bg-surface); border: 2px solid var(--ink-200);
  border-radius: var(--radius-lg); padding: 20px; box-shadow: 3px 3px 0 var(--ink-100);
}
.quick-breathing__title {
  font-family: var(--font-display); font-size: 18px; font-weight: 400;
  color: var(--ink-900); margin-bottom: 14px;
  border-left: 3px solid var(--sage-400); padding-left: 10px;
}
.quick-breathing__grid { display: flex; flex-direction: column; gap: 8px; }
.quick-b-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 14px; border-radius: var(--radius-sm);
  font-size: 13px; font-weight: 600; text-decoration: none;
  transition: all var(--duration-fast); border: 2px solid transparent;
}
.quick-b-btn:hover { transform: translateX(3px); box-shadow: 2px 2px 0 rgba(0,0,0,0.08); }

@media (max-width: 1024px) {
  .home-view__grid { grid-template-columns: 1fr; }
  .home-view__aside { position: static; }
  .quick-breathing__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
}
@media (max-width: 640px) {
  .home-view__grid { padding: 18px 16px; gap: 16px; }
  .home-view__two-col { grid-template-columns: 1fr; }
  .quick-breathing {
    padding: 16px;
  }
  .quick-b-btn {
    min-height: 44px;
    justify-content: center;
  }
}
</style>
