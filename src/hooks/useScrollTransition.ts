import { useEffect, useRef } from 'react'

const SECTION_IDS = ['home', 'about', 'expertise', 'experience', 'qualifications', 'projects', 'contact']
/** Time (ms) to block new navigation after a section snap starts */
const COOLDOWN_MS = 1100
/** Min deltaY to count as a real scroll gesture — filters Mac trackpad momentum */
const MIN_DELTA = 8

/** Snap navigation only applies on desktop (> 1024px). Mobile/tablet uses the
 *  CSS card-stack (position: sticky + z-index stacking) with native scroll. */
function isDesktop() {
  return window.matchMedia('(min-width: 1025px)').matches
}

export function useSectionSnap() {
  const busy = useRef(false)
  const touchStartY = useRef(0)
  const touchInNoSnap = useRef(false)

  useEffect(() => {
    function sections() {
      return SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    }

    /** Last section whose top edge is above 50% of the viewport */
    function currentIndex(secs: HTMLElement[]) {
      const mid = window.innerHeight * 0.5
      for (let i = secs.length - 1; i >= 0; i--) {
        if (secs[i].getBoundingClientRect().top < mid) return i
      }
      return 0
    }

    function navigate(dir: 1 | -1) {
      if (!isDesktop()) return
      if (busy.current) return
      const secs = sections()
      const next = currentIndex(secs) + dir
      if (next < 0 || next >= secs.length) return
      busy.current = true
      secs[next].scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => { busy.current = false }, COOLDOWN_MS)
    }

    function onWheel(e: WheelEvent) {
      if (!isDesktop()) return  // card stack on mobile/tablet — allow native scroll
      if (document.body.style.overflow === 'hidden') return
      // Let natural scroll happen inside containers marked data-no-snap
      if ((e.target as Element).closest('[data-no-snap]')) return
      e.preventDefault()
      // Ignore Mac trackpad momentum events (very small deltaY after gesture ends)
      if (Math.abs(e.deltaY) < MIN_DELTA) return
      navigate(e.deltaY > 0 ? 1 : -1)
    }

    function onKeyDown(e: KeyboardEvent) {
      if (!isDesktop()) return
      if (document.body.style.overflow === 'hidden') return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); navigate(1) }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); navigate(-1) }
    }

    function onTouchStart(e: TouchEvent) {
      if (document.body.style.overflow === 'hidden') return
      touchInNoSnap.current = !!(e.target as Element).closest('[data-no-snap]')
      touchStartY.current = e.touches[0].clientY
    }
    function onTouchEnd(e: TouchEvent) {
      if (!isDesktop()) return  // card stack on mobile/tablet — allow native scroll
      if (document.body.style.overflow === 'hidden') return
      if (touchInNoSnap.current) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) > 40) navigate(delta > 0 ? 1 : -1)
    }

    window.addEventListener('wheel',      onWheel,      { passive: false })
    window.addEventListener('keydown',    onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })

    return () => {
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('keydown',    onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])
}

