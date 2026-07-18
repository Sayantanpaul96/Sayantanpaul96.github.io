import { useRef, useEffect } from 'react'
import './styles/HeroStats.web.css'
import './styles/HeroStats.tablet.css'
import './styles/HeroStats.mobile.css'
import { motion } from 'framer-motion'
import { HERO_STATS } from '../../constants/content'

const EASE = [0.16, 1, 0.3, 1] as const

export default function HeroStats({ loaded }: { loaded: boolean }) {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const statsRef    = useRef<HTMLDivElement>(null)
  const revealed    = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed.current) {
          revealed.current = true
          HERO_STATS.forEach((stat, i) => {
            const el = counterRefs.current[i]
            if (!el) return
            const raw    = stat.value.replace(/[^0-9.]/g, '')
            const suffix = stat.value.replace(/[0-9.]/g, '')
            const target = parseFloat(raw)
            if (isNaN(target)) { el.textContent = stat.value; return }
            let start = 0
            const step = (ts: number) => {
              if (!start) start = ts
              const p     = Math.min((ts - start) / 1400, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              el.textContent = Math.round(eased * target) + suffix
              if (p < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          })
        }
      },
      { threshold: 0.2 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={statsRef}
      className="hero-stats"
      initial={{ opacity: 0, y: 36 }}
      animate={loaded ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
    >
      {HERO_STATS.map((stat, i) => (
        <div key={i} className="hero-stats__item">
          <span className="hero-stats__number">
            <span ref={el => { counterRefs.current[i] = el }}>{stat.value}</span>
          </span>
          <span className="hero-stats__label">{stat.label}</span>
        </div>
      ))}
    </motion.div>
  )
}
