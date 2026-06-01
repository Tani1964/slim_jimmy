import React from 'react';
import { motion } from 'framer-motion';
import { Container, Button } from '../common';
import { SPACING_PRESETS } from '../../constants';

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
  buttonHref = 'mailto:contact@jimmythecreative.com',
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'bg-white border-2 border-gray-200',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
  };

  const textColor = {
    default: 'text-gray-900',
    dark: 'text-white',
    gradient: 'text-white',
  };

  return (
    <section className={`${SPACING_PRESETS.section.full}`}>
      <Container>
        <motion.div
          className={`${variantStyles[variant]} rounded-2xl p-12 md:p-16 text-center`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: variant === 'default' ? '0 25px 50px rgba(0,0,0,0.1)' : '' }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${textColor[variant]}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
                variant === 'default' ? 'text-gray-600' : 'opacity-90'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              as="a"
              href={buttonHref}
              variant={variant === 'gradient' ? 'secondary' : 'primary'}
              size="lg"
            >
              {buttonText}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
