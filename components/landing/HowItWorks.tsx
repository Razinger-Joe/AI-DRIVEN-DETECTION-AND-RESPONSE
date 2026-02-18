
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, Brain, ShieldCheck, ArrowRight } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: ScanSearch,
        title: 'DETECT',
        description: 'Continuous behavioral monitoring across every endpoint. Our sensors analyze process trees, network flows, and file system changes in real-time.',
        color: '#ff3b5c',
        gradient: 'from-red-500/20 to-red-500/0',
    },
    {
        number: '02',
        icon: Brain,
        title: 'ANALYZE',
        description: 'AI models correlate events, map attack chains, and classify threats using the MITRE ATT&CK framework — eliminating noise and surfacing real threats.',
        color: '#a78bfa',
        gradient: 'from-purple-500/20 to-purple-500/0',
    },
    {
        number: '03',
        icon: ShieldCheck,
        title: 'RESPOND',
        description: 'Automated playbooks isolate compromised hosts, terminate malicious processes, and update firewall rules — all within milliseconds of detection.',
        color: '#22d3a5',
        gradient: 'from-green-500/20 to-green-500/0',
    },
];

export const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="relative py-32 px-6">
            {/* Background accent */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(167,139,250,0.05)_0%,_transparent_50%)]" />

            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-block text-xs font-mono text-purple-400 tracking-[0.3em] uppercase mb-4"
                    >
                        HOW IT WORKS
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-orbitron font-bold text-white"
                    >
                        Three Steps to{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Total Protection
                        </span>
                    </motion.h2>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-24 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-red-500/30 via-purple-500/30 to-green-500/30" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="relative text-center group"
                        >
                            {/* Step Number Circle */}
                            <div className="relative inline-flex items-center justify-center mx-auto mb-8">
                                <div
                                    className="h-20 w-20 rounded-full flex items-center justify-center border-2 bg-black/60 backdrop-blur-sm transition-all duration-500 group-hover:scale-110"
                                    style={{ borderColor: `${step.color}50` }}
                                >
                                    <step.icon size={32} style={{ color: step.color }} />
                                </div>
                                {/* Glow behind */}
                                <div
                                    className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity"
                                    style={{ backgroundColor: step.color }}
                                />
                                {/* Number badge */}
                                <span
                                    className="absolute -top-2 -right-2 text-xs font-orbitron font-bold px-2 py-1 rounded-full border"
                                    style={{ color: step.color, borderColor: `${step.color}40`, backgroundColor: `${step.color}15` }}
                                >
                                    {step.number}
                                </span>
                            </div>

                            {/* Arrow connector (between steps on mobile) */}
                            {idx < steps.length - 1 && (
                                <div className="md:hidden flex justify-center my-4">
                                    <ArrowRight size={20} className="text-white/20 rotate-90" />
                                </div>
                            )}

                            {/* Content */}
                            <h3 className="text-xl font-orbitron font-bold text-white mb-4 tracking-wider">{step.title}</h3>
                            <p className="text-sm text-gray-400 font-syne leading-relaxed max-w-xs mx-auto">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
