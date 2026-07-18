import './styles/HeroCTA.web.css'
import './styles/HeroCTA.tablet.css'
import './styles/HeroCTA.mobile.css'
import { motion } from 'framer-motion'
import { HERO_CONTENT } from '../../constants/content'

const EASE = [0.16, 1, 0.3, 1] as const

export default function HeroCTA({ loaded }: { loaded: boolean }) {
  return (
    <motion.div
      className="hero-cta"
      initial={{ opacity: 0, scale: 0.93 }}
      animate={loaded ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
    >
      <a
        href="#contact"
        className="hero-cta__btn"
        onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
      >
        <span className="hero-cta__label">{HERO_CONTENT.ctaLabel}</span>
        <span className="hero-cta__icon">→</span>
      </a>
    </motion.div>
  )
}
