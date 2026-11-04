import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdvantageSection from './pages/AdvantageSection'
import HowToResurrectSection from './components/HowToResurrectSection'
import TimelineSection from './components/TimelineSection'
import ContactSection from './components/ContactSection'
import LazySection from './components/LazySection'
import { siteConfig } from './config/site.config'

const { sections, brand } = siteConfig

function WhatIsResurrectSection() {
  const sectionRef = useRef(null)
  const isInViewRef = useRef(false)
  const [animationRun, setAnimationRun] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInViewRef.current) {
          isInViewRef.current = true
          setAnimationRun((previous) => previous + 1)
        }

        if (!entry.isIntersecting) {
          isInViewRef.current = false
        }
      },
      {
        threshold: 0.6,
      }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="h-full w-full flex items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 md:py-14 overflow-hidden">
      <div key={animationRun} className="w-full max-w-6xl text-foreground section2-animated">
        <h2
          className="section-heading-size leading-tight mb-4 sm:mb-5 md:mb-6 section2-heading"
          style={{ fontFamily: 'var(--brand-font-display)', fontWeight: 700 }}
        >
          {sections.about.headingPrefix}{' '}
          <img
            src={brand.wordmark}
            alt={brand.wordmarkAlt}
            className="inline-block align-middle h-[0.72em] w-auto"
          />
          ?
        </h2>

        {sections.about.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={`text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed section2-copy ${
              index < sections.about.paragraphs.length - 1 ? 'mb-4 sm:mb-5' : ''
            }`}
            style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 500 }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

// Main landing page with scrollable sections
function LandingPage() {
  const scrollContainerRef = useRef(null)
  const [showScrollTopButton, setShowScrollTopButton] = useState(false)

  useEffect(() => {
    const element = scrollContainerRef.current

    if (!element) {
      return
    }

    const onScroll = () => {
      setShowScrollTopButton(element.scrollTop > 120)
    }

    element.addEventListener('scroll', onScroll)
    onScroll()

    return () => {
      element.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollToHome = () => {
    if (!scrollContainerRef.current) {
      return
    }

    scrollContainerRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div ref={scrollContainerRef} className="h-[100dvh] overflow-y-auto scroll-smooth snap-y snap-mandatory bg-void">
      {/* Section 1 - Home (Load immediately, it's above the fold) */}
      <section className="snap-start snap-always h-[100dvh] bg-void text-foreground">
        <Home />
      </section>

      {/* Section 2 - What is Resurrect? */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg text-foreground">
        <WhatIsResurrectSection />
      </LazySection>

      {/* Section 3 - The Resurrect Advantage (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[320dvh] event-section-bg text-foreground relative">
        <AdvantageSection scrollContainerRef={scrollContainerRef} />
      </LazySection>

      {/* Section 4 - How to Resurrect? (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg">
        <HowToResurrectSection />
      </LazySection>

      {/* Section 5 - Timeline (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg">
        <TimelineSection />
      </LazySection>

      {/* Section 6 - Contact & Socials (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg text-foreground">
        <ContactSection />
      </LazySection>

      <button
        type="button"
        onClick={scrollToHome}
        aria-label="Scroll back to home section"
        className={`scroll-top-button fixed z-50 bg-accent text-void rounded-full h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-accent-hover ${showScrollTopButton ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        <span className="text-xl leading-none" style={{ fontFamily: 'var(--brand-font-display)', fontWeight: 700 }}>
          ↑
        </span>
      </button>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}
