
import React from 'react';

interface TerminalViewProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export const TerminalView: React.FC<TerminalViewProps> = ({ children, title = "TERMINAL", className = "" }) => {
    return (
        <div className={`bg-black/80 border border-white/10 rounded-lg overflow-hidden font-mono text-xs ${className}`}>
            <div className="bg-white/5 px-3 py-1 border-b border-white/10 flex items-center justify-between">
                <span className="text-white/40 uppercase tracking-widest">{title}</span>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
            </div>
            <div className="p-4 overflow-auto max-h-[300px] text-green-400">
                <pre className="whitespace-pre-wrap">{children}</pre>
            </div>
        </div>
    );
};
