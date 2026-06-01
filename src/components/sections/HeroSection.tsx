import React from 'react';
import { motion } from 'framer-motion';
import { Container, Button } from '../common';

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
  backgroundPattern = true,
  variant = 'default',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  if (variant === 'home') {
    return (
      <section className="relative bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center py-24 md:py-36 px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hi, I'm [avatar] Jimmy */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-2 leading-tight flex items-center justify-center gap-4 flex-wrap"
              variants={itemVariants}
            >
              <span>Hi, I&apos;m</span>
              {avatarImage ? (
                <span className="inline-block w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-white shadow-lg align-middle flex-shrink-0">
                  <img src={avatarImage} alt="Jimmy" className="w-full h-full object-cover" />
                </span>
              ) : (
                <span className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-700 to-purple-500 text-white text-2xl font-bold ring-4 ring-white shadow-lg flex-shrink-0">
                  J
                </span>
              )}
              <span>Jimmy</span>
            </motion.h1>

            {/* A freelance Motion Designer */}
            <motion.p
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
              variants={itemVariants}
            >
              <span className="text-gray-400 font-bold">A freelance </span>
              <span className="text-[#0A1172] font-bold">Motion Designer</span>
            </motion.p>

            {/* Description */}
            {description && (
              <motion.p
                className="text-base md:text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                {description}
              </motion.p>
            )}

            {/* CTA */}
            {primaryCTA && (
              <motion.div variants={itemVariants}>
                <a
                  href={primaryCTA.href}
                  className="inline-block bg-[#0A1172] text-white font-semibold text-base px-10 py-4 rounded-full hover:bg-[#0d15a0] transition-colors"
                >
                  {primaryCTA.text}
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom navy bar */}
        <div className="h-3 bg-[#0A1172] w-full" />
      </section>
    );
  }

  return (
    <section
      className={`relative py-20 md:py-32 overflow-hidden ${
        backgroundPattern ? 'bg-gradient-to-b from-white to-gray-50' : 'bg-white'
      }`}
    >
      {/* Background Pattern */}
      {backgroundPattern && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      )}

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
              <motion.div
                className="inline-block mb-4"
                variants={itemVariants}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  {subtitle}
                </span>
              </motion.div>
            )}

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl"
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
