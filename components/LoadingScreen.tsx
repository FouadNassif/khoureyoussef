import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const { t, i18n } = useTranslation();
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements on mount
    if (titleRef.current && subtitleRef.current && iconRef.current) {
      // Icon entrance
      gsap.fromTo(
        iconRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Continuous breathing animation for icon
      gsap.to(iconRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2
      });

      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );

      // Subtitle entrance
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.6 }
      );
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slightly faster loading for better UX
        return Math.min(prev + Math.random() * 15 + 5, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && containerRef.current) {
      // Animate progress bar completion
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Wait a bit then fade out
      setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              onComplete();
            },
          });
        }
      }, 600);
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Divine Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/10" />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <div className="text-center relative z-10 px-4">
        {/* Elegant Icon - Saint Icon */}
        <div
          ref={iconRef}
          className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 relative"
        >
          {/* Glowing halo effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl transform scale-110" />

          <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-primary/30 to-transparent">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl bg-background">
              <img
                src="/assets/saint-icon.jpg"
                alt="Saint Khoury Youssef"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Title with elegant typography */}
        <h1
          ref={titleRef}
          className="font-serif text-3xl md:text-5xl font-bold mb-3 text-foreground tracking-wide"
        >
          {i18n.language === 'ar' ? 'القديس الخوري يوسف أبي مارون معتوق' : 'Khoury Youssef Abi Maroun Maatouk, Known as Saint Youssef'}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-sm md:text-lg text-muted-foreground mb-10 font-light tracking-[0.2em] uppercase"
        >
          {i18n.language === 'ar' ? 'سرعل' : i18n.language === 'fr' ? 'de Sereel' : 'of Sereel'}
        </p>

        {/* Minimalist Progress Bar */}
        <div className="w-64 md:w-80 mx-auto mb-4">
          <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-primary rounded-full relative"
              style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
            >
              <div className="absolute inset-0 bg-white/30 w-full h-full animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-xs text-muted-foreground/60 font-medium tracking-widest uppercase">
          {progress < 100 ? (
            <span className="animate-pulse">
              {i18n.language === 'ar' ? 'جاري التحميل' : i18n.language === 'fr' ? 'Chargement' : 'Loading'}
            </span>
          ) : (
            <span>
              {i18n.language === 'ar' ? 'مكتمل' : i18n.language === 'fr' ? 'Prêt' : 'Ready'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;

