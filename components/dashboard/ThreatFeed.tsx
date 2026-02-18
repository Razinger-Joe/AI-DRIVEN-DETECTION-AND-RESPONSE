
"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonBadge } from '@/components/ui/NeonBadge';
import { PulseDot } from '@/components/ui/PulseDot';
import { Threat } from '@/lib/mock/threats';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export const ThreatFeed: React.FC = () => {
    const { setSelectedThreatId, selectedThreatId } = useAppStore();
    const { data: threats, isLoading, isError } = useQuery<Threat[]>({
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
            <GlassCard className="h-full flex flex-col p-4 items-center justify-center min-h-[300px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" role="status" />
                <p className="text-xs text-muted-foreground mt-2 font-mono">ESTABLISHING UPLINK...</p>
            </GlassCard>
        );
    }

    if (isError) {
        return (
            <GlassCard className="h-full flex flex-col p-6 items-center justify-center min-h-[300px]" role="alert">
                <p className="text-sm text-red-400 font-mono mb-2">⚠ CONNECTION LOST</p>
                <p className="text-xs text-muted-foreground font-mono">Failed to establish threat feed uplink</p>
            </GlassCard>
        );
    }

    return (
        <GlassCard className="h-full flex flex-col p-0 overflow-hidden min-h-[300px]">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                    <h3 className="font-orbitron font-bold tracking-wider text-sm">LIVE THREAT FEED</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono" aria-live="polite">
                        {threats?.length ?? 0} ACTIVE
                    </span>
                    <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
                    <span className="text-xs text-green-400 font-mono">LIVE</span>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm" role="grid" aria-label="Detected Threats">
                    <thead className="bg-white/[0.03] text-xs uppercase text-muted-foreground font-syne sticky top-0 backdrop-blur-md z-10">
                        <tr>
                            <th scope="col" className="p-3 pl-4">Status</th>
                            <th scope="col" className="p-3">Threat Type</th>
                            <th scope="col" className="p-3">Host</th>
                            <th scope="col" className="p-3">Severity</th>
                            <th scope="col" className="p-3">Confidence</th>
                            <th scope="col" className="p-3 text-right pr-4">Detected</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence>
                            {threats?.map((threat: Threat, idx: number) => (
                                <motion.tr
                                    key={threat.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                                    onClick={() => setSelectedThreatId(threat.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setSelectedThreatId(threat.id);
                                        }
                                    }}
                                    tabIndex={0}
                                    role="row"
                                    aria-selected={selectedThreatId === threat.id}
                                    className={cn(
                                        "group transition-colors cursor-pointer border-l-2 border-transparent",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400/50",
                                        "hover:bg-white/[0.03]",
                                        selectedThreatId === threat.id ? "bg-white/[0.05] border-cyan-400" : ""
                                    )}
                                >
                                    <td className="p-3 pl-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            {threat.status === 'active' && <PulseDot color="#ff3b5c" />}
                                            {threat.status === 'investigating' && <PulseDot color="#a78bfa" />}
                                            {threat.status === 'contained' && <span className="h-2 w-2 rounded-full bg-yellow-500" />}
                                            {threat.status === 'resolved' && <span className="h-2 w-2 rounded-full bg-green-500" />}
                                            <span className="capitalize text-xs text-muted-foreground">{threat.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 font-medium text-white group-hover:text-cyan-400 transition-colors">
                                        {threat.type}
                                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{threat.ioc}</div>
                                    </td>
                                    <td className="p-3 text-muted-foreground font-mono text-xs">{threat.host}</td>
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
                                            <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden" aria-hidden="true">
                                                <div
                                                    className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                                                    style={{ width: `${threat.confidence}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono tabular-nums">{threat.confidence}%</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right pr-4 text-xs font-mono text-muted-foreground tabular-nums">
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
