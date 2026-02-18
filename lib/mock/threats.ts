
export type Severity = "critical" | "high" | "medium" | "low";
export type Status = "active" | "investigating" | "contained" | "resolved";

export interface Threat {
  id: string;
  type: string;
  host: string;
  severity: Severity;
  status: Status;
  confidence: number;
  detectedAt: string;
  pid: number;
  meta?: string;
  ioc: string;
}

export interface StatSummary {
  activeThreats: number;
  criticalAlerts: number;
  highSeverity: number;
  avgConfidence: number;
  systemHealth: number;
  networkLoad: string;
  endpointsProtected: number;
  threatsContained: number;
}

export const MOCK_THREATS: Threat[] = [
  {
    id: "th-001",
    type: "Ransomware.LockBit",
    host: "finance-ws-04",
    severity: "critical",
    status: "active",
    confidence: 98,
    detectedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    pid: 4022,
    ioc: "192.168.1.45"
  },
  {
    id: "th-002",
    type: "C2.CobaltStrike",
    host: "hr-laptop-02",
    severity: "high",
    status: "investigating",
    confidence: 85,
    detectedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    pid: 1104,
    ioc: "update-service.net"
  },
  {
    id: "th-003",
    type: "PrivEsc.Mimikatz",
    host: "dev-server-01",
    severity: "high",
    status: "active",
    confidence: 92,
    detectedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    pid: 892,
    ioc: "lsass.dmp"
  },
  {
    id: "th-004",
    type: "LateralMovement.WMI",
    host: "finance-ws-04",
    severity: "medium",
    status: "contained",
    confidence: 65,
    detectedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    pid: 0,
    ioc: "N/A"
  },
  {
    id: "th-005",
    type: "DataExfil.FTP",
    host: "marketing-mac-09",
    severity: "medium",
    status: "resolved",
    confidence: 45,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    pid: 5543,
    ioc: "23.45.67.89"
  },
];

export const MOCK_STATS = {
  activeThreats: 12,
  criticalAlerts: 3,
  endpointsProtected: 450,
  threatsContained: 18,
  aiConfidenceAvg: 94
};
