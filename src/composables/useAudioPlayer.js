import { watch } from 'vue'
import { Howl } from 'howler'
import { usePlayerStore } from '@/stores/player'
import { useProgressStore } from '@/stores/progress'
import { api } from '@/services/api'
import { createCoverageTracker, createPeriodicEmitter } from './coverageCore'

let howl = null
let ticker = null
let mode = 'idle'
let loadedSessionId = null
let watcherInstalled = false

// ─── Consumption tracking (604) — audio, CONTENT COVERAGE (varianta b) ───────
// DISTINCT seconds of the track actually played (seek-safe, re-listen dedupes),
// NOT wall-clock. The position source is the existing 1 s ticker (real:
// howl.seek(); sim: playerStore.currentTime). 604 emitted as DELTA periodically
// (60 s) and on flush (natural end, session switch, unmount, tab close). This
// REPLACES the old wall-clock 604 — no second path, no double counting.
let tracker = null
let periodic = null
let playingProductId = null
let beforeUnloadBound = false

function ensureTracker() {
  if (tracker) return
  const pid = playingProductId
  tracker = createCoverageTracker((delta) => {
    if (pid != null) api.logEvent({ event_type: 604, product: pid, duration_seconds: delta })
  })
  periodic = createPeriodicEmitter(() => { if (tracker) tracker.emitDelta() }, { intervalMs: 60000 })
}

function startAccum(productId) {
  if (productId != null) playingProductId = productId
  ensureTracker()
  if (periodic) periodic.start()
}

// Mark the whole second currently being rendered (fed by the 1 s ticker).
function markPosition(sec) {
  if (tracker && typeof sec === 'number' && isFinite(sec)) tracker.markSecond(sec)
}

function flushConsumption() {
  if (periodic) periodic.stop()
  if (tracker) tracker.emitDelta()   // residual delta only — never cumulative
}

function resetConsumption() {
  if (periodic) periodic.stop()
  tracker = null
  periodic = null
  playingProductId = null
}

export function useAudioPlayer() {
  const playerStore   = usePlayerStore()
  const progressStore = useProgressStore()

  if (!watcherInstalled) {
    watch(() => playerStore.volume, v => {
      if (howl) howl.volume(v)
    })
    watcherInstalled = true
  }

  // Flush any pending 604 on tab close. Bound once (module-level guard).
  if (!beforeUnloadBound && typeof window !== 'undefined') {
    window.addEventListener('beforeunload', flushConsumption)
    beforeUnloadBound = true
  }

  function load(session) {
    if (loadedSessionId !== null && String(loadedSessionId) === String(session.id) && (howl || mode === 'sim')) {
      return
    }
    destroy()               // flushes the previous session's 604 (see destroy)
    playerStore.loadSession(session)
    loadedSessionId = session.id
    playingProductId = session.id

    // 602 launch — user started this audio product (once per session load).
    api.logEvent({ event_type: 602, product: session.id })

    if (!session.audioUrl) {
      mode = 'sim'
      simulatePlayback(session.duration)
      return
    }

    mode = 'real'
    howl = new Howl({
      src: [session.audioUrl],
      html5: true,
      volume: playerStore.volume,
      onload: () => {
        const realDuration = howl?.duration() || 0
        if (realDuration) {
          playerStore.duration = realDuration
          const s = playerStore.currentSession
          if (s) s.duration = Math.round(realDuration)
        }
      },
      onplay: () => {
        playerStore.play()
        startAccum(playerStore.currentSession?.id)
        startTicker()
      },
      onpause: () => {
        playerStore.pause()
        if (periodic) periodic.stop()   // coverage already marked up to last tick
        stopTicker()
      },
      onstop: () => {
        playerStore.pause()
        if (periodic) periodic.stop()
        stopTicker()
      },
      onend: () => {
        stopTicker()
        flushConsumption()   // 604 — natural end of the track
        onComplete()
      },
      onloaderror: (_, err) => {
        console.error('Audio load error', err)
      },
      onplayerror: (_, err) => {
        console.error('Audio play error', err)
      }
    })
  }

  function play() {
    if (howl) {
      howl.play()
    } else if (mode === 'sim') {
      playerStore.play()
      startAccum(playerStore.currentSession?.id)
      startTicker()
    }
  }

  function pause() {
    if (howl) {
      howl.pause()
    } else if (mode === 'sim') {
      playerStore.pause()
      if (periodic) periodic.stop()
      stopTicker()
    }
  }

  function toggle() {
    if (playerStore.isPlaying) pause()
    else play()
  }

  function seek(seconds) {
    const clamped = Math.max(0, Math.min(seconds, playerStore.duration || 0))
    playerStore.seek(clamped)
    if (howl) howl.seek(clamped)
  }

  function skipBack()    { seek(playerStore.currentTime - 15) }
  function skipForward() { seek(playerStore.currentTime + 15) }

  function setVolume(v) {
    playerStore.setVolume(v)
    if (howl) howl.volume(v)
  }

  function onComplete() {
    playerStore.complete()
    if (playerStore.currentSession) {
      const endedAt = new Date().toISOString()
      const startedAt = playerStore.playbackStartedAt || endedAt
      const listened = Math.max(
        0,
        Math.round(playerStore.currentTime || playerStore.duration || 0)
      )
      progressStore.recordSession(playerStore.currentSession, {
        started_at: startedAt,
        ended_at: endedAt,
        duration_seconds: listened,
        completed: true
      })
    }
  }

  function startTicker() {
    stopTicker()
    ticker = setInterval(() => {
      if (!playerStore.isPlaying) return

      if (mode === 'real' && howl) {
        const t = howl.seek()
        if (typeof t === 'number') { playerStore.tick(t); markPosition(t) }  // 604 coverage
        return
      }

      // simulation mode — drive playback ourselves. Position is real (tracked in
      // playerStore.currentTime), so coverage is measured, not invented.
      const next = playerStore.currentTime + 1
      if (next >= playerStore.duration) {
        playerStore.tick(playerStore.duration)
        markPosition(playerStore.duration)   // 604 coverage — final second
        stopTicker()
        flushConsumption()   // 604 — natural end (simulated)
        onComplete()
      } else {
        playerStore.tick(next)
        markPosition(next)   // 604 coverage
      }
    }, 1000)
  }

  function stopTicker() {
    if (ticker) { clearInterval(ticker); ticker = null }
  }

  function simulatePlayback(duration) {
    playerStore.duration = duration
    playerStore.play()
    startAccum(playerStore.currentSession?.id)
    startTicker()
  }

  function destroy() {
    stopTicker()
    // Flush the previous session's 604 before tearing down (covers session
    // switch and component unmount / partial-consumption abandon).
    flushConsumption()
    resetConsumption()
    if (howl) {
      howl.unload()
      howl = null
    }
    mode = 'idle'
    loadedSessionId = null
  }

  return {
    load, play, pause, toggle,
    seek, skipBack, skipForward,
    setVolume, destroy
  }
}
