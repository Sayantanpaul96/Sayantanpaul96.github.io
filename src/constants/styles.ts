import type { CSSProperties } from 'react'

// ─── Design tokens ───────────────────────────────────────────────────────────

export const font = {
  bebas: '"Bebas Neue", sans-serif',
  geist: '"Geist", "Inter", sans-serif',
  inter: '"Inter", sans-serif',
} as const

export const color = {
  bg:     '#0a0a0a',
  border: '#1c1c1c',
  accent: '#00e574',
  white:  '#ffffff',
  muted:  'rgba(255,255,255,0.45)',
  faint:  'rgba(255,255,255,0.25)',
  dim:    'rgba(255,255,255,0.1)',
  text75: 'rgba(255,255,255,0.75)',
  text35: 'rgba(255,255,255,0.35)',
  text30: 'rgba(255,255,255,0.3)',
} as const

export const ease = {
  expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const

// ─── Animation helpers ───────────────────────────────────────────────────────

type AnimName = 'heroSlideUp' | 'heroSlideRight' | 'heroPop'

/** Returns an animation string (or 'none') gated on the loaded flag. */
export function anim(name: AnimName, duration: string, delay: string, loaded = true): string {
  return loaded ? `${name} ${duration} ${ease.expo} ${delay} both` : 'none'
}

// ─── Section layout ──────────────────────────────────────────────────────────

/** Base <section> wrapper */
export const sectionBase: CSSProperties = {
  background: 'transparent',
  borderBottom: `1px solid ${color.border}`,
  position: 'relative',
  overflow: 'hidden',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}

/** Full-width flex column — left-aligned (Hero) */
export const sectionContent: CSSProperties = {
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '2.5rem',
  paddingTop: 'calc(2.5rem + 84px)',
}

/** Right-half flex column — right-aligned sections (About, etc.) */
export const sectionContentRight: CSSProperties = {
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '2.5rem',
  paddingTop: 'calc(2.5rem + 84px)',
  marginLeft: '50%',
}

// ─── Typography ──────────────────────────────────────────────────────────────

/** Large Bebas Neue display heading */
export const heroHeading: CSSProperties = {
  fontFamily: font.bebas,
  fontSize: 'clamp(4rem, 10vw, 9rem)',
  lineHeight: 0.88,
  letterSpacing: '0.01em',
  color: color.white,
  margin: 0,
}

/** Subtitle / h2 */
export const subHeading: CSSProperties = {
  fontFamily: font.geist,
  fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
  fontWeight: 400,
  lineHeight: 1.25,
  color: color.white,
  margin: 0,
}

/** Regular body paragraph */
export const bodyText: CSSProperties = {
  fontFamily: font.geist,
  fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
  fontWeight: 400,
  lineHeight: 1.75,
  color: color.text75,
  margin: 0,
}

/** Small uppercase service / tag text */
export const tagText: CSSProperties = {
  fontFamily: font.geist,
  fontSize: '0.78rem',
  fontWeight: 500,
  color: color.white,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

/** Tiny uppercase label / caption */
export const labelText: CSSProperties = {
  fontFamily: font.inter,
  fontSize: '0.6rem',
  color: color.faint,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}

/** Muted small print */
export const mutedText: CSSProperties = {
  fontFamily: font.geist,
  fontSize: '0.78rem',
  color: color.muted,
  letterSpacing: '0.06em',
}

/** Company / brand name text */
export const brandText: CSSProperties = {
  fontFamily: font.geist,
  fontSize: '0.72rem',
  fontWeight: 700,
  color: color.text30,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  transition: 'color 0.25s',
}

/** Stats number */
export const statNumber: CSSProperties = {
  fontFamily: font.bebas,
  fontSize: '6rem',
  color: color.white,
  letterSpacing: '0.04em',
  lineHeight: 1,
}

/** Stats label */
export const statLabel: CSSProperties = {
  fontSize: '1rem',
  color: color.text35,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  fontFamily: font.inter,
}
