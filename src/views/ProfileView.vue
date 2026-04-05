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
.profile-view { padding: 40px 0 var(--page-pad-bottom-auth); min-height: var(--app-min-height); }
.profile-view__title {
  font-family: var(--font-display); font-size: clamp(32px,4vw,48px);
  font-weight: 300; color: var(--text-primary); letter-spacing: -0.5px; margin-bottom: 32px;
}
.profile-view__layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 28px; align-items: start; }

/* Cards */
.profile-card {
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); padding: 28px;
  display: flex; flex-direction: column; gap: 20px; margin-bottom: 20px;
}
.profile-col { display: flex; flex-direction: column; }
.profile-card__title { font-family: var(--font-display); font-size: 20px; font-weight: 500; color: var(--text-primary); }

/* Avatar */
.profile-avatar-section { display: flex; align-items: center; gap: 16px; }
.profile-avatar-wrap {
  width: 72px; height: 72px; border-radius: 50%;
  background: var(--sky-100); border: 3px solid var(--sky-200);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.profile-name       { font-family: var(--font-display); font-size: 24px; font-weight: 500; color: var(--text-primary); }
.profile-name-input {
  font-family: var(--font-display); font-size: 22px; color: var(--text-primary);
  border: 1.5px solid var(--sky-400); border-radius: var(--radius-sm);
  padding: 6px 12px; background: var(--bg-base); outline: none; width: 100%;
}
.profile-member-since { font-size: 13px; color: var(--text-muted); margin-top: 4px; }

.avatar-picker__label { font-size: 13px; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
.avatar-picker__grid  { display: flex; gap: 8px; flex-wrap: wrap; }
.avatar-opt {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--bg-muted); border: 2px solid transparent;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all var(--duration-fast);
}
.avatar-opt:hover      { border-color: var(--sky-300); }
.avatar-opt--active    { border-color: var(--sky-500); background: var(--sky-50); }

.profile-card__actions { display: flex; gap: 10px; }

/* Stats mini */
.profile-stats { flex-direction: row; gap: 0; padding: 20px; justify-content: space-around; }
.profile-stat  { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.profile-stat__icon { color: var(--sky-600); }
.profile-stat__val   { font-family: var(--font-display); font-size: 24px; font-weight: 300; color: var(--text-primary); }
.profile-stat__label { font-size: 12px; color: var(--text-muted); }

/* Goals */
.profile-goals { display: flex; flex-wrap: wrap; gap: 8px; }
.goal-chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 100px;
  background: var(--sky-100); color: var(--sky-700);
  font-size: 13px; font-weight: 500; text-transform: capitalize;
}
.goal-chip__icon { flex-shrink: 0; }
.goal-chip--edit {
  display: inline-flex; align-items: center; gap: 4px;
  background: var(--bg-muted); color: var(--text-secondary);
  text-decoration: none; font-weight: 500;
  transition: all var(--duration-fast);
}
.goal-chip__chev { color: var(--text-muted); flex-shrink: 0; }
.goal-chip--edit:hover { background: var(--sky-100); color: var(--sky-700); }

/* Favorites */
.profile-favorites { display: flex; flex-direction: column; gap: 10px; }
.fav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px; border-radius: var(--radius);
  background: var(--bg-muted); cursor: pointer;
  transition: all var(--duration-fast);
}
.fav-item:hover { background: var(--sky-50); }
.fav-item__img {
  width: 44px; height: 44px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.fav-item__info  { flex: 1; min-width: 0; }
.fav-item__title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fav-item__meta  { font-size: 12px; color: var(--text-muted); }
.fav-item__remove {
  background: none; border: none; cursor: pointer; color: var(--text-muted);
  padding: 6px; border-radius: 50%; transition: all var(--duration-fast);
  display: flex; align-items: center; justify-content: center;
}
.fav-item__remove:hover { background: #fee2e2; color: #dc2626; }
.profile-empty { font-size: 14px; color: var(--text-muted); }

/* Settings */
.settings-list { display: flex; flex-direction: column; gap: 0; }
.setting-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 0; border-bottom: 1px solid var(--border-subtle);
}
.setting-row:last-child { border-bottom: none; }
.setting-row__label { font-size: 15px; color: var(--text-primary); font-weight: 500; }
.setting-row__val   { font-size: 14px; color: var(--text-muted); }
.setting-select {
  padding: 6px 12px; border-radius: var(--radius-sm);
  border: 1.5px solid var(--border-default); background: var(--bg-base);
  font-family: var(--font-body); font-size: 14px; color: var(--text-primary); cursor: pointer;
}

/* Toggle */
.toggle-btn {
  width: 48px; height: 26px; border-radius: 100px;
  background: var(--bg-muted); border: none; cursor: pointer;
  position: relative; transition: background var(--duration-normal);
}
.toggle-btn--on { background: var(--sky-500); }
.toggle-btn__knob {
  position: absolute; top: 3px; left: 3px;
  width: 20px; height: 20px; border-radius: 50%;
  background: white; box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  transition: transform var(--duration-normal) var(--ease-bounce);
}
.toggle-btn--on .toggle-btn__knob { transform: translateX(22px); }

/* Logout */
.logout-btn {
  padding: 12px 24px; border-radius: 100px;
  background: #fee2e2; color: #dc2626;
  border: 1px solid #fca5a5; font-family: var(--font-body);
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all var(--duration-fast); align-self: flex-start;
}
.logout-btn:hover { background: #fecaca; }

/* Buttons */
.profile-btn { padding: 10px 22px; border-radius: 100px; font-family: var(--font-body); font-size: 14px; font-weight: 500; cursor: pointer; border: none; transition: all var(--duration-fast); }
.profile-btn--primary   { background: linear-gradient(135deg,var(--sky-500),var(--sky-600)); color: white; }
.profile-btn--secondary { background: var(--bg-muted); color: var(--text-secondary); border: 1.5px solid var(--border-default); }
.profile-btn--ghost     { background: transparent; color: var(--text-muted); }
.profile-btn--danger    { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }
.profile-btn--primary:hover   { transform: translateY(-1px); }
.profile-btn--secondary:hover { border-color: var(--sky-300); color: var(--sky-600); }

@media (max-width: 768px) {
  .profile-view__layout { grid-template-columns: 1fr; }
}
</style>
