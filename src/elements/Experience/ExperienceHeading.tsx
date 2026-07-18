import './styles/ExperienceHeading.web.css'
import './styles/ExperienceHeading.tablet.css'
import './styles/ExperienceHeading.mobile.css'
import { EXPERIENCE_CONTENT } from '../../constants/content'
import Reveal from '../../components/Reveal'
import { redify } from '../../utils/redify'

export default function ExperienceHeading() {
  return (
    <>
      <Reveal>
        <h1 className="experience-heading">{redify('WORK')}<br />{redify('EXPERIENCE')}</h1>
      </Reveal>
      <Reveal delay={2}>
        <p className="experience-heading__subtitle">{EXPERIENCE_CONTENT.subtitle}</p>
      </Reveal>
    </>
  )
}
