import { useState, useEffect, lazy, Suspense, memo, useCallback } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { portfolioData, titles } from './data/portfolioData'
import './App.css'
import './optimization.css'

// Lazy load components untuk performa lebih baik
const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Education = lazy(() => import('./components/Education'))
const Skills = lazy(() => import('./components/Skills'))
const Contact = lazy(() => import('./components/Contact'))

// Loading component dengan skeleton
const SectionLoader = () => (
  <div style={{
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
    padding: '2rem'
  }}>
    <div className="skeleton-loader" style={{
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div className="skeleton-line" style={{
        height: '40px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
        borderRadius: '8px',
        animation: 'shimmer 1.5s infinite'
      }}></div>
      <div className="skeleton-line" style={{
        height: '100px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
        borderRadius: '8px',
        animation: 'shimmer 1.5s infinite',
        animationDelay: '0.2s'
      }}></div>
    </div>
  </div>
)

// Add shimmer keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes shimmer {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  `
  document.head.appendChild(style)
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [mountedSections, setMountedSections] = useState({ about: false, experience: false, projects: false, education: false, skills: false, contact: false })
  const [heroLoaded, setHeroLoaded] = useState(false)

  // Navigation handler with useCallback untuk prevent re-render
  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false) // Close mobile menu when navigating

    // Wait a bit for state updates
    setTimeout(() => {
      const element = document.getElementById(sectionId)

      if (element) {
        const offsetTop = element.offsetTop - 80 // Account for navbar height

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      } else {
        // Fallback: try to scroll to approximate position
        const approximatePositions = {
          'home': 0,
          'about': window.innerHeight,
          'experience': window.innerHeight * 2,
          'projects': window.innerHeight * 3,
          'education': window.innerHeight * 4,
          'skills': window.innerHeight * 5,
          'contact': window.innerHeight * 6
        }

        if (approximatePositions[sectionId] !== undefined) {
          window.scrollTo({
            top: approximatePositions[sectionId],
            behavior: 'smooth'
          })
        }
      }
    }, 100)
  }, [])

  // Defer mounting sections untuk initial load lebih cepat
  useEffect(() => {
    // Mount About section setelah short delay (prioritas tinggi)
    const aboutTimer = setTimeout(() => {
      setMountedSections(prev => ({ ...prev, about: true }))
    }, 300)

    // Mount sections lainnya secara bertahap
    const othersTimer = setTimeout(() => {
      setMountedSections({ about: true, experience: true, projects: true, education: true, skills: true, contact: true })
    }, 800)

    return () => {
      clearTimeout(aboutTimer)
      clearTimeout(othersTimer)
    }
  }, [])

  // Hero loaded callback
  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Scroll spy effect dengan throttling untuk performa
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'about', 'experience', 'projects', 'education', 'skills', 'contact']
          const scrollPosition = window.scrollY + 100

          // Add navbar scroll effect
          const navbar = document.querySelector('.navbar')
          if (navbar) {
            if (window.scrollY > 50) {
              navbar.classList.add('scrolled')
            } else {
              navbar.classList.remove('scrolled')
            }
          }

          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const { offsetTop, offsetHeight } = element
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section)
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Typing animation effect
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex]
    let charIndex = 0
    let isDeleting = false

    const typeInterval = setInterval(() => {
      if (!isDeleting) {
        if (charIndex < currentTitle.length) {
          setTypedText(currentTitle.substring(0, charIndex + 1))
          charIndex++
        } else {
          setTimeout(() => {
            isDeleting = true
          }, 2000)
        }
      } else {
        if (charIndex > 0) {
          setTypedText(currentTitle.substring(0, charIndex - 1))
          charIndex--
        } else {
          isDeleting = false
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
        }
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [currentTitleIndex])

  return (
    <div className="app">
      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        portfolioData={portfolioData}
      />

      <Hero
        scrollToSection={scrollToSection}
        typedText={typedText}
        portfolioData={portfolioData}
        onLoad={() => setHeroLoaded(true)}
      />

      {mountedSections.about && (
        <Suspense fallback={<SectionLoader />}>
          <About portfolioData={portfolioData} />
        </Suspense>
      )}

      {mountedSections.experience && (
        <Suspense fallback={<SectionLoader />}>
          <Experience portfolioData={portfolioData} />
        </Suspense>
      )}

      {mountedSections.projects && (
        <Suspense fallback={<SectionLoader />}>
          <Projects portfolioData={portfolioData} />
        </Suspense>
      )}

      {mountedSections.education && (
        <Suspense fallback={<SectionLoader />}>
          <Education portfolioData={portfolioData} />
        </Suspense>
      )}

      {mountedSections.skills && (
        <Suspense fallback={<SectionLoader />}>
          <Skills portfolioData={portfolioData} />
        </Suspense>
      )}

      {mountedSections.contact && (
        <Suspense fallback={<SectionLoader />}>
          <Contact portfolioData={portfolioData} />
        </Suspense>
      )}

      <Footer portfolioData={portfolioData} />
    </div>
  )
}

export default App
