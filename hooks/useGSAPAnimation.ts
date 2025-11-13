"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationOptions {
  triggerOnce?: boolean;
  threshold?: number;
  start?: string;
  end?: string;
  toggleActions?: string;
  markers?: boolean;
}

export function useGSAPAnimation(
  inView: boolean,
  options: AnimationOptions = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const {
    triggerOnce = true,
    threshold = 0.2,
    start = "top 80%",
    end = "bottom 20%",
    toggleActions = "play none none none",
    markers = false,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, { opacity: 0, y: 40 });

    // Create animation
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Use ScrollTrigger for scroll-based animations
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: start,
      end: end,
      toggleActions: toggleActions,
      animation: animation,
      once: triggerOnce,
      markers: markers,
      onEnter: () => {
        if (triggerOnce && hasAnimated.current) return;
        hasAnimated.current = true;
        animation.play();
      },
    });

    // Also handle manual inView prop (for compatibility with useInView)
    if (inView && (!triggerOnce || !hasAnimated.current)) {
      hasAnimated.current = true;
      animation.play();
    }

    return () => {
      scrollTrigger.kill();
      animation.kill();
    };
  }, [inView, triggerOnce, start, end, toggleActions, markers]);

  return elementRef as RefObject<HTMLElement>;
}

// Hook for simple fade-in animations
export function useFadeIn(
  inView: boolean,
  delay: number = 0,
  duration: number = 0.8
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.set(element, { opacity: 0 });
    const animation = gsap.to(element, {
      opacity: 1,
      duration: duration,
      delay: delay,
      ease: "power2.out",
    });

    if (inView) {
      animation.play();
    }

    return () => {
      animation.kill();
    };
  }, [inView, delay, duration]);

  return elementRef as RefObject<HTMLElement>;
}

// Hook for slide-up animations
export function useSlideUp(
  inView: boolean,
  delay: number = 0,
  duration: number = 0.8,
  y: number = 40
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: y });
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: delay,
      ease: "power2.out",
    });

    if (inView) {
      animation.play();
    }

    return () => {
      animation.kill();
    };
  }, [inView, delay, duration, y]);

  return elementRef as RefObject<HTMLElement>;
}

// Hook for scale animations
export function useScale(
  inView: boolean,
  delay: number = 0,
  duration: number = 0.6,
  fromScale: number = 0
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.set(element, { scale: fromScale, opacity: 0 });
    const animation = gsap.to(element, {
      scale: 1,
      opacity: 1,
      duration: duration,
      delay: delay,
      ease: "back.out(1.7)",
    });

    if (inView) {
      animation.play();
    }

    return () => {
      animation.kill();
    };
  }, [inView, delay, duration, fromScale]);

  return elementRef as RefObject<HTMLElement>;
}

