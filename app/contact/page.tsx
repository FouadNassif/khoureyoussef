"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [expandedMiracle, setExpandedMiracle] = useState<number | null>(null);

  // Get all miracles from translations - memoized to update when language changes
  const miracles = useMemo(() => {
    const miraclesList = [];
    for (let i = 1; i <= 9; i++) {
      const title = t(`miracle${i}.title`, { defaultValue: '' });
      if (title && title !== `miracle${i}.title`) {
        miraclesList.push({
          key: `miracle${i}`,
          title: t(`miracle${i}.title`),
          date: t(`miracle${i}.date`),
          type: t(`miracle${i}.type`),
          location: t(`miracle${i}.location`),
          content: t(`miracle${i}.content`),
        });
      }
    }
    return miraclesList;
  }, [t, i18n.language]);

  const toggleMiracle = (index: number) => {
    setExpandedMiracle(expandedMiracle === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-20 gradient-heavenly">
        <div className="container mx-auto px-4">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-medium text-sm">
                Get in Touch
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Map Location */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
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
                          Address
                        </h3>
                        <p className="text-muted-foreground">
                          Church of Mar Mikhael
                          <br />
                          Sereel Village - Zgharta
                          <br />
                          Lebanon
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
                          Service Times
                        </h3>
                        <p className="text-muted-foreground">
                          Sunday: 10:00 AM
                          <br />
                          Weekdays: 6:00 PM
                          <br />
                          Feast Day: Special Services
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
                          Contact
                        </h3>
                        <p className="text-muted-foreground group-hover:text-foreground transition-sacred">
                          Maria Sassine
                          <br />
                          <span className="text-primary font-semibold">+961 71 797 514</span>
                        </p>
                      </div>
                    </a>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
