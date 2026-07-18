import { sectionBase, sectionContentRight } from '../constants/styles'
import AboutHeading from '../elements/About/AboutHeading'
import AboutBio from '../elements/About/AboutBio'

const DIAGONAL_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='126' height='126'%3E%3Cpath d='M126 0v21.584L21.584 126H0v-17.585L108.415 0H126Zm0 108.414V126h-17.586L126 108.414Zm0-84v39.171L63.585 126H24.414L126 24.414Zm0 42v39.17L105.584 126h-39.17L126 66.414ZM105.586 0 0 105.586V66.415L66.415 0h39.171Zm-42 0L0 63.586V24.415L24.415 0h39.171Zm-42 0L0 21.586V0h21.586Z' fill='rgb(136%2C136%2C136)' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C%2Fsvg%3E")`

export default function About() {
  return (
    <section id="about" style={{ ...sectionBase }}>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: DIAGONAL_SVG, backgroundSize: '64px 64px' }} />
      <div className="grain-overlay" />

      <div style={{ ...sectionContentRight }} className="about-content">
        <div style={{ flex: 0.8 }} />
        <AboutHeading />
        <AboutBio />
        <div style={{ flex: 1 }} />
      </div>
    </section>
  )
}
