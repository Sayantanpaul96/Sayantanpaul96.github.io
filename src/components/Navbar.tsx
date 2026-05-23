import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SITE_META, NAV_LINKS, CONTACT } from '../constants/content'

// Crevo 3×3 dot grid colors — center dot (#4, 0-indexed) is white, rest aurora green
const DOT_COLORS = [
  '#00e574', '#00e574', '#00e574',
  '#00e574', '#ffffff', '#00e574',
  '#00e574', '#00e574', '#00e574',
]

const SOCIAL_LINKS = [
  { label: 'GH', href: CONTACT.github },
  { label: 'LN', href: CONTACT.linkedin },
  { label: 'ML', href: `mailto:${CONTACT.email}` },
]

const LABEL_STYLE = {
  fontFamily: '"Inter", sans-serif',
  fontSize: '0.72rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: '#fff',
  lineHeight: 1.2,
}

export default function Navbar({ loaded }: { loaded: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Top info bar ── */}
      <motion.div
        initial={{ y: -84, opacity: 0 }}
        animate={loaded ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900 }}
      >
      <Box
        component="header"
        sx={{
          height: '84px',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px) saturate(180%) brightness(0.85)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(0.85)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Brand / Logo */}
        <Box
          component="button"
          onClick={() => handleNav('#home')}
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
            px: '16px',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.65rem', letterSpacing: '0.15em', color: '#fff',
            background: 'none', border: 'none',
            /* cursor: 'none', */ flexShrink: 0,
            transition: 'color 0.2s',
              '&:hover': { color: '#00e574' },
          }}
        >
          {SITE_META.initials}
        </Box>

        {/* Nav Location */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            px: '16px',
            py: '18px',
          }}
        >
          <Typography sx={{ ...LABEL_STYLE, color: '#fff' }}>
            12.9716° N — 77.5946° E
          </Typography>
          <Typography sx={{ ...LABEL_STYLE, color: '#fff' }}>
            Bangalore. India
          </Typography>
        </Box>

        {/* Nav Social — right side */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            px: '20px',
            py: '18px',
          }}
        >
          <Typography sx={LABEL_STYLE}>Social media</Typography>

          {/* GH / LN / ML links */}
          <Stack direction="row" sx={{ alignItems: 'center' }} spacing={0}>
              {SOCIAL_LINKS.map((s, i) => (
                <Stack key={s.label} direction="row" sx={{ alignItems: 'center' }}>
                  <Box
                    component="a"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontFamily: '"Geist", "Inter", sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#fff',
                      letterSpacing: '0.08em',
                      lineHeight: '0.9em',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      '&:hover': { color: '#00e574' },
                    }}
                  >
                    {s.label}
                  </Box>
                  {i < SOCIAL_LINKS.length - 1 && (
                    <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.05rem', mx: '6px', lineHeight: 1 }}>
                      /
                    </Typography>
                  )}
                </Stack>
              ))}
            </Stack>
        </Box>

        {/* Nav Right — Crevo Menu Button */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center',
            px: '16px',
          }}
        >
          <Box
            component="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            sx={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '4px',
              px: '14px', py: '9px',
              /* cursor: 'none', */
              transition: 'background 0.2s, border-color 0.2s',
              '&:hover': {
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.12)',
              },
            }}
          >
            {/* 3×3 dot grid — exact Crevo pattern */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 6px)',
                gridTemplateRows: 'repeat(3, 6px)',
                gap: '3.5px',
              }}
            >
              {DOT_COLORS.map((color, i) => (
                <Box
                  key={i}
                  sx={{
                    width: '6px', height: '6px',
                    borderRadius: '1px',
                    background: menuOpen
                      ? (color === '#ffffff' ? '#ffffff' : 'rgba(0,229,116,0.5)')
                      : color,
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </Box>

            {/* "Menu" label */}
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.93rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </Typography>
          </Box>
        </Box>
      </Box>
      </motion.div>

      {/* ── Full-screen overlay menu ── */}
      <Box
        sx={{
          position: 'fixed', inset: 0, zIndex: 800,
          display: 'flex', flexDirection: 'column',
          background: 'rgba(1, 8, 16, 0.78)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Menu header bar */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: '84px', borderBottom: '1px solid rgba(255,255,255,0.08)', px: '24px',
          }}
        >
          <Typography
            sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.65rem', letterSpacing: '0.15em', color: '#fff' }}
          >
            {SITE_META.initials}
          </Typography>
          <Box
            component="button"
            onClick={() => setMenuOpen(false)}
            sx={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', /* cursor: 'none', */
              fontFamily: '"Inter", sans-serif', fontSize: '0.9rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff',
              transition: 'color 0.2s',
              '&:hover': { color: '#00e574' },
            }}
          >
            <span style={{ fontSize: '1.65rem', lineHeight: 1 }}>✕</span>
            Close
          </Box>
        </Box>

        {/* Nav links */}
        <Box
          sx={{
            flex: 1, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', px: { xs: '24px', md: '80px' },
          }}
        >
          {NAV_LINKS.map((l, i) => (
            <Box
              key={l.href}
              component="button"
              onClick={() => handleNav(l.href)}
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.08)', py: { xs: '20px', md: '26px' },
                background: 'none', border: 'none',
                textAlign: 'left', /* cursor: 'none', */ width: '100%',
                '&:hover .nav-link-label': { color: '#00e574' },
                '&:hover .nav-link-arrow': { color: '#00e574', transform: 'translateX(6px)' },
              }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', gap: '20px' }}>
                <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', fontFamily: '"Inter", sans-serif', letterSpacing: '0.1em' }}>
                  0{i + 1}
                </Typography>
                <Typography
                  className="nav-link-label"
                  sx={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    letterSpacing: '0.04em',
                    color: '#fff', lineHeight: 1,
                    transition: 'color 0.2s',
                  }}
                >
                  {l.label}
                </Typography>
              </Stack>
              <Typography
                className="nav-link-arrow"
              sx={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s, transform 0.2s' }}
              >
                →
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Menu footer */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: { xs: '24px', md: '80px' }, py: '20px', borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>
            12.9716° N — 77.5946° E · Bangalore. India
          </Typography>
          <Box
            component="a"
            href={`mailto:${CONTACT.email}`}
            sx={{
              fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', fontFamily: '"Inter", sans-serif',
              textDecoration: 'none', transition: 'color 0.2s',
              '&:hover': { color: '#fff' },
            }}
          >
            {CONTACT.email}
          </Box>
        </Box>
      </Box>
    </>
  )
}
