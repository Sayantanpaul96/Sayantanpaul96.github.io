import { usePageTransition } from '../context/TransitionContext'

export default function TransitionOverlay() {
  const { phase } = usePageTransition()

  const active = phase !== 'idle'

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9980] flex"
      aria-hidden
    >
      {/* Left panel */}
      <div
        className="h-full bg-surface transition-all duration-700"
        style={{
          width: '50%',
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)',
        }}
      />
      {/* Right panel */}
      <div
        className="h-full bg-surface transition-all duration-700"
        style={{
          width: '50%',
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'right',
          transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)',
          transitionDelay: '60ms',
        }}
      />
    </div>
  )
}
