
"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { RadialGauge } from '@/components/ui/RadialGauge';
import { Sparkline } from '@/components/ui/Sparkline';
import { BrainCircuit } from 'lucide-react';

export const AIEnginePanel: React.FC = () => {
    const sparkData = Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }));

    return (
        <GlassCard className="p-6 h-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BrainCircuit className="text-cyan-400" size={20} />
                    <h3 className="font-orbitron font-bold text-sm tracking-wider">AI ENGINE STATUS</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    ONLINE
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <RadialGauge value={94} label="DETECTION" color="#ff3b5c" size={100} />
                <RadialGauge value={88} label="RESPONSE" color="#a78bfa" size={100} />
                <RadialGauge value={99} label="UPTIME" color="#22d3a5" size={100} />
            </div>

            <div className="mt-auto">
                <div className="flex justify-between text-xs text-muted-foreground mb-2 font-mono">
                    <span>BEHAVIORAL ANALYSIS LOAD</span>
                    <span>845 EPS</span>
                </div>
                <Sparkline data={sparkData} height={60} color="#00e5ff" />
            </div>
        </GlassCard>
    );
};
