
import React from 'react';
import { StatStrip } from '@/components/dashboard/StatStrip';
import { ThreatFeed } from '@/components/dashboard/ThreatFeed';
import { AIInsight } from '@/components/dashboard/AIInsight';
import { AIEnginePanel } from '@/components/dashboard/AIEnginePanel';

export default function DashboardPage() {
    return (
        <div className="flex flex-col h-full gap-6">
            <StatStrip />

            <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                {/* Main Threat Feed Area */}
                <div className="col-span-12 lg:col-span-8 flex flex-col h-full gap-6">
                    <ThreatFeed />
                </div>

                {/* Right Panel: AI & Details */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full">
                    <AIInsight />
                    <div className="flex-1">
                        <AIEnginePanel />
                    </div>
                </div>
            </div>
        </div>
    );
}
