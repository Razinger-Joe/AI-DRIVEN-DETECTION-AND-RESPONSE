
import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MOCK_STATS } from '@/lib/mock/threats';
import { Shield, AlertTriangle, Monitor, Lock, Activity } from 'lucide-react';

export const StatStrip: React.FC = () => {
    const stats = [
        { label: "Active Threats", value: MOCK_STATS.activeThreats, icon: <AlertTriangle className="text-red-500" />, color: "text-red-500" },
        { label: "Critical Alerts", value: MOCK_STATS.criticalAlerts, icon: <Shield className="text-orange-500" />, color: "text-orange-500" },
        { label: "Protected Endpoints", value: MOCK_STATS.endpointsProtected, icon: <Monitor className="text-blue-400" />, color: "text-blue-400" },
        { label: "Threats Contained", value: MOCK_STATS.threatsContained, icon: <Lock className="text-yellow-400" />, color: "text-yellow-400" },
        { label: "AI Confidence", value: `${MOCK_STATS.aiConfidenceAvg}%`, icon: <Activity className="text-purple-400" />, color: "text-purple-400" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {stats.map((stat, idx) => (
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
