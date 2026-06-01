import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { HeroSection, FeaturesGrid, ProjectsShowcase, TestimonialsGrid, CTASection } from '../components/sections';
import { Container } from '../components/common';
import { PROJECTS, FEATURES, TESTIMONIALS } from '../data';
import { useInView } from '../hooks';
import { SPACING_PRESETS } from '../constants';

export const HomePage: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef);

  const stats = [
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Awards Won', value: '15+' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        variant="home"
        title=""
        description="I use motion design to help brands explain their products clearly, capture attention, and turn viewers into customers."
        primaryCTA={{
          text: 'Get in touch',
          href: '/contact',
        }}
      />

      {/* Stats Section */}
      <section ref={statsRef} className={`${SPACING_PRESETS.section.full} bg-gradient-to-r from-blue-600 to-blue-700 text-white`}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <ProjectsShowcase
        subtitle="Portfolio"
        title="Featured Projects"
        projects={PROJECTS}
        featured={true}
      />

      {/* Features/Services */}
      <FeaturesGrid
        subtitle="Services"
        title="What I Offer"
        features={FEATURES}
        columns={3}
      />

      {/* How It Works */}
      <section className={`${SPACING_PRESETS.section.full} bg-gray-50`}>
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-4">
              Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">How I Work</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', desc: 'We discuss your vision, goals, and target audience' },
              { step: '02', title: 'Concept', desc: 'I create compelling scripts and storyboards' },
              { step: '03', title: 'Creation', desc: 'Professional animation and motion design production' },
              { step: '04', title: 'Delivery', desc: 'You receive polished, ready-to-use videos' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-blue-600 mb-3">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/3 -right-3 w-6 h-1 bg-blue-600 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <TestimonialsGrid
        subtitle="Testimonials"
        title="What Clients Say"
        testimonials={TESTIMONIALS}
      />

      {/* Final CTA */}
      <CTASection
        title="Ready to Create Something Amazing?"
        description="Let's work together to bring your vision to life with stunning motion design and compelling storytelling."
        buttonText="Start Your Project"
        buttonHref="mailto:contact@jimmythecreative.com"
        variant="gradient"
      />
    </div>
  );
};
