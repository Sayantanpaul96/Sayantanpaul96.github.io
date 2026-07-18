import './styles/ProjectsList.web.css'
import './styles/ProjectsList.tablet.css'
import './styles/ProjectsList.mobile.css'
import { motion } from 'framer-motion'
import { PROJECTS } from '../../constants/content'
import Reveal from '../../components/Reveal'

const EASE = [0.16, 1, 0.3, 1] as const
const vp = { once: true, margin: '-52px' } as const

type Filter = 'Professional' | 'Personal'

function ProjectRow({ project: p, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  return (
    <Reveal delay={index + 1} blur={false} className="project-row">
      <div className="project-row-meta">
        <span className="project-row-meta__num">[{String(index + 1).padStart(2, '0')}]</span>
        <span className="project-row-meta__type">{p.type}</span>
        <span className="project-row-meta__year">{p.year}</span>
      </div>
      <div className="project-row__center">
        <p className="project-row__title">{p.title}</p>
        <p className="project-row__desc">{p.description}</p>
        <div className="project-row__tech">
          {p.tech.map(t => <span key={t} className="project-row__tech-tag">{t}</span>)}
        </div>
      </div>
      <div className="project-row__link-wrap">
        {p.link ? (
          <a href={p.link} target="_blank" rel="noreferrer" className="project-row__link">
            <span className="project-row__link-label">{p.linkLabel ?? 'View'}</span>
            <span className="project-row__link-icon">→</span>
          </a>
        ) : (
          <span className="project-row__internal">
            <span className="project-row__internal-label">Internal</span>
            <span className="project-row__internal-icon">!</span>
          </span>
        )}
      </div>
    </Reveal>
  )
}

export default function ProjectsList({ filter }: { filter: Filter }) {
  const filtered = PROJECTS.filter(p => p.type === filter)
  return (
    <motion.div
      data-no-snap
      className="glass-card projects-list"
      initial={{ opacity: 0, y: 56, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={vp}
      transition={{ duration: 1.0, delay: 0.36, ease: EASE }}
    >
      {filtered.map((p, idx) => <ProjectRow key={p.title} project={p} index={idx} />)}
      <div className="projects-list__end" />
    </motion.div>
  )
}
