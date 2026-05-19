import * as React from 'react';
import { cn } from '../../lib/cn';

export type SectionLabelProps = {
    children: React.ReactNode;
    className?: string;
    pulse?: boolean;
};

export function SectionLabel({ children, className, pulse = false }: SectionLabelProps) {
    return (
        <div
            className={cn(
                'mb-4 inline-flex items-center gap-3 rounded-full border border-foreground/18 bg-foreground/[0.06] px-5 py-2',
                className
            )}
        >
            <span
                className={cn(
                    'h-2 w-2 shrink-0 rounded-full bg-foreground',
                    pulse && 'animate-pulse motion-reduce:animate-none'
                )}
                aria-hidden
            />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-foreground">{children}</span>
        </div>
    );
}
