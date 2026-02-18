
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, redirect to dashboard
        window.location.href = '/dashboard';
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-grid-cyber opacity-10" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                {/* Card */}
                <div className="glass-card rounded-3xl border border-white/10 p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/30">
                                <Activity className="text-cyan-400" size={24} />
                            </div>
                        </div>

                        <h1 className="text-2xl font-orbitron font-bold text-white text-center mb-2">Welcome Back</h1>
                        <p className="text-sm text-gray-400 font-syne text-center mb-8">Sign in to your Sentinel SOC Console</p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="analyst@sentinel.io"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-syne"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-syne"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/20" />
                                    <span className="text-gray-400 font-syne">Remember me</span>
                                </label>
                                <a href="#" className="text-cyan-400 hover:text-cyan-300 font-syne transition-colors">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-syne font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 active:scale-[0.98]"
                            >
                                Sign In
                                <ArrowRight size={16} />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-4">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-xs text-gray-500 font-mono">OR</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Sign up link */}
                        <p className="text-center text-sm text-gray-400 font-syne">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
