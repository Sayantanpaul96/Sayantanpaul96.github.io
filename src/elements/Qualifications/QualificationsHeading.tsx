import './styles/QualificationsHeading.web.css'
import './styles/QualificationsHeading.tablet.css'
import './styles/QualificationsHeading.mobile.css'
import { QUALIFICATIONS_CONTENT } from '../../constants/content'
import { heroHeading, bodyText } from '../../constants/styles'
import { redify } from '../../utils/redify'
import Reveal from '../../components/Reveal'

export default function QualificationsHeading() {
  return (
    <>
      <Reveal>
        <h1 className="qualifications-heading" style={{ ...heroHeading, marginBottom: '1.5rem' }}>
          {redify('LEARNINGS')}<br />{redify('& CERTIFICATIONS')}
        </h1>
      </Reveal>
      <Reveal delay={2}>
        <p className="quals-subtitle" style={{ ...bodyText, maxWidth: '520px', marginBottom: '4rem' }}>
          {QUALIFICATIONS_CONTENT.subtitle}
        </p>
      </Reveal>
    </>
  )
}
