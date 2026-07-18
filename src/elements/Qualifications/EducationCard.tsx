import './styles/EducationCard.web.css'
import './styles/EducationCard.tablet.css'
import './styles/EducationCard.mobile.css'
import { EDUCATION } from '../../constants/content'
import { font, color } from '../../constants/styles'
import Reveal from '../../components/Reveal'

export default function EducationCard() {
  return (
    <div className="glass-card education-card">
      <p style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>Education</p>
      {EDUCATION.map((e, i) => (
        <Reveal
          key={i}
          delay={i + 1}
          blur={false}
          className="edu-item"
          style={{ display: 'grid', gridTemplateColumns: '4.5rem 1fr', gap: '1.5rem', padding: '1.5rem 0', borderBottom: '1px solid #161616', alignItems: 'start' }}
        >
          <div style={{ paddingTop: '0.2rem' }}>
            <p style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', lineHeight: 1.6 }}>
              {e.period.split('–').map((y, j) => (
                <span key={j} style={{ display: 'block' }}>{j === 0 ? y.trim() : `– ${y.trim()}`}</span>
              ))}
            </p>
          </div>
          <div>
            <p style={{ fontFamily: font.bebas, fontSize: '1.35rem', letterSpacing: '0.04em', color: color.white, lineHeight: 1.1, marginBottom: '0.4rem' }}>{e.institution}</p>
            <p style={{ fontFamily: font.geist, fontSize: '0.73rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, marginBottom: '0.75rem' }}>{e.degree}</p>
            <span className="edu-item__detail" style={{ fontFamily: font.inter, fontSize: '0.6rem', fontWeight: 700, color: color.accent, border: `1px solid ${color.accent}`, padding: '3px 9px', letterSpacing: '0.1em' }}>{e.detail}</span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
