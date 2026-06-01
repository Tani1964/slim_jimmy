import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { spawnEmojiBurst } from './EmojiSurprises';

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

const gradientStyle = {
  background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #60A5FA 100%)',
  boxShadow: '0 8px 32px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
  border: '1px solid rgba(255,255,255,0.2)',
  backdropFilter: 'blur(12px)',
};

const variantStyles = {
  primary:   'relative overflow-hidden text-white disabled:opacity-50',
  secondary: 'relative overflow-hidden text-white disabled:opacity-50',
  tertiary:  'relative overflow-hidden text-white disabled:opacity-50',
  outline:   'relative overflow-hidden border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-400 disabled:text-gray-400',
  ghost:     'relative overflow-hidden text-blue-600 hover:bg-blue-50 disabled:text-gray-400',
};

const sizeStyles = {
  xs: 'px-3 py-1.5 text-xs font-medium rounded-md',
  sm: 'px-4 py-2 text-sm font-medium rounded-lg',
  md: 'px-6 py-3 text-base font-semibold rounded-lg',
  lg: 'px-8 py-4 text-lg font-semibold rounded-xl',
  xl: 'px-10 py-5 text-xl font-bold rounded-full',
};

const gradientVariants = new Set(['primary', 'secondary', 'tertiary']);

/* ── helpers ── */
const spawnRipple = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.4;
  const dot = document.createElement('span');
  dot.style.cssText = `position:absolute;border-radius:50%;pointer-events:none;width:${size}px;height:${size}px;top:${e.clientY - rect.top - size / 2}px;left:${e.clientX - rect.left - size / 2}px;background:rgba(255,255,255,0.38);transform:scale(0);`;
  el.appendChild(dot);
  gsap.to(dot, { scale: 1, opacity: 0, duration: 0.55, ease: 'power2.out', onComplete: () => dot.remove() });
};

const onMagMove = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  gsap.to(e.currentTarget, {
    x: (e.clientX - r.left - r.width  / 2) * 0.22,
    y: (e.clientY - r.top  - r.height / 2) * 0.22,
    duration: 0.3, ease: 'power2.out',
  });
};
const onMagLeave = (e: React.MouseEvent<HTMLElement>) => {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' });
};

/* ── component ── */
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
      onClick,
      ...props
    },
    ref
  ) => {
    const isGradient = gradientVariants.has(variant);

    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

    const computedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
      fullWidth ? 'w-full' : ''
    } ${className}`;

    const content = (
      <>
        {isGradient && (
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
        )}
        <span className="relative z-10 inline-flex items-center">
          {icon && iconPosition === 'left' && (
            <span className="mr-2 flex items-center justify-center">{icon}</span>
          )}
          {isLoading ? <span className="animate-spin">⏳</span> : children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2 flex items-center justify-center">{icon}</span>
          )}
        </span>
      </>
    );

    const magneticProps = isGradient && !disabled && !isLoading
      ? { onMouseMove: onMagMove, onMouseLeave: onMagLeave }
      : {};

    if (as === 'a') {
      const { href, target, rel, ...restProps } = props as any;
      return (
        <motion.a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={computedClassName}
          style={isGradient ? gradientStyle : undefined}
          href={href}
          target={target}
          rel={rel}
          whileTap={!disabled && !isLoading ? { scale: 0.96 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            spawnRipple(e as React.MouseEvent<HTMLElement>);
            spawnEmojiBurst(e.clientX, e.clientY);
            (onClick as any)?.(e);
          }}
          {...magneticProps}
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
        style={isGradient ? gradientStyle : undefined}
        disabled={disabled || isLoading}
        whileTap={!disabled && !isLoading ? { scale: 0.96 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (!disabled && !isLoading) {
            spawnRipple(e as React.MouseEvent<HTMLElement>);
            spawnEmojiBurst(e.clientX, e.clientY);
          }
          onClick?.(e as React.MouseEvent<HTMLButtonElement>);
        }}
        {...magneticProps}
        {...(props as any)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
