import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/site.config'

const { sections } = siteConfig
const contact = sections.contact

const socialIcons = {
  globe: (
    <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm7.93 9h-3.08a15.63 15.63 0 0 0-1.1-4.17A8.03 8.03 0 0 1 19.93 11ZM12 4.08c.84 0 2.46 2.06 2.92 6.92H9.08C9.54 6.14 11.16 4.08 12 4.08ZM8.25 6.83A15.63 15.63 0 0 0 7.15 11H4.07a8.03 8.03 0 0 1 4.18-4.17ZM4.07 13h3.08a15.63 15.63 0 0 0 1.1 4.17A8.03 8.03 0 0 1 4.07 13ZM12 19.92c-.84 0-2.46-2.06-2.92-6.92h5.84c-.46 4.86-2.08 6.92-2.92 6.92Zm3.75-2.75A15.63 15.63 0 0 0 16.85 13h3.08a8.03 8.03 0 0 1-4.18 4.17Z" />
  ),
  instagram: (
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 1.8A3 3 0 1 0 15 12a3 3 0 0 0-3-3Z" />
  ),
}

const ContactSection = () => {
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
    <section ref={sectionRef} className="h-full w-full box-border px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-8 md:py-12 text-foreground overflow-hidden">
      <div key={animationRun} className="w-full h-full min-h-0 flex flex-col section6-animated">
        <h2
          className="section-heading-size leading-tight mb-3 sm:mb-5 md:mb-7 section6-heading"
          style={{ fontFamily: 'var(--brand-font-display)', fontWeight: 700 }}
        >
          {contact.heading}
        </h2>

        <div className="section6-scroll flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 sm:gap-5 pr-1">
          <div className="rounded-xl border border-line bg-black/25 p-3 sm:p-5 md:p-6 section6-card section6-card-1">
            <div className="grid gap-3 sm:gap-5 sm:grid-cols-2" style={{ fontFamily: 'var(--brand-font-body)' }}>
              {contact.contacts.map((person, index) => (
                <div
                  key={person.name}
                  className="rounded-lg border border-line bg-black/35 p-3 sm:p-4 section6-card"
                  style={{ animationDelay: `${0.15 + index * 0.12}s` }}
                >
                  <p className="font-semibold text-base sm:text-lg">{person.name}</p>
                  <a href={`tel:${person.phone.replace(/[^+\d]/g, '')}`} className="block text-foreground/90 hover:text-foreground break-all">
                    {person.phone}
                  </a>
                  <a href={`mailto:${person.email}`} className="block text-foreground/90 hover:text-foreground break-all">
                    {person.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-lg" style={{ fontFamily: 'var(--brand-font-body)' }}>
            {contact.socials.map((social, index) => (
              <div
                key={social.label}
                className="rounded-lg border border-line bg-black/35 p-3 sm:p-4 min-w-[200px] flex-1 section6-card"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/90 hover:text-foreground break-all section6-link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 shrink-0"
                    aria-hidden="true"
                  >
                    {socialIcons[social.icon] ?? socialIcons.globe}
                  </svg>
                  <span>{social.label}</span>
                </a>
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-[240px] sm:min-h-[280px] md:min-h-[320px]" style={{ fontFamily: 'var(--brand-font-body)' }}>
            <div className="h-full rounded-xl border border-line bg-black/25 p-2 sm:p-3 section6-card overflow-hidden">
              <iframe
                title={contact.mapTitle}
                src={contact.mapEmbedUrl}
                className="w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] rounded-lg border-0"
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

export default ContactSection
