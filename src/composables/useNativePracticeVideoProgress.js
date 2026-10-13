import { ref, watch, onBeforeUnmount } from 'vue'
import { useProgressStore } from '@/stores/progress'
import { api } from '@/services/api'
import { createCoverageTracker, createPeriodicEmitter } from './coverageCore'

/**
 * Syncs duration from metadata and records session_completion when a native
 * HTML5 practice video (e.g. MP4) finishes. YouTube/Vimeo iframes are out of scope.
 *
 * Emits user-action logging (store.portal_event_log):
 *   - 602 launch      on first play of the video product;
 *   - 604 consumption as CONTENT COVERAGE (varianta b): distinct seconds of the
 *     clip actually rendered, emitted as DELTA periodically (60 s, only when
 *     coverage grows) and on flush (end / unmount / tab close / item change).
 *     This REPLACES the old wall-clock 604 — a seek-to-end no longer inflates it.
 *
 * UNCHANGED: the wellness progress system (progressStore.recordSession with
 * currentTime) and breathing. This only migrates the portal_event_log 604.
 */
export function useNativePracticeVideoProgress(itemRef, nativeVideoRef) {
  const progressStore = useProgressStore()
  const playbackStartedAt = ref(null)

  // ─── 602/604 coverage accumulator (per component instance) ──────────────────
  let tracker = null
  let periodic = null
  let launched = false          // 602 fired once per product
  let playingProductId = null
  let listenerEl = null         // native <video> we attached pause/timeupdate to

  function ensureTracker() {
    if (tracker) return
    const pid = playingProductId
    tracker = createCoverageTracker((delta) => {
      if (pid != null) api.logEvent({ event_type: 604, product: pid, duration_seconds: delta })
    })
    periodic = createPeriodicEmitter(() => { if (tracker) tracker.emitDelta() }, { intervalMs: 60000 })
  }

  function flushConsumption() {
    if (periodic) periodic.stop()
    if (tracker) tracker.emitDelta()   // residual delta only — never cumulative
  }

  function resetConsumption() {
    if (periodic) periodic.stop()
    tracker = null
    periodic = null
    launched = false
    playingProductId = null
  }

  function markNow() {
    if (tracker && listenerEl) tracker.markSecond(listenerEl.currentTime)
  }

  function onNativeTime() { markNow() }
  function onNativePause() { markNow() }   // bank the current second; not a 604 flush

  function attachListeners(el) {
    if (el && el !== listenerEl) {
      detachListeners()
      el.addEventListener('pause', onNativePause)
      el.addEventListener('timeupdate', onNativeTime)
      listenerEl = el
    }
  }

  function detachListeners() {
    if (listenerEl) {
      listenerEl.removeEventListener('pause', onNativePause)
      listenerEl.removeEventListener('timeupdate', onNativeTime)
      listenerEl = null
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

    ensureTracker()
    if (periodic) periodic.start()

    // 602 launch — user started this video product (once per product).
    if (!launched && productId != null) {
      api.logEvent({ event_type: 602, product: productId })
      launched = true
    }

    // Attach pause + timeupdate listeners so coverage is marked even though the
    // template only binds @play/@ended.
    attachListeners(nativeVideoRef.value)
  }

  function onEnded() {
    const session = itemRef.value
    const el = nativeVideoRef.value
    if (!session) return
    const endedAt = new Date().toISOString()
    const startedAt = playbackStartedAt.value || endedAt
    let listened = Math.round(el?.currentTime ?? 0)
    if (!listened && session.duration) listened = session.duration
    // UNCHANGED: wellness progress system (content position), not portal_event_log.
    progressStore.recordSession(session, {
      started_at: startedAt,
      ended_at: endedAt,
      duration_seconds: Math.max(0, listened),
      completed: true
    })
    playbackStartedAt.value = null

    // 604 — natural end of the video (residual coverage delta).
    markNow()
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
    detachListeners()
    resetConsumption()
  })

  return {
    onLoadedMetadata,
    onPlay,
    onEnded
  }
}
