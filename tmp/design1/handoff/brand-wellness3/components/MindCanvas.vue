<template>
  <!--
    MindCanvas.vue — "Clear Mind" particle animation
    Concept: 220 particles (thoughts) spiral inward → dissolve in luminous center
    Folosire: <MindCanvas :size="380" />
    Plasare: src/components/landing/MindCanvas.vue
  -->
  <canvas ref="canvasRef" :style="{ width: size + 'px', height: size + 'px', display: 'block' }" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  size: { type: Number, default: 380 },
})

const canvasRef = ref(null)
let frameId = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width  = props.size * dpr
  canvas.height = props.size * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const cx = props.size / 2
  const cy = props.size / 2
  const TAU = Math.PI * 2

  // Brand palette
  const COLS = [
    [167, 139, 250],  // violet
    [45,  212, 191],  // teal
    [249, 168, 212],  // rose
    [124, 159, 255],  // blue
    [251, 191, 36 ],  // amber
  ]
  const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`

  // Ripple pool — emitted when a particle dissolves at center
  const ripples = []

  // Factory: create a new particle
  function makeParticle(initial = false) {
    const angle    = Math.random() * TAU
    const r        = initial ? 20 + Math.random() * 160 : 110 + Math.random() * 70
    const tanAngle = angle + Math.PI / 2 * (Math.random() > 0.35 ? 1 : -1)
    const speed    = 0.2 + Math.random() * 0.55
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      vx: Math.cos(tanAngle) * speed,
      vy: Math.sin(tanAngle) * speed,
      col: COLS[Math.floor(Math.random() * COLS.length)],
      size: 0.8 + Math.random() * 2.2,
      dir: Math.random() > 0.28 ? 1 : -1,
      wobble: Math.random() * TAU,
      wobbleSpeed: 0.035 + Math.random() * 0.04,
    }
  }

  // Initialize particle pool
  const parts = Array.from({ length: 220 }, (_, i) => makeParticle(true))

  let t = 0

  function draw() {
    // Partial clear → creates light-streak / trail effect
    ctx.fillStyle = 'rgba(7,13,26,0.20)'
    ctx.fillRect(0, 0, props.size, props.size)

    // ── Update & draw particles ──────────────────────────────────────────
    for (let i = 0; i < parts.length; i++) {
      const p  = parts[i]
      const dx = cx - p.x
      const dy = cy - p.y
      const dist = Math.hypot(dx, dy)

      // Reached center → emit ripple, respawn
      if (dist < 5) {
        ripples.push({ r: 5, maxR: 35 + Math.random() * 20, alpha: 0.6, col: p.col })
        Object.assign(p, makeParticle(false))
        continue
      }

      // Radial pull toward center
      const radF = 0.00032 * dist + 0.04
      p.vx += (dx / dist) * radF * 0.012
      p.vy += (dy / dist) * radF * 0.012

      // Tangential force → spiral path
      p.vx += (-dy / dist) * 0.008 * p.dir
      p.vy += ( dx / dist) * 0.008 * p.dir

      // Organic wobble (thought noise, reduces near center)
      p.wobble += p.wobbleSpeed
      const wobbleMag = Math.min(dist / 80, 1) * 0.14
      p.vx += Math.cos(p.wobble) * wobbleMag
      p.vy += Math.sin(p.wobble) * wobbleMag

      // Damping
      p.vx *= 0.992
      p.vy *= 0.992
      p.x  += p.vx
      p.y  += p.vy

      // ── Draw ────────────────────────────────────────────────────────────
      const prox  = 1 - Math.min(dist / 175, 1)
      const alpha = 0.12 + prox * 0.78
      const dr    = p.size * (0.4 + prox * 2.0)

      // Glow halo
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, dr * 5)
      g.addColorStop(0,   rgba(p.col, alpha * 0.85))
      g.addColorStop(0.3, rgba(p.col, alpha * 0.30))
      g.addColorStop(1,   rgba(p.col, 0))
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, dr * 5, 0, TAU)
      ctx.fill()

      // Solid core dot
      ctx.fillStyle = rgba(p.col, Math.min(1, alpha * 2))
      ctx.beginPath()
      ctx.arc(p.x, p.y, dr, 0, TAU)
      ctx.fill()
    }

    // ── Ripples ─────────────────────────────────────────────────────────
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i]
      rp.r     += 1.4
      rp.alpha *= 0.88
      if (rp.alpha < 0.01 || rp.r > rp.maxR) { ripples.splice(i, 1); continue }
      ctx.strokeStyle = rgba(rp.col, rp.alpha * 0.5)
      ctx.lineWidth   = 1
      ctx.beginPath()
      ctx.arc(cx, cy, rp.r, 0, TAU)
      ctx.stroke()
    }

    // ── Ambient concentric rings ─────────────────────────────────────────
    for (let i = 0; i < 4; i++) {
      const base  = 28 + i * 22
      const pulse = Math.sin(t * 0.018 + i * 1.4) * 5
      const a     = (0.07 - i * 0.014) + Math.sin(t * 0.016 + i) * 0.02
      ctx.strokeStyle = i % 2 === 0
        ? `rgba(167,139,250,${a})`
        : `rgba(45,212,191,${a})`
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.arc(cx, cy, base + pulse, 0, TAU)
      ctx.stroke()
    }

    // ── Center "Clear Mind" orb ──────────────────────────────────────────
    const breathe = Math.sin(t * 0.020)
    const coreR   = 11 + breathe * 3.5

    // Outer glow
    const gGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52 + breathe * 6)
    gGlow.addColorStop(0,    'rgba(210,195,255,0.32)')
    gGlow.addColorStop(0.4,  'rgba(167,139,250,0.14)')
    gGlow.addColorStop(0.75, 'rgba(45,212,191,0.05)')
    gGlow.addColorStop(1,    'rgba(167,139,250,0)')
    ctx.fillStyle = gGlow
    ctx.beginPath()
    ctx.arc(cx, cy, 58, 0, TAU)
    ctx.fill()

    // Luminous core
    const gCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR)
    gCore.addColorStop(0,    'rgba(255,253,255,1)')
    gCore.addColorStop(0.45, 'rgba(210,190,255,0.92)')
    gCore.addColorStop(1,    'rgba(167,139,250,0)')
    ctx.fillStyle = gCore
    ctx.beginPath()
    ctx.arc(cx, cy, coreR, 0, TAU)
    ctx.fill()

    t++
    frameId = requestAnimationFrame(draw)
  }

  draw()
})

onUnmounted(() => {
  if (frameId) cancelAnimationFrame(frameId)
})
</script>
