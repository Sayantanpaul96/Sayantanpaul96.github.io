import { sectionBase } from '../constants/styles'
import ContactHeading from '../elements/Contact/ContactHeading'
import ContactCTA from '../elements/Contact/ContactCTA'
import ContactPages from '../elements/Contact/ContactPages'
import ContactInfo from '../elements/Contact/ContactInfo'

export default function Contact() {
  return (
    <section id="contact" className="contact-section" style={{ ...sectionBase }}>
      <div className="grain-overlay" />
      <div className="contact-content" style={{ position: 'relative', zIndex: 2 }}>
        <ContactHeading />
        <ContactCTA />
        <div className="contact-grid" style={{ gap: '1rem' }}>
          <ContactPages />
          <ContactInfo />
        </div>
      </div>
    </section>
  )
}
