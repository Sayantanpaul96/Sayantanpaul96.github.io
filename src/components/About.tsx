import { ABOUT_BIO, ABOUT_CONTENT, CONTACT } from '../constants/content'
import { sectionBase, sectionContentRight, heroHeading, bodyText } from '../constants/styles'
import { redify } from '../utils/redify'
import Reveal from './Reveal'

const DIAGONAL_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='126' height='126'%3E%3Cpath d='M126 0v21.584L21.584 126H0v-17.585L108.415 0H126Zm0 108.414V126h-17.586L126 108.414Zm0-84v39.171L63.585 126H24.414L126 24.414Zm0 42v39.17L105.584 126h-39.17L126 66.414ZM105.586 0 0 105.586V66.415L66.415 0h39.171Zm-42 0L0 63.586V24.415L24.415 0h39.171Zm-42 0L0 21.586V0h21.586Z' fill='rgb(136%2C136%2C136)' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C%2Fsvg%3E")`

export default function About() {
  return (
    <section
      id="about"
      style={{ ...sectionBase }}
    >
      {/* Diagonal pattern */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: DIAGONAL_SVG, backgroundSize: '64px 64px' }} />
      {/* Grain */}
      <div className="grain-overlay" />

      {/* ── Hero-mirrored right-50% intro ── */}
      <div style={{ ...sectionContentRight }}>
        {/* Top spacer */}
        <div style={{ flex: 0.8 }} />

        {/* ABOUT ME heading */}
        <Reveal>
        <h1 style={heroHeading}>
          {redify('ABOUT')}<br />{redify('ME')}
        </h1>
        </Reveal>

        {/* Bio + buttons */}
        <Reveal delay={2}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2.5rem' }}
        >
          <p style={bodyText}>
            {ABOUT_BIO[0]}{' '}{ABOUT_BIO[1]}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 0,
                background: 'none', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderRadius: '2px', overflow: 'hidden', padding: 0,
              }}
            >
              <span style={{ fontFamily: '"Geist", "Inter", sans-serif', fontWeight: 500, fontSize: '0.85rem', color: '#ffffff', lineHeight: '1.4em', padding: '10px 20px' }}>
                {ABOUT_CONTENT.ctaLabel}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', alignSelf: 'stretch', backgroundColor: '#00e574', fontSize: '1rem', color: '#000', flexShrink: 0 }}>
                →
              </span>
            </button>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
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
                {ABOUT_CONTENT.linkedInLabel}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', alignSelf: 'stretch', backgroundColor: '#00e574', fontSize: '1rem', color: '#000', flexShrink: 0 }}>
                →
              </span>
            </a>
          </div>
        </Reveal>

        {/* Bottom spacer */}
        <div style={{ flex: 1 }} />
      </div>

    </section>
  )
}
