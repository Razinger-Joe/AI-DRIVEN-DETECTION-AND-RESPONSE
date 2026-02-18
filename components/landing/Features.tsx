
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    Brain,
    Network,
    Zap,
    Globe,
    Cloud,
} from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Real-Time Detection',
        description: 'Continuous monitoring of all endpoints with sub-second threat identification using behavioral analysis.',
        color: '#ff3b5c',
    },
    {
        icon: Brain,
        title: 'AI-Powered Analysis',
        description: 'Advanced machine learning models classify threats, predict attack vectors, and reduce false positives by 94%.',
        color: '#a78bfa',
    },
    {
        icon: Network,
        title: 'Attack Visualization',
        description: 'Interactive attack graphs map threat progression in real-time, revealing lateral movement and kill chains.',
        color: '#00e5ff',
    },
    {
        icon: Zap,
        title: 'Automated Response',
        description: 'Execute containment playbooks in milliseconds — isolate hosts, kill processes, and block IOCs automatically.',
        color: '#f5c518',
    },
    {
        icon: Globe,
        title: 'Threat Intelligence',
        description: 'Integrated IOC feeds from 50+ sources with automatic correlation against your environment.',
        color: '#22d3a5',
    },
    {
        icon: Cloud,
        title: 'Cloud-Native Scale',
        description: 'Built for modern hybrid infrastructure — protect cloud workloads, containers, and on-prem endpoints from one console.',
        color: '#3b82f6',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Features: React.FC = () => {
    return (
        <section id="features" className="relative py-32 px-6">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-block text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4"
                >
                    CAPABILITIES
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6"
                >
                    Everything You Need to{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Defend
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-gray-400 font-syne text-lg max-w-2xl mx-auto"
                >
                    Six pillars of protection that work together to create an impenetrable defense layer around your infrastructure.
                </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {features.map((feature) => (
                    <motion.div
                        key={feature.title}
                        variants={cardVariants}
                        className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden"
                    >
                        {/* Glow on hover */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `radial-gradient(circle at 50% 0%, ${feature.color}10 0%, transparent 70%)`,
                            }}
                        />

                        {/* Icon */}
                        <div
                            className="relative inline-flex items-center justify-center h-12 w-12 rounded-xl mb-6 border transition-colors duration-300"
                            style={{
                                backgroundColor: `${feature.color}10`,
                                borderColor: `${feature.color}30`,
                            }}
                        >
                            <feature.icon size={22} style={{ color: feature.color }} />
                        </div>

                        {/* Content */}
                        <h3 className="relative text-lg font-orbitron font-bold text-white mb-3 tracking-wide">
                            {feature.title}
                        </h3>
                        <p className="relative text-sm text-gray-400 font-syne leading-relaxed">
                            {feature.description}
                        </p>

                        {/* Bottom accent line */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: `linear-gradient(to right, transparent, ${feature.color}60, transparent)` }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
