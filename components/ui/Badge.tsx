import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
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
      'inline-flex items-center gap-1 font-medium rounded-md transition-colors';

    const variantStyles = {
      default:
        'bg-neutral-30 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100',
      primary:
        'bg-primary-50 text-primary-600 dark:bg-primary-700 dark:text-primary-100',
      success:
        'bg-success-50 text-success-500 dark:bg-success-500/20 dark:text-success-400',
      warning:
        'bg-warning-50 text-warning-500 dark:bg-warning-500/20 dark:text-warning-400',
      error:
        'bg-error-50 text-error-500 dark:bg-error-500/20 dark:text-error-400',
      info: 'bg-info-50 text-info-500 dark:bg-info-500/20 dark:text-info-400',
    };

    const sizeStyles = {
      small: 'h-5 px-2 text-xs',
      medium: 'h-6 px-2 text-sm',
    };

    const dotColors = {
      default: 'bg-neutral-500',
      primary: 'bg-primary-500',
      success: 'bg-success-400',
      warning: 'bg-warning-400',
      error: 'bg-error-400',
      info: 'bg-info-400',
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
