import { createContext, useContext, useRef, useState, useCallback, type ReactNode } from 'react'

export type TPhase = 'idle' | 'in' | 'hold' | 'out'

interface PageTransitionCtx {
  navigate: (href: string, label?: string) => void
  phase: TPhase
  label: string
}

const PageTransitionContext = createContext<PageTransitionCtx>({
  navigate: () => {},
  phase: 'idle',
  label: '',
})

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<TPhase>('idle')
  const [label, setLabel] = useState('')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const navigate = useCallback((href: string, lbl = '') => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    setLabel(lbl)
    setPhase('in')
    document.body.classList.add('no-scroll')

    timers.current.push(
      setTimeout(() => {
        setPhase('hold')
        if (href === '#home') {
          window.scrollTo({ top: 0, behavior: 'instant' })
        } else {
          document.querySelector(href)?.scrollIntoView({ behavior: 'instant' })
        }
      }, 800),
    )

    timers.current.push(
      setTimeout(() => {
        setPhase('out')
        document.body.classList.remove('no-scroll')
      }, 1200),
    )

    timers.current.push(setTimeout(() => setPhase('idle'), 2000))
  }, [])

  return (
    <PageTransitionContext value={{ navigate, phase, label }}>
      {children}
    </PageTransitionContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePageTransition = () => useContext(PageTransitionContext)
