import './styles/HeroTitle.web.css'
import './styles/HeroTitle.tablet.css'
import './styles/HeroTitle.mobile.css'
import { motion } from 'framer-motion'
import { redify } from '../../utils/redify'

const EASE = [0.16, 1, 0.3, 1] as const

export default function HeroTitle({ loaded }: { loaded: boolean }) {
  return (
    <motion.h1
      className="hero-title__heading"
      initial={{ opacity: 0, y: 56, filter: 'blur(6px)' }}
      animate={loaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.15, delay: 0.05, ease: EASE }}
    >
      {redify('SAYANTAN')}<br />{redify('PAUL')}
    </motion.h1>
  )
}
