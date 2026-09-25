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
