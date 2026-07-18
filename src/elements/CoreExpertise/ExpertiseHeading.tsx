import './styles/ExpertiseHeading.web.css'
import './styles/ExpertiseHeading.tablet.css'
import './styles/ExpertiseHeading.mobile.css'
import Reveal from '../../components/Reveal'
import { redify } from '../../utils/redify'

export default function ExpertiseHeading() {
  return (
    <Reveal>
      <h1 className="expertise-heading">{redify('CORE')}<br />{redify('EXPERTISE')}</h1>
    </Reveal>
  )
}
