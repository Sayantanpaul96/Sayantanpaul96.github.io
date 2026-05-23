import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HERO_STATS, HERO_CONTENT, HERO_SERVICES, HERO_COMPANIES } from '../constants/content'
import { font, color, sectionContent, heroHeading, subHeading, tagText, mutedText, brandText, statNumber, statLabel } from '../constants/styles'
import { redify } from '../utils/redify'


export default function Hero({ loaded }: { loaded: boolean }) {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const statsRef = useRef<HTMLDivElement>(null)
  const revealed = useRef(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Parallax exit: hero content moves up and fades as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${-y * 0.35}px)`
        contentRef.current.style.opacity = String(Math.max(0, 1 - y / 500))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed.current) {
          revealed.current = true
          HERO_STATS.forEach((stat, i) => {
            const el = counterRefs.current[i]
            if (!el) return
            const raw = stat.value.replace(/[^0-9.]/g, '')
            const suffix = stat.value.replace(/[0-9.]/g, '')
            const target = parseFloat(raw)
            if (isNaN(target)) { el.textContent = stat.value; return }
            let start = 0
            const step = (ts: number) => {
              if (!start) start = ts
              const p = Math.min((ts - start) / 1400, 1)
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
    <>
      {/* ── Full-viewport hero — Crevo grid split layout ── */}
      <section
        id="home"
        style={{
          position: 'relative',
          height: '100vh',
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        {/* Subtle dark overlay so text reads cleanly over aurora */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(1,8,16,0.35)', pointerEvents: 'none' }} />

        {/* Stacked Hero Content */}
        <div
          ref={contentRef}
          style={{ ...sectionContent, paddingTop: 'calc(2.5rem + 2rem)', position: 'relative', zIndex: 2 }}
        >
          {/* Top spacer — pushes name to slightly above center */}
          <div style={{ flex: 4.8 }} />

          {/* Name — slightly above center */}
          <motion.h1
            style={heroHeading}
            initial={{ opacity: 0, y: 56, filter: 'blur(6px)' }}
            animate={loaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.15, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {redify('SAYANTAN')}<br />{redify('PAUL')}
          </motion.h1>

          {/* Content directly below name */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2.5rem' }}
          >
            <motion.h2
              style={{ ...subHeading, maxWidth: '540px' }}
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              animate={loaded ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {HERO_CONTENT.subtitle.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </motion.h2>

            {/* Service list — inline with / dividers */}
            <motion.div
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', rowGap: '6px' }}
              initial={{ opacity: 0, x: 36, filter: 'blur(3px)' }}
              animate={loaded ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {HERO_SERVICES.map((svc, i) => (
                <span key={svc} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={tagText}>{svc}</span>
                  {i < HERO_SERVICES.length - 1 && (
                    <span style={{ fontFamily: font.inter, fontSize: '0.78rem', color: color.text30, margin: '0 10px' }}>/</span>
                  )}
                </span>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              style={{ display: 'flex' }}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={loaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 0,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: '2px', overflow: 'hidden',
                }}
              >
                <span style={{ fontFamily: '"Geist", "Inter", sans-serif', fontWeight: 500, fontSize: '0.85rem', color: '#ffffff', lineHeight: '1.4em', padding: '10px 20px' }}>
                  {HERO_CONTENT.ctaLabel}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', alignSelf: 'stretch', backgroundColor: '#00e574', fontSize: '1rem', color: '#000', flexShrink: 0 }}>
                  →
                </span>
              </a>
            </motion.div>
          </div>

          {/* Stats row — between CTA and companies */}
          <motion.div
            ref={statsRef}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginTop: '2rem',
              marginBottom: '2rem',
              width: '50%',
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            {HERO_STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '1rem 0',
                }}
              >
                <span style={statNumber}>
                  <span ref={el => { counterRefs.current[i] = el }}>{stat.value}</span>
                </span>
                <span style={statLabel}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Companies — pinned to bottom */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
            initial={{ opacity: 0, x: 32 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ ...mutedText, margin: 0, textTransform: 'uppercase' }}>
              {HERO_CONTENT.companiesLabel}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {HERO_COMPANIES.map(c => (
                <span
                  key={c.name}
                  style={brandText}
                  onMouseEnter={e => (e.currentTarget.style.color = color.white)}
                  onMouseLeave={e => (e.currentTarget.style.color = color.text30)}
                >
                  {c.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Marquee — pinned to bottom of hero (commented out) ── */}
        {/* <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid #1c1c1c' }}>
          <div className="overflow-hidden py-4">
            <div className="marquee-track">
              {tickerItems.map((item, i) => (
                <span key={i} className="flex items-center gap-5 flex-shrink-0">
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#b51c1d', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.6rem', color: '#2a2a2a', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: '"Inter",sans-serif' }}>
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div> */}
      </section>
    </>
  )
}
