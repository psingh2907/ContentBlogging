import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva('rounded-2xl border transition-all duration-300', {
  variants: {
    variant: {
      default:
        'bg-white border-gray-200 shadow-soft hover:shadow-medium dark:bg-gray-900 dark:border-gray-800',
      elevated:
        'bg-white border-gray-200 shadow-medium hover:shadow-large dark:bg-gray-900 dark:border-gray-800',
      outline:
        'bg-transparent border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500',
      ghost:
        'bg-gray-50 border-transparent hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700',
      gradient:
        'bg-gradient-to-br from-primary-50 to-purple-50 border-primary-200 hover:shadow-glow dark:from-primary-900/20 dark:to-purple-900/20 dark:border-primary-800',
    },
    size: {
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    },
    hover: {
      none: '',
      lift: 'hover:-translate-y-1',
      scale: 'hover:scale-[1.02]',
      glow: 'hover:shadow-glow-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    hover: 'lift',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, hover }), className)}
        {...props}
      />
    );
  },
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100',
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-gray-700 dark:text-gray-300', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
