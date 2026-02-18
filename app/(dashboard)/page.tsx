
"use client";

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

            {/* Two-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
                {/* Left Panel: Primary Threat Data */}
                <section className="lg:col-span-7 flex flex-col gap-6" aria-label="Threat Intelligence Feed">
                    <ThreatFeed />
                    <SimulationControl />
                </section>

                {/* Right Panel: AI Analysis & Visualization */}
                <section className="lg:col-span-5 flex flex-col gap-6" aria-label="AI Analysis Panel">
                    <AIInsight />
                    <div className="h-[400px]">
                        <AttackGraph />
                    </div>
                    <div className="flex-1 min-h-[200px]">
                        <AIEnginePanel />
                    </div>
                </section>
            </div>
        </div>
    );
}
