
import { create } from 'zustand';
import { Threat } from '@/lib/mock/threats';

interface AppState {
    selectedThreatId: string | null;
    setSelectedThreatId: (id: string | null) => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;

    // Investigation State
    investigationMode: boolean;
    setInvestigationMode: (active: boolean) => void;

    // Mock Realtime Simulation Toggle
    simulationActive: boolean;
    toggleSimulation: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedThreatId: null,
    setSelectedThreatId: (id) => set({ selectedThreatId: id }),

    isSidebarOpen: true,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    investigationMode: false,
    setInvestigationMode: (active) => set({ investigationMode: active }),

    simulationActive: true,
    toggleSimulation: () => set((state) => ({ simulationActive: !state.simulationActive })),
}));
