"use client";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Story = () => {
  const { t, i18n } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [sectionsRef, sectionsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headerElementRef = useRef<HTMLDivElement>(null);
  const timelineElementRef = useRef<HTMLDivElement>(null);
  const storySectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);

  // Get story sections from translations - memoized to update when language changes
  const storySections = useMemo(() => [
    {
      id: "whoIsKhourYoussef",
      title: t("story.sections.whoIsKhourYoussef.title", "Who is Khoury Youssef?"),
      content: t("story.sections.whoIsKhourYoussef.content", ""),
    },
    {
      id: "hisLife",
      title: t("story.sections.hisLife.title", "His Life and Calling"),
      content: t("story.sections.hisLife.content", ""),
    },
    {
      id: "hisDeath",
      title: t("story.sections.hisDeath.title", "His Death"),
      content: t("story.sections.hisDeath.content", ""),
    },
  ], [t, i18n.language]);

  const aboutSection = useMemo(() => ({
    title: t("story.sections.about.title", "From the writings of Khoury Youssef Abi Maroun Maatooq:"),
    paragraphs: [
      t("story.sections.about.content.paragraph1", ""),
      t("story.sections.about.content.paragraph2", ""),
    ],
  }), [t, i18n.language]);

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

  // Animate timeline section
  useEffect(() => {
    if (timelineInView && timelineElementRef.current) {
      gsap.fromTo(
        timelineElementRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [timelineInView]);

  // Animate story sections
  useEffect(() => {
    storySectionsRef.current.forEach((ref, index) => {
      if (ref) {
        ScrollTrigger.create({
          trigger: ref,
          start: "top 85%",
          animation: gsap.fromTo(
            ref,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2,
              ease: "power2.out",
            }
          ),
          once: true,
        });
      }
    });
  }, [sectionsInView, storySections]);

  // Animate quote section
  useEffect(() => {
    if (quoteRef.current) {
      ScrollTrigger.create({
        trigger: quoteRef.current,
        start: "top 80%",
        animation: gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
        ),
        once: true,
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-20 gradient-heavenly">
        <div className="container mx-auto px-4">
          <div
            ref={(el) => {
              headerRef.current = el;
              headerElementRef.current = el;
            }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-medium text-sm">
                {t("story.title")}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground">
              {t("story.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("story.sections.whoIsKhourYoussef.title")}
            </p>
          </div>
        </div>
      </section>

      {/* Saint Portrait */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-6 gradient-divine opacity-20 blur-3xl rounded-full" />
              <img
                src="/assets/saint-icon.jpg"
                alt="Mar Mikhael Icon"
                className="relative w-full rounded-2xl shadow-sacred glow-divine"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section ref={sectionsRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {storySections.map((section, index) => (
              <div
                key={section.id}
                ref={(el) => {
                  storySectionsRef.current[index] = el;
                }}
                className="mb-16 last:mb-0"
              >
                <Card className="p-8 md:p-10 hover:shadow-sacred transition-sacred bg-card border-border">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={timelineRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div ref={timelineElementRef}>
              <Card className="p-8 md:p-10 hover:shadow-sacred transition-sacred bg-card border-border">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  {aboutSection.title}
                </h2>
                <div className="prose prose-lg max-w-none space-y-6">
                  {aboutSection.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 gradient-sacred">
        <div className="container mx-auto px-4">
          <div
            ref={quoteRef}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="text-6xl text-primary mb-6">"</div>
            <p className="font-serif text-2xl md:text-3xl text-foreground mb-6 leading-relaxed">
              {storySections[0]?.content ? storySections[0].content.substring(0, 150) + "..." : t("story.sections.whoIsKhourYoussef.content", "").substring(0, 150) + "..."}
            </p>
            <div className="w-16 h-1 bg-primary mx-auto" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Story;
