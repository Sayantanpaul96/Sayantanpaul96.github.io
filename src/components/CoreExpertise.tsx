import { sectionBase } from '../constants/styles'
import ExpertiseHeading from '../elements/CoreExpertise/ExpertiseHeading'
import ExpertiseList from '../elements/CoreExpertise/ExpertiseList'

export default function CoreExpertise() {
  return (
    <section id="expertise" style={{ ...sectionBase }}>
      <div className="grain-overlay" />
      <div style={{ position: 'relative', zIndex: 2, padding: '2.5rem' }} className="section-inner">
        <ExpertiseHeading />
        <ExpertiseList />
      </div>
    </section>
  )
}
