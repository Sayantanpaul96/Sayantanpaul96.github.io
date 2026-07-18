import './styles/HeroServices.web.css'
import './styles/HeroServices.tablet.css'
import './styles/HeroServices.mobile.css'
import { motion } from 'framer-motion'
import { HERO_SERVICES } from '../../constants/content'

const EASE = [0.16, 1, 0.3, 1] as const

export default function HeroServices({ loaded }: { loaded: boolean }) {
  return (
    <motion.div
      className="hero-services"
      initial={{ opacity: 0, x: 36, filter: 'blur(3px)' }}
      animate={loaded ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
    >
      {HERO_SERVICES.map((svc, i) => (
        <span key={svc} className="hero-services__item">
          <span className="hero-services__tag">{svc}</span>
          {i < HERO_SERVICES.length - 1 && (
            <span className="hero-services__divider">/</span>
          )}
        </span>
      ))}
    </motion.div>
  )
}
