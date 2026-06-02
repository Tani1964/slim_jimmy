import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data';
import { getYoutubeEmbedUrl } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const TagIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

type LightboxSource = 'storyboard' | 'animation';

const Lightbox: React.FC<{
  images: string[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}> = ({ images, index, onClose, onNav }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onNav((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [index, images.length, onClose, onNav]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/90" />

        {/* counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm z-10 select-none">
          {index + 1} / {images.length}
        </div>

        {/* close */}
        <button
          className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* prev */}
        {images.length > 1 && (
          <button
            className="absolute left-3 md:left-6 z-10 text-white/70 hover:text-white transition-colors"
            onClick={e => { e.stopPropagation(); onNav((index - 1 + images.length) % images.length); }}
            aria-label="Previous"
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* image */}
        <motion.img
          key={index}
          src={images[index]}
          alt={`frame ${index + 1}`}
          className="relative z-10 max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
        />

        {/* next */}
        {images.length > 1 && (
          <button
            className="absolute right-3 md:right-6 z-10 text-white/70 hover:text-white transition-colors"
            onClick={e => { e.stopPropagation(); onNav((index + 1) % images.length); }}
            aria-label="Next"
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);
  const pageRef = useRef<HTMLDivElement>(null);

  const [lightbox, setLightbox] = useState<{ source: LightboxSource; index: number } | null>(null);

  const openLightbox = useCallback((source: LightboxSource, index: number) => {
    setLightbox({ source, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navLightbox = useCallback((index: number) => {
    setLightbox(prev => prev ? { ...prev, index } : null);
  }, []);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {

      /* hero content drifts up as section scrolls away */
      gsap.to('.hero-parallax', {
        y: -90, ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 },
      });

      /* section heading word-mask reveals */
      pageRef.current?.querySelectorAll<HTMLElement>('.detail-h2').forEach(el => {
        const words = (el.textContent || '').split(' ');
        el.innerHTML = words
          .map(w => `<span style="overflow:hidden;display:inline-block;vertical-align:bottom;margin-right:.2em"><span class="dw" style="display:inline-block">${w}</span></span>`)
          .join('');
        gsap.from(el.querySelectorAll('.dw'), {
          y: '110%', duration: 0.9, stagger: 0.07, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      /* research cards stagger */
      const rGrid = pageRef.current?.querySelector('.research-grid');
      if (rGrid) {
        gsap.from(rGrid.querySelectorAll('.research-item'), {
          y: 50, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: rGrid, start: 'top 78%', once: true },
        });
      }

      /* script structure items stagger */
      const sGrid = pageRef.current?.querySelector('.script-grid');
      if (sGrid) {
        gsap.from(sGrid.querySelectorAll('.script-item'), {
          x: -40, opacity: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: sGrid, start: 'top 78%', once: true },
        });
      }

      /* other projects stagger */
      const oGrid = pageRef.current?.querySelector('.other-projects-grid');
      if (oGrid) {
        gsap.from(oGrid.querySelectorAll('.other-project'), {
          y: 40, opacity: 0, scale: 0.92, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: oGrid, start: 'top 80%', once: true },
        });
      }

    }, pageRef);
    return () => ctx.revert();
  }, [project?.slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-blue-600 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const otherProjects = PROJECTS.filter(p => p.slug !== project.slug);
  const categoryLabel = project.tags[0]?.label || project.category;

  return (
    <motion.div
      ref={pageRef}
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── HERO ── */}
      <section
        className="hero-section relative flex flex-col min-h-[70vh] py-12 px-4 sm:px-8 md:px-[15vw] md:py-20"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${project.accentColor} 8%, white) 0%, white 65%)`,
        }}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center pt-6 pb-4">
          <span
            className="px-3 py-1.5 rounded-md text-white text-sm sm:text-base md:text-2xl font-semibold"
            style={{ backgroundColor: project.accentColor }}
          >
            About this project
          </span>
          <span className="text-xs sm:text-base leading-none tracking-tight">
            <span className="font-black">Jimmy</span>
            <span className="font-light italic text-gray-500">theCreative</span>
          </span>
        </div>

        {/* Content */}
        <div className="hero-parallax flex-1 flex flex-col py-6 md:py-12">
          {/* Logo — upper left */}
          {project.logo && (
            <motion.img
              src={project.logo}
              alt={project.client}
              className="h-20 sm:h-32 md:h-48 w-auto object-contain object-left mb-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            />
          )}

          {/* Bottom row: description + badges (stacks on mobile) */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 mt-8 md:mt-24">
            <motion.p
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-snug max-w-4xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {project.description}
            </motion.p>

            <motion.div
              className="flex flex-row flex-wrap md:flex-col gap-2 md:gap-3 md:flex-shrink-0 md:mb-16"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              {[
                { icon: <TagIcon />, label: project.client.toUpperCase() },
                { icon: <PlayIcon />, label: categoryLabel },
                { icon: <StarIcon />, label: 'Made by Jimmy' },
              ].map(badge => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-white font-semibold text-xs sm:text-sm md:text-xl w-fit"
                  style={{ backgroundColor: project.accentColor }}
                >
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        {/* <div className="h-3 bg-gray-900 w-full" /> */}
      </section>

      {/* ── VIDEO ── */}
      {project.videoId && (
        <section className="bg-white py-16  px-4 sm:px-8 md:px-[15vw] ">
          <motion.div
            className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              className="w-full aspect-video"
              src={getYoutubeEmbedUrl(project.videoId)}
              title={project.title}
              allowFullScreen
            />
          </motion.div>
        </section>
      )}

      {/* ── CLIENT'S BRIEF ── */}
      <section className="bg-white py-20 px-4 sm:px-8 md:px-[15vw]">
        <h2
          className="detail-h2 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-12"
          style={{ color: project.accentColor }}
        >
          Clients Brief
        </h2>

        <div className="grid md:grid-cols-2 gap-x-4 md:gap-x-40 gap-y-10 max-w-full md:max-w-[60vw]">
          {/* Left column */}
          <div className="space-y-10">
            <div>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-bold mb-3">Project Overview</h3>
              <p className="text-gray-700  text-sm sm:text-base md:text-2xl font-semibold">{project.brief.overview}</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-bold mb-3">Target Audience</h3>
              <ul className="space-y-1 text-sm sm:text-base md:text-2xl font-semibold">
                {project.brief.targetAudience.map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-start gap-2">
                    {/* <span className="mt-1">•</span> */}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-bold mb-3">Key Message</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-2xl font-semibold">{project.brief.keyMessage}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            <div>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-bold mb-3">Desired feeling</h3>
              <ul className="space-y-1 text-sm sm:text-base md:text-2xl font-semibold pl-2">
                {project.brief.desiredFeeling.map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-bold mb-3">Deliverables</h3>
              <ul className="space-y-1 text-sm sm:text-base md:text-2xl font-semibold pl-2">
                {project.brief.deliverables.map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section className={`${project.bgClass} py-20 px-4 sm:px-8 md:px-[15vw]`}>
        <h2
          className="detail-h2 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-12"
          style={{ color: project.accentColor }}
        >
          Research
        </h2>

        <div className="research-grid grid md:grid-cols-2 gap-x-4 md:gap-x-32 gap-y-10 max-w-full md:max-w-[70vw]">
          {[
            { num: '01', title: 'Competitive audit', content: project.research.competitiveAudit },
            { num: '02', title: 'Audience insight', content: project.research.audienceInsight },
            { num: '03', title: 'Mood & reference', content: project.research.moodReference },
            { num: '04', title: 'Motion study', content: project.research.motionStudy },
          ].map((item) => (
            <div key={item.num} className="research-item">
              <h3 className="text-lg sm:text-2xl md:text-4xl font-bold mb-3">
                <span style={{ color: project.accentColor }}>{item.num}. </span>
                {item.title}
              </h3>
              <p className="text-gray-700  text-sm sm:text-base md:text-2xl font-semibold">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCRIPTING ── */}
      <section className="bg-white py-12 md:py-24 px-4 sm:px-8 md:px-[15vw]">
        <h2
          className="detail-h2 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{ color: project.accentColor }}
        >
          Scripting
        </h2>

        {project.scripting.approach && (
          <motion.p
            className="text-gray-700 mb-8 max-w-full md:max-w-[70vw] font-semibold text-sm sm:text-base md:text-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {project.scripting.approach}
          </motion.p>
        )}

        <motion.p
          className="text-gray-700  mb-14 max-w-full md:max-w-[70vw] italic text-sm sm:text-base md:text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {project.scripting.fullScript}
        </motion.p>

        <h3 className="text-lg sm:text-2xl md:text-4xl font-bold mb-10 max-w-full md:max-w-[70vw]">Scripting Structure</h3>

        <div className="script-grid space-y-8 max-w-full md:max-w-[70vw]">
          {project.scripting.structure.map((section) => (
            <div key={section.step} className="script-item">
              <h4 className="text-lg sm:text-2xl md:text-4xl font-bold mb-2">
                <span style={{ color: project.accentColor }}>{section.step}. </span>
                {section.title}
              </h4>
              <p className="font-semibold mb-2 leading-relaxed text-sm sm:text-base md:text-2xl">{section.description}</p>
              {section.quote && (
                <p className="text-gray-600 italic text-sm sm:text-base md:text-2xl">{section.quote}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── STORYBOARD ── */}
      {project.storyboardImages && project.storyboardImages.length > 0 && (
        <section
          className="py-12 md:py-24 px-4 sm:px-8 md:px-[15vw]"
          style={{ backgroundColor: project.accentColor }}
        >
          <h2 className="detail-h2 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-10">
            Storyboard
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {project.storyboardImages.map((src, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden aspect-video bg-white/20 cursor-zoom-in"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.04 }}
                onClick={() => openLightbox('storyboard', i)}
              >
                <img
                  src={src}
                  alt={`Storyboard frame ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── ANIMATION ── */}
      {project.animationGifs && project.animationGifs.length > 0 && (
        <section className={`${project.bgClass} py-12 md:py-24 px-4 sm:px-8 md:px-[15vw]`}>
          <h2
            className="detail-h2 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-10"
            style={{ color: project.accentColor }}
          >
            Animation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.animationGifs.map((src, i) => (
              <motion.div
                key={i}
                className="rounded-2xl overflow-hidden aspect-video bg-white/60 shadow-sm cursor-zoom-in"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => openLightbox('animation', i)}
              >
                <img
                  src={src}
                  alt={`Animation ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── LIGHTBOX ── */}
      {lightbox && project && (
        <Lightbox
          images={
            lightbox.source === 'storyboard'
              ? project.storyboardImages!
              : project.animationGifs!
          }
          index={lightbox.index}
          onClose={closeLightbox}
          onNav={navLightbox}
        />
      )}

      {/* ── RESULT ── */}
      <section className="bg-white py-20 px-4 sm:px-8 md:px-[15vw] border-t border-gray-100">
        <h2
          className="detail-h2 text-2xl sm:text-3xl md:text-5xl font-bold mb-6"
          style={{ color: project.accentColor }}
        >
          Result
        </h2>
        <motion.p
          className="text-gray-700 leading-relaxed max-w-full md:max-w-[70vw] text-sm sm:text-base md:text-2xl font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {project.result.summary}
        </motion.p>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 px-4 sm:px-8 md:px-[15vw] text-white flex flex-col items-center gap-6"
        style={{
          background: `linear-gradient(135deg, ${project.accentColor} 0%, ${project.accentColorLight} 100%)`,
        }}
      >
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 flex flex-wrap items-center gap-3">
            <span>Like my work?</span>
            <Link
              to="/contact"
              className="inline-block bg-white text-gray-900 px-4 py-1.5 rounded-md text-xl sm:text-2xl md:text-3xl font-bold hover:bg-gray-100 transition-colors"
            >
              Get in touch
            </Link>
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            and i'll make your clients<br />like your product too
          </p>
          <p className="text-base sm:text-lg md:text-2xl opacity-90 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </p>
        </motion.div>
      </section>

      {/* ── OTHER PROJECTS ── */}
      {otherProjects.length > 0 && (
        <section
          className="py-20 px-4 sm:px-8 md:px-[15vw]"
          style={{ backgroundColor: project.darkBg ?? '#111111' }}
        >
          <motion.h2
            className="text-white text-4xl font-bold text-center tracking-widest mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            OTHER PROJECTS
          </motion.h2>

          <div className="other-projects-grid flex gap-10 justify-center flex-wrap">
            {otherProjects.map((other) => (
              <Link key={other.id} to={`/project/${other.slug}`} className="group">
                <div className="other-project w-72">
                  {other.thumbnail ? (
                    <img
                      src={other.thumbnail}
                      alt={other.title}
                      className="w-full aspect-video object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity"
                    />
                  ) : (
                    <div
                      className="w-full aspect-video rounded-lg mb-4 flex items-center justify-center text-white font-bold text-4xl"
                      style={{ backgroundColor: other.accentColor }}
                    >
                      {other.title[0]}
                    </div>
                  )}
                  <h3 className="text-white font-bold text-2xl underline text-center">
                    {other.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};
