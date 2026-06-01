import React, { HTMLAttributes } from 'react';
import { SPACING_PRESETS } from '../../constants';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl';
  padding?: boolean;
  className?: string;
}

const maxWidthStyles = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  '7xl': 'max-w-7xl',
};

export const Container: React.FC<ContainerProps> = ({
  maxWidth = '7xl',
  padding = true,
  className = '',
  children,
  ...props
}) => {
  const paddingClass = padding ? SPACING_PRESETS.container.padding : '';
  const computedClassName = `mx-auto ${maxWidthStyles[maxWidth]} ${paddingClass} ${className}`;

  return (
    <div className={computedClassName} {...props}>
      {children}
    </div>
  );
};
