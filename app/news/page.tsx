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
{
            lightboxOpen && selectedNews && (
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
          )
}

      <Footer />
    </div >
  );
};

export default News;