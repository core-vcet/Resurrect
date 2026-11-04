import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/site.config'

const { sections, brand } = siteConfig
const howTo = sections.howTo
const steps = howTo.steps

const HowToResurrectSection = () => {
  const sectionRef = useRef(null)
  const journeyRef = useRef(null)
  const stepRefs = useRef([])
  const [connectors, setConnectors] = useState([])
  const [animationRun, setAnimationRun] = useState(0)
  const isInViewRef = useRef(false)

  const getCenter = (rect) => ({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  })

  const getBoundaryPoint = (rect, targetPoint) => {
    const center = getCenter(rect)
    const deltaX = targetPoint.x - center.x
    const deltaY = targetPoint.y - center.y

    const halfWidth = rect.width / 2
    const halfHeight = rect.height / 2

    if (deltaX === 0 && deltaY === 0) {
      return center
    }

    const scale = 1 / Math.max(Math.abs(deltaX) / halfWidth, Math.abs(deltaY) / halfHeight)

    return {
      x: center.x + deltaX * scale,
      y: center.y + deltaY * scale,
    }
  }

  const updateConnectors = useCallback(() => {
    if (!journeyRef.current || stepRefs.current.length < steps.length) {
      return
    }

    const journeyRect = journeyRef.current.getBoundingClientRect()
    const cardRects = stepRefs.current.map((card) => card?.getBoundingClientRect()).filter(Boolean)

    if (cardRects.length < steps.length) {
      return
    }

    const linkPairs = steps.slice(0, -1).map((_, index) => [
      index,
      index + 1,
      `rules-link-${index + 1}${index + 2}`,
      1.75 + index * 0.4,
    ])

    const nextConnectors = linkPairs.map(([startIndex, endIndex, className, delay], index) => {
      const fromRect = cardRects[startIndex]
      const toRect = cardRects[endIndex]

      const toCenter = getCenter(toRect)
      const fromCenter = getCenter(fromRect)

      const startPoint = getBoundaryPoint(fromRect, toCenter)
      const endPoint = getBoundaryPoint(toRect, fromCenter)

      const startX = startPoint.x - journeyRect.left
      const startY = startPoint.y - journeyRect.top
      const endX = endPoint.x - journeyRect.left
      const endY = endPoint.y - journeyRect.top

      const deltaX = endX - startX
      const deltaY = endY - startY
      const segmentLength = Math.hypot(deltaX, deltaY) || 1

      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2
      const normalX = -deltaY / segmentLength
      const normalY = deltaX / segmentLength
      const curvatureOffset = Math.min(64, Math.max(26, segmentLength * 0.14)) * (index % 2 === 0 ? 1 : -1)
      const controlX = midX + normalX * curvatureOffset
      const controlY = midY + normalY * curvatureOffset

      const d = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`

      return {
        className,
        delay,
        style: {
          animationDelay: `${delay}s`,
        },
        d,
      }
    })

    setConnectors(nextConnectors)
  }, [])

  useEffect(() => {
    updateConnectors()

    const frameId = requestAnimationFrame(updateConnectors)
    const timeoutId = window.setTimeout(updateConnectors, 250)

    const resizeObserver = new ResizeObserver(() => {
      updateConnectors()
    })

    if (journeyRef.current) {
      resizeObserver.observe(journeyRef.current)
    }

    stepRefs.current.forEach((card) => {
      if (card) {
        resizeObserver.observe(card)
      }
    })

    window.addEventListener('resize', updateConnectors)

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateConnectors)
    }
  }, [updateConnectors, animationRun])

  useEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInViewRef.current) {
          isInViewRef.current = true
          setConnectors([])
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
    <main className="rules-page" ref={sectionRef}>
      <section className="rules-content">
        <h2 className="rules-heading">
          {howTo.headingPrefix}{' '}
          {howTo.headingWordmark ? (
            <img
              src={brand.wordmarkInline}
              alt={brand.wordmarkAlt}
              className="inline-block align-baseline h-[1em] w-auto"
            />
          ) : (
            <span className="brand-accent-word">{brand.name}</span>
          )}
          ?
        </h2>

        <div
          key={animationRun}
          className="rules-journey"
          role="list"
          aria-label="How to Resurrect steps"
          ref={journeyRef}
        >
          <svg className="rules-roadmap-svg" aria-hidden="true" width="100%" height="100%" preserveAspectRatio="none">
            {connectors.map((connector) => (
              <path
                key={connector.className}
                className={`rules-link ${connector.className}`}
                style={connector.style}
                d={connector.d}
                pathLength="1"
              />
            ))}
          </svg>

          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <article
                className={`rules-step-card rules-step-${index + 1}`}
                role="listitem"
                ref={(element) => { stepRefs.current[index] = element }}
              >
                <div className="rules-step-badge">{String(index + 1).padStart(2, '0')}</div>
                <p className="rules-step-text">
                  <span className="rules-step-title">{step.title}</span> {step.body}
                </p>
              </article>

              {index < steps.length - 1 && (
                <div
                  className={`rules-mobile-connector rules-mobile-connector-${index + 1}`}
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </div>

        <div className="rules-footer">
          <a
            href={howTo.templateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rules-template-link"
          >
            Use this template <span aria-hidden="true">→</span>
          </a>
          <p className="rules-note">{howTo.note}</p>
        </div>
      </section>
    </main>
  )
}

export default HowToResurrectSection
