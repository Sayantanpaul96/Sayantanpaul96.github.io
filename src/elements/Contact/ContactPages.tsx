import './styles/ContactPages.web.css'
import './styles/ContactPages.tablet.css'
import './styles/ContactPages.mobile.css'
import { NAV_LINKS } from '../../constants/content'
import { font, color } from '../../constants/styles'

export default function ContactPages() {
  return (
    <div className="glass-card contact-pages-col">
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
  )
}
