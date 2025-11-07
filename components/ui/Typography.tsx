import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Heading Component
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: ReactNode;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ size = 'h2', as, className, children, ...props }, ref) => {
    const Component = as || size;

    const sizeStyles = {
      h1: 'text-4xl font-bold leading-tight',
      h2: 'text-3xl font-semibold leading-tight',
      h3: 'text-2xl font-semibold leading-normal',
      h4: 'text-xl font-semibold leading-normal',
      h5: 'text-lg font-semibold leading-normal',
      h6: 'text-base font-semibold leading-normal',
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          'text-neutral-900 dark:text-neutral-0',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

// Text Component
export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'disabled' | 'success' | 'warning' | 'error';
  as?: 'p' | 'span' | 'div' | 'time';
  children?: ReactNode;
}

export const Text = forwardRef<
  HTMLElement,
  TextProps
>(
  (
    {
      size = 'base',
      weight = 'normal',
      color = 'primary',
      as = 'p',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as;

    const sizeStyles = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    const weightStyles = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const colorStyles = {
      primary: 'text-neutral-900 dark:text-neutral-0',
      secondary: 'text-neutral-300 dark:text-neutral-100',
      disabled: 'text-neutral-100 dark:text-neutral-400',
      success: 'text-success-500 dark:text-success-400',
      warning: 'text-warning-500 dark:text-warning-400',
      error: 'text-error-500 dark:text-error-400',
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          sizeStyles[size],
          weightStyles[weight],
          colorStyles[color],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
