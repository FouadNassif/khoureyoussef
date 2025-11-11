"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroProps {
  isInitialLoad?: boolean;
  onAnimationComplete?: () => void;
}

const Hero = ({ isInitialLoad = false, onAnimationComplete }: HeroProps) => {
  const { t } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showContent, setShowContent] = useState(!isInitialLoad);

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

  return (
    <section className={`relative ${isInitialLoad ? 'fixed inset-0 z-50' : ''} min-h-screen flex items-center justify-center overflow-hidden`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.img
          src="/assets/hero-church.jpg"
          alt="Mar Mikhael Church"
          className="w-full h-full object-cover"
          animate={{
            scale: zoomLevel,
          }}
          transition={{
            duration: 0.1,
            ease: "easeOut"
          }}
          style={{
            transformOrigin: "center center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: isInitialLoad ? 2.5 : 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative Element */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full gradient-divine flex items-center justify-center glow-divine animate-float"
          >
            <span className="text-3xl">✦</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-foreground"
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-primary font-serif mb-6"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {t("hero.description")}
          </motion.p>

          {/* Feast Day Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-block mb-10"
          >
            <div className="px-6 py-3 rounded-full bg-secondary border-2 border-primary/20 backdrop-blur-sm">
              <p className="text-sm font-medium text-primary">
                {t("hero.feastDay")}
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/story">
              <Button
                size="lg"
                className="gradient-divine text-primary-foreground text-lg px-8 py-6 glow-divine hover:scale-105 transition-sacred"
              >
                {t("hero.readMore")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
