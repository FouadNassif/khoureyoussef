"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Story = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [sectionsRef, sectionsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get story sections from translations
  const storySections = [
    {
      id: "whoIsKhourYoussef",
      title: t("story.sections.whoIsKhourYoussef.title"),
      content: t("story.sections.whoIsKhourYoussef.content"),
    },
    {
      id: "hisLife",
      title: t("story.sections.hisLife.title"),
      content: t("story.sections.hisLife.content"),
    },
    {
      id: "hisDeath",
      title: t("story.sections.hisDeath.title"),
      content: t("story.sections.hisDeath.content"),
    },
  ];

  const aboutSection = {
    title: t("story.sections.about.title"),
    paragraphs: [
      t("story.sections.about.content.paragraph1"),
      t("story.sections.about.content.paragraph2"),
    ],
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
                Sacred Biography
              </span>
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl font-bold mb-6 text-foreground">
              {t("story.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("story.sections.whoIsKhourYoussef.title")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Saint Portrait */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-6 gradient-divine opacity-20 blur-3xl rounded-full" />
              <img
                src="/assets/saint-icon.jpg"
                alt="Mar Mikhael Icon"
                className="relative w-full rounded-2xl shadow-sacred glow-divine"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section ref={sectionsRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {storySections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                animate={sectionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="mb-16 last:mb-0"
              >
                <Card className="p-8 md:p-10 hover:shadow-sacred transition-sacred bg-card border-border">
                  <h2 className="font-cormorant text-3xl md:text-4xl font-bold mb-6 text-foreground">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={timelineRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8 md:p-10 hover:shadow-sacred transition-sacred bg-card border-border">
                <h2 className="font-cormorant text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  {aboutSection.title}
                </h2>
                <div className="prose prose-lg max-w-none space-y-6">
                  {aboutSection.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 gradient-sacred">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="text-6xl text-primary mb-6">"</div>
            <p className="font-cormorant text-2xl md:text-3xl text-foreground mb-6 leading-relaxed">
              Through faith and devotion, Mar Mikhael became a vessel of divine
              grace, bringing light to the darkness and hope to the hopeless.
            </p>
            <div className="w-16 h-1 bg-primary mx-auto" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Story;
