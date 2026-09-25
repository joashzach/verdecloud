/**
 * GenerateReportButton.jsx
 * ------------------------
 * Idle → loading → (success/error handled by parent) flow.
 * Uses btn--primary to match Overview's button style.
 * Spinner is a pure CSS animation, no lucide-react.
 */

export default function GenerateReportButton({ onGenerate, disabled = false, status = 'idle' }) {
  const isLoading = status === 'loading';

  return (
    <button
      id="generate-report-btn"
      className="btn btn--primary"
      onClick={onGenerate}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={isLoading ? 'Generating report, please wait' : 'Generate infrastructure sustainability report'}
    >
      {isLoading ? (
        <>
          {/* Spinner — CSS .spin animation from index.css */}
          <svg
            className="spin"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Generating…
        </>
      ) : (
        <>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Generate report
        </>
      )}
    </button>
  );
}
