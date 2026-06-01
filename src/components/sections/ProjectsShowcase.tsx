import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Card, Button } from '../common';
import { Project } from '../../types';
import { SPACING_PRESETS } from '../../constants';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  return (
    <Link to={`/project/${project.slug}`} className="block h-full">
      <motion.div
        className="h-full"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Card hover className="h-full overflow-hidden group flex flex-col">
          {/* Thumbnail */}
          <div className="relative mb-4 overflow-hidden rounded-lg h-48 bg-gray-200">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center text-white text-3xl font-bold ${project.bgClass}`}
              >
                {project.title[0]}
              </div>
            )}

            {/* Video Indicator */}
            {project.videoId && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Category Badge */}
            {featured && (
              <div className="absolute top-3 right-3">
                <span className="inline-block px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-3 flex-1">{project.shortDescription}</p>

            {/* Tags */}
            {project.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
                  >
                    {tag.icon} {tag.label}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <Button variant="primary" size="sm" fullWidth className="mt-auto">
              View Project
            </Button>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

interface ProjectsShowcaseProps {
  title?: string;
  subtitle?: string;
  projects: Project[];
  featured?: boolean;
  limit?: number;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  title,
  subtitle,
  projects,
  featured = false,
  limit,
}) => {
  const displayProjects = limit ? projects.slice(0, limit) : projects;
  const filteredProjects = featured
    ? displayProjects.filter((p) => p.featured)
    : displayProjects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className={`${SPACING_PRESETS.section.full} bg-gradient-to-b from-gray-50 to-white`}>
      <Container>
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-4">
                {subtitle}
              </span>
            )}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ProjectCard project={project} featured={project.featured} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export { ProjectCard };
