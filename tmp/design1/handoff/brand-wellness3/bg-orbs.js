/**
 * bg-orbs.js — Animated background canvas orbs
 * Plasare: src/assets/bg-orbs.js (sau inline în App.vue)
 *
 * Utilizare în App.vue:
 *   <canvas id="bg-canvas" />
 *
 *   import { initBgOrbs } from '@/assets/bg-orbs.js'
 *   onMounted(() => initBgOrbs())
 */

export function initBgOrbs() {
  const canvas = document.getElementById('bg-canvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let W, H

  const orbs = [
    { x: .15, y: .20, r: .35, color: 'rgba(124,159,255,', speed: .00007, offset: 0   },
    { x: .75, y: .15, r: .30, color: 'rgba(167,139,250,', speed: .00009, offset: 2   },
    { x: .50, y: .65, r: .28, color: 'rgba(45,212,191,',  speed: .00006, offset: 4   },
    { x: .85, y: .70, r: .22, color: 'rgba(249,168,212,', speed: .00008, offset: 1.5 },
    { x: .10, y: .75, r: .20, color: 'rgba(251,191,36,',  speed: .00005, offset: 3   },
  ]

  function resize() {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  }

  resize()
  window.addEventListener('resize', resize)

  let t = 0
  let frameId = null

  function draw() {
    ctx.clearRect(0, 0, W, H)

    orbs.forEach(o => {
      const phase = t * o.speed + o.offset
      const px = (o.x + Math.sin(phase) * .06) * W
      const py = (o.y + Math.cos(phase * .7) * .08) * H
      const rad = o.r * Math.min(W, H)

      const g = ctx.createRadialGradient(px, py, 0, px, py, rad)
      g.addColorStop(0,   o.color + '0.12)')
      g.addColorStop(0.5, o.color + '0.06)')
      g.addColorStop(1,   o.color + '0)')

      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(px, py, rad, 0, Math.PI * 2)
      ctx.fill()
    })

    t++
    frameId = requestAnimationFrame(draw)
  }

  draw()

  // Returnează cleanup function
  return () => {
    cancelAnimationFrame(frameId)
    window.removeEventListener('resize', resize)
  }
}
