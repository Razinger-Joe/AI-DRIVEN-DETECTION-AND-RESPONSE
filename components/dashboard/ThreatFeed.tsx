
"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonBadge } from '@/components/ui/NeonBadge';
import { PulseDot } from '@/components/ui/PulseDot';

import { Threat } from '@/lib/mock/threats';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils'; // Assuming cn exists or I'll implement it

export const ThreatFeed: React.FC = () => {
    const { setSelectedThreatId, selectedThreatId } = useAppStore();
    const { data: threats, isLoading } = useQuery<Threat[]>({
        queryKey: ['threats'],
        queryFn: async () => {
            const res = await fetch('/api/threats');
            if (!res.ok) throw new Error('Failed to fetch threats');
            return res.json();
        },
        refetchInterval: 3000,
    });

    if (isLoading) {
        return (
            <GlassCard className="h-full flex flex-col p-4 items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
                <p className="text-xs text-muted-foreground mt-2 font-mono">ESTABLISHING UPLINK...</p>
            </GlassCard>
        )
    }

    return (
        <GlassCard className="h-full flex flex-col p-0 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <h3 className="font-orbitron font-bold tracking-wider text-sm">LIVE THREAT FEED</h3>
                </div>
                <div className="text-xs text-muted-foreground font-mono">LIVE CONNECTED</div>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.03] text-xs uppercase text-muted-foreground font-syne sticky top-0 backdrop-blur-md z-10">
                        <tr>
                            <th className="p-3 pl-4">Status</th>
                            <th className="p-3">Threat Type</th>
                            <th className="p-3">Host</th>
                            <th className="p-3">Severity</th>
                            <th className="p-3">Confidence</th>
                            <th className="p-3 text-right pr-4">Detected</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence>
                            {threats?.map((threat, idx) => (
                                <motion.tr
                                    key={threat.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => setSelectedThreatId(threat.id)}
                                    className={cn(
                                        "group hover:bg-white/[0.03] transition-colors cursor-pointer border-l-2 border-transparent",
                                        selectedThreatId === threat.id ? "bg-white/[0.05] border-cyan-400" : ""
                                    )}
                                >
                                    <td className="p-3 pl-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            {threat.status === 'active' && <PulseDot color="#ff3b5c" />}
                                            {threat.status === 'investigating' && <PulseDot color="#a78bfa" />}
                                            <span className="capitalize text-xs text-muted-foreground">{threat.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 font-medium text-white group-hover:text-cyan-400 transition-colors">
                                        {threat.type}
                                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{threat.ioc}</div>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{threat.host}</td>
                                    <td className="p-3">
                                        <NeonBadge
                                            label={threat.severity.toUpperCase()}
                                            color={
                                                threat.severity === 'critical' ? '#ff3b5c' :
                                                    threat.severity === 'high' ? '#ff8c00' :
                                                        threat.severity === 'medium' ? '#f5c518' : '#00e5ff'
                                            }
                                        />
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-cyan-400 rounded-full"
                                                    style={{ width: `${threat.confidence}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono">{threat.confidence}%</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right pr-4 text-xs font-mono text-muted-foreground">
                                        {new Date(threat.detectedAt).toLocaleTimeString()}
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </GlassCard>
    );
};
