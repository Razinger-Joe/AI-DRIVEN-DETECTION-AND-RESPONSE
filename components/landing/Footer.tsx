
import React from 'react';
import Link from 'next/link';
import { Activity, Github, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
    Product: [
        { label: 'Features', href: '#features' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Pricing', href: '#' },
        { label: 'Changelog', href: '#' },
    ],
    Resources: [
        { label: 'Documentation', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Status', href: '#' },
    ],
    Company: [
        { label: 'About', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Partners', href: '#' },
    ],
    Legal: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Compliance', href: '#' },
    ],
};

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20">
                                <Activity className="text-cyan-400" size={18} />
                            </div>
                            <span className="font-orbitron font-bold text-white tracking-wider">SENTINEL</span>
                        </div>
                        <p className="text-sm text-gray-500 font-syne leading-relaxed mb-6">
                            AI-powered endpoint detection and response for modern infrastructure.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                                <Github size={16} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                                <Twitter size={16} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-xs font-orbitron text-white tracking-wider uppercase mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-500 hover:text-gray-300 font-syne transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-600 font-mono">
                        © {new Date().getFullYear()} Sentinel Cloud EDR. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-600 font-mono">
                        Built with AI-First Security Architecture
                    </p>
                </div>
            </div>
        </footer>
    );
};
