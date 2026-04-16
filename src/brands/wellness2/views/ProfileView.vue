<template>
  <div class="profile-view">
    <div class="container">
      <h1 class="profile-view__title">{{ t('profile.title') }}</h1>

      <div class="profile-view__layout">
        <!-- Left: identity -->
        <div class="profile-col">

          <!-- Avatar & name card -->
          <div class="profile-card">
            <div class="profile-avatar-section">
              <div class="profile-avatar-wrap">
                <Icon
                  :icon="AVATAR_ICONS[userStore.avatar] || AVATAR_ICONS['avatar-1']"
                  class="profile-avatar-icon app-icon app-icon--2xl app-icon--primary"
                />
              </div>
              <div>
                <p v-if="!editing" class="profile-name">{{ userStore.firstName || 'Your name' }}</p>
                <input v-else v-model="editName" class="profile-name-input" placeholder="Your name" />
                <p class="profile-member-since">{{ t('profile.member_since', { date: memberSince }) }}</p>
              </div>
            </div>

            <!-- Avatar picker -->
            <div class="avatar-picker">
              <p class="avatar-picker__label">{{ t('profile.avatar_label') }}</p>
              <div class="avatar-picker__grid">
                <button
                  v-for="key in avatarKeys" :key="key"
                  type="button"
                  class="avatar-opt"
                  :class="{ 'avatar-opt--active': userStore.avatar === key }"
                  @click="userStore.avatar = key"
                >
                  <Icon :icon="AVATAR_ICONS[key]" class="app-icon app-icon--md app-icon--primary" />
                </button>
              </div>
            </div>

            <div class="profile-card__actions">
              <button v-if="!editing" class="profile-btn profile-btn--secondary" @click="startEdit">
                {{ t('profile.edit') }}
              </button>
              <template v-else>
                <button class="profile-btn profile-btn--primary" @click="saveEdit">{{ t('profile.save') }}</button>
                <button class="profile-btn profile-btn--ghost"   @click="cancelEdit">{{ t('common.cancel') }}</button>
              </template>
            </div>
          </div>

          <!-- Stats mini -->
          <div class="profile-card profile-stats">
            <div class="profile-stat" v-for="s in miniStats" :key="s.label">
              <Icon :icon="s.icon" class="profile-stat__icon app-icon app-icon--lg app-icon--primary" />
              <span class="profile-stat__val">{{ s.value }}</span>
              <span class="profile-stat__label">{{ s.label }}</span>
            </div>
          </div>
        </div>

        <!-- Right: settings & favorites -->
        <div class="profile-col">

          <!-- Goals -->
          <div class="profile-card">
            <h3 class="profile-card__title">{{ t('profile.objectives_label') }}</h3>
            <div class="profile-goals">
              <span
                v-for="obj in userStore.objectives" :key="obj"
                class="goal-chip"
              >
                <Icon :icon="ONBOARDING_OBJECTIVE_ICONS[obj] || 'lucide:circle'" class="goal-chip__icon app-icon app-icon--xs app-icon--primary" />
                {{ obj }}
              </span>
              <RouterLink to="/onboarding" class="goal-chip goal-chip--edit">
                {{ t('profile.edit_goals') }}
                <Icon icon="lucide:chevron-right" class="goal-chip__chev app-icon app-icon--xs" />
              </RouterLink>
            </div>
          </div>

          <!-- Favorites -->
          <div class="profile-card">
            <h3 class="profile-card__title">{{ t('profile.favorites_title') }}</h3>
            <div v-if="favoriteSessions.length" class="profile-favorites">
              <div
                v-for="s in favoriteSessions" :key="s.id"
                class="fav-item"
                @click="router.push({ name: 'session', params: { id: s.id } })"
              >
                <div class="fav-item__img" :style="{ background: s.thumbnailGradient }">
                  <Icon :icon="sessionTypeIcon(s.type)" class="app-icon app-icon--md" style="color: rgba(255,255,255,0.95)" />
                </div>
                <div class="fav-item__info">
                  <p class="fav-item__title">{{ s.title }}</p>
                  <p class="fav-item__meta">{{ Math.round(s.duration / 60) }} min · {{ s.category }}</p>
                </div>
                <button type="button" class="fav-item__remove" @click.stop="progressStore.toggleFavorite(s.id)" :title="t('common.close')">
                  <Icon icon="lucide:x" class="app-icon app-icon--sm" />
                </button>
              </div>
            </div>
            <p v-else class="profile-empty">{{ t('profile.no_favorites') }}</p>
          </div>

          <!-- Account settings -->
          <div class="profile-card">
            <h3 class="profile-card__title">{{ t('profile.account_title') }}</h3>

            <div class="settings-list">
              <!-- Language -->
              <div class="setting-row">
                <span class="setting-row__label">{{ t('profile.language_label') }}</span>
                <select class="setting-select" v-model="selectedLang" @change="changeLanguage">
                  <option value="en">English</option>
                  <option value="ro">Română</option>
                </select>
              </div>

              <!-- Dark mode -->
              <div class="setting-row">
                <span class="setting-row__label">{{ t('profile.dark_mode_label') }}</span>
                <button
                  class="toggle-btn"
                  :class="{ 'toggle-btn--on': userStore.darkMode }"
                  @click="userStore.toggleDarkMode()"
                >
                  <span class="toggle-btn__knob" />
                </button>
              </div>

              <!-- Phone -->
              <div class="setting-row">
                <span class="setting-row__label">{{ t('profile.phone_label') }}</span>
                <span class="setting-row__val">{{ authStore.phone || '—' }}</span>
              </div>
            </div>

            <!-- Logout -->
            <button class="logout-btn" @click="confirmLogout">
              {{ t('profile.logout') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Logout confirm modal -->
    <BaseModal v-model="showLogout" :title="t('profile.logout')" size="sm">
      <p style="font-size:15px;color:var(--text-secondary);line-height:1.6">{{ t('profile.logout_confirm') }}</p>
      <template #footer>
        <button class="profile-btn profile-btn--ghost" @click="showLogout = false">{{ t('common.cancel') }}</button>
        <button class="profile-btn profile-btn--danger" @click="logout">{{ t('profile.logout') }}</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore }     from '@/stores/user'
import { useAuthStore }     from '@/stores/auth'
import { useProgressStore } from '@/stores/progress'
import { setLocale }        from '@/i18n/index'
import { sessions }         from '@/data/sessions'
import BaseModal from '@/components/base/BaseModal.vue'
import { AVATAR_ICONS, ONBOARDING_OBJECTIVE_ICONS, sessionTypeIcon } from '@/constants/appIcons'
import dayjs from 'dayjs'

const avatarKeys = Object.keys(AVATAR_ICONS)

const { t }         = useI18n()
const router        = useRouter()
const userStore     = useUserStore()
const authStore     = useAuthStore()
const progressStore = useProgressStore()

const editing       = ref(false)
const editName      = ref('')
const showLogout    = ref(false)
const selectedLang  = ref(userStore.language)

const memberSince = computed(() =>
  userStore.memberSince ? dayjs(userStore.memberSince).format('MMMM YYYY') : '—'
)

const miniStats = computed(() => [
  { icon: 'lucide:headphones', value: progressStore.totalSessions, label: 'Sessions' },
  { icon: 'lucide:clock',      value: progressStore.totalTimeFormatted, label: 'Total time' },
  { icon: 'lucide:flame',      value: progressStore.streakDays + 'd', label: 'Streak' }
])

const favoriteSessions = computed(() =>
  sessions.filter(s => progressStore.favorites.includes(s.id))
)

function startEdit()  { editName.value = userStore.firstName; editing.value = true }
function saveEdit()   { userStore.firstName = editName.value.trim(); editing.value = false }
function cancelEdit() { editing.value = false }

function changeLanguage() { setLocale(selectedLang.value); userStore.language = selectedLang.value }
function confirmLogout()  { showLogout.value = true }
function logout()         { authStore.logout(); router.push({ name: 'landing' }) }

</script>

<style scoped>
.profile-view { padding: 0 0 var(--page-pad-bottom-auth); min-height: var(--app-min-height); background: var(--parchment); }

.profile-view__head {
  background: var(--ink-900); padding: 28px var(--container-pad);
  border-bottom: 2px solid var(--sage-700);
}
.profile-view__title {
  font-family: var(--font-display); font-size: clamp(26px,3.5vw,40px); font-weight: 300;
  color: var(--ink-900); letter-spacing: -0.5px;
  padding: 28px 0 14px;
}

.profile-view__body { padding: 28px var(--container-pad); }
.profile-view__layout { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 24px; align-items: start; }
.profile-col { display: flex; flex-direction: column; gap: 20px; }

/* Cards */
.profile-card {
  background: var(--bg-surface);
  border: 2px solid var(--ink-200); border-radius: var(--radius-lg);
  padding: 24px; display: flex; flex-direction: column; gap: 16px;
  box-shadow: 4px 4px 0 var(--ink-100);
}
.profile-card__title {
  font-family: var(--font-display); font-size: 18px; font-weight: 400;
  color: var(--ink-900); padding-bottom: 12px; border-bottom: 1.5px solid var(--ink-100);
}

/* Avatar */
.profile-avatar-section { display: flex; align-items: center; gap: 16px; }
.profile-avatar-wrap {
  width: 68px; height: 68px; border-radius: var(--radius);
  background: var(--sage-100); border: 2px solid var(--sage-300);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.profile-name { font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--ink-900); }
.profile-name-input {
  font-family: var(--font-body); font-size: 16px; color: var(--ink-900);
  border: 2px solid var(--sage-400); border-radius: var(--radius-sm);
  padding: 8px 12px; background: var(--parchment); outline: none; width: 100%;
}
.profile-name-input:focus { border-color: var(--sage-500); background: white; }
.profile-member-since { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

.avatar-picker__label { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; }
.avatar-picker__grid  { display: flex; gap: 8px; flex-wrap: wrap; }
.avatar-opt {
  width: 42px; height: 42px; border-radius: var(--radius-sm);
  background: var(--parchment-2); border: 2px solid var(--ink-200);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all var(--duration-fast);
}
.avatar-opt:hover    { border-color: var(--sage-400); }
.avatar-opt--active  { border-color: var(--sage-500); background: var(--sage-100); box-shadow: 2px 2px 0 var(--sage-300); }

.profile-card__actions { display: flex; gap: 10px; }

/* Stats */
.profile-stats { flex-direction: row; padding: 20px; justify-content: space-around; }
.profile-stat  { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.profile-stat__icon  { color: var(--sage-500); }
.profile-stat__val   { font-family: var(--font-display); font-size: 28px; font-weight: 300; color: var(--ink-900); }
.profile-stat__label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }

/* Goals */
.profile-goals { display: flex; flex-wrap: wrap; gap: 8px; }
.goal-chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: var(--radius-sm);
  background: var(--sage-100); color: var(--sage-700);
  font-size: 13px; font-weight: 600; text-transform: capitalize;
  border: 1.5px solid var(--sage-200);
}
.goal-chip--edit {
  background: var(--parchment-2); color: var(--text-secondary);
  border-color: var(--ink-200); text-decoration: none;
  transition: all var(--duration-fast);
}
.goal-chip--edit:hover { background: var(--sage-500); color: #fff; border-color: var(--sage-600); }

/* Favorites */
.profile-favorites { display: flex; flex-direction: column; gap: 8px; }
.fav-item {
  display: flex; align-items: center; gap: 12px; padding: 12px;
  border-radius: var(--radius); background: var(--parchment-2);
  border: 1.5px solid var(--ink-100); cursor: pointer; transition: all var(--duration-fast);
}
.fav-item:hover { background: var(--bg-surface); border-color: var(--sage-200); transform: translateX(3px); }
.fav-item__img {
  width: 42px; height: 42px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  border: 1.5px solid var(--ink-100);
}
.fav-item__info  { flex: 1; min-width: 0; }
.fav-item__title { font-size: 14px; font-weight: 600; color: var(--ink-900); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fav-item__meta  { font-size: 12px; color: var(--text-muted); }
.fav-item__remove {
  background: none; border: none; cursor: pointer; color: var(--text-muted);
  padding: 6px; border-radius: var(--radius-sm); transition: all var(--duration-fast);
}
.fav-item__remove:hover { background: #fee2e2; color: #dc2626; }
.profile-empty { font-size: 14px; color: var(--text-muted); }

/* Settings */
.settings-list { display: flex; flex-direction: column; }
.setting-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 0; border-bottom: 1px solid var(--ink-100);
}
.setting-row:last-child { border-bottom: none; }
.setting-row__label { font-size: 15px; color: var(--ink-900); font-weight: 500; }
.setting-row__val   { font-size: 14px; color: var(--text-muted); }
.setting-select {
  padding: 6px 12px; border-radius: var(--radius-sm);
  border: 2px solid var(--ink-200); background: var(--parchment);
  font-family: var(--font-body); font-size: 14px; color: var(--ink-900); cursor: pointer;
  outline: none;
}
.setting-select:focus { border-color: var(--sage-500); }

/* Toggle */
.toggle-btn {
  width: 46px; height: 24px; border-radius: 12px;
  background: var(--ink-200); border: none; cursor: pointer;
  position: relative; transition: background var(--duration-normal);
}
.toggle-btn--on { background: var(--sage-500); }
.toggle-btn__knob {
  position: absolute; top: 2px; left: 2px;
  width: 20px; height: 20px; border-radius: 50%;
  background: white; box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  transition: transform var(--duration-normal) var(--ease-smooth);
}
.toggle-btn--on .toggle-btn__knob { transform: translateX(22px); }

/* Logout */
.logout-btn {
  display: flex; align-items: center; gap: 8px;
  width: 100%; padding: 12px 16px;
  border: 2px solid #fca5a5; border-radius: var(--radius-sm);
  background: #fee2e2; color: #dc2626; cursor: pointer;
  font-family: var(--font-body); font-size: 14px; font-weight: 700;
  transition: all var(--duration-fast);
}
.logout-btn:hover { background: #dc2626; color: white; border-color: #dc2626; }

.profile-btn {
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  font-size: 14px;
  font-weight: 700;
}
.profile-btn--primary {
  background: var(--sage-500);
  color: #fff;
  border-color: var(--sage-600);
}
.profile-btn--secondary {
  background: #fff;
  color: var(--sage-700);
  border-color: var(--sage-300);
}
.profile-btn--ghost {
  background: var(--parchment);
  color: var(--text-secondary);
  border-color: var(--ink-200);
}
.profile-btn--danger {
  background: #dc2626;
  color: #fff;
  border-color: #b91c1c;
}

@media (max-width: 768px) {
  .profile-view__layout { grid-template-columns: 1fr; }
  .profile-card {
    padding: 18px 16px;
  }
  .profile-stats {
    flex-wrap: wrap;
    gap: 14px;
  }
  .profile-card__actions {
    flex-wrap: wrap;
  }
}
</style>
