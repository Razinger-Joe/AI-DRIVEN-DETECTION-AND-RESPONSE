
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Search,
    ShieldAlert,
    Database,
    Settings,
    Activity,
    Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Investigation', href: '/dashboard/investigate', icon: Search },
    { label: 'Endpoints', href: '/dashboard/endpoints', icon: Monitor },
    { label: 'Response', href: '/dashboard/response', icon: ShieldAlert },
    { label: 'Threat Intel', href: '/dashboard/intel', icon: Database },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
    const pathname = usePathname();

    return (
        <aside
            className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-screen fixed left-0 top-0 z-50"
            role="navigation"
            aria-label="Main Navigation"
        >
            {/* Brand */}
            <div className="p-6 flex items-center gap-3 border-b border-white/10">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20">
                    <Activity className="text-cyan-400" size={20} />
                    <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full" />
                </div>
                <div>
                    <h1 className="font-orbitron font-bold text-lg tracking-wider text-white">SENTINEL</h1>
                    <p className="text-[10px] text-cyan-400 font-mono tracking-widest">CLOUD EDR</p>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-1" aria-label="Primary Navigation">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                                isActive
                                    ? "bg-white/10 text-cyan-400"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_#00e5ff]" />
                            )}
                            <item.icon
                                size={18}
                                className={cn(
                                    "transition-colors flex-shrink-0",
                                    isActive ? "text-cyan-400" : "group-hover:text-white"
                                )}
                            />
                            <span className="font-syne text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* System Status Footer */}
            <div className="p-4 border-t border-white/10">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                        <span className="text-xs font-mono text-green-400" role="status">SYSTEM ONLINE</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-mono">
                        v2.4.0-build.892
                        <br />
                        LATENCY: 12ms
                    </p>
                </div>
            </div>
        </aside>
    );
};
