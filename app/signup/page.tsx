
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Mail, Lock, User, ArrowRight, Eye, EyeOff, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = '/dashboard';
    };

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden py-20">
            {/* Background */}
            <div className="absolute inset-0 bg-grid-cyber opacity-10" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                <div className="glass-card rounded-3xl border border-white/10 p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30">
                                <Activity className="text-purple-400" size={24} />
                            </div>
                        </div>

                        <h1 className="text-2xl font-orbitron font-bold text-white text-center mb-2">Create Account</h1>
                        <p className="text-sm text-gray-400 font-syne text-center mb-8">Join the Sentinel SOC platform</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => updateField('name', e.target.value)}
                                        placeholder="Commander Analyst"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all font-syne"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="signup-email" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        id="signup-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateField('email', e.target.value)}
                                        placeholder="you@organization.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all font-syne"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="organization" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                    Organization
                                </label>
                                <div className="relative">
                                    <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        id="organization"
                                        type="text"
                                        value={formData.organization}
                                        onChange={(e) => updateField('organization', e.target.value)}
                                        placeholder="Acme Security Corp"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all font-syne"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="signup-password" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        id="signup-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => updateField('password', e.target.value)}
                                        placeholder="Min 8 characters"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all font-syne"
                                        required
                                        minLength={8}
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

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 text-white font-syne font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 active:scale-[0.98] mt-6"
                            >
                                Create Account
                                <ArrowRight size={16} />
                            </button>
                        </form>

                        <div className="my-6 flex items-center gap-4">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-xs text-gray-500 font-mono">OR</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <p className="text-center text-sm text-gray-400 font-syne">
                            Already have an account?{' '}
                            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
