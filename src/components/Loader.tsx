import { useEffect, useRef, useState } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import worldTopo from 'world-atlas/land-110m.json'

// Parse the TopoJSON land topology into a GeoJSON FeatureCollection once
const topo    = worldTopo as Topology<{ land: GeometryCollection }>
const landGeo = feature(topo, topo.objects.land)

// ── Satellites ────────────────────────────────────────────────────────────────
interface Sat { speed: number; tilt: number; phase: number; orbitR: number; size: number }
const SATS: Sat[] = [
  { speed:  0.38, tilt:  0.45, phase: 0,   orbitR: 1.42, size: 2.8 },
  { speed: -0.24, tilt: -0.65, phase: 2.1, orbitR: 1.32, size: 2.2 },
  { speed:  0.58, tilt:  1.05, phase: 4.2, orbitR: 1.52, size: 1.8 },
]

// ── Component ─────────────────────────────────────────────────────────────────
interface LoaderProps { onDone: () => void }

export default function Loader({ onDone }: LoaderProps) {
  const canvasRef             = useRef<HTMLCanvasElement>(null)
  const [pct, setPct]         = useState(0)
  const [leaving, setLeaving] = useState(false)
  const rafRef    = useRef(0)
  const exitRef   = useRef(false)
  const exitTsRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    canvas.style.width  = `${W}px`
    canvas.style.height = `${H}px`

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const cx = W / 2
    const cy = H / 2
    const R  = Math.min(W, H) * 0.32

    const LOAD_DUR = 4500
    const EXIT_DUR = 1100
    let start = 0

    const render = (ts: number) => {
      if (!start) start = ts

      // Loading progress
      const rawP  = Math.min((ts - start) / LOAD_DUR, 1)
      const eased = rawP === 1 ? 1 : 1 - Math.pow(2, -10 * rawP)
      setPct(Math.round(eased * 100))

      // Exit: tilt view to north pole + zoom
      let viewLat   = 0    // orthographic view-centre latitude (degrees)
      let scale     = 1
      let exitAlpha = 1

      if (exitRef.current) {
        if (!exitTsRef.current) exitTsRef.current = ts
        const ep = Math.min((ts - exitTsRef.current) / EXIT_DUR, 1)
        const ee = 1 - Math.pow(2, -8 * ep)
        viewLat   = ee * 62  // 20° base + 62° tilt = 82° (north pole)
        scale     = 1 + ee * 5.5
        exitAlpha = ep > 0.65 ? 1 - (ep - 0.65) / 0.35 : 1
        if (ep >= 1) {
          setLeaving(true)
          setTimeout(onDone, 700)
          return
        }
      }

      ctx.clearRect(0, 0, W, H)

      const Rs = R * scale  // scaled radius

      // Build d3-geo orthographic projection for this frame
      // Globe faces India (78°E, 20°N) at rest.
      // During exit, viewLat 0→62 tilts phi from -20 → -82 (north pole centred).
      const projection = geoOrthographic()
        .scale(Rs)
        .translate([cx, cy])
        .rotate([-78, -(20 + viewLat), 0])
        .clipAngle(90)

      const pathFn    = geoPath(projection, ctx)
      const graticule = geoGraticule().step([30, 30])()

      // ── Atmosphere glow ───────────────────────────────────────────────────
      const atm = ctx.createRadialGradient(cx, cy, Rs * 0.90, cx, cy, Rs * 1.18)
      atm.addColorStop(0,   'transparent')
      atm.addColorStop(0.5, `rgba(0,229,116,${(0.07 * exitAlpha).toFixed(2)})`)
      atm.addColorStop(1,   'transparent')
      ctx.beginPath(); ctx.arc(cx, cy, Rs * 1.18, 0, Math.PI * 2)
      ctx.fillStyle = atm; ctx.fill()

      // ── Clip to globe circle ──────────────────────────────────────────────
      ctx.save()
      ctx.beginPath(); ctx.arc(cx, cy, Rs, 0, Math.PI * 2); ctx.clip()

      // Dark base
      ctx.fillStyle = '#030810'
      ctx.fillRect(cx - Rs - 1, cy - Rs - 1, Rs * 2 + 2, Rs * 2 + 2)

      // Green ocean rises from bottom (cy+Rs) to top (cy-Rs) as eased 0→1
      const fillY = cy + Rs * (1 - 2 * eased)
      ctx.fillStyle = `rgba(0,229,116,${(0.78 * exitAlpha).toFixed(2)})`
      ctx.fillRect(cx - Rs - 1, fillY, Rs * 2 + 2, cy + Rs + 1 - fillY)

      // Very faint tint on the unfilled portion
      ctx.fillStyle = `rgba(0,229,116,${(0.04 * exitAlpha).toFixed(2)})`
      ctx.fillRect(cx - Rs - 1, cy - Rs - 1, Rs * 2 + 2, fillY - (cy - Rs - 1))

      // Graticule (lat/lng grid)
      ctx.beginPath()
      pathFn(graticule)
      ctx.strokeStyle = `rgba(0,229,116,${(0.07 * exitAlpha).toFixed(2)})`
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Land — real Natural Earth 110m geometry via d3-geo
      ctx.beginPath()
      pathFn(landGeo)
      ctx.fillStyle = `rgba(6,10,18,${(0.90 * exitAlpha).toFixed(2)})`
      ctx.fill()
      ctx.strokeStyle = `rgba(0,229,116,${(0.30 * exitAlpha).toFixed(2)})`
      ctx.lineWidth = 0.8
      ctx.stroke()

      ctx.restore()

      // ── Globe border ──────────────────────────────────────────────────────
      ctx.beginPath(); ctx.arc(cx, cy, Rs, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(0,229,116,${(0.20 * exitAlpha).toFixed(2)})`
      ctx.lineWidth = 1
      ctx.stroke()

      // ── Satellites ────────────────────────────────────────────────────────
      if (exitAlpha > 0.01) {
        for (const sat of SATS) {
          const t  = ts * 0.001 * sat.speed + sat.phase
          const orbitA = Rs * sat.orbitR
          const orbitB = orbitA * 0.38 * Math.abs(Math.cos(sat.tilt))

          // Orbit ellipse ring
          ctx.beginPath()
          ctx.ellipse(cx, cy, orbitA, orbitB, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(0,229,116,${(0.08 * exitAlpha).toFixed(2)})`
          ctx.lineWidth = 0.6
          ctx.stroke()

          // Satellite position
          const sx = cx + orbitA * Math.cos(t)
          const sy = cy + orbitB * Math.sin(t)

          // Glow halo
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, 14)
          grd.addColorStop(0,   `rgba(0,229,116,${(0.88 * exitAlpha).toFixed(2)})`)
          grd.addColorStop(0.4, `rgba(0,229,116,${(0.20 * exitAlpha).toFixed(2)})`)
          grd.addColorStop(1,   'transparent')
          ctx.beginPath(); ctx.arc(sx, sy, 14, 0, Math.PI * 2)
          ctx.fillStyle = grd; ctx.fill()

          // Core dot
          ctx.beginPath(); ctx.arc(sx, sy, sat.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${exitAlpha.toFixed(2)})`; ctx.fill()
        }
      }

      if (rawP >= 1 && !exitRef.current) exitRef.current = true

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9990,
        background: '#020d18',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: leaving ? 'none' : 'all',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
      <p
        style={{
          position: 'relative', zIndex: 2,
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.25em',
        }}
      >
        {String(pct).padStart(3, '0')}
      </p>
    </div>
  )
}
