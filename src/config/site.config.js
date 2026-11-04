import resurrectLogo from '../assets/resurrect-logo.png'
import backgroundPortraitPng from '../assets/background/background-portrait.png'
import backgroundPortraitWebp from '../assets/background/background-portrait.webp'
import backgroundPortraitAvif from '../assets/background/background-portrait.avif'
import backgroundLandscapePng from '../assets/background/background-landscape.png'
import backgroundLandscapeWebp from '../assets/background/background-landscape.webp'
import backgroundLandscapeAvif from '../assets/background/background-landscape.avif'
import coreLogo from '../assets/partners/core_logo.png'
import ieeeLogo from '../assets/partners/ieee_logo.png'
import vcetLogo from '../assets/partners/vcet_logo.png'
import codezyncLogo from '../assets/partners/CodeZyng_Logo.png'

export const siteConfig = {
  meta: {
    title: 'Resurrect',
    description: 'Resurrect — a 36-hour innovation marathon. Rise. Build. Repeat.',
  },
  brand: {
    name: 'Resurrect',
    wordmark: resurrectLogo,
    wordmarkAlt: 'Resurrect',
    favicon: '/resurrect-favicon.ico',
    partnerLogos: [
      { name: 'CoRE', src: coreLogo },
      { name: 'IEEE VCET', src: ieeeLogo },
      { name: 'VCET', src: vcetLogo },
      { name: 'CodeZyng', src: codezyncLogo },
    ],
  },
  theme: {
    colors: {
      void: '#040207',
      deep: '#170925',
      plum: '#31124D',
      violet: '#7C2EC4',
      electric: '#9437E9',
      accent: '#A43DFE',
      accentSoft: '#C084FC',
      accentHover: '#8B2FD6',
      glow: '#B442FF',
      foreground: '#F5F3F7',
      muted: 'rgba(245, 243, 247, 0.72)',
      line: 'rgba(164, 61, 254, 0.45)',
    },
    fonts: {
      // Font family names are injected as CSS variables at startup.
      // Add your own @font-face rules in src/assets/fonts/fonts.css and
      // reference the same family name here to swap fonts.
      display: "'GomariceNoContinue', 'Inter', sans-serif",
      body: "'Inter', system-ui, sans-serif",
      accent: "'Blowbrush', 'Inter', cursive",
    },
    backgrounds: {
      portrait: {
        png: backgroundPortraitPng,
        webp: backgroundPortraitWebp,
        avif: backgroundPortraitAvif,
        position: 'center',
      },
      landscape: {
        png: backgroundLandscapePng,
        webp: backgroundLandscapeWebp,
        avif: backgroundLandscapeAvif,
        position: 'center',
      },
    },
  },
  event: {
    name: 'Resurrect',
    tagline: 'Rise. Build. Repeat.',
    dateLabel: '24th – 26th April 2026',
    venue: 'Vivekananda College of Engineering & Technology, Puttur',
    registrationUrl: '#',
    brochureUrl: '#',
    marquee: 'Registrations for Resurrect are now open! Grab your squad and rise.',
    prizePool: '₹50,000',
    duration: '36 Hours',
    partner: {
      name: 'CodeZyng',
      logo: codezyncLogo,
      opportunity: 'Internship Opportunity',
    },
  },
  sections: {
    about: {
      headingPrefix: 'What is',
      paragraphs: [
        'Resurrect is a high-energy innovation marathon where student developers, designers, and problem-solvers bring bold ideas back to life.',
        'For 36 hours, teams build, break, and rebuild until they have a working product worth pitching. We provide the platform; you provide the spark.',
      ],
    },
    advantage: {
      headingPrefix: 'The',
      headingWordmark: true,
      headingSuffix: 'Advantage',
      cards: [
        {
          value: '₹50,000',
          title: 'Grand Prize Pool',
          body: 'Battle it out for exceptional rewards and recognition.',
        },
        {
          value: '36 Hours',
          title: 'Of Pure Hustle',
          body: 'Build non-stop to design, code, and launch your MVP.',
        },
        {
          value: 'CodeZyng',
          title: 'Internship Opportunity',
          body: 'Standout teams can unlock internship opportunities with CodeZyng.',
          logo: codezyncLogo,
        },
      ],
    },
    howTo: {
      headingPrefix: 'How to',
      headingWordmark: true,
      steps: [
        { title: 'Form Your Squad!', body: 'Gather your most reliable teammates.' },
        { title: 'Pick a Challenge:', body: 'Choose from the available industry problem statements.' },
        { title: 'Build Non-Stop:', body: 'Use the full duration to code, design, and deploy.' },
        { title: 'Pitch to the Pros:', body: 'Present your solution to a panel of industry experts.' },
      ],
    },
    timeline: {
      heading: 'TIMELINE',
      groups: [
        {
          label: 'Day 1 schedule',
          items: [
            { date: 'April 24th — 06:00 PM', title: 'Check-in' },
            { date: '07:00 PM', title: 'Resurrect Inauguration' },
            { date: '08:00 PM', title: 'Hackathon Commences' },
          ],
        },
        {
          label: 'Day 2 schedule',
          items: [
            { date: 'April 26th — 08:00 AM', title: 'Hackathon Concludes' },
            { date: '09:00 AM', title: 'Evaluation Commences' },
            { date: '11:00 AM', title: 'Valedictory Ceremony' },
          ],
        },
      ],
      note: '*This timeline is subject to changes. Any updates will be communicated to the finalists and reflected here.',
    },
    contact: {
      heading: 'Contact & Socials',
      contacts: [
        { name: 'Event Coordinator', phone: '+91 XXXXX XXXXX', email: 'coordinator@example.com' },
        { name: 'Technical Lead', phone: '+91 XXXXX XXXXX', email: 'tech@example.com' },
        { name: 'PR Lead', phone: '+91 XXXXX XXXXX', email: 'pr@example.com' },
      ],
      socials: [
        { label: 'Website', href: '#', icon: 'globe' },
        { label: 'Instagram', href: '#', icon: 'instagram' },
        { label: 'LinkedIn', href: '#', icon: 'linkedin' },
      ],
      mapEmbedUrl:
        'https://www.google.com/maps?q=Vivekananda+College+of+Engineering+and+Technology+Puttur&output=embed',
      mapTitle: 'VCET Puttur location on Google Maps',
    },
  },
}
