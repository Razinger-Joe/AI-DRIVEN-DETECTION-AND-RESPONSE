
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';

export const CTA: React.FC = () => {
    return (
        <section className="relative py-32 px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl"
            >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                <div className="absolute inset-0 border border-white/10 rounded-3xl" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-cyber opacity-10" />

                {/* Floating orb */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

                {/* Content */}
                <div className="relative z-10 px-8 md:px-16 py-16 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 mb-8">
                        <Shield size={28} className="text-cyan-400" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-6 leading-tight">
                        Secure Your Infrastructure
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Today</span>
                    </h2>

                    <p className="text-gray-400 font-syne text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Deploy Sentinel Cloud EDR in minutes. No complex setup, no agents to manage.
                        Start protecting your endpoints with AI-powered precision.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/signup"
                            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-syne font-medium text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            Get Started Free
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/login"
                            className="px-8 py-4 rounded-full border border-white/20 text-gray-300 font-syne text-lg hover:border-white/40 hover:text-white transition-all duration-300"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
