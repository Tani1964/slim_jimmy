import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container, Card } from '../common';
import { Testimonial } from '../../types';
import { SPACING_PRESETS } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsGridProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export const TestimonialsGrid: React.FC<TestimonialsGridProps> = ({
  title,
  subtitle,
  testimonials,
}) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
        const cards = gridRef.current.querySelectorAll<HTMLElement>('.testimonial-card');
        cards.forEach((card, i) => {
          const from: gsap.TweenVars =
            i % 3 === 0 ? { x: -70, opacity: 0, scale: 0.92 } :
            i % 3 === 2 ? { x:  70, opacity: 0, scale: 0.92 } :
                          { y:  60, opacity: 0, scale: 0.92 };
          gsap.from(card, { ...from, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true },
          });
        });
      }
    });

    return () => ctx.revert();
  }, [title, testimonials]);

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <Card hover className="h-full">
                {/* Rating */}
                {testimonial.rating !== undefined && testimonial.rating > 0 && (
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < (testimonial.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}

                {/* Content */}
                <p className="text-gray-600 mb-6 italic">&quot;{testimonial.content}&quot;</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
