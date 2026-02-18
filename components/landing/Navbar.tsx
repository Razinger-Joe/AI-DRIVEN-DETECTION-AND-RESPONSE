
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Stats', href: '#stats' },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
                    : "bg-transparent"
            )}
            role="navigation"
            aria-label="Main Navigation"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors">
                        <Activity className="text-cyan-400" size={22} />
                        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                        <span className="font-orbitron font-bold text-xl tracking-wider text-white">SENTINEL</span>
                        <span className="text-cyan-400 font-orbitron text-xl ml-1">EDR</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-syne text-gray-400 hover:text-white transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}

                    <div className="h-6 w-px bg-white/10 mx-2" />

                    <Link
                        href="/login"
                        className="text-sm font-syne text-gray-400 hover:text-white transition-colors"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/dashboard"
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-syne font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Launch Dashboard
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 p-6 space-y-4 animate-in slide-in-from-top-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="block text-sm font-syne text-gray-400 hover:text-white transition-colors py-2"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="pt-4 border-t border-white/10 space-y-3">
                        <Link href="/login" className="block text-sm font-syne text-gray-400 hover:text-white py-2">Log In</Link>
                        <Link
                            href="/dashboard"
                            className="block text-center px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-syne font-medium"
                        >
                            Launch Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
