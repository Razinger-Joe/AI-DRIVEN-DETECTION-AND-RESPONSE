
// Mock AI Service - Simulates Latency and "Thinking"
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAIService = {
    async getHealthInsight() {
        await delay(1500); // Simulate thinking
        return {
            status: "optimised", // 'optimised' | 'degraded' | 'critical'
            message: "System operating at 94% efficiency. Anomaly detected in subnet-14 but neutralized by automated policy. Recommended action: None."
        };
    },

    async investigateThreat(threatId: string, initialQuery: string) {
        await delay(2000); // Simulate analysis

        // Canned responses based on simple mapping, falling back to a generic one
        if (threatId === 'th-001' || initialQuery.toLowerCase().includes('ransomware')) {
            return {
                analysis: "Detected active LockBit execution pattern. Process ID 4022 is attempting file encryption on 'finance-ws-04'.",
                recommendation: "Immediate isolation of host 'finance-ws-04' and kill process 4022. Signature matches known LockBit 3.0 hash.",
                confidence: 0.98
            };
        }

        if (threatId === 'th-002' || initialQuery.toLowerCase().includes('cobalt')) {
            return {
                analysis: "Beaconing traffic detected to known C2 domain. Cobalt Strike beacon pattern identified in memory injection.",
                recommendation: "Block traffic to 'update-service.net' at firewall level. Reset credentials for user 'admin_hr'.",
                confidence: 0.85
            };
        }

        return {
            analysis: `Analysis of ${threatId}: Pattern matches lateral movement via WMI. User account behavior deviation > 3 sigma.`,
            recommendation: "Isolate host and rotate kerberos tickets. Review logs for event ID 4624 (Logon) type 3.",
            confidence: 0.75
        };
    }
};
