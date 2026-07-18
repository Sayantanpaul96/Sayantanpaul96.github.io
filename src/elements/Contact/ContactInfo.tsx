import './styles/ContactInfo.web.css'
import './styles/ContactInfo.tablet.css'
import './styles/ContactInfo.mobile.css'
import { CONTACT } from '../../constants/content'
import { font, color } from '../../constants/styles'

export default function ContactInfo() {
  return (
    <div className="glass-card contact-info-col">
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
  )
}
