import React, { useEffect, useRef, useState } from 'react'
import '../assets/fonts/fonts.css'

const TimelineSection = () => {
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
          return
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
    <main className="timeline-page" ref={sectionRef}>
      <section className="timeline-content section-fade-content">
        <h2 className="timeline-heading">TIMELINE</h2>

        <div
          key={animationRun}
          className="timeline-roadmap"
          role="list"
          aria-label="Event timeline"
        >
          <div className="timeline-spine" aria-hidden="true" />

          <div className="timeline-group" role="group" aria-label="April 24 schedule">
            <article className="timeline-item timeline-item-day" role="listitem">
              <div className="timeline-left timeline-left-day">
                <span className="timeline-left-text">April</span>{' '}
                <span className="timeline-left-number">24</span><span className="timeline-left-text-suffix">th</span>{' '}
                <span className="timeline-left-text">—</span>{' '}
                <span className="timeline-left-number">06:00</span>{' '}
                <span className="timeline-left-text">PM</span>
              </div>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-right timeline-right-title">Check-in</div>
            </article>

            <article className="timeline-item" role="listitem">
              <div className="timeline-left">
                <span className="timeline-left-number">07:00</span>{' '}
                <span className="timeline-left-text">PM</span>
              </div>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-right">
                <div className="timeline-right-title">CoRE Unleahsed Inauguration</div>
              </div>
            </article>

            <article className="timeline-item" role="listitem">
              <div className="timeline-left">
                <span className="timeline-left-number">08:00</span>{' '}
                <span className="timeline-left-text">PM</span>
              </div>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-right timeline-right-title">Hackathon Commences</div>
            </article>
          </div>

          <div className="timeline-group timeline-group-gap" role="group" aria-label="April 26 schedule">
            <article className="timeline-item timeline-item-day" role="listitem">
              <div className="timeline-left timeline-left-day">
                <span className="timeline-left-text">April</span>{' '}
                <span className="timeline-left-number">26</span><span className="timeline-left-text-suffix">th</span>{' '}
                <span className="timeline-left-text">—</span>{' '}
                <span className="timeline-left-number">08:00</span>{' '}
                <span className="timeline-left-text">AM</span>
              </div>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-right timeline-right-title">Hackathon Concludes</div>
            </article>

            <article className="timeline-item" role="listitem">
              <div className="timeline-left">
                <span className="timeline-left-number">9:00</span>{' '}
                <span className="timeline-left-text">AM</span>
              </div>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-right timeline-right-title">Evaluation Commences</div>
            </article>

            <article className="timeline-item" role="listitem">
              <div className="timeline-left">
                <span className="timeline-left-number">11:00</span>{' '}
                <span className="timeline-left-text">AM</span>
              </div>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-right timeline-right-title">Valedictory Ceremony</div>
            </article>
          </div>
        </div>

        <p className="timeline-note">
          *This timeline is subject to changes. Any updates will be communicated to the finalists and reflected here.
        </p>
      </section>
    </main>
  )
}

export default TimelineSection
