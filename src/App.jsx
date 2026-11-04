import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/AboutSection"
import HowToUnleash from "./components/HowToUnleashSection"
import TimelineSection from "./components/TimelineSection"
import LazySection from "./components/LazySection"

function WhatIsUnleashedSection() {
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
      <div key={animationRun} className="w-full max-w-6xl text-white section2-animated">
        <h2
          className="section-heading-size leading-tight mb-4 sm:mb-5 md:mb-6 section2-heading"
          style={{ fontFamily: "GomariceNoContinue", fontWeight: 700 }}
        >
          What is CoRE <span className="unleashed-word">UNLEASHED</span>?
        </h2>

        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-4 sm:mb-5 section2-copy section2-copy-1"
          style={{ fontFamily: "Inter", fontWeight: 500 }}
        >
          CoRE <span className="unleashed-word">UNLEASHED</span> is a high-octane 36-hour innovation marathon organized by the Center of Research Excellency (CoRE) in proud collaboration with the IEEE VCET Student Branch and our industry partner, CodeZyng.
        </p>

        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed section2-copy section2-copy-2"
          style={{ fontFamily: "Inter", fontWeight: 500 }}
        >
          Taking place from April 24th to 26th, 2026, at VCET, Puttur, this event is designed to be the ultimate testing ground for student developers, designers, and problem-solvers. We’re providing the platform; you provide the code that breaks the status quo.
        </p>
      </div>
    </section>
  )
}

function ContactAndSocialSection() {
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
        threshold: 0.55,
      }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="h-full w-full box-border px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-8 md:py-12 text-white overflow-hidden">
      <div key={animationRun} className="w-full h-full min-h-0 flex flex-col section6-animated">
        <h2
          className="section-heading-size leading-tight mb-3 sm:mb-5 md:mb-7 section6-heading"
          style={{ fontFamily: 'GomariceNoContinue', fontWeight: 700 }}
        >
          Contact & Socials
        </h2>

        <div className="section6-scroll flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 sm:gap-5 pr-1">
          <div className="rounded-xl border border-white/20 bg-black/25 p-3 sm:p-5 md:p-6 section6-card section6-card-1">
            <div className="space-y-3 sm:space-y-5" style={{ fontFamily: 'Inter' }}>
              <div className="rounded-lg border border-white/20 bg-black/35 p-3 sm:p-4 section6-card section6-card-2">
                <p className="font-semibold text-base sm:text-lg">Srinivas Hegde M</p>
                <a href="tel:+919060159605" className="block text-white/90 hover:text-white">+91 90601 59605</a>
                <a href="mailto:hegdesrinivasm+queries@gmail.com" className="block text-white/90 hover:text-white break-all">hegdesrinivasm@gmail.com</a>
              </div>

              <div className="rounded-lg border border-white/20 bg-black/35 p-3 sm:p-4 section6-card section6-card-3">
                <p className="font-semibold text-base sm:text-lg">K Shreekrishna Upadhyaya</p>
                <a href="tel:+919686108613" className="block text-white/90 hover:text-white">+91 96861 08613</a>
                <a href="mailto:upadhyayashreekrishna+queries@gmail.com" className="block text-white/90 hover:text-white break-all">upadhyayashreekrishna@gmail.com</a>
              </div>

              <div className="rounded-lg border border-white/20 bg-black/35 p-3 sm:p-4 section6-card section6-card-4">
                <p className="font-semibold text-base sm:text-lg">Adithya</p>
                <a href="tel:+917204735907" className="block text-white/90 hover:text-white">+91 72047 35907</a>
                <a href="mailto:adithya1489181+queries@gmail.com" className="block text-white/90 hover:text-white break-all">adithya1489181@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-lg" style={{ fontFamily: 'Inter' }}>
            <div className="rounded-lg border border-white/20 bg-black/35 p-3 sm:p-4 min-w-[200px] flex-1 section6-card section6-card-5">
              <a
                href="https://corevcet.wixsite.com/core/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white break-all section6-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm7.93 9h-3.08a15.63 15.63 0 0 0-1.1-4.17A8.03 8.03 0 0 1 19.93 11ZM12 4.08c.84 0 2.46 2.06 2.92 6.92H9.08C9.54 6.14 11.16 4.08 12 4.08ZM8.25 6.83A15.63 15.63 0 0 0 7.15 11H4.07a8.03 8.03 0 0 1 4.18-4.17ZM4.07 13h3.08a15.63 15.63 0 0 0 1.1 4.17A8.03 8.03 0 0 1 4.07 13ZM12 19.92c-.84 0-2.46-2.06-2.92-6.92h5.84c-.46 4.86-2.08 6.92-2.92 6.92Zm3.75-2.75A15.63 15.63 0 0 0 16.85 13h3.08a8.03 8.03 0 0 1-4.18 4.17Z" />
                </svg>
                <span>corevcet.wixsite.com/core</span>
              </a>
            </div>

            <div className="rounded-lg border border-white/20 bg-black/35 p-3 sm:p-4 min-w-[200px] flex-1 section6-card section6-card-6">
              <a
                href="https://instagram.com/core.vcet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white section6-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 1.8A3 3 0 1 0 15 12a3 3 0 0 0-3-3Z" />
                </svg>
                <span>core.vcet</span>
              </a>
            </div>

            <div className="rounded-lg border border-white/20 bg-black/35 p-3 sm:p-4 min-w-[200px] flex-1 section6-card section6-card-7">
              <a
                href="https://linkedin.com/company/core-vcet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white section6-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5A2.48 2.48 0 1 1 4.98 8.46a2.48 2.48 0 0 1 0-4.96ZM2.75 9.74h4.46V21.5H2.75V9.74Zm7.08 0h4.28v1.6h.06c.6-1.13 2.05-2.32 4.22-2.32 4.52 0 5.36 2.97 5.36 6.83v5.65h-4.46v-5c0-1.2-.02-2.75-1.68-2.75-1.69 0-1.95 1.31-1.95 2.66v5.09H9.83V9.74Z" />
                </svg>
                <span>core-vcet</span>
              </a>
            </div>
          </div>

          <div className="mt-auto min-h-[220px] md:min-h-[260px]" style={{ fontFamily: 'Inter' }}>
            <div className="rounded-xl border border-white/20 bg-black/25 p-2 sm:p-3 section6-card section6-card-9 overflow-hidden">
              <iframe
                title="VCET Puttur location on Google Maps"
                src="https://www.google.com/maps?q=Vivekananda+College+of+Engineering+and+Technology+Puttur&output=embed"
                className="w-full h-full min-h-[200px] rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
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
    <div ref={scrollContainerRef} className="h-[100dvh] overflow-y-auto scroll-smooth snap-y snap-mandatory">
      {/* Section 1 - Home (Load immediately, it's above the fold) */}
      <section className="snap-start snap-always h-[100dvh] bg-black text-white">
        <Home />
      </section>

      {/* Section 2 - What is CoRE UNLEASHED? */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg text-white">
        <WhatIsUnleashedSection />
      </LazySection>

      {/* Section 3 - The UNLEASHED Advantage (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[320dvh] event-section-bg text-white relative">
        <About scrollContainerRef={scrollContainerRef} />
      </LazySection>

      {/* Section 4 - How to UNLEASH? (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg">
        <HowToUnleash />
      </LazySection>

      {/* Section 5 - Timeline (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg">
        <TimelineSection />
      </LazySection>

      {/* Section 6 - Contact & Socials (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg text-white">
        <ContactAndSocialSection />
      </LazySection>

      <button
        type="button"
        onClick={scrollToHome}
        aria-label="Scroll back to home section"
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-[#E8B88A] text-black rounded-full h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-[#d9a87b] ${showScrollTopButton ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        <span className="text-xl leading-none" style={{ fontFamily: 'GomariceNoContinue', fontWeight: 700 }}>
          ↑
        </span>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
