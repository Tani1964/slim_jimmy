import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import { getYoutubeEmbedUrl } from '../utils';

const FolderIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
  </svg>
);

const PersonIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

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
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── HERO ── */}
      <section
        className="relative flex flex-col min-h-[70vh] py-12 px-[15vw] md:py-20"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${project.accentColor} 8%, white) 0%, white 65%)`,
        }}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center px-10 md:px-16 pt-10 pb-6">
          <span
            className="px-5 py-2 rounded-full text-white text-sm font-semibold"
            style={{ backgroundColor: project.accentColor }}
          >
            About this project
          </span>
          <span className="text-base leading-none tracking-tight">
            <span className="font-black">Jimmy</span>
            <span className="font-light italic text-gray-500">theCreative</span>
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-10 md:px-16 py-8 md:py-12">
          {/* Logo — upper left */}
          {project.logo && (
            <motion.img
              src={project.logo}
              alt={project.client}
              className="h-24 md:h-36 w-auto object-contain object-left mb-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            />
          )}

          {/* Bottom row: description left + badges right */}
          <div className="flex items-end justify-between gap-12 mt-16 md:mt-24">
            <motion.p
              className="text-2xl md:text-3xl font-bold leading-snug max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {project.description}
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 flex-shrink-0"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              {[
                { icon: <FolderIcon />, label: project.client.toUpperCase() },
                { icon: <VideoIcon />, label: categoryLabel },
                { icon: <PersonIcon />, label: 'Made by Jimmy' },
              ].map(badge => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md text-white font-semibold text-sm"
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
        <section className="bg-white py-16  px-[15vw] ">
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
      <section className="bg-white py-20 px-[15vw]">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12"
          style={{ color: project.accentColor }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Clients Brief
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-10 max-w-5xl">
          {/* Left column */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold mb-3">Project Overview</h3>
              <p className="text-gray-700 leading-relaxed">{project.brief.overview}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Target Audience</h3>
              <ul className="space-y-1">
                {project.brief.targetAudience.map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Key Message</h3>
              <p className="text-gray-700 leading-relaxed">{project.brief.keyMessage}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold mb-3">Desired feeling</h3>
              <ul className="space-y-1">
                {project.brief.desiredFeeling.map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Deliverables</h3>
              <ul className="space-y-1">
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
      <section className={`${project.bgClass} py-20 px-[15vw]`}>
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12"
          style={{ color: project.accentColor }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Research
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-10 max-w-5xl">
          {[
            { num: '01', title: 'Competitive audit', content: project.research.competitiveAudit },
            { num: '02', title: 'Audience insight', content: project.research.audienceInsight },
            { num: '03', title: 'Mood & reference', content: project.research.moodReference },
            { num: '04', title: 'Motion study', content: project.research.motionStudy },
          ].map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <h3 className="text-2xl font-bold mb-3">
                <span style={{ color: project.accentColor }}>{item.num}. </span>
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SCRIPTING ── */}
      <section className="bg-white py-20 px-[15vw]">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ color: project.accentColor }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Scripting
        </motion.h2>

        {project.scripting.approach && (
          <motion.p
            className="text-gray-700 leading-relaxed mb-8 max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {project.scripting.approach}
          </motion.p>
        )}

        <motion.p
          className="text-gray-700 leading-relaxed mb-14 max-w-4xl italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {project.scripting.fullScript}
        </motion.p>

        <h3 className="text-2xl font-bold mb-10">Scripting Structure</h3>

        <div className="space-y-8 max-w-3xl">
          {project.scripting.structure.map((section, i) => (
            <motion.div
              key={section.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <h4 className="text-xl font-bold mb-2">
                <span style={{ color: project.accentColor }}>{section.step}. </span>
                {section.title}
              </h4>
              <p className="text-gray-700 mb-2 leading-relaxed">{section.description}</p>
              {section.quote && (
                <p className="text-gray-600 italic">{section.quote}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STORYBOARD ── */}
      {project.storyboardVideos && project.storyboardVideos.length > 0 && (
        <section
          className="py-16 px-[15vw]"
          style={{ backgroundColor: project.accentColor }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Storyboard
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {project.storyboardVideos.map((src, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden aspect-video bg-white/20"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── ANIMATION ── */}
      {project.animationVideos && project.animationVideos.length > 0 && (
        <section className={`${project.bgClass} py-16 px-[15vw]`}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-10"
            style={{ color: project.accentColor }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Animation
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.animationVideos.map((src, i) => (
              <motion.div
                key={i}
                className="rounded-2xl overflow-hidden aspect-video bg-white/60 shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── RESULT ── */}
      <section className="bg-white py-20 px-[15vw] border-t border-gray-100">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ color: project.accentColor }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Result
        </motion.h2>
        <motion.p
          className="text-gray-700 leading-relaxed max-w-4xl text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {project.result.summary}
        </motion.p>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 px-[15vw] text-white"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex flex-wrap items-center gap-3">
            <span>Like my work?</span>
            <Link
              to="/contact"
              className="inline-block bg-white text-gray-900 px-5 py-1.5 rounded-full text-base font-bold hover:bg-gray-100 transition-colors"
            >
              Get in touch
            </Link>
          </h2>
          <p className="text-3xl md:text-4xl font-bold mb-8">
            and i'll make your clients<br />like your product too
          </p>
          <p className="text-base opacity-90 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Email: jimgeorgefaithful@gmail.com
          </p>
        </motion.div>
      </section>

      {/* ── OTHER PROJECTS ── */}
      {otherProjects.length > 0 && (
        <section
          className="py-20 px-[15vw]"
          style={{ backgroundColor: project.darkBg ?? '#111111' }}
        >
          <motion.h2
            className="text-white text-2xl font-bold text-center tracking-widest mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            OTHER PROJECTS
          </motion.h2>

          <div className="flex gap-10 justify-center flex-wrap">
            {otherProjects.map((other, i) => (
              <Link key={other.id} to={`/project/${other.slug}`} className="group">
                <motion.div
                  className="w-64"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
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
                  <h3 className="text-white font-bold text-lg underline text-center">
                    {other.title}
                  </h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};
