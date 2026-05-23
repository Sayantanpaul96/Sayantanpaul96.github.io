import { useMemo } from 'react'
import { useScroll, useVelocity, useSpring, useTransform, motion } from 'framer-motion'

/** Seeded pseudo-random so stars are stable across renders */
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/**
 * Aurora Borealis background.
 * – Deep night-sky gradient base
 * – 90 twinkling stars (upper 65 % of viewport)
 * – 6 vertical aurora curtains with skew-wave animation
 * – Horizon darkness + film grain
 * – Curtains shift & dim with scroll velocity
 */
export default function AuroraBackground() {
  const stars = useMemo(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x:  sr(i * 3.7)       * 100,
      y:  sr(i * 3.7 + 1)   * 65,
      sz: sr(i * 3.7 + 2)   * 1.6 + 0.5,
      op: sr(i * 3.7 + 3)   * 0.55 + 0.15,
      blue: i % 7 === 0,
    })), [])

  const { scrollY }   = useScroll()
  const raw           = useVelocity(scrollY)
  const vel           = useSpring(raw, { stiffness: 30, damping: 30 })

  // Subtle horizontal drift on scroll velocity
  const shiftX   = useTransform(vel, [-2000, 0, 2000], ['-1.8%', '0%', '1.8%'])
  // Slightly dim on fast scroll — aurora streaks away
  const brightness = useTransform(vel, [-2500, 0, 2500], [0.75, 1, 0.75])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden',
      background: 'linear-gradient(to bottom, #010810 0%, #020d18 55%, #041420 100%)',
    }}>

      {/* ── Star field ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map(s => (
          <div key={s.id} style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.sz, height: s.sz,
            borderRadius: '50%',
            background: s.blue ? '#aaccff' : '#ffffff',
            opacity: s.op,
            boxShadow: s.sz > 1.6 ? `0 0 ${s.sz * 2}px ${s.blue ? '#7ab4ff' : '#fff'}` : 'none',
          }} />
        ))}
      </div>

      {/* ── Aurora curtains ── */}
      <motion.div style={{
        position: 'absolute', inset: 0,
        x: shiftX,
        opacity: brightness,
      }}>
        <div className="aurora-curtain ac1" />
        <div className="aurora-curtain ac2" />
        <div className="aurora-curtain ac3" />
        <div className="aurora-curtain ac4" />
        <div className="aurora-curtain ac5" />
        <div className="aurora-curtain ac6" />
      </motion.div>

      {/* ── Horizon darkness — land silhouette suggestion ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%',
        background: 'linear-gradient(to top, rgba(1,8,16,0.97) 0%, rgba(1,8,16,0.6) 40%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Top fade — deep space ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '18%',
        background: 'linear-gradient(to bottom, rgba(1,8,16,0.7) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Film grain ── */}
      <div className="grain-overlay" style={{ opacity: 0.04 }} />
    </div>
  )
}
