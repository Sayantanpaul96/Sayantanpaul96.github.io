import './styles/ContactCTA.web.css'
import './styles/ContactCTA.tablet.css'
import './styles/ContactCTA.mobile.css'
import { CONTACT, CONTACT_CONTENT } from '../../constants/content'
import { bodyText, font, color } from '../../constants/styles'
import Reveal from '../../components/Reveal'

export default function ContactCTA() {
  return (
    <Reveal delay={2} className="contact-cta-mb" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '560px' }}>
      <p style={{ ...bodyText }}>
        {CONTACT_CONTENT.subtitle}
      </p>
      <div className="contact-cta__btns" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <a
          href={`mailto:${CONTACT.email}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 0, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}
        >
          <span className="contact-cta__email-label" style={{ fontFamily: font.geist, fontWeight: 500, fontSize: '0.85rem', color: '#ffffff', lineHeight: '1.4em', padding: '10px 20px' }}>{CONTACT_CONTENT.emailLabel}</span>
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
  )
}
