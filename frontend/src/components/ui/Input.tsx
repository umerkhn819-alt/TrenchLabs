import * as React from 'react';
import { cn } from '../../lib/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', label, error, id, ...props }, ref) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    return (
        <div className="flex flex-col gap-2">
            {label ? (
                <label htmlFor={inputId} className="font-sans text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                </label>
            ) : null}
            <input
                ref={ref}
                id={inputId}
                type={type}
                className={cn(
                    'h-12 w-full rounded-xl border border-border bg-card px-4 font-sans text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/55 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    error && 'border-red-500 focus-visible:ring-red-500',
                    className
                )}
                {...props}
            />
            {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
    );
});
Input.displayName = 'Input';
