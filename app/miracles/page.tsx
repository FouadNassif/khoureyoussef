"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";

const Miracles = () => {
  const { t, i18n } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [expandedMiracle, setExpandedMiracle] = useState<number | null>(null);

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

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-20 gradient-heavenly">
        <div className="container mx-auto px-4">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
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
          </motion.div>
        </div>
      </section>

      {/* Miracles List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {miracles.map((miracle, index) => (
              <motion.div
                key={miracle.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-sacred transition-sacred bg-card border-border">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center shrink-0 glow-divine">
                        <Heart className="w-6 h-6 text-primary-foreground" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                              {miracle.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
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

                        <div className="text-muted-foreground mb-4 leading-relaxed">
                          {expandedMiracle === index ? (
                            <div>
                              <p className="whitespace-pre-line text-foreground">
                                {miracle.content}
                              </p>
                            </div>
                          ) : (
                            <p className="line-clamp-3">
                              {miracle.content.length > 200
                                ? `${miracle.content.substring(0, 200)}...`
                                : miracle.content}
                            </p>
                          )}
                        </div>

                        {miracle.content.length > 200 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleMiracle(index)}
                            className="text-primary hover:text-primary"
                          >
                            {expandedMiracle === index ? (
                              <>
                                <ChevronUp className="w-4 h-4 mr-2" />
                                Show Less
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Miracles;
