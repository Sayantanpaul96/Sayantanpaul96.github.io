import './styles/AboutBio.web.css'
import './styles/AboutBio.tablet.css'
import './styles/AboutBio.mobile.css'
import { ABOUT_BIO, ABOUT_CONTENT, CONTACT } from '../../constants/content'
import Reveal from '../../components/Reveal'

export default function AboutBio() {
  return (
    <Reveal className="about-bio__wrapper" delay={2}>
      <p className="about-bio">{ABOUT_BIO[0]}{' '}{ABOUT_BIO[1]}</p>
      <div className="about-bio__ctas">
        <button
          className="about-bio__btn"
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="about-bio__btn-label">{ABOUT_CONTENT.ctaLabel}</span>
          <span className="about-bio__btn-icon">→</span>
        </button>
        <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="about-bio__link">
          <span className="about-bio__link-label">{ABOUT_CONTENT.linkedInLabel}</span>
          <span className="about-bio__link-icon">→</span>
        </a>
      </div>
    </Reveal>
  )
}
