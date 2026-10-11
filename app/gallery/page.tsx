"use client";
import { useTranslation } from "react-i18next";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages, getCategories } from "@/lib/galleryData";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons";

const Gallery = () => {
  const { t } = useTranslation();
  // Index into filteredImages of the photo open in the lightbox
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [imageLoading, setImageLoading] = useState(true);

  // Get unique categories and add "All" option
  const categories = useMemo(() => {
    return ["All", ...getCategories()];
  }, []);

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === "All") {
      return galleryImages;
    }
    return galleryImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const selectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  const openImage = (index: number) => {
    setImageLoading(true);
    setSelectedIndex(index);
  };

  const closeImage = useCallback(() => setSelectedIndex(null), []);

  const showNext = useCallback(() => {
    setImageLoading(true);
    setSelectedIndex((i) => (i === null ? i : (i + 1) % filteredImages.length));
  }, [filteredImages.length]);

  const showPrev = useCallback(() => {
    setImageLoading(true);
    setSelectedIndex((i) => (i === null ? i : (i - 1 + filteredImages.length) % filteredImages.length));
  }, [filteredImages.length]);

  // Open the photo from a shared link (/gallery?img=/assets/Church/img2.webp)
  useEffect(() => {
    const sharedSrc = new URLSearchParams(window.location.search).get("img");
    if (!sharedSrc) return;
    const index = galleryImages.findIndex((img) => img.src === sharedSrc);
    if (index !== -1) openImage(index);
  }, []);

  // Keyboard: arrows to switch, Escape to close
  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") showNext();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "Escape") closeImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, showNext, showPrev, closeImage]);

  // Swipe left/right on phones
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) showNext();
    else showPrev();
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navigation />

      {/* Hero Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="text-primary font-medium text-sm tracking-wide uppercase">
                {t("gallery.title")}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight">
              {t("gallery.title")}
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
              {t("gallery.subtitle")}
            </p>

            {/* Category Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-2.5 rounded-full font-medium text-sm
                    transition-all duration-300 ease-out
                    ${selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-card/50 text-foreground hover:bg-card hover:shadow-md hover:scale-105 border border-border/50"
                    }
                  `}
                >
                  {t(`gallery.categories.${category.toLowerCase()}`, category)}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  layout
                  key={image.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-muted"
                  onClick={() => openImage(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || "Gallery Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-3 py-1 bg-primary/90 backdrop-blur-md rounded-full text-primary-foreground text-xs font-medium mb-2">
                      {image.category}
                    </span>
                    {image.alt && (
                      <p className="text-white font-medium line-clamp-2">{image.alt}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            dir="ltr"
            onClick={closeImage}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Counter */}
            <div className="absolute top-5 left-5 text-white/80 text-sm font-medium z-50">
              {selectedIndex! + 1} / {filteredImages.length}
            </div>

            {/* Close */}
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 border border-white/40 backdrop-blur-sm flex items-center justify-center transition-colors z-50"
              onClick={closeImage}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous / Next */}
            {filteredImages.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 hover:bg-black/70 border border-white/40 backdrop-blur-sm flex items-center justify-center transition-colors z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                >
                  <ChevronLeft className="w-7 h-7 text-white" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 hover:bg-black/70 border border-white/40 backdrop-blur-sm flex items-center justify-center transition-colors z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                >
                  <ChevronRight className="w-7 h-7 text-white" />
                </button>
              </>
            )}

            <motion.div
              key={selectedImage.src}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
              )}
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt || "Gallery view"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                onLoad={() => setImageLoading(false)}
              />
            </motion.div>

            {/* Share */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/90 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <ShareButtons
                title={selectedImage.alt || t("gallery.title")}
                path={`/gallery?img=${encodeURIComponent(selectedImage.src)}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
