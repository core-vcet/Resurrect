import LazyImage from '../components/LazyImage';
import { useImagePreloader } from '../utils/preloader';
import TopMarquee from '../components/TopMarquee';
import { siteConfig } from '../config/site.config';

const { brand, theme, event } = siteConfig;

const Home = () => {
  // Preload critical images for the Home section
  const criticalImages = [
    theme.backgrounds.landscape.avif,
    theme.backgrounds.portrait.avif,
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
    <div className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-void">
      <TopMarquee />

      {/* Background image - mobile version */}
      <picture className="absolute inset-0 sm:hidden">
        <source srcSet={theme.backgrounds.portrait.webp} type="image/webp" />
        <source srcSet={theme.backgrounds.portrait.avif} type="image/avif" />
        <img
          src={theme.backgrounds.portrait.png}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: theme.backgrounds.portrait.position }}
        />
      </picture>

      {/* Background image - tablet/desktop version */}
      <picture className="hidden sm:block absolute inset-0">
        <source srcSet={theme.backgrounds.landscape.webp} type="image/webp" />
        <source srcSet={theme.backgrounds.landscape.avif} type="image/avif" />
        <img
          src={theme.backgrounds.landscape.png}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: theme.backgrounds.landscape.position }}
        />
      </picture>

      {/* Partner logos */}
      <div className="absolute top-12 sm:top-14 right-2 sm:right-4 md:right-6 z-10 flex flex-row flex-wrap justify-end items-center gap-2 sm:gap-3 md:gap-5 max-w-[75%] sm:max-w-[60%]">
        {brand.partnerLogos.map((logo) => (
          <LazyImage
            key={logo.name}
            src={logo.src}
            alt={`${logo.name} logo`}
            priority
            className="object-contain w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />
        ))}
      </div>

      {/* Content in lower third */}
      <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 left-4 right-4 sm:left-auto sm:right-6 md:right-10 lg:right-16 z-10">
        <div className="flex flex-col items-start mb-4 sm:mb-6 md:mb-8">
          <img
            src={brand.wordmark}
            alt={brand.wordmarkAlt}
            className="h-auto max-w-full mb-2 sm:mb-3"
            style={{ width: 'clamp(14rem, 55vw, 52rem)' }}
          />
          <p
            className="text-foreground/80 text-base sm:text-xl md:text-2xl tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 600 }}
          >
            {event.tagline}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8 items-stretch sm:items-start">
          <a
            href={event.registrationUrl}
            className="w-full sm:w-auto bg-accent text-void px-6 sm:px-10 md:px-12 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base md:text-lg text-center hover:bg-accent-hover transition-colors"
            style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 700 }}
          >
            Register Now
          </a>
          <a
            href={event.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white/10 text-foreground border border-line px-6 sm:px-10 md:px-12 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base md:text-lg text-center hover:bg-white/20 transition-colors"
            style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 700 }}
          >
            Download Brochure
          </a>
        </div>

        {/* Date and Location */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 items-start">
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
            <span className="material-icons text-foreground text-2xl align-middle" aria-hidden="true">
              location_on
            </span>
            <span
              className="text-foreground text-sm sm:text-base md:text-lg break-words text-left leading-snug"
              style={{ fontFamily: 'var(--brand-font-body)', fontWeight: 600 }}
            >
              {event.venue}
            </span>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
            <span className="material-icons text-foreground text-2xl align-middle" aria-hidden="true">
              calendar_month
            </span>
            <span
              className="text-foreground text-sm sm:text-base md:text-lg leading-snug"
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
