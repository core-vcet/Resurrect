import { useImagePreloader } from '../utils/preloader';
import TopMarquee from '../components/TopMarquee';
import { siteConfig } from '../config/site.config';

const { brand, theme, event } = siteConfig;

const Home = () => {
  // Preload critical images for the Home section
  const criticalImages = [
    theme.background,
    brand.wordmark,
  ];
  const { isLoading } = useImagePreloader(criticalImages);

  // Show minimal loading state for critical assets
  if (isLoading) {
    return (
      <div className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-void flex items-center justify-center">
        <img
          src={brand.wordmark}
          alt={brand.wordmarkAlt}
          className="home-loading-logo"
        />
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-screen min-h-[100dvh] overflow-hidden">
      <TopMarquee />

      <div className="home-hero relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-evenly px-4 text-center sm:px-6 lg:justify-center lg:px-8">
        {/* Partner logos and brand emblems */}
        <div className="home-hero-logos flex w-full max-w-6xl flex-wrap items-center justify-center">
          {brand.partnerLogos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={`${logo.name} logo`}
              className={`home-hero-logo${logo.featured ? ' home-hero-logo--featured' : ''}`}
              loading="eager"
            />
          ))}
          {brand.emblems.map((emblem) => (
            <img
              key={emblem.name}
              src={emblem.src}
              alt={`${emblem.name} emblem`}
              className="home-hero-logo"
              loading="eager"
            />
          ))}
        </div>

        <img
          src={brand.wordmark}
          alt={brand.wordmarkAlt}
          className="home-hero-wordmark"
        />

        <p
          className="home-hero-tagline text-xl tracking-[0.18em] uppercase text-foreground/80 sm:text-2xl sm:tracking-[0.2em] md:text-3xl lg:text-4xl"
          style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 600 }}
        >
          {event.tagline}
        </p>

        {/* CTAs */}
        <div className="home-hero-cta flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-3xl sm:flex-row sm:gap-4 md:gap-5">
          <a
            href={event.registrationUrl}
            className="w-full rounded-lg bg-accent px-8 py-3.5 text-center text-lg text-void transition-colors hover:bg-accent-hover sm:w-auto sm:min-w-[14rem] sm:px-12 sm:py-4 sm:text-xl md:px-16 md:py-5 md:text-2xl"
            style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 700 }}
          >
            Register Now
          </a>
          <a
            href={event.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-lg border border-line bg-white/10 px-8 py-3.5 text-center text-lg text-foreground transition-colors hover:bg-white/20 sm:w-auto sm:min-w-[14rem] sm:px-12 sm:py-4 sm:text-xl md:px-16 md:py-5 md:text-2xl"
            style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 700 }}
          >
            Download Brochure
          </a>
        </div>

        {/* Date and Location */}
        <div className="home-hero-meta flex w-full flex-col items-center justify-center gap-2.5 text-center md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-3">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="material-icons text-2xl text-foreground sm:text-3xl md:text-4xl" aria-hidden="true">
              location_on
            </span>
            <span
              className="max-w-[20rem] text-base leading-snug text-foreground sm:max-w-md sm:text-lg md:max-w-none md:text-xl lg:text-2xl"
              style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 600 }}
            >
              {event.venue}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="material-icons text-2xl text-foreground sm:text-3xl md:text-4xl" aria-hidden="true">
              calendar_month
            </span>
            <span
              className="text-base leading-snug text-foreground sm:text-lg md:text-xl lg:text-2xl"
              style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 600 }}
            >
              {event.dateLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
