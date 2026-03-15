import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-display font-semibold border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

    const variantStyles = {
      primary:
        'bg-ink dark:bg-paper text-paper dark:text-ink border-ink dark:border-paper shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE] hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg dark:hover:shadow-[6px_6px_0_0_#FEFEFE] active:translate-x-1 active:translate-y-1 active:shadow-none',
      secondary:
        'bg-paper dark:bg-ink text-ink dark:text-paper border-ink dark:border-paper hover:bg-ink-50 dark:hover:bg-ink-900',
      outline:
        'bg-transparent text-ink dark:text-paper border-ink dark:border-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink',
      ghost:
        'bg-transparent text-ink dark:text-paper border-transparent hover:border-ink-200 dark:hover:border-ink-700 hover:bg-ink-50 dark:hover:bg-ink-900',
      accent:
        'bg-accent text-paper border-accent shadow-brutal-accent hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#E63939] active:translate-x-1 active:translate-y-1 active:shadow-none',
      danger:
        'bg-error text-paper border-error hover:bg-error/90',
    };

    const sizeStyles = {
      small: 'h-9 px-4 text-sm',
      medium: 'h-11 px-6 text-base',
      large: 'h-14 px-8 text-lg',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && iconPosition === 'left' && !loading && icon}
        {children}
        {icon && iconPosition === 'right' && !loading && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';
