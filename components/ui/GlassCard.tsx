
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    glow?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", glow, ...props }) => {
    return (
        <div
            className={cn(
                "glass-card rounded-2xl border border-white/10 overflow-hidden relative",
                className
            )}
            style={glow ? { boxShadow: `0 8px 32px -4px ${glow}40` } : {}}
            {...props}
        >
            <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
