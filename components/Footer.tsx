"use client";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Church, MapPin, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const { t } = useTranslation();
  const [currentYear, setCurrentYear] = useState<number>(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-divine flex items-center justify-center">
                <Church className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">
                Mar Mikhael
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.about")} - {t("footer.village")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-sacred text-sm"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/story"
                className="text-muted-foreground hover:text-primary transition-sacred text-sm"
              >
                {t("nav.story")}
              </Link>
              <Link
                href="/miracles"
                className="text-muted-foreground hover:text-primary transition-sacred text-sm"
              >
                {t("nav.miracles")}
              </Link>
              <Link
                href="/gallery"
                className="text-muted-foreground hover:text-primary transition-sacred text-sm"
              >
                {t("nav.gallery")}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Sereel Village, Lebanon</span>
              </div>
              <Link
                href="/contact"
                className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-sacred"
              >
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{t("contact.title")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mar Mikhael of Sereel. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
