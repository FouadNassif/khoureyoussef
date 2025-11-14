"use client";

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
      gsap.fromTo(
        iconRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.2 }
      );
      
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );

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
        return Math.min(prev + Math.random() * 12 + 3, 100);
      });
    }, 80);

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
            scale: 1.05,
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => {
              onComplete();
            },
          });
        }
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="text-center relative z-10">
        {/* Elegant Icon - Saint Icon or Cross */}
        <div 
          ref={iconRef}
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl" />
          <div className="relative w-full h-full rounded-2xl bg-white/5 dark:bg-black/10 backdrop-blur-md border border-white/10 dark:border-white/5 flex items-center justify-center shadow-2xl">
            <img
              src="/assets/saint-icon.jpg"
              alt="Mar Mikhael"
              className="w-full h-full object-cover rounded-2xl opacity-90"
            />
          </div>
        </div>

        {/* Title with elegant typography */}
        <h1 
          ref={titleRef}
          className="font-serif text-4xl md:text-6xl font-bold mb-3 text-foreground tracking-tight"
          style={{
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          {i18n.language === 'ar' ? 'مار ميخائيل' : 'Mar Mikhael'}
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-sm md:text-base text-muted-foreground mb-8 font-medium tracking-wide uppercase"
        >
          {i18n.language === 'ar' ? 'السريلي' : i18n.language === 'fr' ? 'de Sereel' : 'of Sereel'}
        </p>

        {/* Modern Progress Bar */}
        <div className="w-72 md:w-80 mx-auto mb-6">
          <div className="h-0.5 bg-secondary/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%`, transformOrigin: 'left' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Loading Text with elegant animation */}
        <p className="text-xs md:text-sm text-muted-foreground font-light tracking-wider">
          {progress < 100 ? (
            <span className="inline-block animate-pulse">
              {i18n.language === 'ar' ? 'جاري التحميل...' : i18n.language === 'fr' ? 'Chargement...' : 'Loading...'}
            </span>
          ) : (
            <span className="inline-block">
              {i18n.language === 'ar' ? 'جاهز' : i18n.language === 'fr' ? 'Prêt' : 'Ready'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;

