
"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Bot, Sparkles, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export const AIInsight: React.FC = () => {
    const [displayedText, setDisplayedText] = useState("");

    const { data: insight, isLoading, refetch } = useQuery({
        queryKey: ['ai-insight'],
        queryFn: async () => {
            const res = await fetch('/api/ai/insight', { method: 'POST' }); // Mock is POST
            if (!res.ok) throw new Error('Failed to fetch insight');
            return res.json();
        },
        refetchOnWindowFocus: false,
    });

    const fullText = insight?.message || "Initializing Sentinel AI Core...";

    useEffect(() => {
        if (!fullText) return;

        let i = 0;
        setDisplayedText(""); // Reset on new text

        const interval = setInterval(() => {
            setDisplayedText(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(interval);
        }, 30); // Typing speed

        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <GlassCard className="p-6 relative overflow-hidden group" glow="#a78bfa">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bot size={64} />
            </div>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-purple-400 animate-pulse" size={18} />
                    <h3 className="font-orbitron text-sm text-purple-300 tracking-wider">SENTINEL AI INSIGHT</h3>
                </div>
                <button
                    onClick={() => refetch()}
                    disabled={isLoading}
                    className="text-xs text-muted-foreground hover:text-white transition-colors"
                >
                    <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                </button>
            </div>
            <p className="font-syne text-sm leading-relaxed text-gray-300 min-h-[48px]">
                {displayedText}
                <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse align-middle" />
            </p>
        </GlassCard>
    );
};
