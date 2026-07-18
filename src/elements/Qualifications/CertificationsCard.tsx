import './styles/CertificationsCard.web.css'
import './styles/CertificationsCard.tablet.css'
import './styles/CertificationsCard.mobile.css'
import { CERTIFICATIONS } from '../../constants/content'
import { font, color } from '../../constants/styles'
import Reveal from '../../components/Reveal'

export default function CertificationsCard() {
  return (
    <div className="glass-card certifications-card">
      <p style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>Certifications</p>
      {CERTIFICATIONS.map((c, i) => (
        <Reveal
          key={i}
          delay={i + 1}
          blur={false}
          className="cert-item"
          style={{ padding: '1.5rem 0', borderBottom: '1px solid #161616' }}
        >
          <p style={{ fontFamily: font.inter, fontSize: '0.57rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: '0.45rem' }}>{c.issuer}</p>
          <p style={{ fontFamily: font.bebas, fontSize: '1.35rem', letterSpacing: '0.04em', color: color.white, lineHeight: 1.1, marginBottom: '0.75rem' }}>{c.title}</p>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
            {c.credentialId && (
              <span className="cert-id" style={{ fontFamily: font.inter, fontSize: '0.57rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', border: '1px solid rgba(255,255,255,0.15)', padding: '3px 9px' }}>
                ID: {c.credentialId}
              </span>
            )}
            {c.link && (
              <a
                href={c.link} target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 0, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <span style={{ fontFamily: font.geist, fontWeight: 500, fontSize: '0.72rem', color: '#ffffff', lineHeight: '1.4em', padding: '6px 14px' }}>View certificate</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', alignSelf: 'stretch', backgroundColor: color.accent, fontSize: '0.85rem', color: '#000', flexShrink: 0 }}>→</span>
              </a>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
