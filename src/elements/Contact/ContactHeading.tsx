import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './styles/ContactHeading.web.css'
import './styles/ContactHeading.tablet.css'
import './styles/ContactHeading.mobile.css'
import { CONTACT } from '../../constants/content'
import { heroHeading, color } from '../../constants/styles'
import { redify } from '../../utils/redify'
import Reveal from '../../components/Reveal'

const EASE = [0.16, 1, 0.3, 1] as const

export default function ContactHeading() {
  const circleRef = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 160, damping: 16 })
  const springY = useSpring(my, { stiffness: 160, damping: 16 })

  function onMouseMove(e: React.MouseEvent) {
    const rect = circleRef.current!.getBoundingClientRect()
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.35)
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.35)
  }
  function onMouseLeave() { mx.set(0); my.set(0) }

  return (
    <Reveal>
      <div className="contact-heading" style={{ ...heroHeading, marginBottom: '0.05em' }}>
        {redify("LET'S WORK")}
      </div>
      <div className="contact-heading__row" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1.5vw, 1.2rem)', marginBottom: '2.5rem' }}>
        <span className="contact-heading" style={{ ...heroHeading }}>T</span>
        <a
          ref={circleRef}
          href={`mailto:${CONTACT.email}`}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ display: 'block', textDecoration: 'none' }}
        >
          <motion.span
            style={{
              x: springX, y: springY,
              width: 'clamp(3rem, 7vw, 6rem)', height: 'clamp(3rem, 7vw, 6rem)',
              borderRadius: '50%', background: color.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
            whileHover={{ scale: 1.12 }}
            transition={{ scale: { duration: 0.35, ease: EASE } }}
          >
            <svg style={{ width: '35%', height: '35%', transform: 'rotate(-25deg)' }} viewBox="0 0 49 39" fill="none">
              <path d="M2 19.5h45M27 2l20 17.5L27 37" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </a>
        <span className="contact-heading" style={{ ...heroHeading }}>GETHER</span>
      </div>
    </Reveal>
  )
}
