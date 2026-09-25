/**
 * SustainabilityGoal.jsx — VerdeCloud Quarterly Emissions Target
 *
 * Compact KPI widget showing progress toward a quarterly CO₂
 * reduction goal. Uses a circular SVG ring for the main visual,
 * supported by stat rows showing current / achieved / remaining.
 *
 * Props:
 *  data: object from mockData.sustainabilityGoal
 *
 * Progress formula: (start - current) / (start - target) × 100
 */

import './SustainabilityGoal.css';

// ── Circular progress ring ────────────────────────────────────
function RingProgress({ pct, size = 100, strokeW = 9, color = '#16A34A' }) {
  const r     = (size - strokeW) / 2;
  const circ  = 2 * Math.PI * r;
  const dash  = Math.min((pct / 100) * circ, circ);
  const cx    = size / 2;
  const cy    = size / 2;

  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="sg__ring"
    >
      {/* Track */}
      <circle cx={cx} cy={cy} r={r}
        fill="none" stroke="var(--color-border)"
        strokeWidth={strokeW}
      />
      {/* Progress arc */}
      <circle cx={cx} cy={cy} r={r}
        fill="none" stroke={color}
        strokeWidth={strokeW}
        strokeDasharray={`${dash.toFixed(2)} ${circ.toFixed(2)}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.25,0.46,0.45,0.94)' }}
      />
      {/* Center label */}
      <text
        x={cx} y={cy - 6}
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill="var(--color-text)"
        fontFamily="Inter, sans-serif"
      >
        {Math.round(pct)}%
      </text>
      <text
        x={cx} y={cy + 11}
        textAnchor="middle"
        fontSize="10"
        fill="var(--color-text-muted)"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
      >
        achieved
      </text>
    </svg>
  );
}

// ── Leaf icon ─────────────────────────────────────────────────
function LeafIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="var(--color-primary)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 4 13c0-4 3-7 7-9 4 2 7 5 7 9a7 7 0 0 1-7 7z" />
      <path d="M11 20V9" />
    </svg>
  );
}

// ── SustainabilityGoal ────────────────────────────────────────
export default function SustainabilityGoal({ data }) {
  const { title, description, unit, targetValue, currentValue, startValue, deadline } = data;

  // Progress: how much of the gap (start→target) has been closed
  const gap      = startValue - targetValue;
  const closed   = startValue - currentValue;
  const pct      = Math.min(Math.max((closed / gap) * 100, 0), 100);
  const isOnTrack = pct >= 50;

  const achieved  = closed.toFixed(2);
  const remaining = (currentValue - targetValue).toFixed(2);

  return (
    <article className="sg" aria-label="Sustainability goal progress">

      {/* Header */}
      <div className="sg__header">
        <div className="sg__header-left">
          <div className="sg__icon-wrap"><LeafIcon /></div>
          <div>
            <h2 className="sg__title">{title}</h2>
            <p className="sg__desc">{description}</p>
          </div>
        </div>
        <span className={`sg__status ${isOnTrack ? 'sg__status--good' : 'sg__status--risk'}`}>
          {isOnTrack ? '✓ On Track' : '⚠ At Risk'}
        </span>
      </div>

      {/* Ring + stats side-by-side */}
      <div className="sg__body">
        <RingProgress pct={pct} color="#16A34A" />

        <div className="sg__stats">
          <div className="sg__stat">
            <span className="sg__stat-label">Current</span>
            <span className="sg__stat-value">{currentValue} {unit}</span>
          </div>
          <div className="sg__stat">
            <span className="sg__stat-label">Target</span>
            <span className="sg__stat-value sg__stat-value--target">{targetValue} {unit}</span>
          </div>
          <div className="sg__stat">
            <span className="sg__stat-label">Reduced</span>
            <span className="sg__stat-value sg__stat-value--good">−{achieved} {unit}</span>
          </div>
          <div className="sg__stat">
            <span className="sg__stat-label">Remaining</span>
            <span className="sg__stat-value sg__stat-value--muted">−{remaining} {unit}</span>
          </div>
        </div>
      </div>

      {/* Progress track with start / target labels */}
      <div className="sg__bar-section">
        <div className="sg__bar-track">
          <div
            className="sg__bar-fill"
            style={{ width: `${pct.toFixed(1)}%` }}
            role="progressbar"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${Math.round(pct)}% of emissions reduction target achieved`}
          />
        </div>
        <div className="sg__bar-labels">
          <span>{startValue} {unit}</span>
          <span className="sg__target-label">Target {targetValue} {unit}</span>
        </div>
      </div>

      {/* Deadline */}
      <p className="sg__deadline">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Due {deadline}
      </p>
    </article>
  );
}
