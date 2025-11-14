"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface HeroProps {
  isInitialLoad?: boolean;
  onAnimationComplete?: () => void;
}

const Hero = ({ isInitialLoad = false, onAnimationComplete }: HeroProps) => {
  const { t, i18n } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showContent, setShowContent] = useState(!isInitialLoad);
  const [mounted, setMounted] = useState(false);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Handle hydration - ensure client-side rendering matches server
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      setShowContent(true);
      setZoomLevel(1);
      return;
    }

    // Wait for image to load before starting animation
    if (!bgImageRef.current) return;

    let zoomInInterval: NodeJS.Timeout | null = null;
    let zoomOutInterval: NodeJS.Timeout | null = null;

    // Reset zoom level
    setZoomLevel(1);
    setShowContent(false);

    // Start zoom in animation after a brief delay
    const startDelay = setTimeout(() => {
      let currentZoom = 1;
      zoomInInterval = setInterval(() => {
        currentZoom += 0.04; // Increment by 4% each time
        setZoomLevel(currentZoom);
        
        if (currentZoom >= 1.3) {
          if (zoomInInterval) {
            clearInterval(zoomInInterval);
            zoomInInterval = null;
          }
          
          // Show content during zoom pause
          setShowContent(true);
          
          // After zoom in completes, wait 1.5 seconds then zoom out
          setTimeout(() => {
            let zoomOutLevel = 1.3;
            zoomOutInterval = setInterval(() => {
              zoomOutLevel -= 0.03; // Decrement by 3% each time
              setZoomLevel(zoomOutLevel);
              
              if (zoomOutLevel <= 1) {
                if (zoomOutInterval) {
                  clearInterval(zoomOutInterval);
                  zoomOutInterval = null;
                }
                setZoomLevel(1);
                onAnimationComplete?.();
              }
            }, 100);
          }, 1500);
        }
      }, 100);
    }, 200);

    return () => {
      clearTimeout(startDelay);
      if (zoomInInterval) {
        clearInterval(zoomInInterval);
      }
      if (zoomOutInterval) {
        clearInterval(zoomOutInterval);
      }
    };
  }, [isInitialLoad, onAnimationComplete]);

  // Animate background image zoom only (parallax completely disabled for performance)
  useEffect(() => {
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        scale: zoomLevel,
        duration: 0.1,
        ease: "power2.out",
        transformOrigin: "center center",
      });
    }
  }, [zoomLevel]);

  // Animate floating particles
  useEffect(() => {
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          y: -20,
          x: Math.sin(index) * 15,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });
    }
  }, []);

  // Animate content when showContent changes
  useEffect(() => {
    if (!showContent || !contentRef.current) return;

    const delay = isInitialLoad ? 2.5 : 0;
    
    // Fade in overlay with reduced opacity
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: delay, ease: "power2.out" }
      );
    }

    const elements = [
      { ref: contentRef, y: 40, delay: delay },
      { ref: titleRef, y: 20, delay: delay + 0.2 },
      { ref: subtitleRef, y: 20, delay: delay + 0.3 },
      { ref: descriptionRef, y: 20, delay: delay + 0.4 },
      { ref: badgeRef, scale: 0.9, delay: delay + 0.5 },
      { ref: ctaRef, y: 20, delay: delay + 0.6 },
    ];

    elements.forEach(({ ref, y, scale, delay: elementDelay }) => {
      if (ref.current) {
        if (scale !== undefined) {
          gsap.fromTo(
            ref.current,
            { opacity: 0, scale: scale },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: elementDelay,
              ease: scale === 0 ? "back.out(1.7)" : "power2.out",
            }
          );
        } else {
          gsap.fromTo(
            ref.current,
            { opacity: 0, y: y },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: elementDelay,
              ease: "power2.out",
            }
          );
        }
      }
    });

  }, [showContent, isInitialLoad]);

  return (
    <section className={`relative ${isInitialLoad ? 'fixed inset-0 z-50' : ''} min-h-screen flex items-center justify-center overflow-hidden`}>
      {/* Background Image with Reduced Overlay */}
      <div className="absolute inset-0">
        <img
          ref={bgImageRef}
          src="/assets/hero-church.jpg"
          alt="Mar Mikhael Church"
          className="w-full h-full object-cover"
          style={{ transformOrigin: "center center" }}
        />
        {/* Reduced transparency overlay - much lighter for clearer image */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/10 to-background/25"
        />
        {/* Golden yellow accent overlay for warmth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 blur-sm"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 12}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 text-center">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* Title with text shadow for better readability */}
          <h1
            ref={titleRef}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white drop-shadow-2xl"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)' }}
            suppressHydrationWarning
          >
            {mounted ? t("hero.title") : "Mar Mikhael of Sereel"}
          </h1>

          {/* Subtitle with enhanced styling */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white font-serif mb-6 font-semibold drop-shadow-xl"
            style={{ textShadow: '0 3px 15px rgba(0,0,0,0.7), 0 1px 5px rgba(0,0,0,0.5)' }}
            suppressHydrationWarning
          >
            {mounted ? t("hero.subtitle") : "The Miracle Worker"}
          </p>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto font-medium drop-shadow-lg"
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 1px 5px rgba(0,0,0,0.6)' }}
            suppressHydrationWarning
          >
            {mounted ? t("hero.description") : "Discover the life and miracles of Mar Mikhael"}
          </p>

          {/* Feast Day Badge with enhanced styling */}
          <div ref={badgeRef} className="inline-block mb-10">
            <div className="px-6 py-3 rounded-full bg-secondary/90 backdrop-blur-md border-2 border-primary/30 shadow-lg">
              <p className="text-sm font-medium text-primary" suppressHydrationWarning>
                {mounted ? t("hero.feastDay") : "Feast Day: November 8"}
              </p>
            </div>
          </div>

          {/* CTA Button with hover animations */}
          <div ref={ctaRef}>
            <Link href="/story">
              <Button
                size="lg"
                variant="glass"
                className="text-lg px-8 py-6 hover:scale-110 transition-sacred relative overflow-hidden group"
              >
                <span className="relative z-10" suppressHydrationWarning>
                  {mounted ? t("hero.readMore") : "Read Full Story"}
                </span>
                <div className="absolute inset-0 bg-primary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
