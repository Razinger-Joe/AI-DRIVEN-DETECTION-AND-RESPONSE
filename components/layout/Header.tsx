
"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Search, User, Command } from 'lucide-react';

export const Header: React.FC = () => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header
            className="h-20 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-40"
            role="banner"
        >
            {/* Search */}
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} aria-hidden="true" />
                    <label htmlFor="threat-search" className="sr-only">Search threats, IPs, hashes, or endpoints</label>
                    <input
                        id="threat-search"
                        type="search"
                        placeholder="Search threats, IPs, hashes, or endpoints..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-12 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-syne"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground border border-white/10 rounded bg-white/5">
                        <Command size={10} /> K
                    </kbd>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Live Clock */}
                <div className="text-right hidden md:block" aria-live="polite" aria-label="Current Time">
                    <p className="font-orbitron text-xl font-bold text-white tracking-widest tabular-nums">
                        {time ? time.toLocaleTimeString([], { hour12: false }) : "00:00:00"}
                    </p>
                    <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
                        {time ? time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : "LOADING..."}
                    </p>
                </div>

                <div className="h-8 w-px bg-white/10 mx-2" aria-hidden="true" />

                {/* Notifications */}
                <button
                    className="relative p-2 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                    aria-label="View notifications — 3 new alerts"
                    title="Notifications"
                >
                    <Bell size={20} className="text-white" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-ping" aria-hidden="true" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
                </button>

                {/* User Profile */}
                <button
                    className="flex items-center gap-3 pl-2 hover:bg-white/5 rounded-xl p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                    aria-label="User profile menu"
                    title="Account"
                >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-[1px]">
                        <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                            <User size={20} className="text-white" />
                        </div>
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="text-sm font-medium text-white font-syne">Analyst Cmdr</p>
                        <p className="text-[10px] text-muted-foreground font-mono">SOC_TIER_3</p>
                    </div>
                </button>
            </div>
        </header>
    );
};
