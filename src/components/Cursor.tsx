import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    let mx = -100, my = -100
    let rx = -100, ry = -100

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const loop = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }

    const onEnterLink = () => {
      if (dotRef.current) dotRef.current.style.transform += ' scale(0)'
      if (ringRef.current) {
        ringRef.current.style.width = '48px'
        ringRef.current.style.height = '48px'
        ringRef.current.style.borderColor = '#00e574'
      }
    }
    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '28px'
        ringRef.current.style.height = '28px'
        ringRef.current.style.borderColor = 'rgba(181,28,29,0.4)'
      }
    }

    window.addEventListener('mousemove', onMove)

    const bindLinks = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }
    bindLinks()
    const obs = new MutationObserver(bindLinks)
    obs.observe(document.body, { childList: true, subtree: true })

    loop()
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return (
    <div className="cursor-root">
      {/* dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          width: '5px', height: '5px', borderRadius: '50%',
          background: '#00e574',
          pointerEvents: 'none',
          transition: 'transform 0.08s linear',
        }}
      />
      {/* ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998,
          width: '28px', height: '28px', borderRadius: '50%',
          border: '1px solid rgba(0,229,116,0.4)',
          pointerEvents: 'none',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
    </div>
  )
}
