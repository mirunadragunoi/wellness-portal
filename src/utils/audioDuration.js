/**
 * Client-side media duration (seconds) from browser metadata — used when the API
 * omits duration for MP3 (type 6) and direct MP4 / file practice videos (type 5).
 */

function isEmbedWatchUrl(url) {
  return /youtube\.com|youtu\.be|vimeo\.com/i.test(url || '')
}

/**
 * Direct file URL for practice video (not YouTube/Vimeo embed).
 * Matches PracticeVideoView: videoPresentation first, then product url.
 */
export function practiceDirectVideoUrl(p) {
  const a = (p.videoPresentation || '').trim()
  const b = (p.audioUrl || '').trim()
  if (a && !isEmbedWatchUrl(a)) return a
  if (b && !isEmbedWatchUrl(b)) return b
  return ''
}

export function probeAudioDurationSeconds(url, timeoutMs = 20000) {
  if (!url || typeof url !== 'string') return Promise.resolve(0)
  return new Promise((resolve) => {
    const audio = new Audio()
    let settled = false
    const finish = (sec) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('error', onErr)
      audio.removeAttribute('src')
      audio.load()
      resolve(sec)
    }
    const onMeta = () => {
      const d = audio.duration
      const sec = Number.isFinite(d) && d > 0 ? Math.round(d) : 0
      finish(sec)
    }
    const onErr = () => finish(0)
    const timer = setTimeout(() => finish(0), timeoutMs)
    audio.preload = 'metadata'
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('error', onErr)
    audio.src = url
    audio.load()
  })
}

export function probeVideoDurationSeconds(url, timeoutMs = 20000) {
  if (!url || typeof url !== 'string') return Promise.resolve(0)
  return new Promise((resolve) => {
    const video = document.createElement('video')
    let settled = false
    const finish = (sec) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('error', onErr)
      video.removeAttribute('src')
      video.load()
      resolve(sec)
    }
    const onMeta = () => {
      const d = video.duration
      const sec = Number.isFinite(d) && d > 0 ? Math.round(d) : 0
      finish(sec)
    }
    const onErr = () => finish(0)
    const timer = setTimeout(() => finish(0), timeoutMs)
    video.preload = 'metadata'
    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('error', onErr)
    video.src = url
    video.load()
  })
}

/** store.product.type === 6 (MP3) */
export function productNeedsClientAudioDuration(p) {
  return (
    Number(p.rawType) === 6 &&
    !!p.audioUrl &&
    (!Number(p.duration) || Number(p.duration) <= 0)
  )
}

/** Practice video (DB type 5 or mapped `type === 'practice'`) with a direct file URL (e.g. MP4), not YouTube/Vimeo. */
export function productNeedsClientPracticeDuration(p) {
  const url = practiceDirectVideoUrl(p)
  if (!url) return false
  if (Number(p.duration) > 0) return false
  return p.type === 'practice' || Number(p.rawType) === 5
}

/**
 * Fills `product.duration` (seconds) for MP3 + practice MP4/file rows missing API duration.
 */
export async function hydrateClientMediaDurations(products, concurrency = 4) {
  const jobs = []
  for (const p of products || []) {
    if (productNeedsClientAudioDuration(p)) {
      jobs.push({ p, url: p.audioUrl, probe: probeAudioDurationSeconds })
    } else if (productNeedsClientPracticeDuration(p)) {
      jobs.push({ p, url: practiceDirectVideoUrl(p), probe: probeVideoDurationSeconds })
    }
  }
  if (!jobs.length) return

  let i = 0
  async function worker() {
    while (i < jobs.length) {
      const { p, url, probe } = jobs[i++]
      const sec = await probe(url)
      if (sec > 0) p.duration = sec
    }
  }
  const n = Math.min(concurrency, jobs.length)
  await Promise.all(Array.from({ length: n }, () => worker()))
}

/** @deprecated use hydrateClientMediaDurations */
export async function hydrateMp3DurationsFromUrls(products, concurrency = 4) {
  return hydrateClientMediaDurations(products, concurrency)
}
