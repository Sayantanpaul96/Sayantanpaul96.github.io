import { sectionBase } from '../constants/styles'
import ExperienceHeading from '../elements/Experience/ExperienceHeading'
import ExperienceList from '../elements/Experience/ExperienceList'

export default function Experience() {
  return (
    <section id="experience" style={{ ...sectionBase }}>
      <div className="grain-overlay" />
      <div style={{ position: 'relative', zIndex: 2, padding: '2.5rem' }} className="section-inner">
        <ExperienceHeading />
        <ExperienceList />
      </div>
    </section>
  )
}
