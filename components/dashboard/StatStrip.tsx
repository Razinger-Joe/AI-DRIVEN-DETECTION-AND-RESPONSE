
"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, AlertTriangle, Monitor, Lock, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { StatSummary } from '@/lib/mock/threats';

export const StatStrip: React.FC = () => {
    const { data: stats, isLoading, isError } = useQuery<StatSummary>({
        queryKey: ['threat-summary'],
        queryFn: async () => {
            const res = await fetch('/api/threats/summary');
            if (!res.ok) throw new Error('Failed to fetch summary');
            return res.json();
        },
        refetchInterval: 5000,
    });

    const statItems = [
        { label: "Active Threats", value: stats?.activeThreats ?? 0, icon: <AlertTriangle className="text-red-500" />, color: "text-red-500" },
        { label: "Critical Alerts", value: stats?.criticalAlerts ?? 0, icon: <Shield className="text-orange-500" />, color: "text-orange-500" },
        { label: "Protected Endpoints", value: stats?.endpointsProtected ?? 0, icon: <Monitor className="text-blue-400" />, color: "text-blue-400" },
        { label: "Threats Contained", value: stats?.threatsContained ?? 0, icon: <Lock className="text-yellow-400" />, color: "text-yellow-400" },
        { label: "AI Confidence", value: `${stats?.avgConfidence ?? 0}%`, icon: <Activity className="text-purple-400" />, color: "text-purple-400" },
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6" role="status" aria-label="Loading statistics">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="animate-pulse h-24 bg-white/5 rounded-2xl border border-white/10" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center" role="alert">
                <p className="text-sm text-red-400 font-mono">⚠ TELEMETRY OFFLINE — Failed to retrieve threat summary</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6" role="region" aria-label="Threat Statistics Summary">
            {statItems.map((stat, idx) => (
                <GlassCard key={idx} className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-syne">{stat.label}</p>
                        <p className={`text-2xl font-bold font-orbitron ${stat.color} mt-1 text-shadow-glow tabular-nums`}>{stat.value}</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded-full border border-white/5" aria-hidden="true">
                        {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 18 })}
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};
