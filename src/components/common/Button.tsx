import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400',
  secondary:
    'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 disabled:bg-gray-400',
  tertiary:
    'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-300',
  outline:
    'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-gray-400 disabled:text-gray-400',
  ghost:
    'text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-gray-400',
};

const sizeStyles = {
  xs: 'px-3 py-1.5 text-xs font-medium rounded-md',
  sm: 'px-4 py-2 text-sm font-medium rounded-lg',
  md: 'px-6 py-3 text-base font-semibold rounded-lg',
  lg: 'px-8 py-4 text-lg font-semibold rounded-xl',
  xl: 'px-10 py-5 text-xl font-bold rounded-full',
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      as = 'button',
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600';

    const computedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
      fullWidth ? 'w-full' : ''
    } ${className}`;

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="mr-2 flex items-center justify-center">{icon}</span>
        )}
        {isLoading ? <span className="animate-spin">⏳</span> : children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2 flex items-center justify-center">{icon}</span>
        )}
      </>
    );

    if (as === 'a') {
      const { href, target, rel, ...restProps } = props as any;
      return (
        <motion.a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={computedClassName}
          href={href}
          target={target}
          rel={rel}
          whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
          whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          {...(restProps as any)}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={computedClassName}
        disabled={disabled || isLoading}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        {...(props as any)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
