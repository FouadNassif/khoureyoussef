"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Phone,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
            <h1 className="font-cormorant text-5xl md:text-7xl font-bold mb-6 text-foreground">
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
              <Card className="p-8 bg-card border-border shadow-sacred">
                <h2 className="font-cormorant text-3xl font-bold mb-6 text-foreground">
                  {t("contact.mapTitle")}
                </h2>
                <div className="rounded-lg overflow-hidden shadow-sacred h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5!2d35.8!3d33.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU0JzAwLjAiTiAzNcKwNDgnMDAuMCJF!5e0!3m2!1sen!2slb!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Social Media Links */}
                <div className="mt-8">
                  <h3 className="font-cormorant text-xl font-bold mb-4 text-foreground">
                    {t("contact.followUs")}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center hover:scale-110 transition-sacred glow-divine"
                    >
                      <Facebook className="w-6 h-6 text-primary-foreground" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center hover:scale-110 transition-sacred glow-divine"
                    >
                      <Instagram className="w-6 h-6 text-primary-foreground" />
                    </a>
                    <a
                      href="https://wa.me/9611234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center hover:scale-110 transition-sacred glow-divine"
                    >
                      <MessageCircle className="w-6 h-6 text-primary-foreground" />
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
              className="space-y-8"
            >
              <div>
                <h2 className="font-cormorant text-3xl font-bold mb-6 text-foreground">
                  {t("contact.location")}
                </h2>
                <div className="space-y-6">
                  <Card className="p-6 bg-card border-border hover:shadow-sacred transition-sacred">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-foreground">
                          Address
                        </h3>
                        <p className="text-muted-foreground">
                          Church of Mar Mikhael
                          <br />
                          Sereel Village
                          <br />
                          Lebanon
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border hover:shadow-sacred transition-sacred">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
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

                  <Card className="p-6 bg-card border-border hover:shadow-sacred transition-sacred">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-foreground">
                          Contact
                        </h3>
                        <p className="text-muted-foreground">
                          Available for visits and inquiries
                          <br />
                          Pilgrims always welcome
                        </p>
                      </div>
                    </div>
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
