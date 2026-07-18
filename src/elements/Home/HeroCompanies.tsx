import './styles/HeroCompanies.web.css'
import './styles/HeroCompanies.tablet.css'
import './styles/HeroCompanies.mobile.css'
import { motion } from 'framer-motion'
import { HERO_COMPANIES, HERO_CONTENT } from '../../constants/content'

const EASE = [0.16, 1, 0.3, 1] as const

export default function HeroCompanies({ loaded }: { loaded: boolean }) {
  return (
    <motion.div
      className="hero-companies"
      initial={{ opacity: 0, x: 32 }}
      animate={loaded ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
    >
      <p className="hero-companies__label">{HERO_CONTENT.companiesLabel}</p>
      <div className="hero-companies__row">
        {HERO_COMPANIES.map(c => (
          <span key={c.name} className="hero-companies__brand">{c.name}</span>
        ))}
      </div>
    </motion.div>
  )
}
