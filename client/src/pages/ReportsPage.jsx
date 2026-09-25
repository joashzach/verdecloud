/**
 * ReportsPage.jsx
 * ---------------
 * Reports page. Visual language matches Overview exactly:
 * - .page + .container layout (top-nav, no sidebar)
 * - Card panels use shadow-md + radius-md + border
 * - Icon badge in panel headers (same 36px rounded square as StatCard)
 * - Generate button = btn--primary, download = btn--outline
 *
 * Flow: idle → loading → success | error
 *
 * Owner: Person 2 (Ardhendu)
 */

import { useState, useCallback } from 'react';
import GenerateReportButton from '../components/GenerateReportButton';
import DownloadLink from '../components/DownloadLink';
import { generateReport } from '../services/api';
import './ReportsPage.css';

// ── Document icon (same style as Navbar Reports icon) ─────────
function DocumentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

// ── Check icon for success ────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22,4 12,14.01 9,11.01" />
    </svg>
  );
}

// ── Warning icon for error ────────────────────────────────────
function AlertIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--color-danger)', flexShrink: 0 }}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// ── Retry icon ────────────────────────────────────────────────
function RetryIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23,4 23,11 16,11" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 11" />
    </svg>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function ReportsPage() {
  const [genStatus, setGenStatus] = useState('idle');
  const [report, setReport] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = useCallback(async () => {
    setGenStatus('loading');
    setErrorMsg('');
    try {
      const result = await generateReport();
      setReport(result);
      setGenStatus('success');
    } catch (err) {
      setErrorMsg(err?.message || 'Unknown error');
      setGenStatus('error');
    }
  }, []);

  const handleRetry = useCallback(() => {
    setGenStatus('idle');
    setReport(null);
    setErrorMsg('');
  }, []);

  return (
    <main className="page" id="reports-page">
      <div className="container">
        {/* ── Page header ── */}
        <header className="reports-page__header">
          <div>
            <h1 className="reports-page__title">Reports</h1>
            <p className="reports-page__subtitle">
              Generate a sustainability and cost-optimization summary for your infrastructure.
            </p>
          </div>
        </header>

        {/* ── Generate panel ── */}
        <section className="reports-panel" aria-labelledby="generate-panel-heading">
          <div className="reports-panel__header">
            {/* Icon badge — same treatment as StatCard */}
            <div className="reports-panel__icon-badge" aria-hidden="true">
              <DocumentIcon />
            </div>
            <h2 className="reports-panel__title" id="generate-panel-heading">
              Infrastructure Sustainability Report
            </h2>
          </div>

          <p className="reports-panel__desc">
            This report summarises all active recommendations, projected cost and energy savings,
            and estimated CO₂ reductions across your infrastructure.
            Generation may take a few seconds.
          </p>

          <div className="reports-panel__action">
            {(genStatus === 'idle' || genStatus === 'loading') && (
              <GenerateReportButton
                onGenerate={handleGenerate}
                status={genStatus}
                disabled={genStatus === 'loading'}
              />
            )}

            {/* Error inline */}
            {genStatus === 'error' && (
              <div className="reports-error" role="alert" aria-live="assertive">
                <div className="reports-error__message">
                  <AlertIcon />
                  <span>
                    Unable to generate report. Please try again.
                    {errorMsg && (
                      <span className="reports-error__detail"> — {errorMsg}</span>
                    )}
                  </span>
                </div>
                <button
                  className="btn btn--outline"
                  onClick={handleRetry}
                  id="retry-generate-btn"
                  aria-label="Try generating the report again"
                >
                  <RetryIcon />
                  Try again
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Success panel ── */}
        {genStatus === 'success' && report && (
          <section
            className="reports-panel reports-panel--success"
            aria-labelledby="report-success-heading"
            aria-live="polite"
          >
            <div className="reports-success__header">
              <CheckIcon />
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
                <dd className="reports-meta__value">{new Date(report.generatedAt).toLocaleString()}</dd>
              </div>
              <div className="reports-meta__row">
                <dt className="reports-meta__label">Report ID</dt>
                <dd className="reports-meta__value">{report.id}</dd>
              </div>
            </dl>

            <p className="reports-mock-notice" aria-label="Mock data notice">
              ⚠ This download contains mock placeholder data — real report generation requires backend integration.
            </p>

            <DownloadLink label="Download report (mock)" report={report} />
          </section>
        )}

      </div>
    </main>
  );
}
