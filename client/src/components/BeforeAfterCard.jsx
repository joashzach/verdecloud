/**
 * BeforeAfterCard.jsx — VerdeCloud Optimization Impact Comparison
 *
 * Redesigned MetricRow: instead of text + progress bar, each metric
 * now shows two horizontal bars side by side (Before / After),
 * normalized so the larger value occupies full width.
 * This makes the comparison immediately intuitive at a glance.
 *
 * Props:
 *  data: object from mockData.beforeAfterData
 */

import './BeforeAfterCard.css';

// ── Format values for display ─────────────────────────────────
function formatValue(value, metric) {
  const prefix = metric.prefix || '';
  if (typeof value !== 'number') return `${prefix}${value}`;
  if (metric.isINR) {
    if (value >= 100000) return `${prefix}${(value / 100000).toFixed(2)}L`;
    if (value >= 1000)   return `${prefix}${(value / 1000).toFixed(1)}K`;
    return `${prefix}${value}`;
  }
  if (value >= 1000) return `${prefix}${value.toLocaleString('en-IN')}`;
  return `${prefix}${value}`;
}

// ── Compute improvement percentage ────────────────────────────
function computeImprovement(before, after, lowerIsBetter) {
  if (lowerIsBetter) return ((before - after) / before) * 100;
  return ((after - before) / before) * 100;
}

// ── Single metric row — visual bar comparison ─────────────────
function MetricRow({ metric, before, after }) {
  const beforeVal = before[metric.key];
  const afterVal  = after[metric.key];
  const improvement = computeImprovement(beforeVal, afterVal, metric.lowerIsBetter);
  const isImproved  = improvement > 0;
  const absImprovement = Math.abs(improvement).toFixed(1);

  // Normalize so the larger value = 100% bar width
  const maxVal      = Math.max(beforeVal, afterVal);
  const beforeWidth = ((beforeVal / maxVal) * 100).toFixed(1);
  const afterWidth  = ((afterVal  / maxVal) * 100).toFixed(1);

  const fBefore = formatValue(beforeVal, metric);
  const fAfter  = formatValue(afterVal,  metric);

  return (
    <div className="bac__metric-row">
      {/* Label + badge */}
      <div className="bac__metric-header">
        <span className="bac__metric-label">{metric.label}</span>
        <span
          className={`bac__metric-badge ${isImproved ? 'bac__metric-badge--good' : 'bac__metric-badge--neutral'}`}
          aria-label={`${absImprovement}% ${isImproved ? 'improvement' : 'decline'}`}
        >
          {isImproved ? '↓' : '↑'} {absImprovement}%
        </span>
      </div>

      {/* Visual bar comparison */}
      <div
        className="bac__bars"
        role="img"
        aria-label={`${metric.label}: before ${fBefore}, after ${fAfter}`}
      >
        {/* Before */}
        <div className="bac__bar-row">
          <span className="bac__bar-label">Before</span>
          <div className="bac__bar-track">
            <div className="bac__bar bac__bar--before" style={{ width: `${beforeWidth}%` }} />
          </div>
          <span className="bac__bar-value bac__bar-value--muted">{fBefore}</span>
        </div>

        {/* After */}
        <div className="bac__bar-row">
          <span className="bac__bar-label">After</span>
          <div className="bac__bar-track">
            <div
              className={`bac__bar ${isImproved ? 'bac__bar--good' : 'bac__bar--bad'}`}
              style={{ width: `${afterWidth}%` }}
            />
          </div>
          <span
            className={`bac__bar-value ${isImproved ? 'bac__bar-value--good' : 'bac__bar-value--bad'}`}
          >
            {fAfter}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── BeforeAfterCard ────────────────────────────────────────────
export default function BeforeAfterCard({ data }) {
  const { title, subtitle, before, after, metrics } = data;

  const costSaved = before.cloudCost - after.cloudCost;
  const co2Saved  = (before.co2Emissions - after.co2Emissions).toFixed(2);
  const effGain   = after.efficiency - before.efficiency;

  return (
    <article className="bac" aria-label="Before and after optimization comparison">

      {/* Header */}
      <div className="bac__header">
        <div>
          <h2 className="bac__title">{title}</h2>
          <p className="bac__subtitle">{subtitle}</p>
        </div>
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

      {/* Period chips */}
      <div className="bac__period-labels" aria-hidden="true">
        <span className="bac__period-chip bac__period-chip--before">{before.period}</span>
        <span className="bac__period-divider">→</span>
        <span className="bac__period-chip bac__period-chip--after">{after.period}</span>
      </div>

      {/* Metric rows */}
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
