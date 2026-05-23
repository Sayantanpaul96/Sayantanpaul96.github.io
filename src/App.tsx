import { useState, useCallback } from 'react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { PageTransitionProvider } from './context/TransitionContext'
import TransitionOverlay from './components/TransitionOverlay'
// import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import CoreExpertise from './components/CoreExpertise'
import Experience from './components/Experience'
import Qualifications from './components/Qualifications'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { useSectionSnap } from './hooks/useScrollTransition'
import AuroraBackground from './components/AuroraBackground'

function PageContent() {
  const [loaded, setLoaded] = useState(false)

  if (typeof history !== 'undefined') history.scrollRestoration = 'manual'

  useSectionSnap()

  const handleLoaded = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setLoaded(true)
  }, [])

  return (
    <>
      <TransitionOverlay />
      {/* <Cursor /> */}
      {!loaded && <Loader onDone={handleLoaded} />}
      <div
        className="transition-opacity duration-500"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        {/* Aurora gradient — whole-site background (video lives inside Hero) */}
        <AuroraBackground />
        <Navbar loaded={loaded} />
        <main>
          <Hero loaded={loaded} />
          <About />
          <CoreExpertise />
          <Experience />
          <Qualifications />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PageTransitionProvider>
        <MotionConfig reducedMotion="user">
          <PageContent />
        </MotionConfig>
      </PageTransitionProvider>
    </ThemeProvider>
  )
}

