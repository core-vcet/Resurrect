import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/site.config'

const { sections } = siteConfig
const timeline = sections.timeline

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
        <h2 className="timeline-heading">{timeline.heading}</h2>

        <div
          key={animationRun}
          className="timeline-roadmap"
          role="list"
          aria-label="Event timeline"
        >
          <div className="timeline-spine" aria-hidden="true" />

          {timeline.groups.map((group, groupIndex) => (
            <div
              key={group.label}
              className={`timeline-group${groupIndex > 0 ? ' timeline-group-gap' : ''}`}
              role="group"
              aria-label={group.label}
            >
              {group.items.map((item, itemIndex) => (
                <article
                  key={`${group.label}-${item.title}`}
                  className={`timeline-item${itemIndex === 0 ? ' timeline-item-day' : ''}`}
                  role="listitem"
                >
                  <div className={`timeline-left${itemIndex === 0 ? ' timeline-left-day' : ''}`}>
                    {item.date}
                  </div>
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-right timeline-right-title">{item.title}</div>
                </article>
              ))}
            </div>
          ))}
        </div>

        <p className="timeline-note">{timeline.note}</p>
      </section>
    </main>
  )
}

export default TimelineSection
