
import React from 'react';
import { StatStrip } from '@/components/dashboard/StatStrip';
import { ThreatFeed } from '@/components/dashboard/ThreatFeed';
import { AIInsight } from '@/components/dashboard/AIInsight';
import { AIEnginePanel } from '@/components/dashboard/AIEnginePanel';
import { AttackGraph } from '@/components/dashboard/AttackGraph';
import { SimulationControl } from '@/components/dashboard/SimulationControl';

export default function DashboardPage() {
    return (
        <div className="flex flex-col h-full gap-6">
            <StatStrip />

            {/* Main Threat Feed Area */}
            <div className="col-span-12 lg:col-span-7 flex flex-col h-full gap-6">
                <ThreatFeed />
                <SimulationControl />
            </div>

            {/* Right Panel: AI & Details */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 h-full">
                <AIInsight />
                <div className="h-[400px]">
                    <AttackGraph />
                </div>
                <div className="flex-1 min-h-[200px]">
                    <AIEnginePanel />
                </div>
            </div>
        </div>
    );
}
