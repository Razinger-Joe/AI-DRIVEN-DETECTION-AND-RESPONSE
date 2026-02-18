
import React from 'react';

type Variant = 'severity' | 'status' | 'module';

interface NeonBadgeProps {
    label: string;
    color: string;
    variant?: Variant;
    className?: string;
}

export const NeonBadge: React.FC<NeonBadgeProps> = ({ label, color, variant = 'severity', className = '' }) => {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${className}`}
            style={{
                borderColor: `${color}40`,
                backgroundColor: `${color}10`,
                color: color,
                boxShadow: `0 0 8px -2px ${color}60`
            }}
        >
            {label}
        </span>
    );
};
