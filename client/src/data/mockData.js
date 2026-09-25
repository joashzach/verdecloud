/**
 * mockData.js
 * -----------
 * Isolated mock data for Recommendations & Reports features.
 * Replace these with real API calls once the backend is ready.
 * Do NOT import recommendation-specific text from components —
 * all content lives here.
 */

export const recommendations = [
  {
    id: "rec-001",
    title: "Right-size Web Server",
    description:
      "p95 CPU utilization is well below the 65% threshold. " +
      "Reducing instance size maintains headroom while cutting cost and energy.",
    priority: "high",
    instanceId: "i-0a3f9c2d",
    region: "us-east-1",
    currentInstance: "m5.large",
    recommendedInstance: "m5.medium",
    estimatedSavings: { cost: 18, energy: 23, carbon: 21 },
    status: "new",
    detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    triggerMetric: { label: "P95 CPU", value: "28%" },
    sparklineData: [61, 54, 49, 43, 37, 31, 28],
  },
  {
    id: "rec-002",
    title: "Terminate Idle Analytics Job",
    description:
      "Instance has sustained near-zero CPU and no network activity for 22 days. " +
      "Terminating will eliminate ongoing cost entirely.",
    priority: "high",
    instanceId: "i-0b8e1f4a",
    region: "eu-west-1",
    currentInstance: "t3.xlarge",
    recommendedInstance: "terminated",
    estimatedSavings: { cost: 54, energy: 67, carbon: 61 },
    status: "new",
    detectedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), // 22d ago
    triggerMetric: { label: "Avg CPU", value: "0.4%" },
    sparklineData: [1.1, 0.8, 0.6, 0.5, 0.5, 0.4, 0.4],
  },
  {
    id: "rec-003",
    title: "Schedule Dev Environment Shutdown",
    description:
      "This development instance is idle outside working hours. " +
      "Scheduling auto-stop from 20:00–08:00 captures significant off-hours savings.",
    priority: "medium",
    instanceId: "i-0c2d5e6f",
    region: "us-west-2",
    currentInstance: "t3.medium",
    recommendedInstance: "t3.medium (scheduled)",
    estimatedSavings: { cost: 11, energy: 14, carbon: 13 },
    status: "new",
    detectedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5h ago
    triggerMetric: { label: "Off-hours idle", value: "58%" },
    sparklineData: [55, 57, 60, 58, 61, 59, 58],
  },
  {
    id: "rec-004",
    title: "Shift Batch Jobs to Cleaner Grid Window",
    description:
      "Alternative execution window (02:00–06:00 UTC) has 34% lower grid carbon intensity. " +
      "Flexible workloads should be shifted to reduce emissions.",
    priority: "medium",
    instanceId: "i-0d9f7b3c",
    region: "ap-southeast-1",
    currentInstance: "c5.2xlarge",
    recommendedInstance: "c5.2xlarge (shifted)",
    estimatedSavings: { cost: 0, energy: 0, carbon: 34 },
    status: "reviewed",
    detectedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3d ago
    triggerMetric: { label: "Grid intensity", value: "High" },
    sparklineData: [210, 198, 225, 240, 215, 230, 218],
  },
  {
    id: "rec-005",
    title: "Right-size Staging Database",
    description:
      "p95 CPU at 19% on a large instance. Downsizing to a smaller tier " +
      "reduces spend without affecting staging workload capacity.",
    priority: "low",
    instanceId: "i-0e4a2c8b",
    region: "us-east-1",
    currentInstance: "r5.large",
    recommendedInstance: "r5.medium",
    estimatedSavings: { cost: 9, energy: 11, carbon: 10 },
    status: "reviewed",
    detectedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8h ago
    triggerMetric: { label: "P95 CPU", value: "19%" },
    sparklineData: [32, 28, 24, 21, 20, 19, 19],
  },
];

export const mockReport = {
  id: "report-001",
  name: "Infrastructure Sustainability Report",
  generatedAt: new Date().toISOString(),
  /**
   * downloadUrl is intentionally absent here.
   * DownloadLink generates a real Blob client-side so the download
   * actually works — no dead link. See DownloadLink.jsx.
   */
};

// ── Instances data — Person 2 (Instances feature) ─────────────
// Replace with API calls when backend is ready.
// Shape mirrors what GET /api/instances will return.

export const instances = [
  {
    id: "i-0a3f9c2d",
    name: "web-prod-01",
    provider: "AWS",
    region: "ap-south-1",
    instanceType: "m5.large",
    status: "running",
    cpu: 42,
    memory: 58,
    network: { in: 124, out: 87 },   // MB/s
    storage: 61,                      // % used
    energy: 12.4,                     // kWh/day
    co2: 4.8,                         // kg CO₂e/day
    cost: 18.20,                      // USD/day
    efficiency: 82,                   // %
    uptime: 99.97,                    // %
    launchedAt: "2026-08-01T06:00:00Z",
    tags: ["production", "web"],
    optimizationNote: "CPU utilization is consistently below the recommended 65% threshold. Right-sizing this instance could reduce energy consumption and cost without impacting performance.",
    cpuHistory:    [38, 41, 44, 40, 43, 42, 42],
    memHistory:    [55, 57, 59, 58, 60, 58, 58],
    energyHistory: [11.8, 12.1, 12.6, 12.2, 12.5, 12.4, 12.4],
  },
  {
    id: "i-0b8e1f4a",
    name: "analytics-job-01",
    provider: "AWS",
    region: "eu-west-1",
    instanceType: "t3.xlarge",
    status: "warning",
    cpu: 1,
    memory: 8,
    network: { in: 0.2, out: 0.1 },
    storage: 12,
    energy: 7.1,
    co2: 2.7,
    cost: 11.40,
    efficiency: 9,
    uptime: 100,
    launchedAt: "2026-07-10T12:00:00Z",
    tags: ["analytics", "idle"],
    optimizationNote: "Instance has sustained near-zero CPU and no significant network activity for 22 days. Terminating will eliminate ongoing cost and emissions entirely.",
    cpuHistory:    [1.1, 0.9, 0.8, 0.6, 0.5, 0.4, 1.0],
    memHistory:    [9, 8, 8, 8, 7, 8, 8],
    energyHistory: [7.3, 7.2, 7.1, 7.1, 7.0, 7.1, 7.1],
  },
  {
    id: "i-0c2d5e6f",
    name: "dev-env-01",
    provider: "AWS",
    region: "us-west-2",
    instanceType: "t3.medium",
    status: "running",
    cpu: 14,
    memory: 33,
    network: { in: 12, out: 8 },
    storage: 44,
    energy: 4.2,
    co2: 1.6,
    cost: 6.30,
    efficiency: 55,
    uptime: 82.1,
    launchedAt: "2026-09-01T09:00:00Z",
    tags: ["development"],
    optimizationNote: "This development instance is idle outside working hours. Scheduling auto-stop from 20:00–08:00 captures significant off-hours savings.",
    cpuHistory:    [18, 22, 14, 11, 9, 14, 14],
    memHistory:    [34, 36, 33, 31, 30, 33, 33],
    energyHistory: [4.4, 4.6, 4.2, 4.0, 3.9, 4.2, 4.2],
  },
  {
    id: "i-0d9f7b3c",
    name: "batch-runner-01",
    provider: "AWS",
    region: "ap-southeast-1",
    instanceType: "c5.2xlarge",
    status: "running",
    cpu: 71,
    memory: 62,
    network: { in: 340, out: 210 },
    storage: 38,
    energy: 22.8,
    co2: 10.1,
    cost: 34.10,
    efficiency: 74,
    uptime: 99.5,
    launchedAt: "2026-06-15T00:00:00Z",
    tags: ["batch", "production"],
    optimizationNote: "Alternative execution window (02:00–06:00 UTC) has 34% lower grid carbon intensity. Scheduling flexible batch jobs during this window reduces CO₂ emissions at no extra cost.",
    cpuHistory:    [68, 72, 74, 69, 71, 73, 71],
    memHistory:    [60, 63, 64, 61, 62, 63, 62],
    energyHistory: [22.2, 23.0, 23.4, 22.6, 22.8, 23.1, 22.8],
  },
  {
    id: "i-0e4a2c8b",
    name: "db-staging-01",
    provider: "AWS",
    region: "us-east-1",
    instanceType: "r5.large",
    status: "running",
    cpu: 19,
    memory: 44,
    network: { in: 28, out: 19 },
    storage: 56,
    energy: 6.9,
    co2: 2.6,
    cost: 10.80,
    efficiency: 67,
    uptime: 99.1,
    launchedAt: "2026-08-20T08:00:00Z",
    tags: ["database", "staging"],
    optimizationNote: "P95 CPU at 19% on a memory-optimised large instance. Downsizing to r5.medium reduces spend without affecting staging workload capacity.",
    cpuHistory:    [21, 20, 19, 18, 19, 19, 19],
    memHistory:    [45, 44, 44, 43, 44, 44, 44],
    energyHistory: [7.1, 7.0, 6.9, 6.8, 6.9, 6.9, 6.9],
  },
  {
    id: "i-0f1b3d5e",
    name: "api-prod-02",
    provider: "GCP",
    region: "us-central1",
    instanceType: "n2-standard-4",
    status: "running",
    cpu: 31,
    memory: 46,
    network: { in: 89, out: 62 },
    storage: 29,
    energy: 9.2,
    co2: 3.5,
    cost: 14.60,
    efficiency: 88,
    uptime: 99.99,
    launchedAt: "2026-07-01T00:00:00Z",
    tags: ["production", "api"],
    optimizationNote: null,
    cpuHistory:    [29, 32, 30, 31, 33, 31, 31],
    memHistory:    [45, 47, 46, 46, 48, 46, 46],
    energyHistory: [9.0, 9.3, 9.1, 9.2, 9.4, 9.2, 9.2],
  },
  {
    id: "i-0g7h9i2j",
    name: "cache-prod-01",
    provider: "Azure",
    region: "eastus",
    instanceType: "Standard_D2s_v3",
    status: "stopped",
    cpu: 0,
    memory: 0,
    network: { in: 0, out: 0 },
    storage: 18,
    energy: 0,
    co2: 0,
    cost: 0,
    efficiency: 0,
    uptime: 0,
    launchedAt: "2026-09-20T14:00:00Z",
    tags: ["cache", "stopped"],
    optimizationNote: "Instance is stopped. Verify whether this resource should be terminated to avoid ongoing storage costs.",
    cpuHistory:    [45, 41, 38, 12, 3, 0, 0],
    memHistory:    [51, 48, 42, 14, 4, 0, 0],
    energyHistory: [8.4, 7.9, 7.1, 2.2, 0.6, 0, 0],
  },
  {
    id: "i-0h2k4m6n",
    name: "ml-train-01",
    provider: "AWS",
    region: "us-east-1",
    instanceType: "p3.2xlarge",
    status: "critical",
    cpu: 97,
    memory: 91,
    network: { in: 580, out: 420 },
    storage: 88,
    energy: 48.6,
    co2: 18.4,
    cost: 73.20,
    efficiency: 94,
    uptime: 99.8,
    launchedAt: "2026-09-24T18:00:00Z",
    tags: ["ml", "gpu", "training"],
    optimizationNote: "Resource utilization near saturation. Consider scaling up or distributing workload across multiple instances to prevent job failure.",
    cpuHistory:    [82, 87, 91, 94, 96, 97, 97],
    memHistory:    [78, 83, 87, 89, 90, 91, 91],
    energyHistory: [40.1, 43.2, 45.8, 47.1, 48.0, 48.6, 48.6],
  },
];
