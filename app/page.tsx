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
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const { t, i18n } = useTranslation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [miraclesRef, miraclesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const miracleSectionRef = useRef<HTMLDivElement>(null);
  const newsHeaderRef = useRef<HTMLDivElement>(null);
  const newsItemsRef = useRef<HTMLDivElement[]>([]);
  const newsButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if this is the first visit (not a navigation)
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsInitialLoad(false);
      setShowNavbar(true);
      setShowLoading(false);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
      // Loading screen will handle its own completion
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const handleHeroAnimationComplete = () => {
    setIsInitialLoad(false);
    setShowNavbar(true);
  };

  // Get news items from the news page data
  const latestNews = useMemo(() => {
    const newsItems = [
      {
        id: 1,
        title: " اللجنة عن سويف يوسف المطران",
        content: "سيّدنا المطران يوسف سويف يتكلّم عن اللّجنة المؤلّفة لدراسة ملفّ الخوري يوسف أبي مارون معتوق. المقرّ الصيّفي للمطرانية كرمسدّة في ١-١-٢٠٢٣",
        date: "2023-01-01",
        video: "/assets/videos/news/Video1.mp4",
        thumbnail: "/assets/thumbnails/Video1.jpg", // Add your thumbnail path
        type: "video"
      },
      {
        id: 2,
        title: "عظة سيادة المطران يوسف سويف",
        content: "من عظة سيادة المطران يوسف سويف عن الخوري يوسف أبي مارون معتوق في عيد الخوري يوسف في ٨-١١-٢.٢٢ في كنيسة الخوري يوسف سرعل",
        date: "2022-11-08",
        video: "/assets/videos/news/Video2.mp4",
        thumbnail: "/assets/thumbnails/Video2.jpg", // Add your thumbnail path
        type: "video"
      },
      {
        id: 3,
        title: "فيروز في كنيسة الخوري يوسف سرعل",
        content: "",
        date: "2010-01-01",
        video: "https://youtu.be/V68VbGRj-QY?si=091trsX0ZeZo-1SJ",
        thumbnail: "/assets/thumbnails/Video3.jpg", // Add your thumbnail path
        type: "video"
      },
      {
        id: 4,
        title: "ترتيلة",
        content: "",
        date: "2024-08-28",
        type: "video",
        video: "/assets/videos/news/Video3.mp4",
        thumbnail: "/assets/thumbnails/Video4.jpg", // Add your thumbnail path
      },
    ];

    // Sort by date (newest first) and get top 2
    return newsItems
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);
  }, []);

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
        <section ref={aboutRef} className="py-20 bg-background">
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
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <span className="text-primary font-medium text-sm">
                    {t("home.aboutBadge")}
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  {t("home.aboutTitle")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {t("home.aboutDescription1")}
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t("home.aboutDescription2")}
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
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div ref={miracleSectionRef} className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <span className="text-primary font-medium text-sm">
                    {t("home.latestMiracle")}
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  {t("home.featuredMiracleTitle")}
                </h2>
              </div>

              <Card className="p-8 md:p-12 bg-card border-border shadow-sacred hover:shadow-sacred transition-sacred">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>{t("home.miracleDate")}</span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-foreground">
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
            </div>
          </div>
        </section>

        {/* Latest News Section - NOW USING VideoCard Component */}
        <section ref={miraclesRef} className="py-20 gradient-heavenly">
          <div className="container mx-auto px-4">
            <div ref={newsHeaderRef} className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-primary font-medium text-sm">
                  {t("news.title")}
                </span>
              </div>
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
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <span className="text-primary font-medium text-sm">
                    {t("home.churchBadge")}
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
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
                  alt={t("home.visitSaint") || "Khoury Youssef Church Interior - Sereel Village, Lebanon"}
                  className="relative w-full rounded-2xl shadow-sacred"
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}