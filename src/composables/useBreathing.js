import { ref, computed, onUnmounted } from 'vue'
import { breathingTypes } from '@/data/phrases'

export function useBreathing(typeId) {
  const config    = breathingTypes[typeId] || breathingTypes.box
  const pattern   = config.pattern

  const isRunning     = ref(false)
  const isPaused      = ref(false)
  const phaseIndex    = ref(0)
  const phaseCountdown = ref(0)
  const totalElapsed  = ref(0)
  const totalDuration = ref(config.availableDurations[0])
  const rounds        = ref(0)
  const isComplete    = ref(false)

  let ticker = null

  const currentPhase = computed(() => pattern[phaseIndex.value])
  const progress = computed(() => (totalElapsed.value / totalDuration.value) * 100)
  const formattedRemaining = computed(() => {
    const rem = totalDuration.value - totalElapsed.value
    const m = Math.floor(rem / 60)
    const s = rem % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  })

  function setDuration(seconds) {
    totalDuration.value = seconds
    reset()
  }

  function start() {
    if (isComplete.value) reset()
    phaseIndex.value    = 0
    phaseCountdown.value = pattern[0].duration
    isRunning.value = true
    isPaused.value  = false
    tick()
  }

  function pause() {
    isPaused.value = !isPaused.value
    if (isPaused.value) stopTicker()
    else tick()
  }

  function stop() {
    reset()
  }

  function reset() {
    stopTicker()
    isRunning.value     = false
    isPaused.value      = false
    isComplete.value    = false
    phaseIndex.value    = 0
    phaseCountdown.value = pattern[0].duration
    totalElapsed.value  = 0
    rounds.value        = 0
  }

  function tick() {
    stopTicker()
    ticker = setInterval(() => {
      if (isPaused.value || !isRunning.value) return

      phaseCountdown.value--
      totalElapsed.value++

      if (totalElapsed.value >= totalDuration.value) {
        complete()
        return
      }

      if (phaseCountdown.value <= 0) {
        nextPhase()
      }
    }, 1000)
  }

  function nextPhase() {
    phaseIndex.value = (phaseIndex.value + 1) % pattern.length
    if (phaseIndex.value === 0) rounds.value++
    phaseCountdown.value = pattern[phaseIndex.value].duration
  }

  function complete() {
    stopTicker()
    isRunning.value  = false
    isComplete.value = true
  }

  function stopTicker() {
    if (ticker) { clearInterval(ticker); ticker = null }
  }

  onUnmounted(stopTicker)

  return {
    config,
    pattern,
    isRunning,
    isPaused,
    isComplete,
    currentPhase,
    phaseIndex,
    phaseCountdown,
    totalElapsed,
    totalDuration,
    rounds,
    progress,
    formattedRemaining,
    setDuration,
    start,
    pause,
    stop,
    reset
  }
}
