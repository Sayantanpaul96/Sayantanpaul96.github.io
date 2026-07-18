import { useEffect, useRef } from 'react'
import { sectionContent } from '../constants/styles'
import HeroTitle from '../elements/Home/HeroTitle'
import HeroTagline from '../elements/Home/HeroTagline'
import HeroServices from '../elements/Home/HeroServices'
import HeroCTA from '../elements/Home/HeroCTA'
import HeroStats from '../elements/Home/HeroStats'
import HeroCompanies from '../elements/Home/HeroCompanies'

export default function Hero({ loaded }: { loaded: boolean }) {
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

  return (
    <>
      {/* ── Full-viewport hero ── */}
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
          className="hero-content"
          style={{ ...sectionContent, paddingTop: 'calc(2.5rem + 2rem)', position: 'relative', zIndex: 2 }}
        >
          {/* Top spacer — pushes name to slightly above center */}
          <div style={{ flex: 4.8 }} />

          <HeroTitle loaded={loaded} />

          {/* Content directly below name */}
          <div className="hero-content__body" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2.5rem' }}>
            <HeroTagline loaded={loaded} />
            <HeroServices loaded={loaded} />
            <HeroCTA loaded={loaded} />
          </div>

          <HeroStats loaded={loaded} />
          <HeroCompanies loaded={loaded} />
        </div>
      </section>
    </>
  )
}
