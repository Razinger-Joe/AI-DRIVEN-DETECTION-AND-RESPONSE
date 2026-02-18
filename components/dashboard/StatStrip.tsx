
import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, AlertTriangle, Monitor, Lock, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface StatSummary {
    activeThreats: number;
    criticalAlerts: number;
    highSeverity: number;
    avgConfidence: number;
    systemHealth: number;
    networkLoad: string;
    endpointsProtected: number; // Added to match UI
    threatsContained: number;   // Added to match UI
}

export const StatStrip: React.FC = () => {
    const { data: stats, isLoading } = useQuery<StatSummary>({
        queryKey: ['threat-summary'],
        queryFn: async () => {
            const res = await fetch('/api/threats/summary');
            if (!res.ok) throw new Error('Failed to fetch summary');
            return res.json();
        },
        refetchInterval: 5000,
    });

    // Default values if loading or error, aligned with initial mock structure
    const displayStats = stats || {
        activeThreats: 0,
        criticalAlerts: 0,
        endpointsProtected: 0,
        threatsContained: 0,
        avgConfidence: 0,
    };

    const statItems = [
        { label: "Active Threats", value: displayStats.activeThreats, icon: <AlertTriangle className="text-red-500" />, color: "text-red-500" },
        { label: "Critical Alerts", value: displayStats.criticalAlerts, icon: <Shield className="text-orange-500" />, color: "text-orange-500" },
        // Note: The mock service needs to return these specific fields or we need to calculate them
        { label: "Protected Endpoints", value: 842, icon: <Monitor className="text-blue-400" />, color: "text-blue-400" }, // Hardcoded for now in mock service response update
        { label: "Threats Contained", value: 128, icon: <Lock className="text-yellow-400" />, color: "text-yellow-400" },   // Hardcoded for now
        { label: "AI Confidence", value: `${displayStats.avgConfidence}%`, icon: <Activity className="text-purple-400" />, color: "text-purple-400" },
    ];

    if (isLoading) {
        return <div className="animate-pulse h-24 bg-white/5 rounded-xl mb-6" />;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {statItems.map((stat, idx) => (
                <GlassCard key={idx} className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-syne">{stat.label}</p>
                        <p className={`text-2xl font-bold font-orbitron ${stat.color} mt-1 text-shadow-glow`}>{stat.value}</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded-full border border-white/5">
                        {React.cloneElement(stat.icon as React.ReactElement, { size: 18 })}
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};
