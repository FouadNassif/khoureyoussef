"use client";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Clock,
  Facebook,
  Instagram,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const headerElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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

  // Animate map and info sections
  useEffect(() => {
    if (mapRef.current) {
      ScrollTrigger.create({
        trigger: mapRef.current,
        start: "top 80%",
        animation: gsap.fromTo(
          mapRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        ),
        once: true,
      });
    }

    if (infoRef.current) {
      ScrollTrigger.create({
        trigger: infoRef.current,
        start: "top 80%",
        animation: gsap.fromTo(
          infoRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
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
                {t("contact.title")}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Map Location */}
            <div ref={mapRef}>
              <Card className="p-8 bg-card border-border shadow-sacred h-full flex flex-col">
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">
                  {t("contact.mapTitle")}
                </h2>
                <div className="rounded-lg overflow-hidden shadow-sacred flex-1" style={{ minHeight: '500px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8730.305835123228!2d35.91068943537858!3d34.28938687221933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f8828e7f3113%3A0xbe751175368fc07a!2sMar%20Mikhael%20-%20Church!5e1!3m2!1sen!2slb!4v1762716689923!5m2!1sen!2slb"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '500px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Social Media Links */}
                <div className="mt-8">
                  <h3 className="font-serif text-xl font-bold mb-4 text-foreground">
                    {t("contact.followUs")}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/khoureeddis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center hover:scale-110 transition-sacred glow-divine"
                    >
                      <Facebook className="w-6 h-6 text-primary-foreground" />
                    </a>
                    <a
                      href="https://www.instagram.com/pere_yousef_abimaroun_maatouk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center hover:scale-110 transition-sacred glow-divine"
                    >
                      <Instagram className="w-6 h-6 text-primary-foreground" />
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Info */}
            <div ref={infoRef}>
              <div className="h-full flex flex-col">
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">
                  {t("contact.location")}
                </h2>
                <div className="grid grid-cols-1 gap-6 flex-1" style={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
                  <Card className="p-6 bg-card border-border hover:shadow-sacred transition-sacred">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-foreground">
                          {t("contact.address")}
                        </h3>
                        <p className="text-muted-foreground">
                          {t("contact.addressLine1")}
                          <br />
                          {t("contact.addressLine2")}
                          <br />
                          {t("contact.addressLine3")}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border hover:shadow-sacred transition-sacred">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-foreground">
                          {t("contact.serviceTimes")}
                        </h3>
                        <p className="text-muted-foreground">
                          {t("contact.serviceSunday")}
                          <br />
                          {t("contact.serviceWeekdays")}
                          <br />
                          {t("contact.serviceFeast")}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border hover:shadow-sacred transition-sacred cursor-pointer group">
                    <a 
                      href="tel:+96171797514" 
                      className="flex items-start gap-4 no-underline"
                    >
                      <div className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center shrink-0 group-hover:scale-110 transition-sacred">
                        <Phone className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-foreground group-hover:text-primary transition-sacred">
                          {t("contact.contactLabel")}
                        </h3>
                        <p className="text-muted-foreground group-hover:text-foreground transition-sacred">
                          {t("contact.contactName")}
                          <br />
                          <span className="text-primary font-semibold">{t("contact.contactPhone")}</span>
                        </p>
                      </div>
                    </a>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
