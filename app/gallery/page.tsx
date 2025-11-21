"use client";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryImages, getCategories } from "@/lib/galleryData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Gallery = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const headerElementRef = useRef<HTMLDivElement>(null);
  const galleryItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxImageRef = useRef<HTMLImageElement>(null);
  const categoryNavRef = useRef<HTMLDivElement>(null);

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

  // Animate category navbar
  useEffect(() => {
    if (categoryNavRef.current) {
      gsap.fromTo(
        categoryNavRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }
  }, []);

  // Animate gallery items when they appear or when filter changes
  useEffect(() => {
    galleryItemsRef.current.forEach((ref, index) => {
      if (ref) {
        ScrollTrigger.create({
          trigger: ref,
          start: "top 85%",
          animation: gsap.fromTo(
            ref,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: index * 0.1,
              ease: "power2.out",
            }
          ),
          once: true,
        });
      }
    });
  }, [filteredImages]);

  // Animate category change
  useEffect(() => {
    galleryItemsRef.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: index * 0.05,
            ease: "power2.out",
          }
        );
      }
    });
  }, [selectedCategory]);

  // Animate lightbox
  useEffect(() => {
    if (selectedImage) {
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
  }, [selectedImage]);

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
              onComplete: () => setSelectedImage(null),
            });
          } else {
            setSelectedImage(null);
          }
        },
      });
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-12 gradient-heavenly">
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
                {t("gallery.title")}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground">
              {t("gallery.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("gallery.subtitle")}
            </p>

            {/* Category Navigation */}
            <div
              ref={categoryNavRef}
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
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  galleryItemsRef.current[index] = el;
                }}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-sacred hover:shadow-2xl transition-sacred"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-sacred" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-primary/90 rounded-full text-primary-foreground text-sm font-medium mb-2">
                    {image.category}
                  </span>
                  <p className="text-white font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
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
          <img
            ref={lightboxImageRef}
            src={selectedImage}
            alt="Gallery view"
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl glow-divine"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
