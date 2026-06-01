import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Button } from '../common';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { useWindowSize } from '../../hooks';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { width } = useWindowSize();
  const location = useLocation();
  const isMobile = width < 768;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Container>
        <div className="flex items-center justify-between py-4 md:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              J
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-sm md:text-base">Jimmy</span>
              <span className="text-xs text-gray-500">Motion Designer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-1">
              {NAVIGATION_ITEMS.map((item) => (
                <Link key={item.href} to={item.href}>
                  <motion.div
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.href
                        ? 'bg-blue-100 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              ))}
            </nav>
          )}

          {/* CTA Button & Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden sm:inline-flex">
              <Button
                variant="secondary"
                size={isMobile ? 'sm' : 'md'}
              >
                Get in Touch
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && isMenuOpen && (
          <motion.nav
            className="pb-4 border-t border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {NAVIGATION_ITEMS.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <Button
              as="a"
              href="mailto:contact@jimmythecreative.com"
              variant="secondary"
              size="sm"
              fullWidth
              className="mt-2"
            >
              Get in Touch
            </Button>
          </motion.nav>
        )}
      </Container>
    </motion.header>
  );
};
