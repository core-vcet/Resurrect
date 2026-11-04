import React, { useCallback, useEffect, useRef, useState } from 'react'
import '../assets/fonts/fonts.css'

const HowToUnleash = () => {
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
    if (!journeyRef.current || stepRefs.current.length < 4) {
      return
    }

    const journeyRect = journeyRef.current.getBoundingClientRect()
    const cardRects = stepRefs.current.map((card) => card?.getBoundingClientRect()).filter(Boolean)

    if (cardRects.length < 4) {
      return
    }

    const linkPairs = [
      [0, 1, 'rules-link-12', 1.75],
      [1, 2, 'rules-link-23', 2.15],
      [2, 3, 'rules-link-34', 2.55],
    ]

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
        <h1 className="rules-heading">
          How to "<span className="unleashed-word">UNLEASH</span>"?
        </h1>

        <div
          key={animationRun}
          className="rules-journey"
          role="list"
          aria-label="How to Unleash steps"
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

          <article className="rules-step-card rules-step-1" role="listitem" ref={(element) => { stepRefs.current[0] = element }}>
            <div className="rules-step-badge">01</div>
            <p className="rules-step-text">
              <span className="rules-step-title">Form Your Squad!</span> Gather your most reliable teammates.
            </p>
          </article>

          <div className="rules-mobile-connector rules-mobile-connector-1" aria-hidden="true" />

          <article className="rules-step-card rules-step-2" role="listitem" ref={(element) => { stepRefs.current[1] = element }}>
            <div className="rules-step-badge">02</div>
            <p className="rules-step-text">
              <span className="rules-step-title">Pick a Challenge:</span> Choose from one of five industry problem statements.
            </p>
          </article>

          <div className="rules-mobile-connector rules-mobile-connector-2" aria-hidden="true" />

          <article className="rules-step-card rules-step-3" role="listitem" ref={(element) => { stepRefs.current[2] = element }}>
            <div className="rules-step-badge">03</div>
            <p className="rules-step-text">
              <span className="rules-step-title">Build Non-Stop:</span> 36 hours to code, design, and deploy.
            </p>
          </article>

          <div className="rules-mobile-connector rules-mobile-connector-3" aria-hidden="true" />

          <article className="rules-step-card rules-step-4" role="listitem" ref={(element) => { stepRefs.current[3] = element }}>
            <div className="rules-step-badge">04</div>
            <p className="rules-step-text">
              <span className="rules-step-title">Pitch to the Pros:</span> Present your solution to a panel of industry experts.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default HowToUnleash
