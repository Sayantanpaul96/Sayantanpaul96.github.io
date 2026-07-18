import './styles/FooterBar.web.css'
import './styles/FooterBar.tablet.css'
import './styles/FooterBar.mobile.css'
import { SITE_META } from '../../constants/content'
import { font, color } from '../../constants/styles'

export default function FooterBar() {
  return (
    <>
      <span style={{ fontFamily: font.bebas, fontSize: '1.1rem', letterSpacing: '0.15em', color: color.white }}>
        {SITE_META.initials}
      </span>
      <span style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
        © {new Date().getFullYear()} {SITE_META.name} — All rights reserved
      </span>
      <span className="footer-location" style={{ fontFamily: font.inter, fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {SITE_META.location}
      </span>
    </>
  )
}
