/**
 * Design System - Typography Scale
 * Standardized font sizes, weights, and line heights
 */

export const TYPOGRAPHY = {
  // Font Stack
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },

  // Font Weights
  weight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  } as const,

  // Heading Sizes
  heading: {
    h1: {
      fontSize: '3.5rem', // 56px
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.75rem', // 44px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontSize: '2rem', // 32px
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '-0.005em',
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: 1.5,
    },
  } as const,

  // Body Text Sizes
  body: {
    lg: {
      fontSize: '1.125rem', // 18px
      fontWeight: 400,
      lineHeight: 1.6,
    },
    base: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.6,
    },
    sm: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.6,
    },
    xs: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.5,
    },
  } as const,

  // Special Styles
  label: {
    fontSize: '0.875rem', // 14px
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.5px',
  },
  caption: {
    fontSize: '0.75rem', // 12px
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.3px',
  },
} as const;
