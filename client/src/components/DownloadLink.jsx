/**
 * DownloadLink.jsx
 * ----------------
 * Generates a real client-side Blob download — not a dead link.
 * File content is clearly labeled as mock data.
 * Styled as btn--outline to match Overview secondary action style.
 */

import { useEffect, useState } from 'react';

function buildMockFileContent(report) {
  return [
    '# VerdeCloud — Infrastructure Sustainability Report',
    '# [MOCK DATA — pending backend integration]',
    '#',
    `Report ID    : ${report.id}`,
    `Report Name  : ${report.name}`,
    `Generated At : ${new Date(report.generatedAt).toLocaleString()}`,
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'SUMMARY OF RECOMMENDATIONS',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '  rec-001  Right-size Web Server         HIGH    Cost: +18%  Energy: +23%  CO₂: +21%',
    '  rec-002  Terminate Idle Analytics Job  HIGH    Cost: +54%  Energy: +67%  CO₂: +61%',
    '  rec-003  Schedule Dev Environment      MEDIUM  Cost: +11%  Energy: +14%  CO₂: +13%',
    '  rec-004  Shift to Cleaner Grid Window  MEDIUM  Cost:  +0%  Energy:  +0%  CO₂: +34%',
    '  rec-005  Right-size Staging Database   LOW     Cost:  +9%  Energy: +11%  CO₂: +10%',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'NOTE: This file contains mock/placeholder data only.',
    'Real report generation requires backend API integration.',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ].join('\n');
}

export default function DownloadLink({ label = 'Download report (mock)', report }) {
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if (!report) return;
    const blob = new Blob([buildMockFileContent(report)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [report]);

  if (!objectUrl) return null;

  return (
    <a
      id="download-report-link"
      href={objectUrl}
      download={`verdecloud-report-mock-${report.id}.txt`}
      className="btn btn--outline"
      aria-label={`${label} — downloads a mock text file`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label}
    </a>
  );
}
