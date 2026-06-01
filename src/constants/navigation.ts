/**
 * Navigation Constants
 * Site navigation items and routes
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com',
  dribbble: 'https://dribbble.com',
  github: 'https://github.com',
  youtube: 'https://youtube.com',
} as const;

export const FOOTER_LINKS = {
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Resources', href: '/resources' },
  ],
} as const;
