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
      "p95 CPU utilization is 28%, well below the 65% threshold. " +
      "Reducing instance size maintains headroom while cutting cost and energy.",
    priority: "high",
    currentInstance: "m5.large",
    recommendedInstance: "m5.medium",
    estimatedSavings: { cost: 18, energy: 23, carbon: 21 },
    status: "new",
  },
  {
    id: "rec-002",
    title: "Terminate Idle Analytics Job",
    description:
      "Instance has sustained near-zero CPU and no network activity for 22 days. " +
      "Terminating will eliminate ongoing cost entirely.",
    priority: "high",
    currentInstance: "t3.xlarge",
    recommendedInstance: "terminated",
    estimatedSavings: { cost: 54, energy: 67, carbon: 61 },
    status: "new",
  },
  {
    id: "rec-003",
    title: "Schedule Dev Environment Shutdown",
    description:
      "This development instance is idle outside working hours. " +
      "Scheduling auto-stop from 20:00–08:00 captures significant off-hours savings.",
    priority: "medium",
    currentInstance: "t3.medium",
    recommendedInstance: "t3.medium (scheduled)",
    estimatedSavings: { cost: 11, energy: 14, carbon: 13 },
    status: "new",
  },
  {
    id: "rec-004",
    title: "Shift Batch Jobs to Cleaner Grid Window",
    description:
      "Alternative execution window (02:00–06:00 UTC) has 34% lower grid carbon intensity. " +
      "Flexible workloads should be shifted to reduce emissions.",
    priority: "medium",
    currentInstance: "c5.2xlarge",
    recommendedInstance: "c5.2xlarge (shifted)",
    estimatedSavings: { cost: 0, energy: 0, carbon: 34 },
    status: "reviewed",
  },
  {
    id: "rec-005",
    title: "Right-size Staging Database",
    description:
      "p95 CPU at 19% on a large instance. Downsizing to a smaller tier " +
      "reduces spend without affecting staging workload capacity.",
    priority: "low",
    currentInstance: "r5.large",
    recommendedInstance: "r5.medium",
    estimatedSavings: { cost: 9, energy: 11, carbon: 10 },
    status: "reviewed",
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
