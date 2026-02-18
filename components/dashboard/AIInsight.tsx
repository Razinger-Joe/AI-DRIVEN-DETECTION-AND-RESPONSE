
"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Bot, Sparkles } from 'lucide-react';

export const AIInsight: React.FC = () => {
    const [text, setText] = useState("");
    const fullText = "System operating within normal parameters. Anomaly detection active. Recent ransomware attempt on finance-ws-04 has been effectively contained. Recommending patch audit for engineering subnet.";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <GlassCard className="p-6 relative overflow-hidden group" glow="#a78bfa">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bot size={64} />
            </div>
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-purple-400 animate-pulse" size={18} />
                <h3 className="font-orbitron text-sm text-purple-300 tracking-wider">SENTINEL AI INSIGHT</h3>
            </div>
            <p className="font-syne text-sm leading-relaxed text-gray-300 min-h-[48px]">
                {text}
                <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse align-middle" />
            </p>
        </GlassCard>
    );
};
