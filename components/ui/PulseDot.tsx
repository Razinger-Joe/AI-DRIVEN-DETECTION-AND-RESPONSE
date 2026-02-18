
import React from 'react';

interface PulseDotProps {
    color?: string;
    size?: number;
    className?: string;
}

export const PulseDot: React.FC<PulseDotProps> = ({ color = "#22d3a5", size = 8, className = "" }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: color }}
            />
            <span
                className="relative inline-flex rounded-full h-full w-full"
                style={{ backgroundColor: color, width: size, height: size }}
            />
        </div>
    );
};
