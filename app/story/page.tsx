"use client";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

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

  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption: string } | null>(null);

  const headerElementRef = useRef<HTMLDivElement>(null);
  const timelineElementRef = useRef<HTMLDivElement>(null);
  const storySectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);
  const portraitImageRef = useRef<HTMLImageElement>(null);
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxImageRef = useRef<HTMLImageElement>(null);

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

  // Image data for each section
  const sectionImages = {
    whoIsKhourYoussef: {
      src: "/assets/saint-icon.jpg",
      alt: "Portrait of Khoury Youssef",
      caption: t("story.images.whoIsKhourYoussef", "An icon depicting Khoury Youssef, the beloved priest of Sereel")
    },
    hisLife: {
      src: "/assets/church-interior.jpg",
      alt: "Church where Khoury Youssef served",
      caption: t("story.images.hisLife", "The sacred church where Khoury Youssef dedicated his life to serving the faithful")
    },
    hisDeath: {
      src: "/assets/hero-church.jpg",
      alt: "Khoury Youssef Church in Sereel",
      caption: t("story.images.hisDeath", "The church stands as a testament to his legacy and eternal presence")
    }
  };

  const openLightbox = (src: string, alt: string, caption: string) => {
    setLightboxImage({ src, alt, caption });
  };

  const closeLightbox = () => {
    if (lightboxImageRef.current) {
      gsap.to(lightboxImageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (lightboxRef.current) {
            gsap.to(lightboxRef.current, {
              opacity: 0,
              duration: 0.2,
              onComplete: () => setLightboxImage(null),
            });
          } else {
            setLightboxImage(null);
          }
        },
      });
    } else {
      setLightboxImage(null);
    }
  };

  // Animate lightbox
  useEffect(() => {
    if (lightboxImage) {
      if (lightboxRef.current) {
        gsap.fromTo(
          lightboxRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
      if (lightboxImageRef.current) {
        gsap.fromTo(
          lightboxImageRef.current,
          { scale: 0.9 },
          { scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  }, [lightboxImage]);

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

  // Parallax effect for portrait image
  useEffect(() => {
    if (portraitImageRef.current) {
      ScrollTrigger.create({
        trigger: portraitImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(portraitImageRef.current, {
          y: -100,
          ease: "none",
        }),
      });
    }
  }, []);

  // Sequential stacking animation for story sections
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const triggers: ScrollTrigger[] = [];

    // Wait for next tick to ensure refs are set
    timer = setTimeout(() => {
      if (!storyContainerRef.current) return;

      const sections = storySectionsRef.current.filter(Boolean) as HTMLElement[];
      if (sections.length === 0) return;

      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

      // Set initial states for all sections
      sections.forEach((ref, index) => {
        gsap.set(ref, {
          opacity: 0,
          y: isMobile ? 100 : 200,
          scale: isMobile ? 0.95 : 0.9,
          zIndex: storySections.length - index,
        });
      });

      // Create sequential animations - each section appears after the previous one finishes
      sections.forEach((ref, index) => {
        const prevSection = index > 0 ? sections[index - 1] : null;

        // Calculate start position - adjust for mobile
        let startPosition: string;
        if (index === 0) {
          startPosition = isMobile ? "top 90%" : "top 85%";
        } else {
          startPosition = isMobile ? "top 70%" : "top 50%";
        }

        // Main reveal animation - sequential appearance
        const revealTrigger = ScrollTrigger.create({
          trigger: ref,
          start: startPosition,
          end: isMobile ? "top 40%" : "top 30%",
          scrub: isMobile ? 0.5 : 1,
          animation: gsap.to(ref, {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
          }),
          onEnter: () => {
            // Ensure previous sections stay visible and in place
            if (prevSection) {
              gsap.set(prevSection, {
                opacity: 1,
                y: 0,
                scale: 1,
              });
            }
          },
        });
        triggers.push(revealTrigger);

        // Subtle parallax effect - disabled on mobile for better performance
        if (index > 0 && !isMobile) {
          const parallaxTrigger = ScrollTrigger.create({
            trigger: ref,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            animation: gsap.to(ref, {
              y: -15 * index,
              ease: "none",
            }),
          });
          triggers.push(parallaxTrigger);
        }
      });

      // Refresh ScrollTrigger to ensure it recalculates
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup function
    return () => {
      if (timer) clearTimeout(timer);
      // Kill all triggers created for story sections
      triggers.forEach(trigger => {
        if (trigger) {
          trigger.kill();
        }
      });
      // Also kill any remaining triggers for story sections
      ScrollTrigger.getAll().forEach(trigger => {
        const triggerElement = trigger.vars.trigger as HTMLElement | undefined;
        if (triggerElement && storySectionsRef.current.includes(triggerElement as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, [storySections, i18n.language]);

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
              headerRef(el);
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

      {/* Saint Portrait with Parallax */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-6 gradient-divine opacity-20 blur-3xl rounded-full" />
              <img
                ref={portraitImageRef}
                src="/assets/saint-icon.jpg"
                alt="Khoury Youssef Icon"
                className="relative w-full rounded-2xl shadow-sacred glow-divine"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Sections with Sequential Stacking Effect */}
      <section ref={sectionsRef} className="relative bg-background overflow-hidden">
        <div ref={storyContainerRef} className="container mx-auto px-4 py-8 md:py-20">
          <div className="max-w-4xl mx-auto relative space-y-12 md:space-y-0">
            {storySections.map((section, index) => (
              <div
                key={section.id}
                ref={(el) => {
                  storySectionsRef.current[index] = el;
                }}
                className="md:sticky md:mb-16"
                style={{
                  top: typeof window !== 'undefined' && window.innerWidth >= 768
                    ? `${100 + index * 10}px`
                    : 'auto',
                  zIndex: storySections.length - index,
                } as React.CSSProperties}
              >
                <Card className="p-6 md:p-8 lg:p-10 hover:shadow-sacred transition-sacred bg-card/95 backdrop-blur-sm border-border shadow-xl">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
                    {section.title}
                  </h2>
                  <div className="prose prose-base md:prose-lg max-w-none clearfix">
                    {/* Wikipedia-style Small Inline Image */}
                    {sectionImages[section.id as keyof typeof sectionImages] && (
                      <div
                        className={`
                          ${i18n.language === 'ar' ? 'float-left mr-6' : 'float-right ml-6'}
                          mb-4 w-full sm:w-48 md:w-56 cursor-pointer group
                          clear-both sm:clear-none
                        `}
                        onClick={() => {
                          const img = sectionImages[section.id as keyof typeof sectionImages];
                          openLightbox(img.src, img.alt, img.caption);
                        }}
                      >
                        <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-card border border-border">
                          <img
                            src={sectionImages[section.id as keyof typeof sectionImages].src}
                            alt={sectionImages[section.id as keyof typeof sectionImages].alt}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-black/60 px-2 py-0.5 rounded">
                              🔍
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic leading-tight text-center">
                          {sectionImages[section.id as keyof typeof sectionImages].caption}
                        </p>
                      </div>
                    )}
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - From the writings */}
      <section ref={timelineRef} className="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-background z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div ref={timelineElementRef}>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground">
                  {t("story.sections.about.title")}
                </h2>
              </div>
              <Card className="p-6 md:p-10 hover:shadow-sacred transition-sacred bg-card border-border shadow-lg">
                <div className="prose prose-base md:prose-lg max-w-none space-y-4 md:space-y-6">
                  {aboutSection.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center hover:scale-110 transition-transform z-10"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex flex-col items-center max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              ref={lightboxImageRef}
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl glow-divine"
            />
            <p className="mt-4 text-center text-muted-foreground italic text-sm md:text-base max-w-2xl">
              {lightboxImage.caption}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Story;
