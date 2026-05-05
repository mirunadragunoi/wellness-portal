import { ref, watch } from 'vue'
import { useProgressStore } from '@/stores/progress'

/**
 * Syncs duration from metadata and records session_completion when a native
 * HTML5 practice video (e.g. MP4) finishes. YouTube/Vimeo iframes are out of scope.
 */
export function useNativePracticeVideoProgress(itemRef, nativeVideoRef) {
  const progressStore = useProgressStore()
  const playbackStartedAt = ref(null)

  watch(
    () => itemRef.value?.id,
    () => {
      playbackStartedAt.value = null
    }
  )

  function onLoadedMetadata(ev) {
    const el = ev?.target
    const session = itemRef.value
    if (!el || !session) return
    const d = el.duration
    if (!Number.isFinite(d) || d <= 0) return
    if (!session.duration || session.duration <= 0) {
      session.duration = Math.round(d)
    }
  }

  function onPlay() {
    if (!playbackStartedAt.value) {
      playbackStartedAt.value = new Date().toISOString()
    }
  }

  function onEnded() {
    const session = itemRef.value
    const el = nativeVideoRef.value
    if (!session) return
    const endedAt = new Date().toISOString()
    const startedAt = playbackStartedAt.value || endedAt
    let listened = Math.round(el?.currentTime ?? 0)
    if (!listened && session.duration) listened = session.duration
    progressStore.recordSession(session, {
      started_at: startedAt,
      ended_at: endedAt,
      duration_seconds: Math.max(0, listened),
      completed: true
    })
    playbackStartedAt.value = null
  }

  return {
    onLoadedMetadata,
    onPlay,
    onEnded
  }
}
