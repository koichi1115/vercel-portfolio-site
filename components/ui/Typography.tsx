import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Heading Component
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  accent?: boolean;
  children?: ReactNode;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ size = 'h2', as, accent = false, className, children, ...props }, ref) => {
    const Component = as || size;

    const sizeStyles = {
      h1: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none',
      h2: 'text-4xl md:text-5xl font-bold tracking-tight leading-tight',
      h3: 'text-2xl md:text-3xl font-bold tracking-tight leading-snug',
      h4: 'text-xl md:text-2xl font-semibold tracking-tight leading-normal',
      h5: 'text-lg font-semibold leading-normal',
      h6: 'text-base font-semibold leading-normal',
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          'font-display text-ink dark:text-paper',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
        {accent && <span className="text-accent">.</span>}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

// Text Component
export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'success' | 'warning' | 'error';
  as?: 'p' | 'span' | 'div' | 'time';
  mono?: boolean;
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
      mono = false,
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
      primary: 'text-ink dark:text-paper',
      secondary: 'text-ink-600 dark:text-ink-300',
      tertiary: 'text-ink-500 dark:text-ink-400',
      accent: 'text-accent',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          mono ? 'font-mono' : 'font-sans',
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

// Label Component for forms
export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children?: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'font-mono text-xs uppercase tracking-widest text-ink-600 dark:text-ink-400',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';
