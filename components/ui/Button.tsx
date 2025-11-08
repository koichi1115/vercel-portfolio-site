import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'subtle' | 'link' | 'danger';
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
      'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

    const variantStyles = {
      primary:
        'bg-primary-500 text-neutral-0 hover:bg-primary-600 active:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-300',
      secondary:
        'bg-neutral-40 text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-0 dark:hover:bg-neutral-600',
      subtle:
        'bg-transparent text-neutral-700 hover:bg-neutral-20 active:bg-neutral-30 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-700',
      link: 'bg-transparent text-primary-500 hover:text-primary-600 hover:underline active:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200',
      danger:
        'bg-error-400 text-neutral-0 hover:bg-error-500 active:bg-error-500 dark:bg-error-400 dark:hover:bg-error-500',
    };

    const sizeStyles = {
      small: 'h-8 px-3 text-sm',
      medium: 'h-10 px-4 text-base',
      large: 'h-12 px-5 text-lg',
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
