import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS, CONTACT, PROJECTS_CONTENT } from '../constants/content'
import { sectionBase, heroHeading, bodyText, font, color } from '../constants/styles'
import { redify } from '../utils/redify'
import Reveal from './Reveal'

const EASE = [0.16, 1, 0.3, 1] as const
const vp = { once: true, margin: '-52px' } as const

type Filter = 'Professional' | 'Personal'

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('Professional')
  const filtered = PROJECTS.filter(p => p.type === filter)

  return (
    <section id="projects" style={{ ...sectionBase }}>
      <div className="grain-overlay" />

      <div style={{
        position: 'relative', zIndex: 2,
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* ── Heading — slides in from left ── */}
        <motion.div
          initial={{ opacity: 0, x: -64, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={vp}
          transition={{ duration: 0.9, ease: EASE }}
        >
        <h1 style={{ ...heroHeading, marginBottom: '1.5rem' }}>
          {redify('SELECTED')}<br />{redify('PROJECTS')}
        </h1>
        </motion.div>

        {/* ── Subtitle — slides up ── */}
        <motion.div
          initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={vp}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}
        >
          <p style={{ ...bodyText, flex: 1, paddingRight: '3rem' }}>
            {PROJECTS.length} {PROJECTS_CONTENT.subtitleSuffix}
          </p>
          {/* GitHub CTA — slides in from right */}
          <motion.a
            href={CONTACT.github} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.75, delay: 0.22, ease: EASE }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 0, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}
          >
            <span style={{ fontFamily: font.geist, fontWeight: 500, fontSize: '0.85rem', color: '#ffffff', lineHeight: '1.4em', padding: '10px 20px' }}>{PROJECTS_CONTENT.githubLabel}</span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', alignSelf: 'stretch', backgroundColor: color.accent, fontSize: '1rem', color: '#fff', flexShrink: 0 }}>→</span>
          </motion.a>
        </motion.div>

        {/* ── Filter tabs — fade up ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
          style={{ display: 'flex', gap: 0, marginBottom: '1.25rem', width: 'fit-content', border: `1px solid ${color.border}` }}
        >
          {(['Professional', 'Personal'] as const).map((f, i) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: font.inter,
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.55rem 1.1rem',
                background: filter === f ? color.accent : 'transparent',
                color: filter === f ? '#000' : 'rgba(255,255,255,0.55)',
                border: 'none',
                borderRight: i < 1 ? `1px solid ${color.border}` : 'none',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
            >{f}</button>
          ))}
        </motion.div>

        {/* ── Project rows — card slides up with blur ── */}
        <motion.div
          data-no-snap
          className="glass-card"
          initial={{ opacity: 0, y: 56, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={vp}
          transition={{ duration: 1.0, delay: 0.36, ease: EASE }}
          style={{
            maxHeight: '420px',
            overflowY: 'auto',
            borderTop: `1px solid ${color.border}`,
            scrollbarWidth: 'thin',
            scrollbarColor: `${color.border} transparent`,
          }}
        >
          {filtered.map((p, idx) => (
            <ProjectRow key={p.title} project={p} index={idx} />
          ))}
          <div style={{ borderTop: `1px solid ${color.border}` }} />
        </motion.div>

      </div>
    </section>
  )
}

function ProjectRow({ project: p, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Reveal
      key={p.title}
      delay={index + 1}
      blur={false}
          style={{ borderBottom: `1px solid ${color.border}`, padding: '2rem 0', display: 'grid', gridTemplateColumns: '7rem 1fr auto', gap: '2rem', alignItems: 'start' }}
    >
      {/* ── Left meta ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.25rem' }}>
        <span style={{ fontFamily: font.inter, fontSize: '0.7rem', color: color.accent, letterSpacing: '0.1em' }}>
          [{String(index + 1).padStart(2, '0')}]
        </span>
        <span style={{
          fontFamily: font.inter, fontSize: '0.55rem', letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: p.type === 'Professional' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)',
          border: `1px solid ${p.type === 'Professional' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'}`,
          padding: '2px 6px', width: 'fit-content',
        }}>{p.type}</span>
        <span style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', marginTop: '0.15rem' }}>{p.year}</span>
      </div>

      {/* ── Centre: title + description + tech ── */}
      <div>
        <p style={{ fontFamily: font.bebas, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '0.04em', color: hovered ? color.accent : color.white, lineHeight: 1.05, marginBottom: '0.6rem', transition: 'color 0.2s' }}>
          {p.title}
        </p>
        <p style={{ ...bodyText, fontSize: '0.82rem', maxWidth: '560px', marginBottom: '1rem' }}>
          {p.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {p.tech.map(t => (
            <span key={t} style={{ fontFamily: font.inter, fontSize: '0.6rem', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.15)', padding: '3px 8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Right: link button ── */}
      <div style={{ paddingTop: '0.15rem' }}>
        {p.link ? (
          <a
            href={p.link} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 0, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden', opacity: hovered ? 1 : 0.6, transition: 'opacity 0.2s' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span style={{ fontFamily: font.geist, fontWeight: 500, fontSize: '0.72rem', color: '#ffffff', lineHeight: '1.4em', padding: '7px 14px', whiteSpace: 'nowrap' }}>
              {p.linkLabel ?? 'View'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', alignSelf: 'stretch', backgroundColor: color.accent, fontSize: '0.85rem', color: '#fff', flexShrink: 0 }}>→</span>
          </a>
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 0, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <span style={{ fontFamily: font.geist, fontWeight: 500, fontSize: '0.72rem', color: '#ffffff', lineHeight: '1.4em', padding: '7px 14px' }}>Internal</span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', alignSelf: 'stretch', backgroundColor: color.accent, fontSize: '0.85rem', color: '#fff', flexShrink: 0 }}>!</span>
          </span>
        )}
      </div>
    </Reveal>
  )
}

