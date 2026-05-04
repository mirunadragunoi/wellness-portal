import { watch } from 'vue'
import { Howl } from 'howler'
import { usePlayerStore } from '@/stores/player'
import { useProgressStore } from '@/stores/progress'

let howl = null
let ticker = null
let mode = 'idle'
let loadedSessionId = null
let watcherInstalled = false

export function useAudioPlayer() {
  const playerStore   = usePlayerStore()
  const progressStore = useProgressStore()

  if (!watcherInstalled) {
    watch(() => playerStore.volume, v => {
      if (howl) howl.volume(v)
    })
    watcherInstalled = true
  }

  function load(session) {
    if (loadedSessionId !== null && String(loadedSessionId) === String(session.id) && (howl || mode === 'sim')) {
      return
    }
    destroy()
    playerStore.loadSession(session)
    loadedSessionId = session.id

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
        startTicker()
      },
      onpause: () => {
        playerStore.pause()
        stopTicker()
      },
      onstop: () => {
        playerStore.pause()
        stopTicker()
      },
      onend: () => {
        stopTicker()
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
      startTicker()
    }
  }

  function pause() {
    if (howl) {
      howl.pause()
    } else if (mode === 'sim') {
      playerStore.pause()
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
    startTicker()
  }

  function destroy() {
    stopTicker()
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
