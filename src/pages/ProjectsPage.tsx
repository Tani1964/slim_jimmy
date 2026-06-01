import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection, ProjectsShowcase, CTASection } from '../components/sections';
import { Container } from '../components/common';
import { PROJECTS } from '../data';
import { SPACING_PRESETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsPage: React.FC = () => {
  const categories = [
    { id: 'all',         label: 'All Projects' },
    { id: 'explainer',   label: 'Explainer Videos' },
    { id: 'promotional', label: 'Promotional' },
    { id: 'branding',    label: 'Branding' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  /* refs */
  const headerRef  = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── section header: word mask reveal ── */
      if (headerRef.current) {
        const h2 = headerRef.current.querySelector<HTMLElement>('.gsap-title');
        if (h2) {
          const words = (h2.textContent || '').split(' ');
          h2.innerHTML = words
            .map(w => `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:.25em"><span class="wi" style="display:inline-block">${w}</span></span>`)
            .join('');
          gsap.from(h2.querySelectorAll('.wi'), {
            y: '115%', duration: 0.75, stagger: 0.07, ease: 'power4.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
          });
        }

        const sub = headerRef.current.querySelector<HTMLElement>('.gsap-sub');
        if (sub) {
          gsap.from(sub, {
            y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: sub, start: 'top 82%', once: true },
          });
        }
      }

      /* ── filter buttons stagger in ── */
      if (filtersRef.current) {
        const btns = filtersRef.current.querySelectorAll<HTMLElement>('.filter-btn');
        gsap.from(btns, {
          y: 30, opacity: 0, scale: 0.88, duration: 0.55,
          stagger: 0.08, ease: 'back.out(2)',
          scrollTrigger: { trigger: filtersRef.current, start: 'top 82%', once: true },
        });
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection
        subtitle="Portfolio"
        title="My Projects"
        description="A collection of motion design projects I've created for innovative brands and businesses."
      />

      {/* Filter + Grid */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <h2 className="gsap-title text-3xl md:text-4xl font-bold mb-3">Explore  My  Work</h2>
            <p className="gsap-sub text-gray-600 text-lg max-w-2xl mx-auto">
              Filter by project type to see the work that interests you most.
            </p>
          </div>

          {/* Category filters */}
          <div ref={filtersRef} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-btn px-6 py-3 rounded-full font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 border-2 border-white/60 hover:border-blue-400'
                }`}
                style={
                  activeCategory === cat.id
                    ? {
                        background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #60A5FA 100%)',
                        boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
                      }
                    : { background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.7)' }
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Projects grid — fades when category switches */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsShowcase projects={filteredProjects} />
            </motion.div>
          </AnimatePresence>
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
