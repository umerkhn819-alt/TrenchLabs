import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 font-sans font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary:
                    'rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-accent hover:brightness-110',
                secondary:
                    'rounded-xl border border-border bg-card/80 text-foreground hover:bg-muted hover:border-accent-secondary/40 hover:shadow-md',
                ghost: 'rounded-xl text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            },
            size: {
                default: 'h-12 px-5 text-sm',
                sm: 'h-10 rounded-lg px-4 text-sm',
                lg: 'h-14 rounded-xl px-8 text-base'
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default'
        }
    }
);

export type ButtonProps = VariantProps<typeof buttonVariants> &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
        className?: string;
    };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, type = 'button', ...props }, ref) => {
        return <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
    }
);
Button.displayName = 'Button';

export type ButtonLinkProps = VariantProps<typeof buttonVariants> &
    Omit<React.ComponentProps<typeof Link>, 'className'> & { className?: string };

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
    return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
