"use client";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useState, useMemo, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Play, Image as ImageIcon, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image?: string;
  video?: string;
  thumbnail?: string;
  type: "text" | "image" | "video";
}

// Optimized Video Card Component for News Grid
const VideoCardNews = ({ item, onClick }: { item: NewsItem; onClick: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type === "video" && item.video && !item.thumbnail && videoRef.current) {
      const video = videoRef.current;

      const handleLoadedMetadata = () => {
        setIsLoaded(true);
        video.currentTime = 1;
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [item.type, item.video, item.thumbnail]);

  return (
    <div
      className="relative aspect-square overflow-hidden bg-muted cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail Image - shows before video loads */}
      {item.thumbnail && (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        src={item.video}
        className={`w-full h-full object-cover ${item.thumbnail ? 'opacity-0' : 'opacity-100'}`}
        muted
        loop
        playsInline
        preload="metadata"
        poster={item.thumbnail}
        onLoadedData={() => setIsLoaded(true)}
      />

      {/* Play Overlay */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </div>
      </div>

      {/* Loading indicator */}
      {!isLoaded && !item.thumbnail && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

const News = () => {
  const { t, i18n } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const headerElementRef = useRef<HTMLDivElement>(null);
  const newsItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxContentRef = useRef<HTMLDivElement>(null);

  // Get data from translations
  const resources = i18n.getResourceBundle(i18n.language, "translation") || {};

  // Get news items from the news page data
  const newsItems: NewsItem[] = useMemo(() => {
    const items: any[] = resources.newsItems || [];

    // Sort by date (newest first)
    return items
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [resources]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(i18n.language === "ar" ? "ar-LB" : i18n.language === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return dateString;
    }
  };

  const openLightbox = (item: NewsItem) => {
    setSelectedNews(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    if (lightboxContentRef.current) {
      gsap.to(lightboxContentRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setLightboxOpen(false);
          setSelectedNews(null);
        },
      });
    } else {
      setLightboxOpen(false);
      setSelectedNews(null);
    }
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

  // Animate news items
  useEffect(() => {
    newsItemsRef.current.forEach((ref, index) => {
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
  }, [newsItems]);

  // Animate lightbox
  useEffect(() => {
    if (lightboxOpen && lightboxContentRef.current) {
      gsap.fromTo(
        lightboxContentRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [lightboxOpen]);

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
                {t("news.badge", t("news.title"))}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground">
              {t("news.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("news.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* News Grid - Instagram Style with Optimized Video Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {newsItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  newsItemsRef.current[index] = el;
                }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-sacred transition-sacred bg-card border-border cursor-pointer h-full flex flex-col">
                  {/* Image Section */}
                  {item.type === "image" && item.image && (
                    <div
                      className="relative aspect-square overflow-hidden bg-muted"
                      onClick={() => openLightbox(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  )}

                  {/* Optimized Video Section */}
                  {item.type === "video" && item.video && (
                    <VideoCardNews item={item} onClick={() => openLightbox(item)} />
                  )}

                  {/* Text Section */}
                  {item.type === "text" && (
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-8">
                      <div className="text-center">
                        <Calendar className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground text-sm">{formatDate(item.date)}</p>
                      </div>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                      {item.content}
                    </p>
                    <Button
                      className="gradient-divine text-primary-foreground glow-divine"
                      size="sm"
                      onClick={() => openLightbox(item)}
                    >
                      {t("news.readMore", "Read More")}
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedNews && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            ref={lightboxContentRef}
            className="max-w-4xl w-full max-h-[90vh] overflow-auto bg-card rounded-lg shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            {selectedNews.type === "image" && selectedNews.image && (
              <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Video with better controls */}
            {selectedNews.type === "video" && selectedNews.video && (
              <div className="relative w-full aspect-video overflow-hidden bg-black">
                <video
                  src={selectedNews.video}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  preload="auto"
                  poster={selectedNews.thumbnail}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {formatDate(selectedNews.date)}
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                {selectedNews.title}
              </h2>
              {selectedNews.content && (
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {selectedNews.content}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default News;