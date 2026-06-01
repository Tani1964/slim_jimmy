import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Container, Button } from '../common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  image?: string;
  avatarImage?: string;
  backgroundPattern?: boolean;
  variant?: 'default' | 'centered' | 'split' | 'home';
}

export const HeroSection: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  image,
  avatarImage,
  variant = 'default',
}) => {
  /* ── refs ── */
  const sectionRef  = useRef<HTMLElement>(null);
  const orb1Ref     = useRef<HTMLDivElement>(null);
  const orb2Ref     = useRef<HTMLDivElement>(null);
  const orb3Ref     = useRef<HTMLDivElement>(null);
  const hiRef       = useRef<HTMLSpanElement>(null);
  const avatarRef   = useRef<HTMLSpanElement>(null);
  const jimmyRef    = useRef<HTMLSpanElement>(null);
  const freelanceRef= useRef<HTMLSpanElement>(null);
  const mdCharsRef  = useRef<HTMLSpanElement[]>([]);
  const descRef         = useRef<HTMLParagraphElement>(null);
  const ctaRef          = useRef<HTMLAnchorElement>(null);
  const heroContentRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== 'home') return;

    const ctx = gsap.context(() => {
      /* ── floating orbs (idle drift) ── */
      gsap.to(orb1Ref.current, { y: -70, x: 40,  duration: 8,  repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(orb2Ref.current, { y: 50,  x: -50, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
      gsap.to(orb3Ref.current, { y: -30, x: 60,  duration: 7,  repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });

      /* ── scroll parallax ── */
      const scrollOpts = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 };
      gsap.to(heroContentRef.current, { y: -110, ease: 'none', scrollTrigger: scrollOpts });
      gsap.to(orb1Ref.current,        { y: -160, ease: 'none', scrollTrigger: { ...scrollOpts, scrub: 2.5 } });
      gsap.to(orb2Ref.current,        { y:  120, ease: 'none', scrollTrigger: { ...scrollOpts, scrub: 3.5 } });
      gsap.to(orb3Ref.current,        { y: -80,  ease: 'none', scrollTrigger: { ...scrollOpts, scrub: 2 } });

      /* ── main reveal timeline ── */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(hiRef.current,        { y: '115%', duration: 0.9 },                          0.2)
        .from(avatarRef.current,    { scale: 0, rotate: -25, duration: 1.1,
                                      ease: 'elastic.out(1, 0.45)' },                       0.55)
        .from(jimmyRef.current,     { y: '115%', duration: 0.9 },                           0.65)
        .from(freelanceRef.current, { y: '115%', duration: 0.85 },                          0.9)
        .from(mdCharsRef.current,   { y: '120%', opacity: 0, duration: 0.6,
                                      stagger: 0.04, ease: 'power3.out' },                  1.05)
        .from(descRef.current,      { y: 36, opacity: 0, duration: 0.9 },                   1.45)
        .from(ctaRef.current,       { y: 28, opacity: 0, scale: 0.8, duration: 0.8,
                                      ease: 'back.out(2.2)' },                              1.65);
    }, sectionRef);

    return () => ctx.revert();
  }, [variant]);

  /* ── magnetic button handlers ── */
  const onBtnMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width  / 2) * 0.3,
      y: (e.clientY - r.top  - r.height / 2) * 0.3,
      duration: 0.35, ease: 'power2.out',
    });
  };
  const onBtnLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };

  const mdLetters = 'Motion Designer'.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  if (variant === 'home') {
    return (
      <section ref={sectionRef} className="relative overflow-hidden flex flex-col" style={{ minHeight: '88vh' }}>

        {/* ── floating liquid orbs — scaled down on mobile ── */}
        <div
          ref={orb1Ref}
          className="pointer-events-none absolute -top-16 -left-16 w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] md:w-[520px] md:h-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%)', filter: 'blur(48px)' }}
        />
        <div
          ref={orb2Ref}
          className="pointer-events-none absolute top-1/2 -right-16 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] md:w-[600px] md:h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          ref={orb3Ref}
          className="pointer-events-none absolute bottom-0 left-1/3 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[440px] md:h-[440px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', filter: 'blur(52px)' }}
        />

        <div className="relative z-10 flex-1 flex items-center justify-center py-14 sm:py-20 md:py-36 px-4">
          <div ref={heroContentRef} className="text-center mx-auto w-full">

            {/* line 1 — Hi, I'm [avatar] Jimmy */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-black mb-2 leading-tight flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <span style={{ overflow: 'hidden', display: 'inline-block' }}>
                <span ref={hiRef} style={{ display: 'inline-block' }}>Hi, I&apos;m</span>
              </span>

              <span ref={avatarRef} style={{ display: 'inline-block' }}
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 sm:ring-4 ring-white shadow-2xl flex-shrink-0 align-middle"
              >
                {avatarImage
                  ? <img src={avatarImage} alt="Jimmy" className="w-full h-full object-cover" />
                  : <span className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 text-white text-xl font-bold">J</span>
                }
              </span>

              <span style={{ overflow: 'hidden', display: 'inline-block' }}>
                <span ref={jimmyRef} style={{ display: 'inline-block' }}>Jimmy</span>
              </span>
            </h1>

            {/* line 2 — A freelance Motion Designer */}
            <p className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-10 leading-tight flex items-baseline justify-center gap-2 sm:gap-4 flex-wrap">
              <span style={{ overflow: 'hidden', display: 'inline-block' }}>
                <span ref={freelanceRef} style={{ display: 'inline-block' }} className="text-gray-400">
                  A freelance
                </span>
              </span>
              <span className="text-[#0A1172] inline-flex flex-wrap" style={{ overflow: 'hidden' }}>
                {mdLetters.map((ch, i) => (
                  <span
                    key={i}
                    ref={el => { if (el) mdCharsRef.current[i] = el; }}
                    style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </p>

            {/* description */}
            {description && (
              <p
                ref={descRef}
                className="text-base md:text-2xl text-gray-500 mb-12 max-w-[90vw] sm:max-w-[70vw] md:max-w-[52vw] mx-auto leading-relaxed"
              >
                {description}
              </p>
            )}

            {/* CTA */}
            {primaryCTA && (
              <a
                ref={ctaRef}
                href={primaryCTA.href}
                onMouseMove={onBtnMove}
                onMouseLeave={onBtnLeave}
                className="relative inline-flex items-center overflow-hidden text-white font-semibold text-lg sm:text-2xl md:text-3xl px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #60A5FA 100%)',
                  boxShadow: '0 8px 40px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent" />
                <span className="relative z-10">{primaryCTA.text}</span>
              </a>
            )}

          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative py-14 sm:py-20 md:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(238,242,255,0.9) 0%, rgba(224,231,255,0.85) 40%, rgba(240,244,255,0.9) 70%, rgba(237,233,254,0.85) 100%)',
      }}
    >
      {/* grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* soft glow orb */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <Container>
        <motion.div
          className={`grid ${
            variant === 'split' ? 'md:grid-cols-2 gap-12 items-center' : 'text-center'
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <div className="relative z-10">
            {subtitle && (
              <motion.div className="inline-block mb-4" variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  {subtitle}
                </span>
              </motion.div>
            )}

            <motion.h1
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                className="text-sm sm:text-base md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-[90vw] sm:max-w-xl md:max-w-2xl mx-auto"
                variants={itemVariants}
              >
                {description}
              </motion.p>
            )}

            {(primaryCTA || secondaryCTA) && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                variants={itemVariants}
              >
                {primaryCTA && (
                  <Button
                    as="a"
                    href={primaryCTA.href}
                    variant="primary"
                    size="lg"
                  >
                    {primaryCTA.text}
                  </Button>
                )}
                {secondaryCTA && (
                  <Button
                    as="a"
                    href={secondaryCTA.href}
                    variant="outline"
                    size="lg"
                  >
                    {secondaryCTA.text}
                  </Button>
                )}
              </motion.div>
            )}
          </div>

          {/* Image */}
          {image && variant === 'split' && (
            <motion.div
              className="relative"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl transform -rotate-3 opacity-20" />
                <img
                  src={image}
                  alt="Hero"
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
};
