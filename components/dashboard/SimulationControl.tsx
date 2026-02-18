
"use client";

import React, { useEffect, useCallback } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAppStore } from '@/lib/store';
import { Play, Pause, Zap } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const SimulationControl: React.FC = () => {
    const { simulationActive, toggleSimulation } = useAppStore();
    const queryClient = useQueryClient();

    const triggerThreat = useCallback(async () => {
        try {
            await fetch('/api/simulation/trigger', { method: 'POST' });
            queryClient.invalidateQueries({ queryKey: ['threats'] });
            queryClient.invalidateQueries({ queryKey: ['threat-summary'] });
        } catch (error) {
            console.error("Simulation trigger failed", error);
        }
    }, [queryClient]);

    // Auto-simulation effect
    useEffect(() => {
        if (!simulationActive) return;

        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                triggerThreat();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [simulationActive, triggerThreat]);

    return (
        <GlassCard className="p-4 flex items-center justify-between gap-4" role="toolbar" aria-label="Simulation Controls">
            <div className="flex items-center gap-2">
                <Zap size={16} className={simulationActive ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} aria-hidden="true" />
                <span className="text-xs font-orbitron tracking-widest text-muted-foreground">REALTIME SIMULATION</span>
                {simulationActive && (
                    <span className="flex h-2 w-2 ml-1" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                )}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={toggleSimulation}
                    className={`p-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${simulationActive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}
                    aria-label={simulationActive ? "Pause real-time simulation" : "Start real-time simulation"}
                    aria-pressed={simulationActive}
                >
                    {simulationActive ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                </button>

                <button
                    onClick={triggerThreat}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-md text-xs font-mono border border-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 active:scale-95"
                    aria-label="Manually trigger a simulated threat event"
                >
                    + TRIGGER EVENT
                </button>
            </div>
        </GlassCard>
    );
};
