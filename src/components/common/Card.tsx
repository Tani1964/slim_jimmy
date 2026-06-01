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
      default: 'glass-card rounded-2xl transition-all duration-300 hover:shadow-lg',
      outlined: 'bg-transparent border-2 border-white/60 rounded-2xl hover:border-blue-400 transition-colors',
      elevated: 'glass rounded-2xl hover:shadow-xl transition-all duration-300',
      filled:   'glass-card rounded-2xl transition-all duration-300',
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
