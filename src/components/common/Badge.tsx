import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'full' | 'lg' | 'md';
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-orange-100 text-orange-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-indigo-100 text-indigo-800',
};

const sizeStyles = {
  sm: 'px-2.5 py-0.5 text-xs font-medium',
  md: 'px-3 py-1 text-sm font-medium',
  lg: 'px-4 py-2 text-base font-semibold',
};

const roundedStyles = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  className = '',
  children,
}) => {
  return (
    <motion.span
      className={`inline-block ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles[rounded]} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.span>
  );
};
