"use client";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useState, useMemo, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Miracles = () => {
  const { t, i18n } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [expandedMiracle, setExpandedMiracle] = useState<number | null>(null);
  const headerElementRef = useRef<HTMLDivElement>(null);
  const miracleItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Get all miracles from translations - memoized to update when language changes
  // Sort by date (latest first)
  const miracles = useMemo(() => {
    const miraclesList = [];
    for (let i = 1; i <= 9; i++) {
      const title = t(`miracle${i}.title`, { defaultValue: '' });
      if (title && title !== `miracle${i}.title`) {
        const dateStr = t(`miracle${i}.date`);
        // Parse date string (format: "27 1 2005" or similar)
        let dateObj = new Date(0); // Default to epoch if parsing fails
        try {
          const parts = dateStr.split(/\s+/);
          if (parts.length >= 3) {
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1; // Month is 0-indexed
            const year = parseInt(parts[2]);
            dateObj = new Date(year, month, day);
          }
        } catch (e) {
          // If parsing fails, use epoch date
        }

        miraclesList.push({
          key: `miracle${i}`,
          title: t(`miracle${i}.title`),
          date: dateStr,
          dateObj: dateObj,
          type: t(`miracle${i}.type`),
          location: t(`miracle${i}.location`),
          content: t(`miracle${i}.content`),
        });
      }
    }
    // Sort by date (newest first)
    return miraclesList.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
  }, [t, i18n.language]);

  const toggleMiracle = (index: number) => {
    setExpandedMiracle(expandedMiracle === index ? null : index);
  };

  // Animate header
  useEffect(() => {
    if (headerInView && headerElementRef.current) {
      gsap.fromTo(
        headerElementRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [headerInView]);

  // Animate miracle items
  useEffect(() => {
    miracleItemsRef.current.forEach((ref, index) => {
      if (ref) {
        ScrollTrigger.create({
          trigger: ref,
          start: "top 85%",
          animation: gsap.fromTo(
            ref,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
            }
          ),
          once: true,
        });
      }
    });
  }, [miracles]);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-20 gradient-heavenly">
        <div className="container mx-auto px-4">
          <div
            ref={(el) => {
              headerRef(el);
              headerElementRef.current = el;
            }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-medium text-sm">
                {t("miracles.title")}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground">
              {t("miracles.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("miracles.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Miracles List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {miracles.map((miracle, index) => (
              <div
                key={miracle.key}
                ref={(el) => {
                  miracleItemsRef.current[index] = el;
                }}
              >
                <Card className="overflow-hidden hover:shadow-sacred transition-sacred bg-card border-border">
                  <div className="px-6 py-4">
                    <div className="flex items-start gap-4">

                      <div className="flex-1 w-full">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="w-full">
                            <h3 className="font-serif text-2xl font-bold text-foreground mb-2 text-left">
                              {miracle.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm w-full">
                              <span className="px-3 py-1 bg-primary/10 rounded-full text-primary font-medium">
                                {miracle.type}
                              </span>
                              <span className="text-muted-foreground">
                                {miracle.date}
                              </span>
                              {miracle.location && (
                                <span className="text-muted-foreground">
                                  {miracle.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-muted-foreground mb-4 leading-relaxed w-full text-left">
                          {expandedMiracle === index ? (
                            <div className="w-full">
                              <p className="whitespace-pre-line text-foreground w-full text-left">
                                {miracle.content}
                              </p>
                            </div>
                          ) : (
                            <p className="line-clamp-3 w-full">
                              {miracle.content.length > 200
                                ? `${miracle.content.substring(0, 200)}...`
                                : miracle.content}
                            </p>
                          )}
                        </div>

                        {miracle.content.length > 200 && (
                          <Button
                            variant="glass"
                            size="sm"
                            onClick={() => toggleMiracle(index)}
                          >
                            {expandedMiracle === index ? (
                              <>
                                <ChevronUp className="w-4 h-4 mr-2" />
                                {t("home.showLess")}
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4 mr-2" />
                                {t("home.readFullStory")}
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Miracles;
