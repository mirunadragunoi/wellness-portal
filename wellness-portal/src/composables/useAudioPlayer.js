import { ref, watch, onUnmounted } from 'vue'
import { Howl } from 'howler'
import { usePlayerStore } from '@/stores/player'
import { useProgressStore } from '@/stores/progress'

export function useAudioPlayer() {
  const playerStore   = usePlayerStore()
  const progressStore = useProgressStore()

  let howl = null
  let ticker = null

  function load(session) {
    // Clean up previous
    destroy()

    playerStore.loadSession(session)

    // If no real audio yet — use a silent simulation
    if (!session.audioUrl) {
      simulatePlayback(session.duration)
      return
    }

    howl = new Howl({
      src: [session.audioUrl],
      html5: true,
      volume: playerStore.volume,
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
      }
    })
  }

  function play() {
    if (howl) {
      howl.play()
    } else {
      playerStore.play()
      startTicker()
    }
  }

  function pause() {
    if (howl) {
      howl.pause()
    } else {
      playerStore.pause()
      stopTicker()
    }
  }

  function toggle() {
    if (playerStore.isPlaying) pause()
    else play()
  }

  function seek(seconds) {
    playerStore.seek(seconds)
    if (howl) howl.seek(seconds)
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
      progressStore.recordSession(playerStore.currentSession)
    }
  }

  function startTicker() {
    stopTicker()
    ticker = setInterval(() => {
      if (!playerStore.isPlaying) return
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

  // Simulation mode — no real audio file yet
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
  }

  // Sync volume changes
  watch(() => playerStore.volume, v => {
    if (howl) howl.volume(v)
  })

  onUnmounted(destroy)

  return {
    load, play, pause, toggle,
    seek, skipBack, skipForward,
    setVolume, destroy
  }
}
