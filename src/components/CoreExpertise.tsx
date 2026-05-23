import { EXPERTISE } from '../constants/content'
import { sectionBase, heroHeading, font, color } from '../constants/styles'
import { redify } from '../utils/redify'
import Reveal from './Reveal'

export default function CoreExpertise() {
  return (
    <section
      id="expertise"
      style={{ ...sectionBase }}
    >
      <div className="grain-overlay" />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '2.5rem',
        }}
      >
        {/* Heading */}
        <Reveal>
        <h1
          style={{ ...heroHeading, marginBottom: '3rem' }}
        >
          {redify('CORE')}<br />{redify('EXPERTISE')}
        </h1>
        </Reveal>

        {/* Expertise rows */}
        <div className="glass-card">
          {EXPERTISE.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i + 1}
              blur={false}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '1.5rem 0',
                borderBottom: `1px solid ${color.border}`,
              }}
            >
              {/* Number */}
              <span style={{ fontFamily: font.inter, fontSize: '0.7rem', color: color.accent, letterSpacing: '0.1em', flexShrink: 0 }}>
                {item.num}
              </span>

              {/* Label */}
              <span style={{ fontFamily: font.inter, fontWeight: 600, fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: color.white, letterSpacing: '0.01em', flex: 1 }}>
                {item.label}
              </span>

              {/* Technology boxes — right-aligned */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'flex-end' }}>
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: font.inter,
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      border: `1px solid rgba(255,255,255,0.25)`,
                      padding: '5px 12px',
                      transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = color.accent
                      e.currentTarget.style.borderColor = color.accent
                      e.currentTarget.style.color = color.white
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
