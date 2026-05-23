import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { CONTACT, NAV_LINKS, CONTACT_CONTENT } from '../constants/content'
import { sectionBase, heroHeading, bodyText, font, color } from '../constants/styles'
import { redify } from '../utils/redify'
import Reveal from './Reveal'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Contact() {
  const circleRef = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 160, damping: 16 })
  const springY = useSpring(my, { stiffness: 160, damping: 16 })

  function onCircleMouseMove(e: React.MouseEvent) {
    const rect = circleRef.current!.getBoundingClientRect()
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.35)
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.35)
  }
  function onCircleMouseLeave() { mx.set(0); my.set(0) }
  return (
    <section id="contact" className="contact-section" style={{ ...sectionBase }}>
      <div className="grain-overlay" />

      <div className="contact-content" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Heading ── */}
        <Reveal>
          <div className="contact-heading" style={{ ...heroHeading, marginBottom: '0.05em' }}>
            {redify("LET'S WORK")}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1.5vw, 1.2rem)', marginBottom: '2.5rem' }}>
            <span className="contact-heading" style={{ ...heroHeading }}>T</span>
            <a
              ref={circleRef}
              href={`mailto:${CONTACT.email}`}
              onMouseMove={onCircleMouseMove}
              onMouseLeave={onCircleMouseLeave}
              style={{ display: 'block', textDecoration: 'none' }}
            >
            <motion.span
              style={{
                x: springX, y: springY,
                width: 'clamp(3rem, 7vw, 6rem)', height: 'clamp(3rem, 7vw, 6rem)',
                borderRadius: '50%', background: color.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
              whileHover={{ scale: 1.12 }}
              transition={{ scale: { duration: 0.35, ease: EASE } }}
            >
              <svg style={{ width: '35%', height: '35%', transform: 'rotate(-25deg)' }} viewBox="0 0 49 39" fill="none">
                <path d="M2 19.5h45M27 2l20 17.5L27 37" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            </a>
            <span className="contact-heading" style={{ ...heroHeading }}>GETHER</span>
          </div>
        </Reveal>

        {/* ── Subtitle + CTAs ── */}
        <Reveal delay={2} className="contact-cta-mb" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '560px' }}>
          <p style={{ ...bodyText }}>
            {CONTACT_CONTENT.subtitle}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a
              href={`mailto:${CONTACT.email}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 0, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}
            >
              <span style={{ fontFamily: font.geist, fontWeight: 500, fontSize: '0.85rem', color: '#ffffff', lineHeight: '1.4em', padding: '10px 20px' }}>{CONTACT_CONTENT.emailLabel}</span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', alignSelf: 'stretch', backgroundColor: color.accent, fontSize: '1rem', color: '#fff', flexShrink: 0 }}>→</span>
            </a>
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 0, textDecoration: 'none', border: `1px solid ${color.border}`, backdropFilter: 'blur(10px)', backgroundColor: 'transparent', borderRadius: '2px', overflow: 'hidden' }}
            >
              <span style={{ fontFamily: font.geist, fontWeight: 500, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4em', padding: '10px 20px' }}>{CONTACT_CONTENT.whatsappLabel}</span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', alignSelf: 'stretch', backgroundColor: color.accent, fontSize: '1rem', color: '#fff', flexShrink: 0 }}>↗</span>
            </a>
          </div>
        </Reveal>

        {/* ── Pages + Contact info — two separate glass cards ── */}
        <div className="contact-grid" style={{ gap: '1rem' }}>

          {/* Pages card */}
          <div className="glass-card">
            <p style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: '1rem' }}>Pages</p>
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })}
                style={{ width: '100%', background: 'none', border: 'none', padding: '0.6rem 0', borderBottom: '1px solid #161616', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' as const }}
              >
                <span
                  style={{ fontFamily: font.bebas, fontSize: '1.4rem', letterSpacing: '0.06em', color: color.white, lineHeight: 1, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = color.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = color.white)}
                >{l.label}</span>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>→</span>
              </button>
            ))}
          </div>

          {/* Contact info card */}
          <div className="glass-card">
            <p style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: '1rem' }}>Contact Info</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <p style={{ fontFamily: font.inter, fontSize: '0.57rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: '0.35rem' }}>Email</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  style={{ fontFamily: font.geist, fontSize: '0.9rem', color: color.white, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = color.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = color.white)}
                >{CONTACT.email}</a>
              </div>

              <div>
                <p style={{ fontFamily: font.inter, fontSize: '0.57rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: '0.35rem' }}>Phone</p>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  style={{ fontFamily: font.geist, fontSize: '0.9rem', color: color.white, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = color.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = color.white)}
                >{CONTACT.phone}</a>
              </div>

              <div>
                <p style={{ fontFamily: font.inter, fontSize: '0.57rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: '0.6rem' }}>Connect</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {[
                    { label: 'GitHub', href: CONTACT.github },
                    { label: 'LinkedIn', href: CONTACT.linkedin },
                  ].map(link => (
                    <a
                      key={link.label} href={link.href} target="_blank" rel="noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 0, textDecoration: 'none', border: `1px solid ${color.border}`, borderRadius: '2px', overflow: 'hidden', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = color.accent)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = color.border)}
                    >
                      <span style={{ fontFamily: font.geist, fontWeight: 500, fontSize: '0.72rem', color: color.white, lineHeight: '1.4em', padding: '6px 14px' }}>{link.label}</span>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', alignSelf: 'stretch', backgroundColor: color.accent, fontSize: '0.75rem', color: '#fff', flexShrink: 0 }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
