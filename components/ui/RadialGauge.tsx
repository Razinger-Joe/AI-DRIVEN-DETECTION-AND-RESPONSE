
import React from 'react';

interface RadialGaugeProps {
    value: number;
    max?: number;
    label: string;
    color?: string;
    size?: number;
}

export const RadialGauge: React.FC<RadialGaugeProps> = ({
    value,
    max = 100,
    label,
    color = "#00e5ff",
    size = 120
}) => {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max(value / max, 0), 1);
    const offset = circumference - percentage * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-white/10"
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold font-orbitron text-white">{value}</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50">{label}</span>
            </div>
        </div>
    );
};
