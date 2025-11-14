"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavigationProps {
  show?: boolean;
}

interface LanguageButtonProps {
  lang: { code: string; name: string; fullName?: string };
  currentLang: string;
  onChange: (code: string) => void;
  scale?: number;
  className?: string;
}

const LanguageButton = ({ lang, currentLang, onChange, scale = 1.05, className = "" }: LanguageButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isActive = currentLang === lang.code;

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, { scale: scale, duration: 0.2, ease: "power2.out" });
    };
    const handleMouseLeave = () => {
      gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out" });
    };
    const handleMouseDown = () => {
      gsap.to(button, { scale: scale * 0.95, duration: 0.1 });
    };
    const handleMouseUp = () => {
      gsap.to(button, { scale: scale, duration: 0.1 });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousedown", handleMouseDown);
    button.addEventListener("mouseup", handleMouseUp);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousedown", handleMouseDown);
      button.removeEventListener("mouseup", handleMouseUp);
    };
  }, [scale]);

  useEffect(() => {
    if (isActive && glowRef.current) {
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isActive]);

  return (
    <button
      ref={buttonRef}
      onClick={() => onChange(lang.code)}
      className={`${className} relative ${
        isActive
          ? "bg-primary text-primary-foreground glow-divine"
          : "text-foreground hover:bg-background"
      }`}
    >
      {lang.fullName || lang.name}
      {isActive && (
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-md bg-primary/20 blur-sm -z-10"
        />
      )}
    </button>
  );
};

const Navigation = ({ show = true }: NavigationProps) => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  const languages = [
    { code: "ar", name: "AR", fullName: "العربية" },
    { code: "en", name: "EN", fullName: "English" },
    { code: "fr", name: "FR", fullName: "Français" },
  ];

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/story", label: t("nav.story") },
    { path: "/miracles", label: t("nav.miracles") },
    { path: "/gallery", label: t("nav.gallery") },
    { path: "/news", label: t("nav.news") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Cycle through languages on click with tap effect
  const cycleLanguage = () => {
    // Add tap effect
    setIsTapping(true);
    if (languageButtonRef.current) {
      gsap.to(languageButtonRef.current, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(languageButtonRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.7)",
          });
        },
      });
    }

    // Change language after a brief delay for better UX
    setTimeout(() => {
      const currentIndex = languages.findIndex((lang) => lang.code === i18n.language);
      const nextIndex = (currentIndex + 1) % languages.length;
      changeLanguage(languages[nextIndex].code);
      setIsTapping(false);
    }, 150);
  };

  // Get current language display
  const getCurrentLanguageDisplay = () => {
    const current = languages.find((lang) => lang.code === i18n.language);
    return current ? current.name : "EN";
  };

  // Determine if RTL (Arabic)
  const isRTL = i18n.language === "ar";

  // Animate nav on mount
  useEffect(() => {
    if (show && navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [show]);

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, height: 0 },
          { opacity: 1, height: "auto", duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [mobileMenuOpen]);


  if (!show) return null;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-sacred"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium transition-sacred relative ${
                  pathname === link.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {pathname === link.path && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Language Switcher - Left side for RTL (AR) */}
          {isRTL && (
            <div className="sm:hidden">
              <button
                ref={languageButtonRef}
                onClick={cycleLanguage}
                className={`flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 ${
                  isTapping ? 'scale-90' : 'scale-100'
                }`}
                style={{
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                <Globe className="w-4 h-4 text-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  {getCurrentLanguageDisplay()}
                </span>
              </button>
            </div>
          )}

          {/* Language Selector + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Desktop Language Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-secondary rounded-lg p-1">
              {languages.map((lang) => (
                <LanguageButton
                  key={lang.code}
                  lang={lang}
                  currentLang={i18n.language}
                  onChange={changeLanguage}
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition-sacred"
                />
              ))}
            </div>

            {/* Mobile Language Switcher - Right side for LTR (EN/FR) */}
            {!isRTL && (
              <div className="sm:hidden">
                <button
                  ref={languageButtonRef}
                  onClick={cycleLanguage}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 ${
                    isTapping ? 'scale-90' : 'scale-100'
                  }`}
                  style={{
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Globe className="w-4 h-4 text-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    {getCurrentLanguageDisplay()}
                  </span>
                </button>
              </div>
            )}

            {/* Theme Toggle */}
            {/* <ThemeToggle /> */}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-card border-t border-border overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium py-2 transition-sacred ${
                  pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex gap-2 pt-2 border-t border-border">
              {languages.map((lang) => (
                <LanguageButton
                  key={lang.code}
                  lang={lang}
                  currentLang={i18n.language}
                  onChange={(code) => {
                    changeLanguage(code);
                    setMobileMenuOpen(false);
                  }}
                  scale={1.02}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-sacred flex-1"
                />
              ))}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
