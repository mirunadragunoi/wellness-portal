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
  { id: 'box',   label: 'Box 4-4-4', bg: 'rgba(184,245,102,0.08)', color: 'var(--lime-400)' },
  { id: '4-7-8', label: '4-7-8',     bg: 'rgba(52,211,153,0.08)',  color: 'var(--emerald-400)' },
  { id: 'sos',   label: 'SOS 1min',  bg: 'rgba(239,68,68,0.1)',    color: '#f87171' }
]
</script>

<style scoped>
.home-view { padding-bottom: var(--page-pad-bottom-auth); min-height: var(--app-min-height); background: var(--forest-900); }
.home-view__grid {
  display: grid; grid-template-columns: minmax(0,1fr) 320px;
  gap: 32px; align-items: start; padding: 40px var(--container-pad) 100px;
}
.home-view__main { min-width: 0; }
.home-view__two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.home-view__aside {
  min-width: 0; display: flex; flex-direction: column; gap: 16px;
  position: sticky; top: calc(var(--navbar-height) + 16px);
}

.quick-breathing {
  background: var(--bg-glass); backdrop-filter: blur(16px);
  border: var(--border-glass); border-radius: 18px; padding: 20px;
}
.quick-breathing__title {
  font-family: var(--font-display); font-size: 15px; font-weight: 700;
  color: var(--text-primary); margin-bottom: 12px; letter-spacing: -0.3px;
}
.quick-breathing__grid { display: flex; flex-direction: column; gap: 8px; }
.quick-b-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 14px; border-radius: var(--radius-pill);
  font-size: 13px; font-weight: 600; text-decoration: none;
  transition: all 200ms var(--ease-smooth); border: 1px solid rgba(255,255,255,0.08);
}
.quick-b-btn:hover { transform: translateX(3px); border-color: rgba(184,245,102,0.2); }

@media (max-width: 1024px) {
  .home-view__grid { grid-template-columns: 1fr; }
  .home-view__aside { position: static; display: grid; grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .home-view__grid { padding: 24px 16px 80px; gap: 0; }
  .home-view__two-col { grid-template-columns: 1fr; }
  .home-view__aside { grid-template-columns: 1fr; }
  .quick-b-btn { min-height: 44px; justify-content: center; }
}
</style>
