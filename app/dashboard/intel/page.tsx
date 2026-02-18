
"use client";

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonBadge } from '@/components/ui/NeonBadge';
import { Database, Search, Globe, AlertTriangle, Clock, ExternalLink } from 'lucide-react';

interface IOC {
    id: string;
    type: 'ip' | 'domain' | 'hash' | 'url';
    value: string;
    threat: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    source: string;
    firstSeen: string;
    hits: number;
}

const mockIOCs: IOC[] = [
    { id: 'ioc-1', type: 'ip', value: '185.220.101.42', threat: 'Cobalt Strike C2', severity: 'critical', source: 'AlienVault OTX', firstSeen: '2h ago', hits: 47 },
    { id: 'ioc-2', type: 'domain', value: 'evil-cdn.darknet.su', threat: 'Phishing Infrastructure', severity: 'high', source: 'PhishTank', firstSeen: '6h ago', hits: 12 },
    { id: 'ioc-3', type: 'hash', value: 'a3b8f2...d91e4c', threat: 'Ransomware Payload', severity: 'critical', source: 'VirusTotal', firstSeen: '30m ago', hits: 3 },
    { id: 'ioc-4', type: 'ip', value: '45.33.32.156', threat: 'SSH Brute Force', severity: 'medium', source: 'Shodan', firstSeen: '1d ago', hits: 891 },
    { id: 'ioc-5', type: 'url', value: 'https://dl.malware-repo.xyz/payload.exe', threat: 'Malware Distribution', severity: 'critical', source: 'URLhaus', firstSeen: '1h ago', hits: 8 },
    { id: 'ioc-6', type: 'domain', value: 'api.data-exfil.cc', threat: 'Data Exfiltration', severity: 'high', source: 'Mandiant', firstSeen: '4h ago', hits: 22 },
    { id: 'ioc-7', type: 'ip', value: '103.228.37.90', threat: 'DDoS Botnet Node', severity: 'medium', source: 'AbuseIPDB', firstSeen: '12h ago', hits: 1543 },
    { id: 'ioc-8', type: 'hash', value: 'e7d92a...f084bb', threat: 'Trojan Dropper', severity: 'high', source: 'Hybrid Analysis', firstSeen: '3h ago', hits: 5 },
];

const typeIcons = { ip: Globe, domain: Globe, hash: Database, url: ExternalLink };
const severityColors = { critical: '#ff3b5c', high: '#ff8c00', medium: '#f5c518', low: '#00e5ff' };

export default function IntelPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('all');

    const filteredIOCs = mockIOCs.filter(ioc => {
        const matchesSearch = ioc.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ioc.threat.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || ioc.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Page Title */}
            <div className="flex items-center gap-3">
                <Database className="text-yellow-400" size={24} />
                <h1 className="font-orbitron text-xl font-bold tracking-wider">THREAT INTELLIGENCE</h1>
            </div>

            {/* Search & Filters */}
            <GlassCard className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search IOCs — IPs, domains, hashes, threat names..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-syne"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'ip', 'domain', 'hash', 'url'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase transition-all ${filterType === type
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </GlassCard>

            {/* IOC Feed */}
            <div className="flex-1 space-y-3 overflow-auto">
                {filteredIOCs.map((ioc) => {
                    const TypeIcon = typeIcons[ioc.type];
                    return (
                        <GlassCard key={ioc.id} className="p-5 hover:bg-white/[0.03] transition-colors cursor-pointer group">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                {/* Type + IOC Value */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="p-2 bg-white/5 rounded-lg flex-shrink-0">
                                        <TypeIcon size={16} className="text-gray-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-mono text-sm text-white truncate group-hover:text-cyan-400 transition-colors">
                                            {ioc.value}
                                        </p>
                                        <p className="text-xs text-gray-500 font-syne flex items-center gap-2 mt-0.5">
                                            <AlertTriangle size={10} />
                                            {ioc.threat}
                                        </p>
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <NeonBadge label={ioc.severity.toUpperCase()} color={severityColors[ioc.severity]} />

                                    <div className="text-xs font-mono text-gray-500 hidden md:block">
                                        <span className="text-gray-400">{ioc.source}</span>
                                    </div>

                                    <div className="flex items-center gap-1 text-xs font-mono text-gray-500">
                                        <Clock size={10} />
                                        {ioc.firstSeen}
                                    </div>

                                    <div className="text-xs font-mono text-cyan-400 tabular-nums">
                                        {ioc.hits} hits
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    );
                })}

                {filteredIOCs.length === 0 && (
                    <div className="text-center py-16 text-gray-500 font-mono text-sm">
                        No IOCs match your search criteria
                    </div>
                )}
            </div>
        </div>
    );
}
