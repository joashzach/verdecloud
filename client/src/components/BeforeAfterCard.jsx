/**
 * BeforeAfterCard.jsx — VerdeCloud Optimization Impact Comparison
 *
 * Visually compares "Before" vs "After" applying VerdeCloud recommendations.
 * Shows each metric as a side-by-side row with a progress bar showing
 * the improvement magnitude.
 *
 * Props:
 *  data: object from mockData.beforeAfterData (or API response same shape)
 */

import './BeforeAfterCard.css';

// ── Format values for display ─────────────────────────────────
function formatValue(value, metric) {
  const prefix = metric.prefix || '';
  if (typeof value !== 'number') return `${prefix}${value}`;

  // INR: show in lakhs (L) for values ≥ 1,00,000
  if (metric.isINR) {
    if (value >= 100000) return `${prefix}${(value / 100000).toFixed(2)}L`;
    if (value >= 1000)   return `${prefix}${(value / 1000).toFixed(1)}K`;
    return `${prefix}${value}`;
  }

  // Default: use Indian locale for any number ≥ 1000
  if (value >= 1000) return `${prefix}${value.toLocaleString('en-IN')}`;
  return `${prefix}${value}`;
}

// ── Compute improvement percentage ────────────────────────────
function computeImprovement(before, after, lowerIsBetter) {
  if (lowerIsBetter) {
    return ((before - after) / before) * 100;
  }
  return ((after - before) / before) * 100;
}

// ── Single metric row ──────────────────────────────────────────
function MetricRow({ metric, before, after }) {
  const beforeVal = before[metric.key];
  const afterVal = after[metric.key];
  const improvement = computeImprovement(beforeVal, afterVal, metric.lowerIsBetter);
  const isImproved = improvement > 0;
  const absImprovement = Math.abs(improvement).toFixed(1);

  // Progress bar: how much of "before" has been saved/improved
  const barFill = Math.min(Math.abs(improvement), 100);

  return (
    <div className="bac__metric-row">
      <div className="bac__metric-header">
        <span className="bac__metric-label">{metric.label}</span>
        <span className={`bac__metric-badge ${isImproved ? 'bac__metric-badge--good' : 'bac__metric-badge--neutral'}`}>
          {isImproved ? '↓' : '↑'} {absImprovement}%
        </span>
      </div>

      {/* Values */}
      <div className="bac__metric-values">
        <div className="bac__metric-col">
          <span className="bac__metric-period">Before</span>
          <span className="bac__metric-val bac__metric-val--before">
            {formatValue(beforeVal, metric)}
            <span className="bac__metric-unit"> {metric.unit}</span>
          </span>
        </div>

        <div className="bac__metric-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12,5 19,12 12,19" />
          </svg>
        </div>

        <div className="bac__metric-col">
          <span className="bac__metric-period">After</span>
          <span className={`bac__metric-val ${isImproved ? 'bac__metric-val--after-good' : 'bac__metric-val--after-bad'}`}>
            {formatValue(afterVal, metric)}
            <span className="bac__metric-unit"> {metric.unit}</span>
          </span>
        </div>
      </div>

      {/* Progress bar showing improvement */}
      <div className="bac__progress-track" role="progressbar" aria-valuenow={barFill} aria-valuemin="0" aria-valuemax="100" aria-label={`${metric.label} improvement: ${absImprovement}%`}>
        <div
          className={`bac__progress-fill ${isImproved ? 'bac__progress-fill--good' : 'bac__progress-fill--bad'}`}
          style={{ width: `${barFill}%` }}
        />
      </div>
    </div>
  );
}

// ── BeforeAfterCard ────────────────────────────────────────────
export default function BeforeAfterCard({ data }) {
  const { title, subtitle, before, after, metrics } = data;

  // Overall summary: total cost saved, CO2 reduced
  const costSaved = before.cloudCost - after.cloudCost;
  const co2Saved = (before.co2Emissions - after.co2Emissions).toFixed(2);
  const effGain = after.efficiency - before.efficiency;

  return (
    <article className="bac" aria-label="Before and after optimization comparison">
      {/* Card header */}
      <div className="bac__header">
        <div>
          <h2 className="bac__title">{title}</h2>
          <p className="bac__subtitle">{subtitle}</p>
        </div>

        {/* Summary badges */}
        <div className="bac__summary-badges">
          <span className="badge badge--success" title="Monthly cost saved">
            ₹{(costSaved / 100000).toFixed(2)}L saved/mo
          </span>
          <span className="badge badge--success" title="CO2 reduced">
            {co2Saved}t CO₂ reduced
          </span>
          <span className="badge badge--success" title="Efficiency gain">
            +{effGain}% efficiency
          </span>
        </div>
      </div>

      {/* Period comparison labels */}
      <div className="bac__period-labels" aria-hidden="true">
        <span className="bac__period-chip bac__period-chip--before">{before.period}</span>
        <span className="bac__period-divider">→</span>
        <span className="bac__period-chip bac__period-chip--after">{after.period}</span>
      </div>

      {/* Metrics */}
      <div className="bac__metrics">
        {metrics.map((metric) => (
          <MetricRow
            key={metric.key}
            metric={metric}
            before={before}
            after={after}
          />
        ))}
      </div>
    </article>
  );
}
