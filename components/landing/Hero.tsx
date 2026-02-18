
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Zap, ArrowRight, Play } from 'lucide-react';

export const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                {/* Cyber grid */}
                <div className="absolute inset-0 bg-grid-cyber opacity-20" />
                {/* Radial gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.08)_0%,_transparent_70%)]" />
                {/* Floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[200px]" />

                {/* Animated scan line */}
                <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
                >
                    <Zap size={14} className="text-cyan-400" />
                    <span className="text-xs font-mono text-cyan-400 tracking-wider">AI-POWERED ENDPOINT DETECTION & RESPONSE</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold tracking-tight leading-[0.95] mb-8"
                >
                    <span className="text-white">DETECT.</span>
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">ANALYZE.</span>
                    <br />
                    <span className="text-white">RESPOND.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-lg md:text-xl text-gray-400 font-syne max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Sentinel Cloud EDR uses advanced AI to detect, analyze, and neutralize threats
                    in real-time — protecting your endpoints at machine speed before attackers can act.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-syne font-medium text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <Shield size={20} />
                        Launch Dashboard
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-gray-300 font-syne text-lg hover:border-white/40 hover:text-white transition-all duration-300">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                            <Play size={14} fill="currentColor" />
                        </div>
                        Watch Demo
                    </button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mt-16 flex items-center justify-center gap-8 text-xs text-gray-500 font-mono"
                >
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        SOC 2 COMPLIANT
                    </span>
                    <span className="h-4 w-px bg-white/10" />
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        ISO 27001
                    </span>
                    <span className="h-4 w-px bg-white/10" />
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        MITRE ATT&CK
                    </span>
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
};
