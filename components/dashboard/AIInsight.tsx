
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Bot, Sparkles, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export const AIInsight: React.FC = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const { data: insight, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['ai-insight'],
        queryFn: async () => {
            const res = await fetch('/api/ai/insight', { method: 'POST' });
            if (!res.ok) throw new Error('Failed to fetch insight');
            return res.json();
        },
        refetchOnWindowFocus: false,
    });

    const fullText = insight?.message || "Initializing Sentinel AI Core...";

    useEffect(() => {
        if (!fullText) return;

        let i = 0;
        setDisplayedText("");
        setIsTyping(true);

        const interval = setInterval(() => {
            setDisplayedText(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) {
                clearInterval(interval);
                setIsTyping(false); // Stop cursor blink when typing is done
            }
        }, 30);

        return () => {
            clearInterval(interval);
            setIsTyping(false);
        };
    }, [fullText]);

    const isBusy = isLoading || isRefetching;

    return (
        <GlassCard className="p-6 relative overflow-hidden group" glow="#a78bfa">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity" aria-hidden="true">
                <Bot size={64} />
            </div>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-purple-400 animate-pulse" size={18} aria-hidden="true" />
                    <h3 className="font-orbitron text-sm text-purple-300 tracking-wider">SENTINEL AI INSIGHT</h3>
                </div>
                <button
                    onClick={() => refetch()}
                    disabled={isBusy}
                    className="p-1.5 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50"
                    aria-label="Refresh AI Insight"
                    title="Refresh Insight"
                >
                    <RefreshCw size={14} className={isBusy ? "animate-spin" : ""} />
                </button>
            </div>
            <div className="min-h-[48px]" role="status" aria-live="polite" aria-label="AI-generated insight">
                <p className="font-syne text-sm leading-relaxed text-gray-300">
                    {displayedText}
                    {isTyping && (
                        <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse align-middle" aria-hidden="true" />
                    )}
                </p>
            </div>
        </GlassCard>
    );
};
