import React, { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  hover?: boolean;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = false, className = '', children, ...props }, ref) => {
    const variantStyles = {
      default:
        'bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow',
      outlined:
        'bg-transparent border-2 border-gray-200 rounded-lg hover:border-blue-600 transition-colors',
      elevated:
        'bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow',
      filled: 'bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors',
    };

    return (
      <motion.div
        ref={ref}
        className={`${variantStyles[variant]} p-6 transition-all ${className}`}
        whileHover={hover ? { y: -4 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
