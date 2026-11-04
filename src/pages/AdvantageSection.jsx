import { useRef, useState } from 'react';
import { motion as Motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { siteConfig } from '../config/site.config';

const { sections } = siteConfig;
const advantage = sections.advantage;
const cards = advantage.cards;

const getStageFromProgress = (progress) => {
  if (progress < 0.2) return 0;
  if (progress < 0.45) return 1;
  if (progress < 0.72) return 2;
  return 3;
};

const desktopAnimate = (index, stage) => {
  if (index === 0) {
    if (stage < 1) return { opacity: 0, scale: 0.86, x: '0vw', y: '10vh' };
    if (stage === 1) return { opacity: 1, scale: 1.12, x: '0vw', y: '0vh' };
    return { opacity: 1, scale: 0.9, x: '-104%', y: '0vh' };
  }

  if (index === 1) {
    if (stage < 2) return { opacity: 0, scale: 0.86, x: '0vw', y: '10vh' };
    if (stage === 2) return { opacity: 1, scale: 1.12, x: '0vw', y: '0vh' };
    return { opacity: 1, scale: 0.9, x: '104%', y: '0vh' };
  }

  return stage < 3
    ? { opacity: 0, scale: 0.9, x: '0vw', y: '10vh' }
    : { opacity: 1, scale: 0.92, x: '0vw', y: '0vh' };
};

const mobileAnimate = (index, stage) => {
  if (index === 0) {
    if (stage < 1) return { opacity: 0, scale: 0.88, y: '12vh' };
    if (stage === 1) return { opacity: 1, scale: 1.02, y: '0vh' };
    return { opacity: 1, scale: 0.86, y: '-19vh' };
  }

  if (index === 1) {
    if (stage < 2) return { opacity: 0, scale: 0.88, y: '12vh' };
    if (stage === 2) return { opacity: 1, scale: 1.02, y: '0vh' };
    return { opacity: 1, scale: 0.86, y: '19vh' };
  }

  return stage < 3
    ? { opacity: 0, scale: 0.9, y: '12vh' }
    : { opacity: 1, scale: 1, y: '0vh' };
};

const AdvantageSection = ({ scrollContainerRef }) => {
  const containerRef = useRef(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextStage = getStageFromProgress(latest);
    setStage((prev) => (prev === nextStage ? prev : nextStage));
  });

  const transition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] };

  return (
    <section ref={containerRef} className="relative w-full h-[320dvh]">
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
        <Motion.h2
          className="absolute text-center px-4 w-full"
          initial={{ opacity: 0, y: '8vh', scale: 0.92 }}
          animate={{
            opacity: 1,
            y: stage === 0 ? '0vh' : '-37vh',
            scale: stage === 0 ? 1 : 0.68,
          }}
          transition={transition}
          style={{ fontFamily: 'var(--brand-font-display)', fontWeight: 700 }}
        >
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-foreground">
            {advantage.headingPrefix}{' '}
            <span className="brand-accent-word text-accent">{siteConfig.brand.name}</span>{' '}
            {advantage.headingSuffix}
          </span>
        </Motion.h2>

        <div className="relative w-full max-w-7xl md:max-w-[1450px] px-6 sm:px-8 lg:px-12 h-full pt-24 sm:pt-28">
          <div className="relative hidden md:flex items-center justify-center h-full">
            {cards.map((card, index) => (
              <Motion.div
                key={card.title}
                className="absolute w-[clamp(350px,31vw,460px)] h-[clamp(260px,35vh,380px)] flex flex-col items-center justify-center gap-3 sm:gap-4 text-center px-6 sm:px-7 py-6 sm:py-7 overflow-hidden bg-black/40 border border-line rounded-2xl backdrop-blur-sm"
                animate={desktopAnimate(index, stage)}
                transition={transition}
                style={{ zIndex: 20 + index * 10 }}
              >
                <h3
                  className="text-accent text-[clamp(2.2rem,5.2vw,4.6rem)] leading-none tracking-wider whitespace-nowrap"
                  style={{ fontFamily: 'var(--brand-font-display)' }}
                >
                  {card.value}
                </h3>
                {card.logo && (
                  <Motion.img
                    src={card.logo}
                    alt={`${card.title} logo`}
                    className="w-[clamp(52px,5.8vw,86px)] h-[clamp(52px,5.8vw,86px)] object-contain block mx-auto"
                    animate={
                      stage < index + 1
                        ? { scale: 0.55, opacity: 0 }
                        : { scale: [0.55, 1.25, 1], opacity: [0, 1, 1] }
                    }
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], times: [0, 0.6, 1] }}
                  />
                )}
                <p
                  className="text-[clamp(1.28rem,2.2vw,2.15rem)] leading-tight font-semibold text-foreground/90"
                  style={{ fontFamily: 'var(--brand-font-body)' }}
                >
                  {card.title}
                </p>
                <p
                  className="text-[clamp(0.86rem,1.12vw,1.12rem)] leading-relaxed text-foreground/70 max-w-[94%]"
                  style={{ fontFamily: 'var(--brand-font-body)' }}
                >
                  {card.body}
                </p>
              </Motion.div>
            ))}
          </div>

          <div className="md:hidden relative w-full h-full flex items-center justify-center">
            {cards.map((card, index) => (
              <Motion.div
                key={card.title}
                className="absolute w-[min(calc(100vw-2.75rem),430px)] h-[clamp(185px,29vh,305px)] flex flex-col items-center justify-center gap-2 text-center px-5 py-5 bg-black/40 border border-line rounded-2xl backdrop-blur-sm"
                animate={mobileAnimate(index, stage)}
                transition={transition}
                style={{ zIndex: stage === index + 1 ? 30 : 15 + index }}
              >
                <h3
                  className="text-accent text-[clamp(2rem,9vw,3.2rem)] leading-none tracking-wider whitespace-nowrap"
                  style={{ fontFamily: 'var(--brand-font-display)' }}
                >
                  {card.value}
                </h3>
                {card.logo && (
                  <Motion.img
                    src={card.logo}
                    alt={`${card.title} logo`}
                    className="w-[clamp(64px,17vw,92px)] h-[clamp(64px,17vw,92px)] object-contain block mx-auto"
                    animate={
                      stage < index + 1
                        ? { scale: 0.55, opacity: 0 }
                        : { scale: [0.55, 1.2, 1], opacity: [0, 1, 1] }
                    }
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], times: [0, 0.6, 1] }}
                  />
                )}
                <p
                  className="text-[clamp(1.2rem,5.4vw,1.7rem)] leading-tight font-semibold text-foreground/90"
                  style={{ fontFamily: 'var(--brand-font-body)' }}
                >
                  {card.title}
                </p>
                <p
                  className="text-[clamp(0.88rem,3.8vw,1rem)] leading-relaxed text-foreground/70 max-w-[95%]"
                  style={{ fontFamily: 'var(--brand-font-body)' }}
                >
                  {card.body}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantageSection;
