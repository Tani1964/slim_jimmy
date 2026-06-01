import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Button, Card } from '../components/common';
import { PROJECTS } from '../data';
import { getYoutubeEmbedUrl, truncateText } from '../utils';
import { SPACING_PRESETS } from '../constants';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Container>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
        <Link to="/projects">
          <Button variant="primary" size="lg">
            Back to Projects
          </Button>
        </Link>
      </div>
    </Container>
  </div>
);

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        className={`${project.bgClass} pt-20 pb-32`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Container>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/projects" className="text-sm font-semibold hover:underline">
              ← Back to Projects
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map(tag => (
                <span key={tag.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur">
                  <span className="text-lg">{tag.icon}</span>
                  <span className="font-semibold">{tag.label}</span>
                </span>
              ))}
            </div>

            {project.websiteUrl && (
              <Button
                as="a"
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                Visit Website →
              </Button>
            )}
          </motion.div>
        </Container>
      </motion.div>

      {/* Video Section */}
      {project.videoId && (
        <section className={`${SPACING_PRESETS.section.full}`}>
          <Container>
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
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
          </Container>
        </section>
      )}

      {/* Client's Brief */}
      <section className={`${SPACING_PRESETS.section.full} bg-gray-50`}>
        <Container>
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Client's Brief
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-3">Project Overview</h3>
                <p className="text-gray-600">{project.brief.overview}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-3">Target Audience</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {project.brief.targetAudience.map((aud, i) => (
                    <li key={i}>{aud}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-3">Key Message</h3>
                <p className="text-gray-600">{project.brief.keyMessage}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-3">Desired Feeling</h3>
                <ul className="space-y-2 text-gray-600">
                  {project.brief.desiredFeeling.map((feel, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      {feel}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Research */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Research &amp; Strategy
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Competitive Audit', content: project.research.competitiveAudit },
              { title: 'Audience Insight', content: project.research.audienceInsight },
              { title: 'Mood & Reference', content: project.research.moodReference },
              { title: 'Motion Study', content: project.research.motionStudy },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Scripting */}
      <section className={`${SPACING_PRESETS.section.full} bg-gray-50`}>
        <Container>
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Scripting &amp; Production
          </motion.h2>

          <motion.div
            className="mb-12 p-8 bg-white rounded-lg shadow-sm border-l-4"
            style={{ borderColor: project.accentColor }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Full Script</h3>
            <p className="text-gray-600 leading-relaxed italic">&quot;{project.scripting.fullScript}&quot;</p>
          </motion.div>

          <div className="space-y-6">
            {project.scripting.structure.map((section, i) => (
              <motion.div
                key={section.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card hover>
                  <div className="flex gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: project.accentColor }}
                    >
                      {section.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">{section.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{section.description}</p>
                      {section.quote && (
                        <p className="text-gray-500 text-sm italic border-l-2 border-gray-300 pl-3">
                          {section.quote}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Results &amp; Impact
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {project.result.metrics?.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2" style={{ color: project.accentColor }}>
                  {metric.value}
                </div>
                <p className="text-gray-600">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-3">Summary</h3>
              <p className="text-gray-600">{project.result.summary}</p>
            </Card>

            {project.result.testimonial && (
              <Card>
                <h3 className="text-xl font-bold mb-3">Client Testimonial</h3>
                <p className="text-gray-600 italic">&quot;{project.result.testimonial}&quot;</p>
              </Card>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Related Projects */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section className={`${SPACING_PRESETS.section.full} bg-gray-50`}>
          <Container>
            <motion.h2
              className="text-3xl font-bold mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Related Projects
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {project.relatedProjects
                .map(id => PROJECTS.find(p => p.id === id))
                .filter(Boolean)
                .map(relatedProject => (
                  <motion.div
                    key={relatedProject?.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/project/${relatedProject?.slug}`}>
                      <Card hover className="h-full">
                        <div className="h-32 rounded-lg mb-4 flex items-center justify-center font-bold text-2xl text-white" style={{ backgroundColor: relatedProject?.accentColor }}>
                          {relatedProject?.title[0]}
                        </div>
                        <h3 className="font-bold mb-2">{relatedProject?.title}</h3>
                        <p className="text-sm text-gray-600">{truncateText(relatedProject?.shortDescription || '', 80)}</p>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </Container>
        </section>
      )}

      {/* Navigation */}
      <section className={`${SPACING_PRESETS.section.full} border-t border-gray-200`}>
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {prevProject && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link to={`/project/${prevProject.slug}`}>
                  <Card hover>
                    <p className="text-sm text-gray-500 mb-2">← Previous Project</p>
                    <h3 className="font-bold text-lg">{prevProject.title}</h3>
                  </Card>
                </Link>
              </motion.div>
            )}

            {nextProject && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:ml-auto md:w-1/2"
              >
                <Link to={`/project/${nextProject.slug}`}>
                  <Card hover>
                    <p className="text-sm text-gray-500 mb-2">Next Project →</p>
                    <h3 className="font-bold text-lg">{nextProject.title}</h3>
                  </Card>
                </Link>
              </motion.div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};
