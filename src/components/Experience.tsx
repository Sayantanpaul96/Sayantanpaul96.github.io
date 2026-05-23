import { useState } from 'react'
import { EXPERIENCE, EXPERIENCE_CONTENT } from '../constants/content'
import { sectionBase, heroHeading, font, color, bodyText } from '../constants/styles'
import { redify } from '../utils/redify'
import Reveal from './Reveal'

export default function Experience() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="experience" style={{ ...sectionBase }}>
      <div className="grain-overlay" />

      <div style={{ position: 'relative', zIndex: 2, padding: '2.5rem' }}>

        {/* ── Heading ── */}
        <Reveal>
        <h1 style={{ ...heroHeading, marginBottom: '1.5rem' }}>
          {redify('WORK')}<br />{redify('EXPERIENCE')}
        </h1>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal delay={2}>
        <p style={{ ...bodyText, maxWidth: '560px', marginBottom: '4rem' }}>
          {EXPERIENCE_CONTENT.subtitle}
        </p>
        </Reveal>

        {/* ── Job rows ── */}
        <div className="glass-card">
          {EXPERIENCE.map((job, idx) => (
            <Reveal key={job.companyName} delay={idx + 1} blur={false} style={{ borderTop: `1px solid ${color.border}` }}>

              {/* Row header */}
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                style={{ width: '100%', background: 'none', border: 'none', padding: '1.75rem 0', display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontFamily: font.inter, fontSize: '0.7rem', color: color.accent, letterSpacing: '0.1em', flexShrink: 0, minWidth: '2.5rem' }}>
                  [{String(idx + 1).padStart(2, '0')}]
                </span>
                <span style={{ fontFamily: font.bebas, fontSize: 'clamp(1.6rem, 4vw, 3rem)', letterSpacing: '0.04em', lineHeight: 1, color: open === idx ? color.accent : color.white, transition: 'color 0.2s', flex: 1 }}>
                  {job.companyName}
                </span>
                <span style={{ fontFamily: font.inter, fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', flexShrink: 0, textAlign: 'right' as const }}>
                  {job.role}<br />
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>{job.period}</span>
                </span>
                <span style={{ fontFamily: font.inter, fontSize: '1.4rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1, flexShrink: 0, marginLeft: '1rem', transform: open === idx ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s, color 0.2s', display: 'block' }}>+</span>
              </button>

              {/* Expanded content */}
              <div style={{ maxHeight: open === idx ? '900px' : '0px', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', paddingBottom: '2.5rem', paddingLeft: '4rem' }}>

                  {/* Left: description + tech */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p style={{ ...bodyText, fontSize: '0.95rem' }}>{job.description}</p>
                    <div>
                      <p style={{ fontFamily: font.inter, fontSize: '0.6rem', color: color.faint, letterSpacing: '0.18em', textTransform: 'uppercase' as const, marginBottom: '0.6rem' }}>Tech Stack</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {job.tech.map(t => (
                          <span key={t} style={{ fontFamily: font.inter, fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 10px', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: bullet points */}
                  <ul style={{ display: 'flex', flexDirection: 'column', margin: 0, padding: 0, listStyle: 'none' }}>
                    {job.bullets.map((b, i) => (
                      <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.75rem 0', borderBottom: '1px solid #161616' }}>
                        <span style={{ color: color.accent, fontSize: '0.6rem', flexShrink: 0, paddingTop: '0.25rem' }}>—</span>
                        <p style={{ fontFamily: font.geist, fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>{b}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: `1px solid ${color.border}` }} />
        </div>

      </div>
    </section>
  )
}
