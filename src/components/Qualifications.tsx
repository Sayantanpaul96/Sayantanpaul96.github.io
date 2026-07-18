import { sectionBase } from '../constants/styles'
import QualificationsHeading from '../elements/Qualifications/QualificationsHeading'
import EducationCard from '../elements/Qualifications/EducationCard'
import CertificationsCard from '../elements/Qualifications/CertificationsCard'

export default function Qualifications() {
  return (
    <section id="qualifications" style={{ ...sectionBase }}>
      <div className="grain-overlay" />
      <div style={{ position: 'relative', zIndex: 2, padding: '2.5rem' }} className="section-inner">
        <QualificationsHeading />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="quals-grid">
          <EducationCard />
          <CertificationsCard />
        </div>
      </div>
    </section>
  )
}
