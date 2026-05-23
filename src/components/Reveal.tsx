import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

interface RevealProps {
  children: ReactNode
  /** Stagger index — each unit adds 0.09s delay */
  delay?: number
  /** Y travel distance in px (default 32) */
  y?: number
  /** Whether to also animate blur (default true) */
  blur?: boolean
  style?: CSSProperties
  className?: string
}

export default function Reveal({ children, delay = 0, y = 32, blur = true, style, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, ...(blur ? { filter: 'blur(4px)' } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }}
      viewport={{ once: true, margin: '-52px' }}
      transition={{ duration: 0.8, delay: delay * 0.09, ease: EASE }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
