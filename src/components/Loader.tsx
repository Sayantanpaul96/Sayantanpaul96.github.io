import { useEffect, useRef, useState } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import worldTopo from 'world-atlas/land-110m.json'

// Parse the TopoJSON land topology into a GeoJSON FeatureCollection once
const topo    = worldTopo as Topology<{ land: GeometryCollection }>
const landGeo = feature(topo, topo.objects.land)

// ── Feature flags ─────────────────────────────────────────────────────────────
/** Set to true to show the rising green fill inside the globe as it loads */
const SHOW_GLOBE_FILL = true

// ── Satellites ────────────────────────────────────────────────────────────────
// orbitAngle: rotation of the orbital plane (radians) — creates multi-axis orbits
interface Sat {
  speed: number
  tilt: number
  phase: number
  orbitR: number
  size: number
  orbitAngle: number   // 0 = equatorial, π/2 = polar, anything in between = inclined
}

const SATS: Sat[] = [
  { speed:  0.38, tilt: 0.45, phase: 0,   orbitR: 1.42, size: 2.8, orbitAngle: 0 },
  { speed: -0.28, tilt: 0.65, phase: 2.1, orbitR: 1.33, size: 2.2, orbitAngle: Math.PI / 2 },
  { speed:  0.55, tilt: 1.05, phase: 4.2, orbitR: 1.52, size: 1.8, orbitAngle: Math.PI / 4 },
  { speed: -0.42, tilt: 0.55, phase: 1.3, orbitR: 1.38, size: 2.0, orbitAngle: -Math.PI / 3 },
]

// ── Star field ────────────────────────────────────────────────────────────────
// Generated once at module load — stable across renders
const STARS = Array.from({ length: 220 }, () => ({
  x:  Math.random(),          // normalised 0–1 of canvas width
  y:  Math.random(),          // normalised 0–1 of canvas height
  r:  Math.random() * 1.1 + 0.15,
  a:  Math.random() * 0.6 + 0.2,   // base opacity
  tw: Math.random() * Math.PI * 2, // twinkle phase offset
  ts: Math.random() * 0.5 + 0.15,  // twinkle speed
}))

// ── Component ─────────────────────────────────────────────────────────────────
interface LoaderProps { onDone: () => void }

export default function Loader({ onDone }: LoaderProps) {
  const canvasRef             = useRef<HTMLCanvasElement>(null)
  const [pct, setPct]         = useState(0)
  const [leaving, setLeaving] = useState(false)
  const rafRef    = useRef(0)
  const exitRef   = useRef(false)
  const exitTsRef = useRef(0)

  // ── Preload fonts so they're ready the moment the loader exits ────────────
  useEffect(() => {
    document.fonts.load('400 1em "Bebas Neue"')
    document.fonts.load('400 1em "Geist"')
    document.fonts.load('700 1em "Geist"')
    document.fonts.load('400 1em "Inter"')
    document.fonts.load('600 1em "Inter"')
  }, [])

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

    const LOAD_DUR = 5000
    const EXIT_DUR = 1100
    let start = 0

    const render = (ts: number) => {
      if (!start) start = ts

      // Loading progress
      const rawP  = Math.min((ts - start) / LOAD_DUR, 1)
      const eased = rawP === 1 ? 1 : 1 - Math.pow(2, -10 * rawP)
      setPct(Math.round(eased * 100))

      // Exit: tilt view to north pole + zoom
      let viewLat   = 0
      let scale     = 1
      let exitAlpha = 1

      if (exitRef.current) {
        if (!exitTsRef.current) exitTsRef.current = ts
        const ep = Math.min((ts - exitTsRef.current) / EXIT_DUR, 1)
        const ee = 1 - Math.pow(2, -8 * ep)
        viewLat   = ee * 62
        scale     = 1 + ee * 5.5
        exitAlpha = ep > 0.65 ? 1 - (ep - 0.65) / 0.35 : 1
        if (ep >= 1) {
          setLeaving(true)
          setTimeout(onDone, 700)
          return
        }
      }

      ctx.clearRect(0, 0, W, H)

      // ── Star field ────────────────────────────────────────────────────
      for (const s of STARS) {
        const twinkle = 0.82 + 0.18 * Math.sin(ts * 0.001 * s.ts + s.tw)
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(s.a * twinkle * exitAlpha).toFixed(2)})`
        ctx.fill()
      }

      const Rs = R * scale

      // d3-geo orthographic projection — longitude rotates slowly over time
      const projection = geoOrthographic()
        .scale(Rs)
        .translate([cx, cy])
        .rotate([-(78 + ts * 0.004), -(20 + viewLat), 0])
        .clipAngle(90)

      const pathFn    = geoPath(projection, ctx)
      const graticule = geoGraticule().step([30, 30])()

      // ── Atmosphere glow ───────────────────────────────────────────────────
      // Outer haze ring
      const atm = ctx.createRadialGradient(cx, cy, Rs * 0.82, cx, cy, Rs * 1.24)
      atm.addColorStop(0,    'transparent')
      atm.addColorStop(0.40, `rgba(0,229,116,${(0.04 * exitAlpha).toFixed(2)})`)
      atm.addColorStop(0.75, `rgba(0,229,116,${(0.10 * exitAlpha).toFixed(2)})`)
      atm.addColorStop(1,    'transparent')
      ctx.beginPath(); ctx.arc(cx, cy, Rs * 1.24, 0, Math.PI * 2)
      ctx.fillStyle = atm; ctx.fill()

      // ── Clip to globe circle ──────────────────────────────────────────────
      ctx.save()
      ctx.beginPath(); ctx.arc(cx, cy, Rs, 0, Math.PI * 2); ctx.clip()

      // Deep space ocean — very dark teal-black
      ctx.fillStyle = '#020c08'
      ctx.fillRect(cx - Rs - 1, cy - Rs - 1, Rs * 2 + 2, Rs * 2 + 2)

      if (SHOW_GLOBE_FILL) {
        // Deep forest-emerald fill rising from the bottom
        const fillY = cy + Rs * (1 - 2 * eased)
        ctx.fillStyle = `rgba(0,72,44,${(0.94 * exitAlpha).toFixed(2)})`
        ctx.fillRect(cx - Rs - 1, fillY, Rs * 2 + 2, cy + Rs + 1 - fillY)

        // Very faint tint above the fill line
        ctx.fillStyle = `rgba(0,18,10,${(0.10 * exitAlpha).toFixed(2)})`
        ctx.fillRect(cx - Rs - 1, cy - Rs - 1, Rs * 2 + 2, fillY - (cy - Rs - 1))
      }

      ctx.beginPath()
      pathFn(graticule)
      ctx.strokeStyle = `rgba(0,229,116,${(0.11 * exitAlpha).toFixed(2)})`
      ctx.lineWidth = 0.5
      ctx.stroke()

      ctx.beginPath()
      pathFn(landGeo)
      ctx.fillStyle = `rgba(3,12,8,${(0.86 * exitAlpha).toFixed(2)})`
      ctx.fill()
      ctx.strokeStyle = `rgba(0,229,116,${(0.55 * exitAlpha).toFixed(2)})`
      ctx.lineWidth = 0.9
      ctx.stroke()

      // ── Sphere shading — dark vignette at edges to sell the 3-D curve ────
      const vgn = ctx.createRadialGradient(cx, cy, Rs * 0.45, cx, cy, Rs)
      vgn.addColorStop(0, 'transparent')
      vgn.addColorStop(1, `rgba(0,0,0,${(0.55 * exitAlpha).toFixed(2)})`)
      ctx.beginPath(); ctx.arc(cx, cy, Rs, 0, Math.PI * 2)
      ctx.fillStyle = vgn; ctx.fill()

      // ── Specular highlight — subtle top-left light source ─────────────────
      const spec = ctx.createRadialGradient(
        cx - Rs * 0.28, cy - Rs * 0.28, 0,
        cx - Rs * 0.28, cy - Rs * 0.28, Rs * 0.7
      )
      spec.addColorStop(0, `rgba(160,255,200,${(0.07 * exitAlpha).toFixed(2)})`)
      spec.addColorStop(1, 'transparent')
      ctx.beginPath(); ctx.arc(cx, cy, Rs, 0, Math.PI * 2)
      ctx.fillStyle = spec; ctx.fill()

      ctx.restore()

      // ── Globe border ──────────────────────────────────────────────────────
      ctx.beginPath(); ctx.arc(cx, cy, Rs, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(0,229,116,${(0.38 * exitAlpha).toFixed(2)})`
      ctx.lineWidth = 1.2
      ctx.stroke()

      // ── Multi-axis satellites ─────────────────────────────────────────────
      if (exitAlpha > 0.01) {
        const TRAIL_LEN  = 36
        const TRAIL_STEP = 0.068  // radians per step — total arc ≈ 2.4 rad (≈140°)

        for (const sat of SATS) {
          const t      = ts * 0.001 * sat.speed + sat.phase
          const orbitA = Rs * sat.orbitR
          const orbitB = orbitA * 0.38 * Math.abs(Math.cos(sat.tilt))
          const cosA   = Math.cos(sat.orbitAngle)
          const sinA   = Math.sin(sat.orbitAngle)

          // Collect trail points: [0] = head (nearest satellite), [TRAIL_LEN] = tail
          const trailDir = sat.speed >= 0 ? -1 : 1
          const pts: [number, number][] = []
          for (let i = 0; i <= TRAIL_LEN; i++) {
            const tt  = t + i * TRAIL_STEP * trailDir
            const tex = orbitA * Math.cos(tt)
            const tey = orbitB * Math.sin(tt)
            pts.push([cx + tex * cosA - tey * sinA, cy + tex * sinA + tey * cosA])
          }

          // ── Outer comet body — thick green, fades toward tail ──────────
          const maxW = sat.size * 1.4
          for (let i = TRAIL_LEN - 1; i >= 0; i--) {
            const frac = 1 - i / TRAIL_LEN          // 0 at tail, 1 at head
            const ease = Math.pow(frac, 0.55)        // slow fade near head, fast at tail
            ctx.beginPath()
            ctx.moveTo(pts[i + 1][0], pts[i + 1][1])
            ctx.lineTo(pts[i][0],     pts[i][1])
            ctx.lineCap   = 'round'
            ctx.lineWidth = Math.max(0.2, maxW * ease)
            ctx.strokeStyle = `rgba(0,229,116,${(0.65 * ease * exitAlpha).toFixed(2)})`
            ctx.stroke()
          }

          // ── Inner bright core — thin white-green streak near the head ──
          const coreLen = Math.min(10, TRAIL_LEN - 1)
          for (let i = coreLen; i >= 0; i--) {
            const frac = 1 - i / coreLen
            const ease = Math.pow(frac, 0.7)
            ctx.beginPath()
            ctx.moveTo(pts[i + 1][0], pts[i + 1][1])
            ctx.lineTo(pts[i][0],     pts[i][1])
            ctx.lineCap   = 'round'
            ctx.lineWidth = Math.max(0.2, sat.size * 0.55 * ease)
            ctx.strokeStyle = `rgba(180,255,210,${(0.85 * ease * exitAlpha).toFixed(2)})`
            ctx.stroke()
          }

          // ── Satellite head — glow + core dot ──────────────────────────
          const [sx, sy] = pts[0]
          const dotR = sat.size * 2.0

          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, dotR * 5)
          grd.addColorStop(0,   `rgba(0,229,116,${(0.92 * exitAlpha).toFixed(2)})`)
          grd.addColorStop(0.4, `rgba(0,229,116,${(0.22 * exitAlpha).toFixed(2)})`)
          grd.addColorStop(1,   'transparent')
          ctx.beginPath(); ctx.arc(sx, sy, dotR * 5, 0, Math.PI * 2)
          ctx.fillStyle = grd; ctx.fill()

          ctx.beginPath(); ctx.arc(sx, sy, dotR, 0, Math.PI * 2)
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
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: leaving ? 'none' : 'all',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

      {/* ── Progress bar — bottom of screen ─────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '2.5rem',
          right: '2.5rem',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(0,229,116,0.85)',
            flexShrink: 0,
          }}
        >
          Loading
        </span>

        {/* Track + fill */}
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255,255,255,0.07)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #00e574, #18ff88)',
              transition: 'width 80ms linear',
            }}
          />
        </div>

        {/* Percentage at end of bar */}
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: 'rgba(0,229,116,0.85)',
            fontVariantNumeric: 'tabular-nums',
            flexShrink: 0,
            minWidth: '2.4rem',
            textAlign: 'right',
          }}
        >
          {pct}%
        </span>
      </div>
    </div>
  )
}

