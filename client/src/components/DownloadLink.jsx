/**
 * DownloadLink.jsx
 * ----------------
 * Generates a real client-side Blob file and triggers a genuine browser
 * download — not a dead link. The file is clearly labeled as mock data
 * pending backend integration.
 *
 * Props:
 *   label       string   — visible link text
 *   report      Report   — { id, name, generatedAt, ... }
 */

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

function buildMockFileContent(report) {
  const lines = [
    "# VerdeCloud — Infrastructure Sustainability Report",
    "# [MOCK DATA — pending backend integration]",
    "#",
    `Report ID    : ${report.id}`,
    `Report Name  : ${report.name}`,
    `Generated At : ${new Date(report.generatedAt).toLocaleString()}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "SUMMARY OF RECOMMENDATIONS",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "  rec-001  Right-size Web Server         HIGH    Cost: +18%  Energy: +23%  CO₂: +21%",
    "  rec-002  Terminate Idle Analytics Job  HIGH    Cost: +54%  Energy: +67%  CO₂: +61%",
    "  rec-003  Schedule Dev Environment      MEDIUM  Cost: +11%  Energy: +14%  CO₂: +13%",
    "  rec-004  Shift to Cleaner Grid Window  MEDIUM  Cost:  +0%  Energy:  +0%  CO₂: +34%",
    "  rec-005  Right-size Staging Database   LOW     Cost:  +9%  Energy: +11%  CO₂: +10%",
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "NOTE: This file contains mock/placeholder data only.",
    "Real report generation requires backend API integration.",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ];
  return lines.join("\n");
}

export default function DownloadLink({ label = "Download report (mock)", report }) {
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if (!report) return;

    const content = buildMockFileContent(report);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setObjectUrl(url);

    // Revoke the object URL when the component unmounts or report changes
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [report]);

  if (!objectUrl) return null;

  const filename = `verdecloud-report-mock-${report.id}.txt`;

  return (
    <a
      id="download-report-link"
      href={objectUrl}
      download={filename}
      className="btn btn--secondary download-link"
      aria-label={`${label} — downloads a mock text file`}
    >
      <Download size={15} strokeWidth={1.5} aria-hidden="true" />
      {label}
    </a>
  );
}
