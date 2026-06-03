import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection, ProjectsShowcase, CTASection } from '../components/sections';
import { Container } from '../components/common';
import { PROJECTS } from '../data';
import { SPACING_PRESETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsPage: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      {/* Grid */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <h2 className="gsap-title text-3xl md:text-4xl font-bold mb-3">All  Projects</h2>
            <p className="gsap-sub text-gray-600 text-lg max-w-2xl mx-auto">
              Explore the motion design work I've created for brands and businesses.
            </p>
          </div>

          <ProjectsShowcase projects={PROJECTS} />
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
