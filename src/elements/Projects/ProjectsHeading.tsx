import './styles/ProjectsHeading.web.css'
import './styles/ProjectsHeading.tablet.css'
import './styles/ProjectsHeading.mobile.css'
import { motion } from 'framer-motion'
import { PROJECTS, CONTACT, PROJECTS_CONTENT } from '../../constants/content'
import { redify } from '../../utils/redify'

const EASE = [0.16, 1, 0.3, 1] as const
const vp = { once: true, margin: '-52px' } as const

export default function ProjectsHeading() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -64, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={vp}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <h1 className="projects-heading">{redify('SELECTED')}<br />{redify('PROJECTS')}</h1>
      </motion.div>
      <motion.div
        className="projects-meta"
        initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={vp}
        transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
      >
        <p className="projects-meta__subtitle">{PROJECTS.length} {PROJECTS_CONTENT.subtitleSuffix}</p>
        <motion.a
          href={CONTACT.github} target="_blank" rel="noreferrer"
          className="projects-meta__github"
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.75, delay: 0.22, ease: EASE }}
        >
          <span className="projects-meta__github-label">{PROJECTS_CONTENT.githubLabel}</span>
          <span className="projects-meta__github-icon">→</span>
        </motion.a>
      </motion.div>
    </>
  )
}
