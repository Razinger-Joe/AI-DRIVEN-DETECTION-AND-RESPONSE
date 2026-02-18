
"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { AttackGraph } from '@/components/dashboard/AttackGraph';
import { Search, MessageSquare, Send, Bot, FileSearch } from 'lucide-react';

export default function InvestigatePage() {
    const [query, setQuery] = React.useState('');
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: 'Sentinel AI Investigation Engine initialized. Select a threat from the Attack Graph or ask me about any IOC, host, or attack pattern.' },
    ]);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSend = async () => {
        if (!query.trim()) return;
        const userMsg = query;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setQuery('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/ai/investigate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMsg }),
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Analysis complete. No significant findings.' }]);
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: '⚠ Connection to AI Engine failed. Please retry.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Page Title */}
            <div className="flex items-center gap-3">
                <FileSearch className="text-cyan-400" size={24} />
                <h1 className="font-orbitron text-xl font-bold tracking-wider">INVESTIGATION WORKBENCH</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                {/* Attack Graph Panel */}
                <div className="h-[500px] lg:h-full">
                    <AttackGraph />
                </div>

                {/* AI Chat Panel */}
                <GlassCard className="flex flex-col p-0 overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-white/10 flex items-center gap-2 bg-white/[0.02]">
                        <Bot size={18} className="text-purple-400" />
                        <h3 className="font-orbitron text-sm tracking-wider">AI ANALYST</h3>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-syne ${msg.role === 'user'
                                        ? 'bg-cyan-500/20 text-cyan-100 rounded-br-sm'
                                        : 'bg-white/5 text-gray-300 rounded-bl-sm border border-white/10'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                                    <div className="flex gap-1">
                                        <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 bg-white/[0.02]">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about an IOC, threat, or attack pattern..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-syne"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !query.trim()}
                                className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                                aria-label="Send message"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
