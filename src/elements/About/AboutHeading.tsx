import './styles/AboutHeading.web.css'
import './styles/AboutHeading.tablet.css'
import './styles/AboutHeading.mobile.css'
import Reveal from '../../components/Reveal'
import { redify } from '../../utils/redify'

export default function AboutHeading() {
  return (
    <Reveal>
      <h1 className="about-heading">{redify('ABOUT')}<br />{redify('ME')}</h1>
    </Reveal>
  )
}
