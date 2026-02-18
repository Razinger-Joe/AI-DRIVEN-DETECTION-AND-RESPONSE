
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
    end: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, suffix = '', prefix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * end;
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, end]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
        </span>
    );
};

const stats = [
    { value: 99.7, suffix: '%', label: 'Detection Rate', color: '#00e5ff', decimals: 1 },
    { value: 2, prefix: '<', suffix: 's', label: 'Avg Response Time', color: '#22d3a5', decimals: 0 },
    { value: 10, suffix: 'M+', label: 'Events Analyzed Daily', color: '#a78bfa', decimals: 0 },
    { value: 842, suffix: '', label: 'Endpoints Protected', color: '#ff3b5c', decimals: 0 },
];

export const Stats: React.FC = () => {
    return (
        <section id="stats" className="relative py-32 px-6">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent" />

            <div className="max-w-7xl mx-auto relative">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="text-center group"
                        >
                            <div className="mb-4">
                                <p
                                    className="text-5xl md:text-6xl font-orbitron font-bold transition-all duration-300"
                                    style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}40` }}
                                >
                                    <AnimatedCounter
                                        end={stat.value}
                                        suffix={stat.suffix}
                                        prefix={stat.prefix}
                                        decimals={stat.decimals}
                                    />
                                </p>
                            </div>
                            <p className="text-sm text-gray-400 font-syne tracking-wide uppercase">{stat.label}</p>
                            {/* Underline */}
                            <div
                                className="mt-4 mx-auto h-px w-12 opacity-30 group-hover:w-20 transition-all duration-500"
                                style={{ backgroundColor: stat.color }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
