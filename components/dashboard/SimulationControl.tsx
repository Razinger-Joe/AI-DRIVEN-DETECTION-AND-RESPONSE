
"use client";

import React, { useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAppStore } from '@/lib/store';
import { Play, Pause, Zap } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query'; // Import queryClient hook

export const SimulationControl: React.FC = () => {
    const { simulationActive, toggleSimulation } = useAppStore();
    const queryClient = useQueryClient();

    const triggerThreat = async () => {
        try {
            await fetch('/api/simulation/trigger', { method: 'POST' });
            // Invalidate queries to refresh UI
            queryClient.invalidateQueries({ queryKey: ['threats'] });
            queryClient.invalidateQueries({ queryKey: ['threat-summary'] });
        } catch (error) {
            console.error("Simulation trigger failed", error);
        }
    };

    // Auto-simulation effect
    useEffect(() => {
        if (!simulationActive) return;

        const interval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every tick
                triggerThreat();
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [simulationActive]);

    return (
        <GlassCard className="p-4 flex items-center justify-between gap-4 border-t border-white/10 mt-auto">
            <div className="flex items-center gap-2">
                <Zap size={16} className={simulationActive ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} />
                <span className="text-xs font-orbitron tracking-widest text-muted-foreground">REALTIME SIMULATION</span>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={toggleSimulation}
                    className={`p-2 rounded-full transition-all ${simulationActive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}
                    title={simulationActive ? "Pause Simulation" : "Start Simulation"}
                >
                    {simulationActive ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                </button>

                <button
                    onClick={triggerThreat}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-md text-xs font-mono border border-white/10"
                >
                    + TRIGGER EVENT
                </button>
            </div>
        </GlassCard>
    );
};
