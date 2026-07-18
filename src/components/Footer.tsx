import FooterBar from '../elements/Footer/FooterBar'

export default function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        position: 'relative',
        zIndex: 900,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(24px) saturate(180%) brightness(0.85)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(0.85)',
        boxShadow: '0 -1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.04)',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      <FooterBar />
    </footer>
  )
}
