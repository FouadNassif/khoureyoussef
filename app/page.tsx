"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Sparkles, Heart, Book } from "lucide-react";
import { useState, useEffect } from "react";

export default function Page() {
  const { t } = useTranslation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [miraclesRef, miraclesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    // Check if this is the first visit (not a navigation)
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsInitialLoad(false);
      setShowNavbar(true);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleHeroAnimationComplete = () => {
    setIsInitialLoad(false);
    setShowNavbar(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation show={showNavbar} />
      <Hero isInitialLoad={isInitialLoad} onAnimationComplete={handleHeroAnimationComplete} />

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 gradient-divine opacity-20 blur-3xl rounded-full" />
              <img
                src="/assets/saint-icon.jpg"
                alt="Saint Icon"
                className="relative w-full rounded-2xl shadow-sacred glow-divine"
              />
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <span className="text-primary font-medium text-sm">
                    Sacred Legacy
                  </span>
                </div>
                <h2 className="font-cormorant text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  A Life of Divine Grace
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Saint Mar Mikhael of Sereel stands as a beacon of faith and
                  devotion. His life exemplifies the power of prayer, the
                  strength of conviction, and the boundless love of the divine.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Through centuries, his intercession has brought healing, hope,
                  and miracles to countless faithful. His legacy continues to
                  inspire generations in our beloved village of Sereel.
                </p>
                <Link href="/story">
                  <Button className="gradient-divine text-primary-foreground glow-divine">
                    <Book className="w-4 h-4 mr-2" />
                    Discover His Story
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Latest Miracle */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-primary font-medium text-sm">
                  {t("home.latestMiracle")}
                </span>
              </div>
              <h2 className="font-cormorant text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {t("home.featuredMiracleTitle")}
              </h2>
            </div>

            <Card className="p-8 md:p-12 bg-card border-border shadow-sacred hover:shadow-sacred transition-sacred">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>{t("home.miracleDate")}</span>
                </div>

                <h3 className="font-cormorant text-3xl font-bold text-foreground">
                  {t("home.miracleHeading")}
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.miracleDescription")}
                </p>

                <Link href="/miracles">
                  <Button className="gradient-divine text-primary-foreground glow-divine">
                    {t("home.readFullStory")}
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Miracles Preview */}
      <section ref={miraclesRef} className="py-20 gradient-heavenly">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={miraclesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-medium text-sm">
                Divine Interventions
              </span>
            </div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {t("miracles.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("miracles.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: t("miracles.healing"),
                description: t("miracles.healingDesc"),
              },
              {
                icon: Heart,
                title: t("miracles.prayers"),
                description: t("miracles.prayersDesc"),
              },
              {
                icon: Book,
                title: t("miracles.records"),
                description: t("miracles.recordsDesc"),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={miraclesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-sacred transition-sacred bg-card border-border">
                  <div className="w-14 h-14 rounded-full gradient-divine flex items-center justify-center mx-auto mb-4 glow-divine">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={miraclesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/miracles">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                {t("miracles.viewAll")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Church Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-primary font-medium text-sm">
                  Sacred Place
                </span>
              </div>
              <h2 className="font-cormorant text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {t("home.visitSaint")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("home.visitDescription")}
              </p>
              <Link href="/contact">
                <Button className="gradient-divine text-primary-foreground glow-divine">
                  {t("home.planVisit")}
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 gradient-divine opacity-20 blur-3xl rounded-full" />
              <img
                src="/assets/church-interior.jpg"
                alt="Church Interior"
                className="relative w-full rounded-2xl shadow-sacred"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
