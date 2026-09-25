/**
 * RecommendationCard.jsx
 * ----------------------
 * Card component for a single infrastructure recommendation.
 * Styled to match the Overview page's card language exactly:
 *  - Same shadow-md + radius-md + border as StatCard
 *  - Icon badge in top-left (same 36px rounded square as StatCard)
 *  - Priority badge as a tinted pill (never saturated fill)
 *  - Instance comparison in a subtle inset tray
 *  - Impact metrics color-coded with same colors as TrendChart legend:
 *      cost   → #6366F1 (indigo)
 *      energy → #F59E0B (amber)
 *      CO₂    → #16A34A (green)
 *  - Delta arrow + value — same pattern as StatCard change indicator
 *
 * All content via props — no hard-coded recommendation text.
 */

import './RecommendationCard.css';

// ── Priority config ────────────────────────────────────────────
const PRIORITY = {
  high: {
    className: 'priority-badge priority-badge--high',
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
    label: 'Medium',
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  low: {
    className: 'priority-badge priority-badge--low',
    label: 'Low',
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20,6 9,17 4,12" />
      </svg>
    ),
  },
};

// ── Arrow icons — same as StatCard's TrendArrow ───────────────
function ArrowUp({ color }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="18,15 12,9 6,15" />
    </svg>
  );
}

// ── Lightbulb icon (card header) ─────────────────────────────
function LightbulbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.2 6l-.8.6V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.4l-.8-.6A7 7 0 0 1 12 2z" />
      <path d="M9 21h6" />
    </svg>
  );
}

// ── Arrow right (instance comparison) ────────────────────────
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rec-card__arrow" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

// ── Metric color map — exact colors from TrendChart METRICS ──
const METRIC_COLORS = {
  cost:   '#6366F1',
  energy: '#F59E0B',
  carbon: '#16A34A',
};

// ── Impact metrics — arrow + value, color-coded ───────────────
function ImpactMetrics({ savings }) {
  const metrics = [
    { key: 'cost',   label: 'Cost saving',   value: savings.cost,   color: METRIC_COLORS.cost },
    { key: 'energy', label: 'Energy saving',  value: savings.energy, color: METRIC_COLORS.energy },
    { key: 'carbon', label: 'CO₂ reduction',  value: savings.carbon, color: METRIC_COLORS.carbon },
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
  currentInstance,
  recommendedInstance,
  estimatedSavings,
  status,
  onViewDetails,
}) {
  const priorityCfg = PRIORITY[priority] ?? PRIORITY.low;
  const isTerminate = recommendedInstance === 'terminated';

  return (
    <article className="rec-card" aria-label={`Recommendation: ${title}`}>
      {/* ── Header ── */}
      <div className="rec-card__header">
        <div className="rec-card__header-left">
          {/* Icon badge — same treatment as StatCard */}
          <div className="rec-card__icon-badge" aria-hidden="true">
            <LightbulbIcon />
          </div>

          <div className="rec-card__title-block">
            <span className={priorityCfg.className} aria-label={`Priority: ${priorityCfg.label}`}>
              {priorityCfg.icon}
              {priorityCfg.label}
            </span>
            <h2 className="rec-card__title">{title}</h2>
          </div>
        </div>

        {/* Status — unobtrusive, top-right */}
        <span className="rec-card__status" aria-label={`Status: ${status}`}>
          {status === 'new' ? '● new' : '○ reviewed'}
        </span>
      </div>

      {/* ── Description ── */}
      <p className="rec-card__description">{description}</p>

      <hr className="divider" />

      {/* ── Instance comparison ── */}
      <div className="rec-card__instances" aria-label={`Change from ${currentInstance} to ${recommendedInstance}`}>
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
      </div>

      {/* ── Impact metrics ── */}
      <ImpactMetrics savings={estimatedSavings} />

      {/* ── Footer ── */}
      <div className="rec-card__footer">
        <button
          className="btn btn--outline"
          onClick={() => onViewDetails?.(id)}
          aria-label={`View details for: ${title}`}
          id={`view-details-${id}`}
        >
          View details
        </button>
      </div>
    </article>
  );
}
