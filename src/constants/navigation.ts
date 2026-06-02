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
  linkedin: 'https://www.linkedin.com/in/belema-jim-george-255949228/?skipRedirect=true',
  x: 'https://x.com/JimmytheCr8tive',
  // tiktok: 'https://www.tiktok.com/@jimmythecreative?_r=1&_t=ZS-96sZ0nJVTrp',
  instagram: 'https://www.instagram.com/jimmy_thecreative?igsh=MXZhaW4yeGh6MXQ1Mw%3D%3D&utm_source=qr',
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
