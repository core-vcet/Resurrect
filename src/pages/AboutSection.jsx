import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import codezync_logo from '../assets/CodeZyng_Logo.png';

const About = ({ scrollContainerRef }) => {
  const containerRef = useRef(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const getStageFromProgress = (progress) => {
    if (progress < 0.2) return 0;
    if (progress < 0.45) return 1;
    if (progress < 0.72) return 2;
    return 3;
  };

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextStage = getStageFromProgress(latest);
    setStage((prev) => (prev === nextStage ? prev : nextStage));
  });

  const transition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] };

  return (
    <section ref={containerRef} className="relative w-full h-[320dvh]">
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.h2
          className="absolute text-center px-4 w-full"
          initial={{ opacity: 0, y: '8vh', scale: 0.92 }}
          animate={{
            opacity: 1,
            y: stage === 0 ? '0vh' : '-37vh',
            scale: stage === 0 ? 1 : 0.68,
          }}
          transition={transition}
          style={{ fontFamily: 'GomariceNoContinue', fontWeight: 700 }}
        >
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-white">
            The <span className="unleashed-word text-[#E8B88A]">UNLEASHED</span> Advantage
          </span>
        </motion.h2>

        <div className="relative w-full max-w-7xl md:max-w-[1450px] px-6 sm:px-8 lg:px-12 h-full pt-24 sm:pt-28">
          <div className="relative hidden md:flex items-center justify-center h-full">
            <motion.div
            className="absolute w-[clamp(350px,31vw,460px)] h-[clamp(260px,35vh,380px)] flex flex-col items-center justify-center gap-3 sm:gap-4 text-center px-6 sm:px-7 py-6 sm:py-7 overflow-hidden bg-black/40 border border-white/20 rounded-2xl backdrop-blur-sm"
            animate={
              stage < 1
                ? { opacity: 0, scale: 0.86, x: '0vw', y: '10vh' }
                : stage === 1
                  ? { opacity: 1, scale: 1.12, x: '0vw', y: '0vh' }
                  : { opacity: 1, scale: 0.9, x: '-104%', y: '0vh' }
            }
            transition={transition}
            style={{ zIndex: 20 }}
          >
            <h3
              className="text-[#E8B88A] text-[clamp(2.55rem,5.6vw,5.3rem)] leading-none tracking-wider whitespace-nowrap"
              style={{
                fontFamily: 'GomariceNoContinue',
                transform: `scale(${stage === 1 ? 1 : 0.74})`,
              }}
            >
              <span style={{ fontFamily: 'GomariceNoContinue' }}>Rs.</span>{' '}
              <span style={{ fontFamily: 'Blowbrush' }}>50,000</span>
            </h3>
            <p className="text-[clamp(1.28rem,2.2vw,2.15rem)] leading-tight font-semibold text-white/90 font-[Inter]">
              Grand Prize Pool
            </p>
            <p className="text-[clamp(0.86rem,1.12vw,1.12rem)] leading-relaxed text-white/70 font-[Inter] max-w-[94%]">
              Battle it out for exceptional rewards and recognition.
            </p>
          </motion.div>

            <motion.div
            className="absolute w-[clamp(350px,31vw,460px)] h-[clamp(260px,35vh,380px)] flex flex-col items-center justify-center gap-3 sm:gap-4 text-center px-6 sm:px-7 py-6 sm:py-7 overflow-hidden bg-black/40 border border-white/20 rounded-2xl backdrop-blur-sm"
            animate={
              stage < 2
                ? { opacity: 0, scale: 0.86, x: '0vw', y: '10vh' }
                : stage === 2
                  ? { opacity: 1, scale: 1.12, x: '0vw', y: '0vh' }
                  : { opacity: 1, scale: 0.9, x: '104%', y: '0vh' }
            }
            transition={transition}
            style={{ zIndex: 20 }}
          >
            <h3
              className="text-[#E8B88A] text-[clamp(2.45rem,5.3vw,5.1rem)] leading-none tracking-wider"
              style={{
                fontFamily: 'GomariceNoContinue',
                transform: `scale(${stage === 2 ? 1 : 0.74})`,
              }}
            >
              <span style={{ fontFamily: 'Blowbrush' }}>36</span>{' '}
              <span style={{ fontFamily: 'GomariceNoContinue' }}>Hours</span>
            </h3>
            <p className="text-[clamp(1.28rem,2.2vw,2.15rem)] leading-tight font-semibold text-white/90 font-[Inter]">
              Of Pure Hustle
            </p>
            <p className="text-[clamp(0.86rem,1.12vw,1.12rem)] leading-relaxed text-white/70 font-[Inter] max-w-[94%]">
              Build non-stop for 36 hours to design, code, and launch your MVP.
            </p>
          </motion.div>

            <motion.div
            className="absolute w-[clamp(350px,31vw,460px)] h-[clamp(260px,35vh,380px)] flex flex-col items-center justify-center gap-[clamp(0.6rem,1.2vh,1.1rem)] text-center px-6 sm:px-7 py-8 sm:py-9 overflow-hidden bg-black/40 border border-white/20 rounded-2xl backdrop-blur-sm"
            animate={
              stage < 3
                ? { opacity: 0, scale: 0.9, x: '0vw', y: '10vh' }
                : { opacity: 1, scale: 0.92, x: '0vw', y: '0vh' }
            }
            transition={transition}
            style={{ zIndex: 40 }}
          >
            <h3
              className="text-[#E8B88A] text-[clamp(1.95rem,3.85vw,3.75rem)] leading-none tracking-wider"
              style={{ fontFamily: 'GomariceNoContinue' }}
            >
              CodeZyng
            </h3>
            <div className="w-full flex items-center justify-center">
              <motion.img
                src={codezync_logo}
                alt="CodeZyng Logo"
                className="w-[clamp(52px,5.8vw,86px)] h-[clamp(52px,5.8vw,86px)] object-contain block mx-auto"
                animate={
                  stage < 3
                    ? { scale: 0.55, opacity: 0 }
                    : { scale: [0.55, 1.25, 1], opacity: [0, 1, 1] }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], times: [0, 0.6, 1] }}
              />
            </div>
            <p className="text-[clamp(1.08rem,1.85vw,1.72rem)] leading-tight font-semibold text-white/90 font-[Inter]">
              Internship Opportunity
            </p>
            <p className="text-[clamp(0.8rem,0.96vw,0.98rem)] leading-relaxed text-white/70 font-[Inter] max-w-[92%]">
              Standout teams can unlock internship opportunities with CodeZyng.
            </p>
            </motion.div>
          </div>

          <div className="md:hidden relative w-full h-full flex items-center justify-center">
            <motion.div
              className="absolute w-[min(calc(100vw-2.75rem),420px)] h-[clamp(185px,28vh,240px)] flex flex-col items-center justify-center gap-2 text-center px-5 py-5 bg-black/40 border border-white/20 rounded-2xl backdrop-blur-sm"
              animate={
                stage < 1
                  ? { opacity: 0, scale: 0.88, y: '12vh' }
                  : stage === 1
                    ? { opacity: 1, scale: 1.02, y: '0vh' }
                    : { opacity: 1, scale: 0.86, y: '-19vh' }
              }
              transition={transition}
              style={{ zIndex: stage === 1 ? 30 : 15 }}
            >
              <h3
                className="text-[#E8B88A] text-[clamp(2.2rem,10.1vw,3.3rem)] leading-none tracking-wider whitespace-nowrap"
                style={{ fontFamily: 'GomariceNoContinue' }}
              >
                <span style={{ fontFamily: 'GomariceNoContinue' }}>Rs.</span>{' '}
                <span style={{ fontFamily: 'Blowbrush' }}>50,000</span>
              </h3>
              <p className="text-[clamp(1.2rem,5.4vw,1.7rem)] leading-tight font-semibold text-white/90 font-[Inter]">
                Grand Prize Pool
              </p>
              <p className="text-[clamp(0.88rem,3.8vw,1rem)] leading-relaxed text-white/70 font-[Inter] max-w-[95%]">
                Battle it out for exceptional rewards and recognition.
              </p>
            </motion.div>

            <motion.div
              className="absolute w-[min(calc(100vw-2.75rem),430px)] h-[clamp(190px,29vh,250px)] flex flex-col items-center justify-center gap-2 text-center px-5 py-5 bg-black/40 border border-white/20 rounded-2xl backdrop-blur-sm"
              animate={
                stage < 2
                  ? { opacity: 0, scale: 0.88, y: '12vh' }
                  : stage === 2
                    ? { opacity: 1, scale: 1.02, y: '0vh' }
                    : { opacity: 1, scale: 0.86, y: '19vh' }
              }
              transition={transition}
              style={{ zIndex: stage === 2 ? 30 : 15 }}
            >
              <h3
                className="text-[#E8B88A] text-[clamp(2.15rem,9.8vw,3.2rem)] leading-none tracking-wider"
                style={{ fontFamily: 'GomariceNoContinue' }}
              >
                <span style={{ fontFamily: 'Blowbrush' }}>36</span>{' '}
                <span style={{ fontFamily: 'GomariceNoContinue' }}>Hours</span>
              </h3>
              <p className="text-[clamp(1.2rem,5.4vw,1.7rem)] leading-tight font-semibold text-white/90 font-[Inter]">
                Of Pure Hustle
              </p>
              <p className="text-[clamp(0.88rem,3.8vw,1rem)] leading-relaxed text-white/70 font-[Inter] max-w-[95%]">
                Build non-stop for 36 hours to design, code, and launch your MVP.
              </p>
            </motion.div>

            <motion.div
              className="absolute w-[min(calc(100vw-2.75rem),440px)] h-[clamp(225px,34vh,305px)] flex flex-col items-center justify-center gap-[clamp(0.5rem,1.2vh,0.95rem)] text-center px-5 py-7 bg-black/40 border border-white/20 rounded-2xl backdrop-blur-sm"
              animate={
                stage < 3
                  ? { opacity: 0, scale: 0.9, y: '12vh' }
                  : { opacity: 1, scale: 1, y: '0vh' }
              }
              transition={transition}
              style={{ zIndex: 40 }}
            >
              <h3
                className="text-[#E8B88A] text-[clamp(1.85rem,8vw,2.75rem)] leading-none tracking-wider"
                style={{ fontFamily: 'GomariceNoContinue' }}
              >
                CodeZyng
              </h3>
              <div className="w-full flex items-center justify-center">
                <motion.img
                  src={codezync_logo}
                  alt="CodeZyng Logo"
                  className="w-[clamp(64px,17vw,92px)] h-[clamp(64px,17vw,92px)] object-contain block mx-auto"
                  animate={
                    stage < 3
                      ? { scale: 0.55, opacity: 0 }
                      : { scale: [0.55, 1.2, 1], opacity: [0, 1, 1] }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], times: [0, 0.6, 1] }}
                />
              </div>
              <p className="text-[clamp(1.08rem,4.9vw,1.5rem)] leading-tight font-semibold text-white/90 font-[Inter]">
                Internship Opportunity
              </p>
              <p className="text-[clamp(0.82rem,3.4vw,0.95rem)] leading-relaxed text-white/70 font-[Inter] max-w-[92%]">
                Standout teams can unlock internship opportunities with CodeZyng.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
