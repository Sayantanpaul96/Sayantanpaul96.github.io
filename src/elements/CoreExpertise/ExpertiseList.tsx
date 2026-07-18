import './styles/ExpertiseList.web.css'
import './styles/ExpertiseList.tablet.css'
import './styles/ExpertiseList.mobile.css'
import { EXPERTISE } from '../../constants/content'
import Reveal from '../../components/Reveal'

export default function ExpertiseList() {
  return (
    <div className="glass-card">
      {EXPERTISE.map((item, i) => (
        <Reveal key={item.label} delay={i + 1} blur={false} className="expertise-row">
          <span className="expertise-row__num">{item.num}</span>
          <span className="expertise-row__label">{item.label}</span>
          <div className="expertise-tags">
            {item.tags.map(tag => (
              <span key={tag} className="expertise-tags__item">{tag}</span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
