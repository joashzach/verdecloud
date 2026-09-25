/**
 * GenerateReportButton.jsx
 * ------------------------
 * Handles idle → loading → success/error state for report generation.
 *
 * Props:
 *   onGenerate   () => Promise<Report>  — call the API stub
 *   onSuccess    (report: Report) => void
 *   onError      (error: Error) => void
 *   disabled     boolean                — true while generating
 *   status       "idle" | "loading" | "error"
 */

import { Loader2, FileBarChart } from "lucide-react";

export default function GenerateReportButton({
  onGenerate,
  disabled = false,
  status = "idle",
}) {
  const isLoading = status === "loading";

  return (
    <button
      id="generate-report-btn"
      className="btn btn--accent"
      onClick={onGenerate}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={isLoading ? "Generating report, please wait" : "Generate infrastructure sustainability report"}
    >
      {isLoading ? (
        <>
          <Loader2
            size={15}
            strokeWidth={1.5}
            className="spin"
            aria-hidden="true"
          />
          Generating…
        </>
      ) : (
        <>
          <FileBarChart size={15} strokeWidth={1.5} aria-hidden="true" />
          Generate report
        </>
      )}
    </button>
  );
}
