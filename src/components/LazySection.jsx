import { useState, useEffect, useRef } from 'react';

/**
 * LazySection - Renders children only when the section enters viewport
 * This reduces initial render load and improves performance
 */
const LazySection = ({ children, className = '', threshold = 0.1, rootMargin = '100px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Once visible, disconnect observer to save resources
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin, // Load content slightly before it enters viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin, isVisible]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? (
        children
      ) : (
        // Placeholder with same min-height to prevent layout shift
        <div className="h-full flex items-center justify-center bg-transparent">
          <div className="text-white opacity-50">Loading section...</div>
        </div>
      )}
    </div>
  );
};

export default LazySection;
