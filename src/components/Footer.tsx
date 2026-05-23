import { SITE_META } from '../constants/content'
import { font, color } from '../constants/styles'

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 900,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(24px) saturate(180%) brightness(0.85)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(0.85)',
        boxShadow: '0 -1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.04)',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      <span style={{ fontFamily: font.bebas, fontSize: '1.1rem', letterSpacing: '0.15em', color: color.white }}>
        {SITE_META.initials}
      </span>
      <span style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
        © {new Date().getFullYear()} {SITE_META.name} — All rights reserved
      </span>
      <span style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {SITE_META.location}
      </span>
    </footer>
  )
}
