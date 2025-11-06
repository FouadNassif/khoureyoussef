"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, ChevronDown, ChevronUp } from "lucide-react";

const Miracles = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [expandedMiracle, setExpandedMiracle] = useState<number | null>(null);

  const miracles = [
    {
      title: "The Healing of the Paralyzed",
      date: "September 2020",
      category: "Healing",
      icon: Heart,
      summary:
        "A young man unable to walk for years received complete healing after prayer at the saint's shrine.",
      details:
        "After years of medical treatment with no improvement, the family brought their son to the Church of Mar Mikhael. Following fervent prayers and anointing with holy oil from the saint's icon, the young man stood and walked for the first time in over five years. The doctors confirmed the inexplicable recovery.",
    },
    {
      title: "Protection During Crisis",
      date: "March 2019",
      category: "Protection",
      icon: Sparkles,
      summary:
        "A family's home was miraculously preserved during a devastating fire that destroyed neighboring houses.",
      details:
        "As flames engulfed the neighborhood, the family prayed to Mar Mikhael for protection. Witnesses reported seeing what appeared to be a protective barrier around their home as the fire raged on all sides. Their house remained completely untouched while buildings mere meters away were destroyed.",
    },
    {
      title: "The Lost Child's Return",
      date: "August 2021",
      category: "Intercession",
      icon: Heart,
      summary:
        "A missing child was found safe after the community gathered for prayer at the saint's church.",
      details:
        "When a 7-year-old went missing in the mountains, search parties found no trace for two days. The community gathered at Mar Mikhael's church for an all-night prayer vigil. At dawn, the child was found sleeping peacefully in a cave, unharmed and speaking of a 'shining man' who kept him warm and safe.",
    },
    {
      title: "Miraculous Recovery",
      date: "December 2022",
      category: "Healing",
      icon: Sparkles,
      summary:
        "A woman diagnosed with terminal illness experienced complete remission after pilgrimage to the shrine.",
      details:
        "Medical scans showed advanced disease with no hope of recovery. The woman made a pilgrimage to Sereel, spending three days in prayer at the saint's church. Upon returning home and undergoing new medical tests, doctors found no trace of the illness. Her recovery has been medically documented and remains unexplained by science.",
    },
  ];

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
                Divine Interventions
              </span>
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl font-bold mb-6 text-foreground">
              {t("miracles.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("miracles.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Miracles List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {miracles.map((miracle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-sacred transition-sacred bg-card border-border">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full gradient-divine flex items-center justify-center flex-shrink-0 glow-divine">
                        <miracle.icon className="w-6 h-6 text-primary-foreground" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-cormorant text-2xl font-bold text-foreground mb-2">
                              {miracle.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <span className="px-3 py-1 bg-primary/10 rounded-full text-primary font-medium">
                                {miracle.category}
                              </span>
                              <span className="text-muted-foreground">
                                {miracle.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {miracle.summary}
                        </p>

                        {expandedMiracle === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pt-4 border-t border-border"
                          >
                            <p className="text-foreground leading-relaxed">
                              {miracle.details}
                            </p>
                          </motion.div>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleMiracle(index)}
                          className="mt-4 text-primary hover:text-primary"
                        >
                          {expandedMiracle === index ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-2" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-2" />
                              Read Full Story
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-sacred">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-cormorant text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Have You Experienced a Miracle?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Share your testimony and help inspire others in their faith
              journey. Your story could bring hope to those in need.
            </p>
            <Button
              size="lg"
              className="gradient-divine text-primary-foreground glow-divine"
            >
              Share Your Testimony
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Miracles;
