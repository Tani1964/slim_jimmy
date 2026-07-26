import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection, CTASection } from '../components/sections';
import { Container, Card } from '../components/common';
import { SPACING_PRESETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export const AboutPage: React.FC = () => {
  const skills = [
    'Motion Design', 'Animation', 'Video Production', 'Scriptwriting',
    'Storyboarding', 'After Effects', 'Blender', 'Illustration',
  ];


  const statsNums  = [
    { value: 15, suffix: '', label: 'Projects Completed' },
    { value: 6, suffix: '+', label: 'Happy Clients' },
    { value: 2,  suffix: '+', label: 'Years Experience' },
    // { value: 15, suffix: '+', label: 'Awards Won' },
  ];

  /* refs */
  const storyRef     = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const skillsRef    = useRef<HTMLDivElement>(null);
  const timelineRef  = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const valuesRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── story section: slide in from sides ── */
      if (storyRef.current) {
        const [left, right] = storyRef.current.querySelectorAll<HTMLElement>('.story-col');
        if (left) gsap.from(left,  { x: -60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: left,  start: 'top 80%', once: true } });
        if (right) gsap.from(right, { x:  60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: right, start: 'top 80%', once: true } });
      }

      /* ── stats counter ── */
      if (statsRef.current) {
        const els = statsRef.current.querySelectorAll<HTMLElement>('.stat-num');
        els.forEach((el, i) => {
          const { value, suffix } = statsNums[i];
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value, duration: 2.2, ease: 'power2.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
            onComplete: () => { el.textContent = value + suffix; },
          });
        });
      }

      /* ── skills pop-in ── */
      if (skillsRef.current) {
        const cards = skillsRef.current.querySelectorAll<HTMLElement>('.skill-card');
        gsap.from(cards, {
          scale: 0.6, opacity: 0, rotation: 8, duration: 0.55,
          stagger: { amount: 0.6, from: 'start' },
          ease: 'back.out(2)',
          scrollTrigger: { trigger: skillsRef.current, start: 'top 78%', once: true },
        });
      }

      /* ── timeline line draw (scrub) ── */
      if (timelineLineRef.current) {
        gsap.from(timelineLineRef.current, {
          scaleY: 0, transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%', end: 'bottom 75%',
            scrub: 1,
          },
        });
      }

      /* ── timeline items alternating slide ── */
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll<HTMLElement>('.timeline-item');
        items.forEach((item, i) => {
          gsap.from(item, {
            x: i % 2 === 0 ? -70 : 70, opacity: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
          });
        });
      }

      /* ── values stagger up ── */
      if (valuesRef.current) {
        const items = valuesRef.current.querySelectorAll<HTMLElement>('.value-item');
        gsap.from(items, {
          y: 50, opacity: 0, scale: 0.92, duration: 0.7,
          stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 78%', once: true },
        });
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection
        subtitle="About Me"
        title="Hi, I'm Jimmy"
        description="I'm a Motion Designer who helps brands turn ideas into engaging visual stories that capture attention and drive action."
      />

      {/* Story */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-4">
              My Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">My Story</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From passion to profession: how I became a motion design partner for innovative brands.
            </p>
          </div>

          <div ref={storyRef} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="story-col">
              <p className="text-gray-600 mb-4 leading-relaxed">
                My work combines storytelling, design, and animation to simplify complex messages, showcase products,
                and create memorable brand experiences. Whether it's a SaaS demo, explainer video, social media
                advertisement, logo animation, or product launch, I focus on creating motion that doesn't just look
                good—it communicates clearly and delivers results.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                With experience creating content for startups, businesses, and growing brands, I approach every project
                with a strategic mindset, ensuring every frame serves a purpose. From concept development and
                storyboarding to animation and final delivery, I transform ideas into visuals that connect with
                audiences and strengthen brand identity.
              </p>
              <p className="text-gray-600 leading-relaxed">
                When I'm not animating, I'm constantly exploring new ways to improve my craft, refine visual
                storytelling techniques, and create work that leaves a lasting impression.
              </p>
            </div>

            <div className="story-col">
              <div
                className="rounded-2xl p-8 text-white"
                style={{
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #60A5FA 100%)',
                  boxShadow: '0 8px 40px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                <h3 className="text-2xl font-bold mb-6">By the Numbers</h3>
                <div ref={statsRef} className="space-y-4">
                  {statsNums.map(({ value, suffix, label }) => (
                    <div key={label}>
                      <div className="stat-num text-4xl font-bold">{value}{suffix}</div>
                      <p className="text-blue-100">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">My Skills &amp; Expertise</h2>
          <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div key={skill} className="skill-card">
                <Card className="text-center">
                  <p className="font-semibold text-gray-900">{skill}</p>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      {/* <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
          <div ref={timelineRef} className="relative">
            {/* line */}
            {/* <div
              ref={timelineLineRef}
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-400 -translate-x-1/2 rounded-full"
            />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`timeline-item md:grid md:grid-cols-2 gap-8 ${i % 2 === 0 ? 'md:text-right' : ''}`}
                >
                  <div className={i % 2 === 1 ? 'md:col-start-2' : ''}>
                    <Card>
                      <div className="text-blue-600 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section> */} 

      {/* Values */}
      <section
        className={`${SPACING_PRESETS.section.full} text-white`}
        style={{
          background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #60A5FA 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">My Values</h2>
          <div ref={valuesRef} className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Clarity',      desc: 'Every frame serves a purpose — motion that communicates, not just decorates' },
              { title: 'Strategy',     desc: 'A strategic mindset behind every project, ensuring results that go beyond aesthetics' },
              { title: 'Impact',       desc: 'Great motion design makes people understand, remember, and take action' },
            ].map((value) => (
              <div key={value.title} className="value-item text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-blue-100">{value.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Let's Create Something Extraordinary"
        description="Ready to bring your vision to life? Let's work together to create motion design that truly matters."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </div>
  );
};
