import resurrectLogo from '../assets/resurrect-wordmark.png'
import resurrectWordmarkInline from '../assets/resurrect-wordmark-inline.webp'
import coreLogo from '../assets/partners/core_logo.png'
import ieeeLogo from '../assets/partners/ieee_logo.png'
import vcetLogo from '../assets/partners/vcet_logo.png'
import phoenixEmblem from '../assets/emblems/phoenix-emblem.webp'
import crestEmblem from '../assets/emblems/segmented-crest-emblem.webp'

export const siteConfig = {
  meta: {
    title: 'Resurrect',
    description:
      'Resurrect — a two-round hybrid innovation challenge at VCET Puttur. Online idea pitch, top 30 onsite finale, 24-hour build. 27–28 November 2026.',
  },
  brand: {
    name: 'Resurrect',
    wordmark: resurrectLogo,
    wordmarkInline: resurrectWordmarkInline,
    wordmarkAlt: 'Resurrect',
    favicon: '/resurrect-favicon.ico',
    emblems: [
      { name: 'Phoenix', src: phoenixEmblem },
      { name: 'Segmented Crest', src: crestEmblem },
    ],
    partnerLogos: [
      { name: 'VCET', src: vcetLogo },
      { name: 'CoRE', src: coreLogo },
      { name: 'IEEE', src: ieeeLogo },
    ],
  },
  theme: {
    colors: {
      void: '#050505',
      deep: '#0D0D0D',
      plum: '#161616',
      violet: '#242424',
      electric: '#333333',
      accent: '#E8E8E8',
      accentSoft: '#F5F5F5',
      accentHover: '#FFFFFF',
      glow: '#FFFFFF',
      foreground: '#F5F5F5',
      muted: 'rgba(245, 245, 245, 0.72)',
      line: 'rgba(245, 245, 245, 0.32)',
    },
    fonts: {
      // Font family names are injected as CSS variables at startup.
      // Add your own @font-face rules in src/assets/fonts/fonts.css and
      // reference the same family name here to swap fonts.
      display: "'Oxanium', 'Inter', system-ui, sans-serif",
      body: "'D-DIN', 'Inter', system-ui, sans-serif",
      accent: "'Chakra Petch', 'Inter', system-ui, sans-serif",
    },
    // Shared across every section/page and used by the liquid fractal effect.
    background: '/BACKGROUND.png',
  },
  event: {
    name: 'Resurrect',
    tagline: 'Rise. Build. Repeat.',
    dateLabel: '27th – 28th November 2026',
    venue: 'Vivekananda College of Engineering & Technology, Puttur',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScsz25ZYTZmtXnnEM1D3hqx25sT-M7p0KlEsjwMsGjit_G0vg/viewform',
    brochureUrl: '/resurrect-brochure.pdf',
    marquee:
      'Round 1 idea submissions close 20th November 2026 — register your squad for Resurrect!',
    prizePool: '₹50,000',
    duration: '24 Hours',
  },
  sections: {
    about: {
      headingPrefix: 'What is',
      paragraphs: [
        'Resurrect is a two-round hybrid innovation challenge where student developers, designers, and problem-solvers bring bold ideas back to life. Round 1 is an online idea pitch on an Open Innovation theme; submissions close 20th November 2026.',
        'The top 30 teams advance to the onsite Grand Finale at VCET Puttur, where they build a working prototype in 24 hours and pitch it to industry judges for a ₹50,000 prize pool. Teams of 2–4 students from any college or branch can participate.',
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
          body: 'Compete for the prize pool and recognition from industry judges.',
        },
        {
          value: '24 Hours',
          title: 'Onsite Grand Finale',
          body: 'Build a working prototype with your team at VCET Puttur.',
        },
        {
          value: 'Goodies',
          title: 'Exciting Goodies',
          body: 'Exclusive swag and surprises for every finalist.',
        },
      ],
    },
    howTo: {
      headingPrefix: 'How to',
      headingWordmark: true,
      templateUrl: 'https://drive.google.com/drive/folders/1fl1JvyrbDxur019cw7dFVn-mnSlTrke0',
      note: 'Open to B.E/B.Tech/BCA/MCA students.',
      steps: [
        {
          title: 'Form Your Squad!',
          body: 'Team up with 2–4 students from any college or branch.',
        },
        {
          title: 'Pitch Your Idea:',
          body: 'Submit an online PPT on any Open Innovation theme by 20th November 2026. Add a GitHub prototype link for brownie points.',
        },
        {
          title: 'Make the Top 30:',
          body: 'Shortlisted teams advance to the onsite Grand Finale at VCET Puttur.',
        },
        {
          title: 'Build & Pitch:',
          body: 'Create a working prototype in 24 hours and present it to the judges.',
        },
      ],
    },
    timeline: {
      heading: 'TIMELINE',
      groups: [
        {
          label: 'Day 1 — 27th November',
          items: [
            { date: 'Nov 27th — 08:00 AM', title: 'Check-in' },
            { date: '09:00 AM', title: 'Event Inauguration' },
            { date: '10:00 AM', title: 'Hackathon Commences' },
          ],
        },
        {
          label: 'Day 2 — 28th November',
          items: [
            { date: 'Nov 28th — 10:00 AM', title: 'Hackathon Concludes' },
            { date: '10:30 AM', title: 'Evaluation' },
            { date: '12:30 PM', title: 'Valedictory Ceremony' },
          ],
        },
      ],
      note: '*This timeline is subject to changes. Any updates will be communicated to the finalists and reflected here.',
    },
    contact: {
      heading: 'Contact & Socials',
      contacts: [
        {
          name: 'Srinivas Hegde M',
          phone: '+91 90601 59605',
          email: 'hegdesrinivasm+queries@gmail.com',
        },
        {
          name: 'K Shreekrishna Upadhyaya',
          phone: '+91 96861 08613',
          email: 'upadhyayashreekrishna+queries@gmail.com',
        },
      ],
      socials: [
        { label: 'VCET Puttur', href: 'https://vcetputtur.ac.in/', icon: 'globe' },
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/aiml.vcet?obrf=MWZsNDNvcW5pcmsz',
          icon: 'instagram',
        },
      ],
      mapEmbedUrl:
        'https://www.google.com/maps?q=Vivekananda+College+of+Engineering+and+Technology+Puttur&output=embed',
      mapTitle: 'VCET Puttur location on Google Maps',
    },
  },
}
