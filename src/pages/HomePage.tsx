import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import avatarImg from '../assets/avatar.png';
import { HeroSection, FeaturesGrid, ProjectsShowcase, TestimonialsGrid, CTASection } from '../components/sections';
import { Container } from '../components/common';
import { PROJECTS, FEATURES, TESTIMONIALS } from '../data';
import { SPACING_PRESETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const statsGridRef = useRef<HTMLDivElement>(null);
  const processHeadingRef = useRef<HTMLDivElement>(null);
  const processGridRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Awards Won', value: '15+' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Stats counter animation ──────────────────────────────────────────
      if (statsGridRef.current) {
        const statNums = statsGridRef.current.querySelectorAll<HTMLElement>('.stat-num');

        statNums.forEach((el, i) => {
          const raw = el.dataset.value ?? '0';
          const match = raw.match(/^(\d+)(.*)$/);
          const num = match ? parseInt(match[1], 10) : 0;
          const suffix = match ? match[2] : '';

          const obj = { val: 0 };
          gsap.to(obj, {
            val: num,
            duration: 2.2,
            ease: 'power2.out',
            delay: i * 0.15,
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + suffix;
            },
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: 'top 80%',
              once: true,
            },
          });
        });
      }

      // ── Process heading word-mask reveal ────────────────────────────────
      if (processHeadingRef.current) {
        const h2 = processHeadingRef.current.querySelector('.gsap-process-heading');
        if (h2) {
          const text = h2.textContent ?? '';
          const words = text.split(' ');
          h2.innerHTML = words
            .map(
              (word) =>
                `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em"><span class="word-inner" style="display:inline-block">${word}</span></span>`
            )
            .join('');

          const wordInners = h2.querySelectorAll<HTMLElement>('.word-inner');
          gsap.from(wordInners, {
            y: '115%',
            duration: 0.7,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: processHeadingRef.current,
              start: 'top 80%',
              once: true,
            },
          });
        }
      }

      // ── Process cards animation ──────────────────────────────────────────
      if (processGridRef.current) {
        const cards = processGridRef.current.querySelectorAll<HTMLElement>('.process-card');
        const lines = processGridRef.current.querySelectorAll<HTMLElement>('.process-line');

        if (cards.length > 0) {
          gsap.from(cards, {
            y: 50,
            opacity: 0,
            scale: 0.94,
            stagger: 0.15,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: processGridRef.current,
              start: 'top 75%',
              once: true,
            },
          });
        }

        if (lines.length > 0) {
          gsap.from(lines, {
            scaleX: 0,
            transformOrigin: 'left center',
            stagger: 0.15,
            duration: 0.5,
            ease: 'power2.inOut',
            delay: 0.2,
            scrollTrigger: {
              trigger: processGridRef.current,
              start: 'top 75%',
              once: true,
            },
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        variant="home"
        title=""
        avatarImage={avatarImg}
        description="I use motion design to help brands explain their products clearly, capture attention, and turn viewers into customers."
        primaryCTA={{
          text: 'Get in touch',
          href: '/contact',
        }}
      />

      {/* Stats Section */}
      <section className={`${SPACING_PRESETS.section.full} bg-gradient-to-r from-blue-600 to-blue-700 text-white`}>
        <Container>
          <div ref={statsGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const match = stat.value.match(/^(\d+)(.*)$/);
              const suffix = match ? match[2] : '';
              return (
                <div key={stat.label} className="text-center">
                  <div
                    className="stat-num text-3xl md:text-4xl font-bold mb-2"
                    data-value={stat.value}
                  >
                    {/* starts at "0" then GSAP counts up; show suffix to avoid flash */}
                    {'0' + suffix}
                  </div>
                  <p className="text-blue-100">{stat.label}</p>
                </div>
              );
            })}
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

      {/* How I Work */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          <div ref={processHeadingRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-4">
              Process
            </span>
            <h2 className="gsap-process-heading text-3xl md:text-4xl font-bold">How  I  Work</h2>
          </div>

          <div ref={processGridRef} className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', desc: 'We discuss your vision, goals, and target audience' },
              { step: '02', title: 'Concept', desc: 'I create compelling scripts and storyboards' },
              { step: '03', title: 'Creation', desc: 'Professional animation and motion design production' },
              { step: '04', title: 'Delivery', desc: 'You receive polished, ready-to-use videos' },
            ].map((item, index) => (
              <div key={item.step} className="process-card relative">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-blue-600 mb-3">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="process-line hidden md:block absolute top-1/3 -right-3 w-6 h-1 bg-blue-600 transform -translate-y-1/2" />
                )}
              </div>
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
        buttonHref="/contact"
        variant="gradient"
      />
    </div>
  );
};
