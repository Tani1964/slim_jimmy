import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container, Button } from '../common';
import { SPACING_PRESETS } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: 'default' | 'dark' | 'gradient';
}

export const CTASection: React.FC<CTAProps> = ({
  title,
  description,
  buttonText = 'Get Started',
  buttonHref = '/contact',
  variant = 'default',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const variantStyles = {
    default: 'glass',
    dark: 'glass-dark text-white',
    gradient: 'text-white',
  };

  const gradientStyle =
    variant === 'gradient'
      ? {
          background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #60A5FA 100%)',
          boxShadow: '0 8px 40px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.25)',
        }
      : undefined;

  const textColor = {
    default: 'text-gray-900',
    dark: 'text-white',
    gradient: 'text-white',
  };

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      const words = title.split(' ');
      headingRef.current!.innerHTML = words
        .map(w => `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em"><span class="wi" style="display:inline-block">${w}</span></span>`)
        .join('');

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      });

      tl.from(headingRef.current!.querySelectorAll('.wi'), {
        y: '115%', duration: 0.8, stagger: 0.07, ease: 'power4.out',
      });
      if (descRef.current) tl.from(descRef.current, { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
      if (btnRef.current)  tl.from(btnRef.current,  { scale: 0.75, opacity: 0, duration: 0.65, ease: 'back.out(2.5)' }, '-=0.3');
    });

    return () => ctx.revert();
  }, [title]);

  return (
    <section className={`${SPACING_PRESETS.section.full}`}>
      <Container>
        <motion.div
          ref={sectionRef}
          className={`${variantStyles[variant]} rounded-3xl p-12 md:p-16 text-center`}
          style={gradientStyle}
          whileHover={{ boxShadow: variant === 'default' ? '0 25px 50px rgba(0,0,0,0.1)' : '' }}
        >
          <h2
            ref={headingRef}
            className={`text-3xl md:text-4xl font-bold mb-4 ${textColor[variant]}`}
          >
            {title}
          </h2>

          {description && (
            <p
              ref={descRef}
              className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
                variant === 'default' ? 'text-gray-600' : 'opacity-90'
              }`}
            >
              {description}
            </p>
          )}

          <div ref={btnRef}>
            <Button
              as="a"
              href={buttonHref}
              variant={variant === 'gradient' ? 'secondary' : 'primary'}
              size="lg"
            >
              {buttonText}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
