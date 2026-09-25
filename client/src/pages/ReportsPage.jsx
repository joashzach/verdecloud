/**
 * ReportsPage.jsx
 * ---------------
 * Renders the Reports view:
 *   - Page header
 *   - Generate panel: description + GenerateReportButton
 *   - Success panel: report info + DownloadLink
 *   - Error inline: message + retry
 *
 * Flow: idle → loading → success | error
 */

import { useState, useCallback } from "react";
import { FileText, CheckCircle2, AlertTriangle, RotateCcw } from "lucide-react";
import GenerateReportButton from "../components/GenerateReportButton";
import DownloadLink from "../components/DownloadLink";
import { generateReport } from "../services/api";

export default function ReportsPage() {
  const [genStatus, setGenStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [report, setReport] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGenerate = useCallback(async () => {
    setGenStatus("loading");
    setErrorMsg("");
    try {
      const result = await generateReport();
      setReport(result);
      setGenStatus("success");
    } catch (err) {
      setErrorMsg(err?.message || "Unknown error");
      setGenStatus("error");
    }
  }, []);

  const handleRetry = useCallback(() => {
    setGenStatus("idle");
    setReport(null);
    setErrorMsg("");
  }, []);

  return (
    <main className="page" id="reports-page">
      {/* Page header */}
      <header className="page__header">
        <h1 className="page__title">
          <FileText
            size={18}
            strokeWidth={1.5}
            style={{ verticalAlign: "middle", marginRight: "var(--sp-2)", color: "var(--color-accent)" }}
            aria-hidden="true"
          />
          Reports
        </h1>
        <p className="page__description">
          Generate a sustainability and cost-optimization summary for your infrastructure.
        </p>
      </header>

      {/* Generate panel */}
      <section className="card reports-panel" aria-labelledby="generate-panel-heading">
        <h2 className="reports-panel__title" id="generate-panel-heading">
          Infrastructure Sustainability Report
        </h2>
        <p className="reports-panel__desc">
          This report summarizes all active recommendations, projected cost and energy savings,
          and estimated CO₂ reductions across your infrastructure.
          Report generation may take a few seconds.
        </p>

        {/* Action area */}
        <div className="reports-panel__action">
          {(genStatus === "idle" || genStatus === "loading") && (
            <GenerateReportButton
              onGenerate={handleGenerate}
              status={genStatus}
              disabled={genStatus === "loading"}
            />
          )}

          {/* Error state */}
          {genStatus === "error" && (
            <div className="reports-error" role="alert" aria-live="assertive">
              <div className="reports-error__message">
                <AlertTriangle
                  size={15}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  style={{ color: "var(--color-high-text)", flexShrink: 0 }}
                />
                <span>
                  Unable to generate report. Please try again.
                  {errorMsg && (
                    <span className="reports-error__detail mono"> — {errorMsg}</span>
                  )}
                </span>
              </div>
              <button
                className="btn btn--secondary"
                onClick={handleRetry}
                id="retry-generate-btn"
                aria-label="Try generating the report again"
              >
                <RotateCcw size={14} strokeWidth={1.5} aria-hidden="true" />
                Try again
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Success panel — revealed after generation */}
      {genStatus === "success" && report && (
        <section
          className="card reports-panel reports-panel--success"
          aria-labelledby="report-success-heading"
          aria-live="polite"
        >
          <div className="reports-success__header">
            <CheckCircle2
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
              style={{ color: "var(--color-accent)", flexShrink: 0 }}
            />
            <h2 className="reports-panel__title" id="report-success-heading">
              Report generated successfully
            </h2>
          </div>

          <dl className="reports-meta">
            <div className="reports-meta__row">
              <dt className="reports-meta__label">Report name</dt>
              <dd className="reports-meta__value">{report.name}</dd>
            </div>
            <div className="reports-meta__row">
              <dt className="reports-meta__label">Generated</dt>
              <dd className="reports-meta__value mono">
                {new Date(report.generatedAt).toLocaleString()}
              </dd>
            </div>
            <div className="reports-meta__row">
              <dt className="reports-meta__label">Report ID</dt>
              <dd className="reports-meta__value mono">{report.id}</dd>
            </div>
          </dl>

          <p className="reports-mock-notice" aria-label="Mock data notice">
            ⚠ This download contains mock placeholder data — real report generation requires backend integration.
          </p>

          <DownloadLink
            label="Download report (mock)"
            report={report}
          />
        </section>
      )}
    </main>
  );
}
