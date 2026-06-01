import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container, Card } from '../common';
import { Feature } from '../../types';
import { SPACING_PRESETS } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

interface FeaturesGridProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
}) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current && title) {
        const h2 = headingRef.current.querySelector('.gsap-heading');
        if (h2) {
          const words = title.split(' ');
          h2.innerHTML = words
            .map(w => `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em"><span class="wi" style="display:inline-block">${w}</span></span>`)
            .join('');
          gsap.from(h2.querySelectorAll('.wi'), {
            y: '115%', duration: 0.7, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true },
          });
        }
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll<HTMLElement>('.feature-card');
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { y: 60, opacity: 0, rotation: 3, scale: 0.94 },
            { y: 0, opacity: 1, rotation: 0, scale: 1,
              stagger: { amount: 0.5, from: 'start' }, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: gridRef.current, start: 'top 75%', once: true },
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, [title, features]);

  return (
    <section className={`${SPACING_PRESETS.section.full}`}>
      <Container>
        {(title || subtitle) && (
          <div ref={headingRef} className="text-center mb-16">
            {subtitle && (
              <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-4">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="gsap-heading text-3xl md:text-4xl font-bold">{title}</h2>
            )}
          </div>
        )}

        <div
          ref={gridRef}
          className={`grid grid-cols-1 ${gridColsClass[columns]} gap-8 auto-rows-fr`}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="feature-card h-full"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card hover className="h-full">
                {feature.icon && (
                  <div className="text-4xl mb-4">{feature.icon}</div>
                )}
                {feature.image && (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
