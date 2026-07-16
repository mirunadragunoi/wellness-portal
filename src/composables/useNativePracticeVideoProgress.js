import { ref, watch, onBeforeUnmount } from 'vue'
import { useProgressStore } from '@/stores/progress'
import { api } from '@/services/api'

/**
 * Syncs duration from metadata and records session_completion when a native
 * HTML5 practice video (e.g. MP4) finishes. YouTube/Vimeo iframes are out of scope.
 *
 * Also emits user-action logging (store.portal_event_log):
 *   - 602 launch      on first play of the video product;
 *   - 604 consumption on natural end, prolonged pause abandon, unmount, or tab
 *     close — summing only wall-clock time actually played (pauses excluded).
 *     This captures PARTIAL consumption without heartbeats: the abandon is
 *     caught by the unmount / beforeunload / item-change flush.
 */
export function useNativePracticeVideoProgress(itemRef, nativeVideoRef) {
  const progressStore = useProgressStore()
  const playbackStartedAt = ref(null)

  // ─── 602/604 accumulator (per component instance) ──────────────────────────
  let watchedSeconds = 0
  let playStartTs = null
  let loggedConsumption = false
  let launched = false          // 602 fired once per product
  let playingProductId = null
  let pauseListenerEl = null    // native <video> we attached a 'pause' listener to

  function accumulate() {
    if (playStartTs != null) {
      watchedSeconds += (Date.now() - playStartTs) / 1000
      playStartTs = null
    }
  }

  function flushConsumption() {
    accumulate()
    const seconds = Math.round(watchedSeconds)
    if (!loggedConsumption && seconds >= 1 && playingProductId != null) {
      api.logEvent({ event_type: 604, product: playingProductId, duration_seconds: seconds })
      loggedConsumption = true
    }
  }

  function resetConsumption() {
    watchedSeconds = 0
    playStartTs = null
    loggedConsumption = false
    launched = false
    playingProductId = null
  }

  function onNativePause() {
    // Accumulate the played span; do NOT log here (user may resume). The log
    // happens on end / unmount / beforeunload / item change.
    accumulate()
  }

  function attachPauseListener(el) {
    if (el && el !== pauseListenerEl) {
      detachPauseListener()
      el.addEventListener('pause', onNativePause)
      pauseListenerEl = el
    }
  }

  function detachPauseListener() {
    if (pauseListenerEl) {
      pauseListenerEl.removeEventListener('pause', onNativePause)
      pauseListenerEl = null
    }
  }

  // Flush the previous video's consumption when navigating to another product.
  watch(
    () => itemRef.value?.id,
    () => {
      flushConsumption()
      resetConsumption()
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
    const productId = itemRef.value?.id ?? playingProductId
    if (productId != null) playingProductId = productId

    // A fresh play after a completed/flushed session starts a new span.
    if (loggedConsumption) {
      watchedSeconds = 0
      loggedConsumption = false
    }
    playStartTs = Date.now()

    // 602 launch — user started this video product (once per product).
    if (!launched && productId != null) {
      api.logEvent({ event_type: 602, product: productId })
      launched = true
    }

    // Attach a native pause listener so partial spans are counted even though
    // the template only binds @play/@ended.
    attachPauseListener(nativeVideoRef.value)
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

    // 604 — natural end of the video.
    flushConsumption()
  }

  // Flush on tab close and on component unmount (partial-consumption abandon).
  const onBeforeUnload = () => flushConsumption()
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', onBeforeUnload)
  }
  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
    flushConsumption()
    detachPauseListener()
  })

  return {
    onLoadedMetadata,
    onPlay,
    onEnded
  }
}
