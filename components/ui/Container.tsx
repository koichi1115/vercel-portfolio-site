import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'fluid' | 'fixed';
  padding?: boolean;
  children?: ReactNode;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { variant = 'fixed', padding = true, className, children, ...props },
    ref
  ) => {
    const baseStyles = 'w-full mx-auto';

    const variantStyles = {
      fluid: '',
      fixed: 'max-w-7xl',
    };

    const paddingStyles = padding ? 'px-4 sm:px-6 lg:px-8' : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
