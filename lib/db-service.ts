
import { MOCK_THREATS, Threat } from './mock/threats';

// Simulate a database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockDatabase {
    private threats: Threat[];

    constructor() {
        this.threats = [...MOCK_THREATS];
    }

    async getThreats() {
        await delay(300); // Simulate network latency
        return this.threats;
    }

    async getThreatSummary() {
        await delay(200);
        const total = this.threats.length;
        const critical = this.threats.filter(t => t.severity === 'critical').length;
        const high = this.threats.filter(t => t.severity === 'high').length;
        const active = this.threats.filter(t => t.status === 'active').length;

        // Calculate average confidence
        const avgConfidence = Math.round(
            this.threats.reduce((acc, curr) => acc + curr.confidence, 0) / (total || 1)
        );

        return {
            activeThreats: active,
            criticalAlerts: critical,
            highSeverity: high,
            avgConfidence,
            systemHealth: 94, // Mocked static
            networkLoad: '845 EPS' // Mocked static
        };
    }

    async updateThreatStatus(id: string, status: Threat['status']) {
        await delay(500);
        const index = this.threats.findIndex(t => t.id === id);
        if (index !== -1) {
            this.threats[index] = { ...this.threats[index], status };
            return this.threats[index];
        }
        throw new Error('Threat not found');
    }

    async simulateIncomingThreat() {
        await delay(100);
        const newThreat: Threat = {
            id: `th-${Date.now().toString().slice(-4)}`,
            type: Math.random() > 0.5 ? 'Ransomware' : 'DDoS',
            host: `workstation-${Math.floor(Math.random() * 99)}`,
            status: 'active',
            severity: Math.random() > 0.7 ? 'critical' : 'high',
            confidence: Math.round(Math.random() * 20 + 80),
            detectedAt: new Date().toISOString(),
            pid: Math.floor(Math.random() * 9000 + 1000),
            ioc: `192.168.1.${Math.floor(Math.random() * 255)}`
        };
        this.threats.unshift(newThreat); // Add to top
        if (this.threats.length > 50) this.threats.pop(); // Keep list size manageable
        return newThreat;
    }
}

// Singleton instance
export const dbService = new MockDatabase();
