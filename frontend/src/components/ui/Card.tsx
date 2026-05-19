import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const cardVariants = cva('rounded-2xl border border-border bg-card text-foreground transition-shadow duration-300', {
    variants: {
        elevation: {
            default: 'shadow-md hover:shadow-xl',
            flat: 'shadow-sm hover:shadow-md',
            none: 'shadow-none'
        },
        padding: {
            default: 'p-6 md:p-8',
            sm: 'p-4 md:p-6',
            lg: 'p-8 md:p-10'
        }
    },
    defaultVariants: {
        elevation: 'default',
        padding: 'default'
    }
});

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof cardVariants> & {
        featured?: boolean;
    };

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, elevation, padding, featured, children, ...props }, ref) => {
        if (featured) {
            return (
                <div
                    ref={ref}
                    className={cn(
                        'rounded-2xl bg-gradient-to-br from-accent via-highlight-2 to-accent-secondary p-[2px] shadow-md',
                        className
                    )}
                    {...props}
                >
                    <div className={cn('h-full rounded-[calc(1rem-2px)] bg-card', cardVariants({ elevation: 'none', padding }))}>
                        {children}
                    </div>
                </div>
            );
        }
        return (
            <div ref={ref} className={cn(cardVariants({ elevation, padding }), className)} {...props}>
                {children}
            </div>
        );
    }
);
Card.displayName = 'Card';
