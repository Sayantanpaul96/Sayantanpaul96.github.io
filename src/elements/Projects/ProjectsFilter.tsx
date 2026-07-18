import './styles/ProjectsFilter.web.css'
import './styles/ProjectsFilter.tablet.css'
import './styles/ProjectsFilter.mobile.css'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const vp = { once: true, margin: '-52px' } as const

type Filter = 'Professional' | 'Personal'

interface Props {
  filter: Filter
  setFilter: (f: Filter) => void
}

export default function ProjectsFilter({ filter, setFilter }: Props) {
  return (
    <motion.div
      className="projects-filter"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
    >
      {(['Professional', 'Personal'] as const).map(f => (
        <button
          key={f}
          className="projects-filter__tab"
          data-active={filter === f}
          onClick={() => setFilter(f)}
        >{f}</button>
      ))}
    </motion.div>
  )
}
