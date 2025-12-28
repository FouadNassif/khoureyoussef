"use client";

import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import VideoCard from "@/components/VideoCard"; // Import the new component
import { Sparkles, Book, Calendar, Play } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

// Sort by date (newest first) and get top 2
return newsItems
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 2);
  }, [resources]);

// Animate about section
useEffect(() => {
  if (aboutInView && aboutSectionRef.current) {
    gsap.fromTo(
      aboutSectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }
  if (aboutInView && aboutTextRef.current) {
    gsap.fromTo(
      aboutTextRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );
  }
}, [aboutInView]);

// Animate miracle section
useEffect(() => {
  if (miracleSectionRef.current) {
    ScrollTrigger.create({
      trigger: miracleSectionRef.current,
      start: "top 80%",
      animation: gsap.fromTo(
        miracleSectionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      ),
      once: true,
    });
  }
}, []);

// Animate news section
useEffect(() => {
  if (miraclesInView) {
    if (newsHeaderRef.current) {
      gsap.fromTo(
        newsHeaderRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    newsItemsRef.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2 + index * 0.1,
            ease: "power2.out",
          }
        );
      }
    });

    if (newsButtonRef.current) {
      gsap.fromTo(
        newsButtonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.6, ease: "power2.out" }
      );
    }
  }
}, [miraclesInView]);

return (
  <>
    <div className="min-h-screen">
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <Navigation show={showNavbar} />
      <Hero isInitialLoad={isInitialLoad} onAnimationComplete={handleHeroAnimationComplete} />

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div ref={aboutSectionRef} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 gradient-divine opacity-20 blur-3xl rounded-full" />
              <img
                src="/assets/saint-icon.jpg"
                alt={t("home.aboutTitle") || "Saint Khoury Youssef of Sereel - A Life of Divine Grace"}
                className="relative w-full rounded-2xl shadow-sacred glow-divine"
              />
            </div>

            <div ref={aboutTextRef} className="shadow-sacred p-8 md:p-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {t("home.aboutTitle")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("home.aboutDescription1")}
              </p>
              <Link href="/story">
                <Button className="gradient-divine text-primary-foreground glow-divine">
                  <Book className="w-4 h-4 mr-2" />
                  {t("home.discoverStory")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Latest Miracle */}
      <section className="py-7 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div ref={miracleSectionRef} className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {t("home.featuredMiracleTitle")}
              </h2>
            </div>

            <Card className="p-8 md:p-12 bg-card shadow-sacred hover:shadow-sacred transition-sacred">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>{featuredMiracle?.date || t("home.miracleDate")}</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-foreground">
                  {featuredMiracle?.title || t("home.miracleHeading")}
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed line-clamp-4">
                  {featuredMiracle?.content || t("home.miracleDescription")}
                </p>

                <Link href="/miracles">
                  <Button className="gradient-divine text-primary-foreground glow-divine">
                    {t("home.readFullStory")}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News Section - NOW USING VideoCard Component */}
      <section ref={miraclesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div ref={newsHeaderRef} className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {t("news.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("news.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {latestNews.map((item, index) => (
              <VideoCard
                key={item.id}
                item={item}
                i18n={i18n}
                cardRef={(el) => {
                  if (el) newsItemsRef.current[index] = el;
                }}
              />
            ))}
          </div>

          <div ref={newsButtonRef} className="text-center mt-12">
            <Link href="/news">
              <Button className="gradient-divine text-primary-foreground glow-divine">
                {t("news.viewAll")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Church Section */}
      <section className="py-5 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center ">

            <div className="shadow-sacred p-5 md:p-12  rounded-2xl">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {t("home.visitSaint")}
              </h2>
              <div className="relative">
                <div className="absolute -inset-4 gradient-divine opacity-20 blur-3xl rounded-full" />
                <img
                  src="/assets/church-interior.jpg"
                  alt={t("home.visitSaint") || "Khoury Youssef Church Interior - Sereel Village, Lebanon"}
                  className="relative w-full rounded-2xl shadow-sacred"
                />
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("home.visitDescription")}
              </p>
              <Link href="/contact">
                <Button className="gradient-divine text-primary-foreground glow-divine">
                  {t("home.planVisit")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </>
);
}