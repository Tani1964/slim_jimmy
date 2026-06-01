/**
 * Design System - Color Palette
 * Comprehensive color definitions for the portfolio
 */

export const COLORS = {
  // Primary Colors
  primary: '#0052CC', // Deep Blue
  primaryLight: '#0066FF',
  primaryDark: '#003399',

  // Secondary Colors
  accent: '#FF4500', // Orange Red (Jimmy's accent)
  accentLight: '#FF6B35',
  accentDark: '#E63A00',

  // Tertiary Colors
  tertiary: '#1A73E8', // Google Blue
  tertiaryLight: '#4285F4',
  tertiaryDark: '#1557B0',

  // Neutral Colors
  black: '#000000',
  charcoal: '#1A1A1A',
  darkGray: '#333333',
  gray: '#666666',
  lightGray: '#999999',
  lightestGray: '#F5F5F5',
  silver: '#EEEEEE',
  lightSilver: '#F8F8F8',
  white: '#FFFFFF',

  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Semantic Colors
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#FFFFFF',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F8F8',
    tertiary: '#F0F0F0',
    dark: '#1A1A1A',
  },
  border: {
    light: '#E5E5E5',
    default: '#CCCCCC',
    dark: '#999999',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #0052CC 0%, #0066FF 100%)',
    accent: 'linear-gradient(135deg, #FF4500 0%, #FF6B35 100%)',
    darkToBright: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
  },
} as const;

export type ColorKey = keyof typeof COLORS;
