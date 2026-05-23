// Theme token definitions — extend as needed
export type ThemeMode = 'dark' | 'light'

export interface ThemeTokens {
  bg: string
  bgSurface: string
  text: string
  textMuted: string
  border: string
  accent: string
  accentFg: string
  outline: string
}

export const themes: Record<ThemeMode, ThemeTokens> = {
  dark: {
    bg: '#0a0a0a',
    bgSurface: '#111111',
    text: '#f5f5f5',
    textMuted: '#a3a3a3',
    border: '#262626',
    accent: '#d4ff00',
    accentFg: '#0a0a0a',
    outline: 'rgba(212,255,0,0.35)',
  },
  light: {
    bg: '#fafafa',
    bgSurface: '#ffffff',
    text: '#0a0a0a',
    textMuted: '#525252',
    border: '#e5e5e5',
    accent: '#ff6200',
    accentFg: '#ffffff',
    outline: 'rgba(255,98,0,0.35)',
  },
}
