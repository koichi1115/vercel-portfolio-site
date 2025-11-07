import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'raised' | 'elevated';
  clickable?: boolean;
  padding?: 'compact' | 'default' | 'comfortable';
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      elevation = 'flat',
      clickable = false,
      padding = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'rounded-lg border border-neutral-40 dark:border-neutral-700 bg-neutral-0 dark:bg-dark-neutral-800 transition-all duration-150';

    const elevationStyles = {
      flat: '',
      raised: 'shadow-sm hover:shadow-md',
      elevated: 'shadow-md hover:shadow-lg',
    };

    const paddingStyles = {
      compact: 'p-3',
      default: 'p-4',
      comfortable: 'p-6',
    };

    const clickableStyles = clickable
      ? 'cursor-pointer hover:border-neutral-50 dark:hover:border-neutral-600 active:scale-[0.99]'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          elevationStyles[elevation],
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
        className={cn('flex flex-col gap-1 mb-4', className)}
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
          'text-xl font-semibold text-neutral-900 dark:text-neutral-0',
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
        className={cn('text-sm text-neutral-300 dark:text-neutral-100', className)}
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
        className={cn('text-base text-neutral-700 dark:text-neutral-100', className)}
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
          'flex items-center gap-2 mt-4 pt-4 border-t border-neutral-30 dark:border-neutral-700',
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
