import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection, ProjectsShowcase, CTASection } from '../components/sections';
import { Container } from '../components/common';
import { PROJECTS } from '../data';
import { SPACING_PRESETS } from '../constants';

export const ProjectsPage: React.FC = () => {
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'explainer', label: 'Explainer Videos' },
    { id: 'promotional', label: 'Promotional' },
    { id: 'branding', label: 'Branding' },
  ];

  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection
        subtitle="Portfolio"
        title="My Projects"
        description="A collection of motion design projects I've created for innovative brands and businesses."
      />

      {/* Filter */}
      <section className={`${SPACING_PRESETS.section.full} bg-white`}>
        <Container>
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore My Work</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Filter by project type to see the work that interests you most.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectsShowcase projects={filteredProjects} />
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Let's Create Together"
        description="Have a project in mind? I'd love to hear about it. Let's discuss how I can help bring your vision to life."
        buttonText="Start a Project"
        buttonHref="/contact"
      />
    </div>
  );
};
