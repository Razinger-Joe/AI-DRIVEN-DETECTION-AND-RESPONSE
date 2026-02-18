
"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export const Header: React.FC = () => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="h-20 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-40">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                        type="text"
                        placeholder="Search threats, IPs, hashes, or endpoints..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors font-syne"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right hidden md:block">
                    <p className="font-orbitron text-xl font-bold text-white tracking-widest">
                        {time ? time.toLocaleTimeString([], { hour12: false }) : "00:00:00"}
                    </p>
                    <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
                        {time ? time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : "LOADING..."}
                    </p>
                </div>

                <div className="h-8 w-px bg-white/10 mx-2" />

                <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                    <Bell size={20} className="text-white" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <div className="flex items-center gap-3 pl-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-[1px]">
                        <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                            <User size={20} className="text-white" />
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-sm font-medium text-white font-syne">Analyst Cmdr</p>
                        <p className="text-[10px] text-muted-foreground font-mono">SOC_TIER_3</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
