import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'brutal' | 'outlined' | 'ghost';
  clickable?: boolean;
  padding?: 'compact' | 'default' | 'comfortable';
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      clickable = false,
      padding = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'transition-all duration-300';

    const variantStyles = {
      default:
        'bg-paper dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700',
      brutal:
        'bg-paper dark:bg-ink-900 border-2 border-ink dark:border-paper shadow-brutal dark:shadow-[4px_4px_0_0_#FEFEFE]',
      outlined:
        'bg-transparent border-2 border-ink dark:border-paper',
      ghost:
        'bg-ink-50 dark:bg-ink-900 border-0',
    };

    const paddingStyles = {
      compact: 'p-4',
      default: 'p-6',
      comfortable: 'p-8',
    };

    const clickableStyles = clickable
      ? 'cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg dark:hover:shadow-[6px_6px_0_0_#FEFEFE] active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-sm dark:active:shadow-[2px_2px_0_0_#FEFEFE]'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          clickableStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-2 mb-6', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'font-display text-xl font-bold tracking-tight text-ink dark:text-paper',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardSubtitleProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export const CardSubtitle = forwardRef<HTMLParagraphElement, CardSubtitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-ink-500 dark:text-ink-400', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardSubtitle.displayName = 'CardSubtitle';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-base text-ink-600 dark:text-ink-300', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 mt-6 pt-6 border-t-2 border-ink-200 dark:border-ink-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
