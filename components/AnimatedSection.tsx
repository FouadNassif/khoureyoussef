"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  triggerOnce?: boolean;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  y = 40,
  triggerOnce = true,
  threshold = 0.2,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: y });

    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: delay,
      ease: "power2.out",
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      animation: animation,
      once: triggerOnce,
    });

    return () => {
      scrollTrigger.kill();
      animation.kill();
    };
  }, [delay, y, triggerOnce]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

