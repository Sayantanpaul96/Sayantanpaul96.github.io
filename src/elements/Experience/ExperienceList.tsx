import { useState } from 'react'
import './styles/ExperienceList.web.css'
import './styles/ExperienceList.tablet.css'
import './styles/ExperienceList.mobile.css'
import { EXPERIENCE } from '../../constants/content'
import Reveal from '../../components/Reveal'

export default function ExperienceList() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="glass-card">
      {EXPERIENCE.map((job, idx) => (
        <Reveal key={job.companyName} delay={idx + 1} blur={false} className={`exp-item${open !== null && open !== idx ? ' exp-item--hidden' : ''}`}>
          <button
            className="exp-item__header"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span className="exp-item__num">[{String(idx + 1).padStart(2, '0')}]</span>
            <span className="exp-item__company" data-open={open === idx}>{job.companyName}</span>
            <span className="exp-row-meta">
              {job.role}<br />
              <span className="exp-row-meta__period">{job.period}</span>
            </span>
            <span className="exp-item__toggle" data-open={open === idx}>+</span>
          </button>
          <div className="exp-item__body" data-open={open === idx}>
            <div className="exp-detail-grid">
              <div className="exp-detail__left">
                <p className="exp-detail__desc">{job.description}</p>
                <div className="exp-tech">
                  <p className="exp-tech__label">Tech Stack</p>
                  <div className="exp-tech__tags">
                    {job.tech.map(t => <span key={t} className="exp-tech__tag">{t}</span>)}
                  </div>
                </div>
              </div>
              <ul className="exp-detail__bullets">
                {job.bullets.map((b, i) => (
                  <li key={i} className="exp-detail__bullet">
                    <span className="exp-detail__bullet-dash">—</span>
                    <p className="exp-detail__bullet-text">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
      <div className="exp-list__end" />
    </div>
  )
}
