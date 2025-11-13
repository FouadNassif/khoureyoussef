"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface HeroProps {
  isInitialLoad?: boolean;
  onAnimationComplete?: () => void;
}

const Hero = ({ isInitialLoad = false, onAnimationComplete }: HeroProps) => {
  const { t } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showContent, setShowContent] = useState(!isInitialLoad);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInitialLoad) {
      setShowContent(true);
      return;
    }

    // Gradual zoom in - increment every 0.1s
    let currentZoom = 1;
    const zoomInInterval = setInterval(() => {
      currentZoom += 0.05; // Increment by 5% each time
      setZoomLevel(currentZoom);
      
      if (currentZoom >= 1.3) {
        clearInterval(zoomInInterval);
        
        // Show content during zoom pause
        setShowContent(true);
        
        // After zoom in completes, wait 1.5 seconds then zoom out
        setTimeout(() => {
          let zoomOutLevel = 1.3;
          const zoomOutInterval = setInterval(() => {
            zoomOutLevel -= 0.03; // Decrement by 3% each time
            setZoomLevel(zoomOutLevel);
            
            if (zoomOutLevel <= 1) {
              clearInterval(zoomOutInterval);
              setZoomLevel(1);
              onAnimationComplete?.();
            }
          }, 100);
        }, 1500);
      }
    }, 100);

    return () => {
      clearInterval(zoomInInterval);
    };
  }, [isInitialLoad, onAnimationComplete]);

  // Animate background image zoom
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

  // Animate content when showContent changes
  useEffect(() => {
    if (!showContent || !contentRef.current) return;

    const delay = isInitialLoad ? 2.5 : 0;
    const elements = [
      { ref: contentRef, y: 40, delay: delay },
      { ref: decorativeRef, scale: 0, delay: delay + 0.2 },
      { ref: titleRef, y: 20, delay: delay + 0.3 },
      { ref: subtitleRef, y: 20, delay: delay + 0.4 },
      { ref: descriptionRef, y: 20, delay: delay + 0.5 },
      { ref: badgeRef, scale: 0.9, delay: delay + 0.6 },
      { ref: ctaRef, y: 20, delay: delay + 0.7 },
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

    // Animate scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: delay + 1, ease: "power2.out" }
      );
    }

    // Animate scroll icon bounce
    if (scrollIconRef.current) {
      gsap.to(scrollIconRef.current, {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: delay + 1,
      });
    }
  }, [showContent, isInitialLoad]);

  return (
    <section className={`relative ${isInitialLoad ? 'fixed inset-0 z-50' : ''} min-h-screen flex items-center justify-center overflow-hidden`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          ref={bgImageRef}
          src="/assets/hero-church.jpg"
          alt="Mar Mikhael Church"
          className="w-full h-full object-cover"
          style={{ transformOrigin: "center center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 text-center">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* Decorative Element */}
          <div
            ref={decorativeRef}
            className="w-16 h-16 mx-auto mb-6 rounded-full gradient-divine flex items-center justify-center glow-divine"
          >
            <span className="text-3xl">✦</span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-foreground"
          >
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-primary font-serif mb-6"
          >
            {t("hero.subtitle")}
          </p>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {t("hero.description")}
          </p>

          {/* Feast Day Badge */}
          <div ref={badgeRef} className="inline-block mb-10">
            <div className="px-6 py-3 rounded-full bg-secondary border-2 border-primary/20 backdrop-blur-sm">
              <p className="text-sm font-medium text-primary">
                {t("hero.feastDay")}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div ref={ctaRef}>
            <Link href="/story">
              <Button
                size="lg"
                className="gradient-divine text-primary-foreground text-lg px-8 py-6 glow-divine hover:scale-105 transition-sacred"
              >
                {t("hero.readMore")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div
            ref={scrollIconRef}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
