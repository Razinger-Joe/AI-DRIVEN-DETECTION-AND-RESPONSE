
"use client";

import React, { useEffect, useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAppStore } from '@/lib/store';
import { Shield, Globe, Server, Database, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Threat } from '@/lib/mock/threats';

// Custom Node Component could be defined here or imported
// For now using default styles with some customization via 'style' prop

const INITIAL_NODES: Node[] = [
    {
        id: 'internet',
        type: 'input',
        data: { label: 'Internet / External' },
        position: { x: 250, y: 0 },
        style: { background: '#000', border: '1px solid #333', color: '#fff' }
    },
    {
        id: 'firewall',
        data: { label: 'Corp Firewall' },
        position: { x: 250, y: 100 },
        style: { background: '#1a1a1a', border: '1px solid #a78bfa', color: '#a78bfa' }
    },
];

const INITIAL_EDGES: Edge[] = [
    { id: 'e1-2', source: 'internet', target: 'firewall', animated: true, style: { stroke: '#555' } },
];

export const AttackGraph: React.FC = () => {
    const { selectedThreatId } = useAppStore();
    const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
    const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

    // Fetch threats to get details of selected threat
    // In a real app, we might fetch just the single threat or graph data
    const { data: threats } = useQuery<Threat[]>({
        queryKey: ['threats'],
        enabled: false // Use cached data from ThreatFeed
    });

    // Dynamic Graph update based on selection
    useEffect(() => {
        if (!selectedThreatId) {
            setNodes(INITIAL_NODES);
            setEdges(INITIAL_EDGES);
            return;
        }

        const threat = threats?.find(t => t.id === selectedThreatId);
        const type = threat?.type.toLowerCase() || 'unknown';

        let threatNodes: Node[] = [...INITIAL_NODES];
        let threatEdges: Edge[] = [...INITIAL_EDGES];

        if (type.includes('ransomware')) {
            // Ransomware Flow: External -> Firewall -> Host -> Files
            threatNodes.push(
                {
                    id: 'compromised-host',
                    data: { label: `Host: ${threat?.host}` },
                    position: { x: 250, y: 250 },
                    style: { background: '#2a0a0a', border: '1px solid #ff3b5c', color: '#ff3b5c' }
                },
                {
                    id: 'files',
                    data: { label: 'Encrypted Files' },
                    position: { x: 250, y: 350 },
                    style: { background: '#3f1212', border: '1px dashed #ef4444', color: '#ef4444' }
                }
            );
            threatEdges.push(
                { id: 'e2-host', source: 'firewall', target: 'compromised-host', animated: true, style: { stroke: '#ff3b5c' } },
                { id: 'e-files', source: 'compromised-host', target: 'files', animated: true, style: { stroke: '#ef4444' }, label: 'Encryption' }
            );
        } else if (type.includes('c2') || type.includes('cobalt')) {
            // C2 Flow: Host -> Firewall -> C2 Server
            threatNodes.push(
                {
                    id: 'compromised-host',
                    data: { label: `Host: ${threat?.host}` },
                    position: { x: 250, y: 250 },
                    style: { background: '#2a0a0a', border: '1px solid #f97316', color: '#f97316' } // Orange
                },
                {
                    id: 'c2-server',
                    data: { label: 'C2 Server (External)' },
                    position: { x: 450, y: 0 },
                    style: { background: '#000', border: '1px solid #f97316', color: '#f97316' }
                }
            );
            threatEdges.push(
                { id: 'e-host-fw', source: 'compromised-host', target: 'firewall', animated: true, style: { stroke: '#f97316' } },
                { id: 'e-fw-c2', source: 'firewall', target: 'c2-server', animated: true, style: { stroke: '#f97316', strokeDasharray: '5,5' }, label: 'Exfiltration' }
            );
        } else if (type.includes('ddos')) {
            // DDoS Flow: Botnet -> Firewall -> Web Server
            threatNodes.push(
                {
                    id: 'botnet',
                    data: { label: 'Botnet Cluster' },
                    position: { x: 50, y: 0 },
                    style: { background: '#000', border: '1px solid #ef4444', color: '#ef4444' }
                },
                {
                    id: 'web-server',
                    data: { label: 'Web Server' },
                    position: { x: 250, y: 250 },
                    style: { background: '#2a0a0a', border: '1px solid #ef4444', color: '#fff' }
                }
            );
            threatEdges.push(
                { id: 'e-bot-fw', source: 'botnet', target: 'firewall', animated: true, style: { stroke: '#ef4444', strokeWidth: 3 }, label: 'High Traffic' },
                { id: 'e-fw-web', source: 'firewall', target: 'web-server', animated: true, style: { stroke: '#ef4444', strokeWidth: 3 } }
            );
        } else {
            // Generic Fallback
            threatNodes.push(
                {
                    id: 'target',
                    data: { label: `Target: ${threat?.host || 'Unknown'}` },
                    position: { x: 250, y: 250 },
                    style: { background: '#2a0a0a', border: '1px solid #a78bfa', color: '#a78bfa' }
                }
            );
            threatEdges.push(
                { id: 'e-generic', source: 'firewall', target: 'target', animated: true, style: { stroke: '#a78bfa' } }
            );
        }

        setNodes(threatNodes);
        setEdges(threatEdges);

    }, [selectedThreatId, threats, setNodes, setEdges]);

    return (
        <GlassCard className="h-[400px] w-full p-0 overflow-hidden relative" glow={selectedThreatId ? "#ff3b5c" : undefined}>
            <div className="absolute top-4 left-4 z-10 glass-panel px-3 py-1 rounded-full text-xs font-orbitron text-cyan-400 border border-cyan-400/30">
                ATTACK VECTOR RECON // {selectedThreatId || 'IDLE'}
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                className="bg-black/20"
                proOptions={{ hideAttribution: true }}
            >
                <Background color="#333" gap={20} size={1} />
                <Controls className="bg-white/10 border border-white/10 text-white" />
            </ReactFlow>
        </GlassCard>
    );
};
