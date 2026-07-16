import { watch } from 'vue'
import { Howl } from 'howler'
import { usePlayerStore } from '@/stores/player'
import { useProgressStore } from '@/stores/progress'
import { api } from '@/services/api'

let howl = null
let ticker = null
let mode = 'idle'
let loadedSessionId = null
let watcherInstalled = false

// ─── Consumption tracking (604) — audio ──────────────────────────────────────
// Sum only the wall-clock time actually spent playing (pauses are not counted).
// Log 604 once per listening session: on natural end, on session switch, on
// unmount (destroy), or on tab close (beforeunload). This captures PARTIAL
// consumption (abandon mid-track) without heartbeats — the abandon is caught by
// the switch/unmount/beforeunload flush. Module-level, mirroring the singleton
// howl above.
let watchedSeconds = 0
let playStartTs = null
let loggedConsumption = false
let playingProductId = null
let beforeUnloadBound = false

function startAccum(productId) {
  // A fresh play after a completed/flushed session starts a new session.
  if (loggedConsumption) {
    watchedSeconds = 0
    loggedConsumption = false
  }
  playStartTs = Date.now()
  if (productId != null) playingProductId = productId
}

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
        accumulate()
        stopTicker()
      },
      onstop: () => {
        playerStore.pause()
        accumulate()
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
      accumulate()
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
        if (typeof t === 'number') playerStore.tick(t)
        return
      }

      // simulation mode — drive playback ourselves
      const next = playerStore.currentTime + 1
      if (next >= playerStore.duration) {
        playerStore.tick(playerStore.duration)
        stopTicker()
        flushConsumption()   // 604 — natural end (simulated)
        onComplete()
      } else {
        playerStore.tick(next)
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
