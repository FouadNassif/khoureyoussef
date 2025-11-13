"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && containerRef.current) {
      // Wait a bit then fade out
      setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              onComplete();
            },
          });
        }
      }, 300);
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
    >
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full gradient-divine flex items-center justify-center glow-divine">
          <span className="text-4xl">✦</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Mar Mikhael
        </h1>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden mb-4">
          <div
            className="h-full gradient-divine transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className="text-sm text-muted-foreground">
          {progress < 100 ? "Loading..." : "Ready!"}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;

