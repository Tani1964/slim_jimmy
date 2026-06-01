import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import avatarImg from '../../assets/avatar.png';
import { Button, spawnAvatarEgg } from '../common';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { useWindowSize } from '../../hooks';

/* ── random char-bounce animation patterns ── */
const runNavAnimation = (el: HTMLElement) => {
  const chars = Array.from(el.querySelectorAll<HTMLElement>('.nc'));
  if (!chars.length) return;
  gsap.killTweensOf(chars);

  const pattern = Math.floor(Math.random() * 4);

  switch (pattern) {
    case 0: // wave — characters ripple upward in sequence
      chars.forEach((c, i) =>
        gsap.to(c, { y: -9, duration: 0.18, delay: i * 0.05, yoyo: true, repeat: 1, ease: 'power2.out' })
      );
      break;
    case 1: // scatter — each char jumps to a different random height
      chars.forEach(c =>
        gsap.to(c, { y: -(Math.random() * 10 + 4), duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' })
      );
      break;
    case 2: // shake — all chars vibrate horizontally
      gsap.to(chars, { x: 2.5, duration: 0.07, yoyo: true, repeat: 5, ease: 'none',
        onComplete: () => gsap.set(chars, { x: 0 }) });
      break;
    case 3: // cascade — chars drop in from above, staggered
      gsap.from(chars, { y: -14, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'bounce.out' });
      break;
  }
};

const resetChars = (el: HTMLElement) => {
  const chars = Array.from(el.querySelectorAll<HTMLElement>('.nc'));
  gsap.killTweensOf(chars);
  gsap.to(chars, { y: 0, x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
};

/* ── nav link with char split ── */
interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, isActive }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <Link to={href}>
      <div
        ref={containerRef}
        className={`px-4 py-2 rounded-lg transition-colors cursor-pointer select-none ${
          isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'
        }`}
        onMouseEnter={() => containerRef.current && runNavAnimation(containerRef.current)}
        onMouseLeave={() => containerRef.current && resetChars(containerRef.current)}
      >
        {label.split('').map((char, i) => (
          <span key={i} className="nc" style={{ display: 'inline-block' }}>
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </div>
    </Link>
  );
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const { width }  = useWindowSize();
  const location   = useLocation();
  const isMobile   = width < 768;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  return (
    <motion.header
      className="sticky top-0 z-50 px-4 py-3"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className="max-w-6xl mx-auto rounded-2xl transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(100,116,180,0.18), inset 0 1px 0 rgba(255,255,255,0.95)'
            : '0 4px 24px rgba(100,116,180,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200 shadow-sm cursor-pointer"
              whileHover={{ scale: 1.08, rotate: 4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              onClick={(e) => spawnAvatarEgg(e.currentTarget)}
            >
              <img src={avatarImg} alt="Jimmy" className="w-full h-full object-cover" />
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-sm md:text-base">Jimmy</span>
              <span className="text-xs text-gray-500">Motion Designer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-1">
              {NAVIGATION_ITEMS.map(item => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={location.pathname === item.href}
                />
              ))}
            </nav>
          )}

          {/* CTA + Menu toggle */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden sm:inline-flex">
              <Button variant="secondary" size={isMobile ? 'sm' : 'md'} as="button">
                Get in Touch
              </Button>
            </Link>

            {isMobile && (
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <motion.nav
            className="pb-4 border-t border-white/50 px-2"
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
            <Link to="/contact" className="block mt-2">
              <Button variant="secondary" size="sm" fullWidth>
                Get in Touch
              </Button>
            </Link>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};
