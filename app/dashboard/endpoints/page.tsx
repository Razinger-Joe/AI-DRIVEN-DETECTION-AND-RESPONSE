
"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonBadge } from '@/components/ui/NeonBadge';
import { PulseDot } from '@/components/ui/PulseDot';
import { Monitor, Cpu, HardDrive, Wifi, Shield, Server } from 'lucide-react';

interface Endpoint {
    id: string;
    hostname: string;
    ip: string;
    os: string;
    status: 'online' | 'offline' | 'compromised';
    cpu: number;
    memory: number;
    lastSeen: string;
    agent: string;
}

const mockEndpoints: Endpoint[] = [
    { id: 'ep-001', hostname: 'workstation-14', ip: '10.0.1.14', os: 'Windows 11 Pro', status: 'online', cpu: 34, memory: 62, lastSeen: '2s ago', agent: 'v3.2.1' },
    { id: 'ep-002', hostname: 'srv-db-primary', ip: '10.0.2.5', os: 'Ubuntu 22.04', status: 'online', cpu: 78, memory: 84, lastSeen: '1s ago', agent: 'v3.2.1' },
    { id: 'ep-003', hostname: 'workstation-07', ip: '10.0.1.7', os: 'macOS Sonoma', status: 'compromised', cpu: 98, memory: 95, lastSeen: '5s ago', agent: 'v3.1.8' },
    { id: 'ep-004', hostname: 'srv-web-02', ip: '10.0.3.12', os: 'Debian 12', status: 'online', cpu: 12, memory: 35, lastSeen: '3s ago', agent: 'v3.2.1' },
    { id: 'ep-005', hostname: 'workstation-22', ip: '10.0.1.22', os: 'Windows 11 Pro', status: 'offline', cpu: 0, memory: 0, lastSeen: '2h ago', agent: 'v3.2.0' },
    { id: 'ep-006', hostname: 'srv-mail-01', ip: '10.0.2.8', os: 'Ubuntu 20.04', status: 'online', cpu: 45, memory: 58, lastSeen: '1s ago', agent: 'v3.2.1' },
    { id: 'ep-007', hostname: 'kube-node-03', ip: '10.0.4.3', os: 'Container OS', status: 'online', cpu: 56, memory: 71, lastSeen: '1s ago', agent: 'v3.2.1' },
    { id: 'ep-008', hostname: 'workstation-31', ip: '10.0.1.31', os: 'Windows 10', status: 'online', cpu: 22, memory: 48, lastSeen: '4s ago', agent: 'v3.1.9' },
];

const statusColors = {
    online: '#22d3a5',
    offline: '#6b7280',
    compromised: '#ff3b5c',
};

export default function EndpointsPage() {
    return (
        <div className="flex flex-col h-full gap-6">
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Monitor className="text-blue-400" size={24} />
                    <h1 className="font-orbitron text-xl font-bold tracking-wider">ENDPOINT MONITOR</h1>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="flex items-center gap-2 text-green-400">
                        <PulseDot color="#22d3a5" size={6} />
                        {mockEndpoints.filter(e => e.status === 'online').length} Online
                    </span>
                    <span className="flex items-center gap-2 text-red-400">
                        <PulseDot color="#ff3b5c" size={6} />
                        {mockEndpoints.filter(e => e.status === 'compromised').length} Compromised
                    </span>
                    <span className="text-gray-500">
                        {mockEndpoints.filter(e => e.status === 'offline').length} Offline
                    </span>
                </div>
            </div>

            {/* Summary KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Endpoints', value: mockEndpoints.length, icon: Server, color: 'text-cyan-400' },
                    { label: 'Agents Current', value: mockEndpoints.filter(e => e.agent === 'v3.2.1').length, icon: Shield, color: 'text-green-400' },
                    { label: 'Avg CPU Load', value: `${Math.round(mockEndpoints.reduce((a, e) => a + e.cpu, 0) / mockEndpoints.length)}%`, icon: Cpu, color: 'text-purple-400' },
                    { label: 'Network Active', value: mockEndpoints.filter(e => e.status === 'online').length, icon: Wifi, color: 'text-blue-400' },
                ].map((stat, i) => (
                    <GlassCard key={i} className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg" aria-hidden="true">
                            <stat.icon size={18} className={stat.color} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-mono uppercase">{stat.label}</p>
                            <p className={`text-xl font-bold font-orbitron ${stat.color} tabular-nums`}>{stat.value}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Endpoint Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
                {mockEndpoints.map((endpoint) => (
                    <GlassCard
                        key={endpoint.id}
                        className={`p-5 flex flex-col gap-3 hover:bg-white/[0.03] transition-colors cursor-pointer group ${endpoint.status === 'compromised' ? 'border-red-500/30' : ''
                            }`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <PulseDot color={statusColors[endpoint.status]} size={6} />
                                <span className="font-mono text-xs text-white font-medium">{endpoint.hostname}</span>
                            </div>
                            <NeonBadge
                                label={endpoint.status.toUpperCase()}
                                color={statusColors[endpoint.status]}
                            />
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-xs font-mono text-gray-500">
                            <div className="flex justify-between">
                                <span>IP</span>
                                <span className="text-gray-300">{endpoint.ip}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>OS</span>
                                <span className="text-gray-300">{endpoint.os}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Agent</span>
                                <span className={endpoint.agent === 'v3.2.1' ? 'text-green-400' : 'text-yellow-400'}>{endpoint.agent}</span>
                            </div>
                        </div>

                        {/* Resource Bars */}
                        {endpoint.status !== 'offline' && (
                            <div className="space-y-2 mt-auto pt-3 border-t border-white/5">
                                {/* CPU */}
                                <div className="flex items-center gap-2 text-xs">
                                    <Cpu size={12} className="text-gray-500 flex-shrink-0" />
                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${endpoint.cpu > 80 ? 'bg-red-500' : endpoint.cpu > 50 ? 'bg-yellow-500' : 'bg-cyan-400'}`}
                                            style={{ width: `${endpoint.cpu}%` }}
                                        />
                                    </div>
                                    <span className="font-mono text-gray-400 tabular-nums w-8 text-right">{endpoint.cpu}%</span>
                                </div>
                                {/* Memory */}
                                <div className="flex items-center gap-2 text-xs">
                                    <HardDrive size={12} className="text-gray-500 flex-shrink-0" />
                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${endpoint.memory > 80 ? 'bg-red-500' : endpoint.memory > 50 ? 'bg-yellow-500' : 'bg-purple-400'}`}
                                            style={{ width: `${endpoint.memory}%` }}
                                        />
                                    </div>
                                    <span className="font-mono text-gray-400 tabular-nums w-8 text-right">{endpoint.memory}%</span>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
