import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'small' | 'medium';
  dot?: boolean;
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'medium',
      dot = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center gap-1.5 font-mono uppercase tracking-wider transition-colors';

    const variantStyles = {
      default:
        'bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 border border-ink-200 dark:border-ink-700',
      primary:
        'bg-ink dark:bg-paper text-paper dark:text-ink border border-ink dark:border-paper',
      accent:
        'bg-accent/10 text-accent border border-accent',
      success:
        'bg-success/10 text-success border border-success',
      warning:
        'bg-warning/10 text-warning border border-warning',
      error:
        'bg-error/10 text-error border border-error',
      info:
        'bg-info/10 text-info border border-info',
      outline:
        'bg-transparent text-ink dark:text-paper border border-ink dark:border-paper',
    };

    const sizeStyles = {
      small: 'h-5 px-2 text-[10px]',
      medium: 'h-6 px-3 text-xs',
    };

    const dotColors = {
      default: 'bg-ink-500',
      primary: 'bg-ink dark:bg-paper',
      accent: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
      info: 'bg-info',
      outline: 'bg-ink dark:bg-paper',
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])}
          ></span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
