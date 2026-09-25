/**
 * RecommendationCard.jsx
 * ----------------------
 * Density pass v2 — all 8 visual refinements applied:
 *  1. Priority stripe — 4px left-edge bar colored to priority
 *  2. Header subtitle — instanceId · region in mono/muted text
 *  3. Status + relative time — "NEW · Detected 2h ago" top-right
 *  4. Trigger-metric chip — "P95 CPU: 28%" pill below description
 *  5. Sparkline — inline SVG trend line inside the comparison box
 *  6. One-row layout — comparison box + metrics side-by-side
 *  7. Footer — "View details" left, "Mark as reviewed" right
 *  8. Spacing — consistent padding, tighter internal gaps
 *
 * State logic, filtering, and data model untouched.
 * Card border-radius, shadow, background preserved from prior pass.
 */

import { useState } from 'react';
import './RecommendationCard.css';

// ── Priority config ───────────────────────────────────────────
const PRIORITY = {
  high: {
    className: 'priority-badge priority-badge--high',
    stripeColor: 'var(--color-priority-high)',
    label: 'High',
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  medium: {
    className: 'priority-badge priority-badge--medium',
    stripeColor: 'var(--color-priority-medium)',
    label: 'Medium',
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  low: {
    className: 'priority-badge priority-badge--low',
    stripeColor: 'var(--color-priority-low)',
    label: 'Low',
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20,6 9,17 4,12" />
      </svg>
    ),
  },
};

// ── Metric color map — exact colors from TrendChart ───────────
const METRIC_COLORS = {
  cost:   '#6366F1',
  energy: '#F59E0B',
  carbon: '#16A34A',
};

// ── timeAgo — lightweight relative-time helper ────────────────
function timeAgo(isoString) {
  if (!isoString) return '';
  const diffMs = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days  = Math.floor(diffMs / 86400000);
  if (days  >= 1) return `${days}d ago`;
  if (hours >= 1) return `${hours}h ago`;
  if (mins  >= 1) return `${mins}m ago`;
  return 'just now';
}

// ── Inline sparkline SVG ──────────────────────────────────────
function Sparkline({ data, color = '#9CA3AF', width = 72, height = 28 }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * w;
    const y = pad + (1 - (v - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className="rec-card__sparkline"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── ArrowUp (impact delta) ────────────────────────────────────
function ArrowUp({ color }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="18,15 12,9 6,15" />
    </svg>
  );
}

// ── ArrowRight (comparison separator) ────────────────────────
function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rec-card__arrow" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

// ── Lightbulb icon ────────────────────────────────────────────
function LightbulbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.2 6l-.8.6V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.4l-.8-.6A7 7 0 0 1 12 2z" />
      <path d="M9 21h6" />
    </svg>
  );
}

// ── CheckMark icon (mark reviewed) ───────────────────────────
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

// ── Impact metrics column ─────────────────────────────────────
function ImpactMetrics({ savings }) {
  const metrics = [
    { key: 'cost',   label: 'Cost saving',  value: savings.cost,   color: METRIC_COLORS.cost },
    { key: 'energy', label: 'Energy saving', value: savings.energy, color: METRIC_COLORS.energy },
    { key: 'carbon', label: 'CO₂ reduction', value: savings.carbon, color: METRIC_COLORS.carbon },
  ];

  return (
    <div className="rec-card__metrics" role="list" aria-label="Estimated savings impact">
      {metrics.map(({ key, label, value, color }) => (
        <div key={key} className="rec-card__metric" role="listitem">
          <span
            className="rec-card__metric-delta"
            style={{ color }}
            aria-label={`${label}: ${value > 0 ? '+' : ''}${value}%`}
          >
            {value > 0 && <ArrowUp color={color} />}
            {value > 0 ? `+${value}` : value}%
          </span>
          <span className="rec-card__metric-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main card ─────────────────────────────────────────────────
export default function RecommendationCard({
  id,
  title,
  description,
  priority,
  instanceId,
  region,
  currentInstance,
  recommendedInstance,
  estimatedSavings,
  status: initialStatus,
  detectedAt,
  triggerMetric,
  sparklineData,
  onViewDetails,
}) {
  // Local-only status toggle (change #7 — no backend call)
  const [status, setStatus] = useState(initialStatus);

  const priorityCfg  = PRIORITY[priority] ?? PRIORITY.low;
  const isTerminate  = recommendedInstance === 'terminated';
  const isReviewed   = status === 'reviewed';
  const relTime      = timeAgo(detectedAt);

  // Sparkline stroke color matches priority stripe for visual cohesion
  const sparkColor = isTerminate ? '#DC2626' :
    priority === 'high' ? '#DC2626' :
    priority === 'medium' ? '#F59E0B' : '#16A34A';

  return (
    <article
      className={`rec-card rec-card--${priority}`}
      aria-label={`Recommendation: ${title}`}
      style={{ '--stripe-color': priorityCfg.stripeColor }}
    >
      {/* ── 1. Priority stripe ── */}
      <div className="rec-card__stripe" aria-hidden="true" />

      <div className="rec-card__inner">
        {/* ── Header ── */}
        <div className="rec-card__header">
          <div className="rec-card__header-left">
            {/* Icon badge */}
            <div className="rec-card__icon-badge" aria-hidden="true">
              <LightbulbIcon />
            </div>

            <div className="rec-card__title-block">
              <span className={priorityCfg.className} aria-label={`Priority: ${priorityCfg.label}`}>
                {priorityCfg.icon}
                {priorityCfg.label}
              </span>
              <h2 className="rec-card__title">{title}</h2>
              {/* ── 2. Instance + region subtitle ── */}
              {instanceId && region && (
                <span className="rec-card__subtitle" aria-label={`Instance: ${instanceId}, region: ${region}`}>
                  {instanceId} · {region}
                </span>
              )}
            </div>
          </div>

          {/* ── 3. Status + relative time ── */}
          <span
            className={`rec-card__status-tag ${isReviewed ? 'rec-card__status-tag--reviewed' : ''}`}
            aria-label={`Status: ${status}${relTime ? `, detected ${relTime}` : ''}`}
          >
            {isReviewed ? 'REVIEWED' : 'NEW'}
            {relTime && <span className="rec-card__status-time">· Detected {relTime}</span>}
          </span>
        </div>

        {/* ── Description ── */}
        <p className="rec-card__description">{description}</p>

        {/* ── 4. Trigger-metric stat chip ── */}
        {triggerMetric && (
          <div className="rec-card__trigger-chip" aria-label={`Trigger metric: ${triggerMetric.label} ${triggerMetric.value}`}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
            </svg>
            <span className="rec-card__trigger-label">{triggerMetric.label}:</span>
            <span className="rec-card__trigger-value">{triggerMetric.value}</span>
          </div>
        )}

        {/* ── 6. One-row: comparison box + impact metrics ── */}
        <div className="rec-card__data-row">
          {/* ── Comparison box (left) with sparkline ── */}
          <div
            className="rec-card__instances"
            aria-label={`Change from ${currentInstance} to ${recommendedInstance}`}
          >
            <div className="rec-card__instance-block">
              <span className="rec-card__instance-label">Current</span>
              <span className="rec-card__instance-value">{currentInstance}</span>
            </div>

            <ArrowRight />

            <div className="rec-card__instance-block">
              <span className="rec-card__instance-label">Recommended</span>
              <span className={`rec-card__instance-value ${isTerminate ? 'rec-card__instance-value--terminate' : 'rec-card__instance-value--good'}`}>
                {recommendedInstance}
              </span>
            </div>

            {/* ── 5. Sparkline ── */}
            {sparklineData && (
              <div className="rec-card__sparkline-wrap" aria-hidden="true">
                <Sparkline data={sparklineData} color={sparkColor} width={72} height={28} />
              </div>
            )}
          </div>

          {/* ── Impact metrics (right) ── */}
          <ImpactMetrics savings={estimatedSavings} />
        </div>

        {/* ── 7. Footer — two actions spread across the row ── */}
        <div className="rec-card__footer">
          <button
            className="btn btn--outline"
            onClick={() => onViewDetails?.(id)}
            aria-label={`View details for: ${title}`}
            id={`view-details-${id}`}
          >
            View details
          </button>

          {!isReviewed && (
            <button
              className="rec-card__mark-reviewed"
              onClick={() => setStatus('reviewed')}
              aria-label={`Mark "${title}" as reviewed`}
              id={`mark-reviewed-${id}`}
            >
              <CheckIcon />
              Mark as reviewed
            </button>
          )}

          {isReviewed && (
            <span className="rec-card__reviewed-badge" aria-label="This recommendation has been reviewed">
              <CheckIcon />
              Reviewed
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
