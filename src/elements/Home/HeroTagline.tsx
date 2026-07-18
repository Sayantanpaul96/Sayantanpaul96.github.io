import './styles/HeroTagline.web.css'
import './styles/HeroTagline.tablet.css'
import './styles/HeroTagline.mobile.css'
import { motion } from 'framer-motion'
import { HERO_CONTENT } from '../../constants/content'

const EASE = [0.16, 1, 0.3, 1] as const

export default function HeroTagline({ loaded }: { loaded: boolean }) {
  return (
    <motion.h2
      className="hero-tagline"
      initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
      animate={loaded ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.95, delay: 0.2, ease: EASE }}
    >
      {HERO_CONTENT.subtitle.split('\n').map((line, i, arr) => (
        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
      ))}
    </motion.h2>
  )
}
