"use client";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Mail,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="text-primary font-medium text-sm tracking-wide uppercase">
                {t("contact.title")}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto"
          >
            {/* Contact Info Column */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-3 text-foreground">
                        {t("contact.location")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t("contact.addressLine1")}
                        <br />
                        {t("contact.addressLine2")}
                        <br />
                        {t("contact.addressLine3")}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-3 text-foreground">
                        {t("contact.contactLabel")}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{t("contact.contactName1")}</span>
                          <a
                            href={`tel:${t("contact.contactPhone1")}`}
                            className="text-primary hover:text-primary/80 transition-colors font-medium"
                            dir="ltr"
                          >
                            {t("contact.contactPhone1")}
                          </a>
                        </div>
                        <div className="w-full h-px bg-border/50" />
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{t("contact.contactName2")}</span>
                          <a
                            href={`tel:${t("contact.contactPhone2")}`}
                            className="text-primary hover:text-primary/80 transition-colors font-medium"
                            dir="ltr"
                          >
                            {t("contact.contactPhone2")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="font-serif text-xl font-bold mb-6 text-foreground">
                      {t("contact.followUs")}
                    </h3>
                    <div className="flex gap-6">
                      <a
                        href="https://www.facebook.com/khoureeddis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1877F2] to-[#0C5DC7] flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        <Facebook className="w-7 h-7" />
                      </a>
                      <a
                        href="https://www.instagram.com/pere_yousef_abimaroun_maatouk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-pink-500/25 transition-all duration-300"
                      >
                        <Instagram className="w-7 h-7" />
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Map Column */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-8 h-full min-h-[500px]"
            >
              <Card className="h-full overflow-hidden border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm p-2">
                <div className="w-full h-full rounded-xl overflow-hidden relative group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8730.305835123228!2d35.91068943537858!3d34.28938687221933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f8828e7f3113%3A0xbe751175368fc07a!2sMar%20Mikhael%20-%20Church!5e1!3m2!1sen!2slb!4v1762716689923!5m2!1sen!2slb"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '100%' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 pointer-events-none border-4 border-primary/10 rounded-xl" />
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
