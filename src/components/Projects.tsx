import { useState } from 'react'
import { sectionBase } from '../constants/styles'
import ProjectsHeading from '../elements/Projects/ProjectsHeading'
import ProjectsFilter from '../elements/Projects/ProjectsFilter'
import ProjectsList from '../elements/Projects/ProjectsList'

type Filter = 'Professional' | 'Personal'

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('Professional')

  return (
    <section id="projects" style={{ ...sectionBase }}>
      <div className="grain-overlay" />
      <div style={{ position: 'relative', zIndex: 2, padding: '2.5rem', display: 'flex', flexDirection: 'column' }} className="section-inner">
        <ProjectsHeading />
        <ProjectsFilter filter={filter} setFilter={setFilter} />
        <ProjectsList filter={filter} />
      </div>
    </section>
  )
}
