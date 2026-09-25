/**
 * StatCard.jsx — VerdeCloud Overview Stat Card
 *
 * Displays a single KPI metric with:
 *  - Icon
 *  - Title
 *  - Value + unit
 *  - Change indicator (% vs previous period)
 *  - Trend direction (up/down) with color coding
 *
 * Props:
 *  stat: object from mockData.overviewStats (or API response with same shape)
 *
 * Change color logic:
 *  - For energy/CO2/cost: going DOWN is green (good)
 *  - For efficiency: going UP is green (good)
 *  - The `trend` field controls this: 'down' + negative change = good
 */

import './StatCard.css';

// ── Icon map ──────────────────────────────────────────────────
function StatIcon({ name, size = 20 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (name) {
    case 'zap':
      return (
        <svg {...props}>
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...props}>
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case 'dollar':
      return (
        <svg {...props}>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'cpu':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      );
    default:
      return null;
  }
}

// ── Trend arrow ───────────────────────────────────────────────
function TrendArrow({ direction }) {
  if (direction === 'up') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="18,15 12,9 6,15" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );
}

// Determine whether a change is "good" (green) or "bad" (red)
function resolveChangeVariant(change, trend) {
  const isImprovement =
    (trend === 'down' && change < 0) ||
    (trend === 'up' && change > 0);
  return isImprovement ? 'good' : 'bad';
}

// ── StatCard ──────────────────────────────────────────────────
export default function StatCard({ stat }) {
  const {
    title,
    value,
    unit,
    change,
    changeLabel,
    trend,
    icon,
  } = stat;

  const absChange = Math.abs(change).toFixed(1);
  const variant = resolveChangeVariant(change, trend);
  const trendDirection = change >= 0 ? 'up' : 'down';

  return (
    <article className={`stat-card stat-card--${icon}`} aria-label={`${title}: ${value}${unit}`}>
      {/* Icon badge */}
      <div className="stat-card__icon-wrap" aria-hidden="true">
        <StatIcon name={icon} size={18} />
      </div>

      {/* Title */}
      <p className="stat-card__title">{title}</p>

      {/* Value */}
      <div className="stat-card__value-row">
        <span className="stat-card__value">{value}</span>
        {unit && <span className="stat-card__unit">{unit}</span>}
      </div>

      {/* Change indicator */}
      <div className={`stat-card__change stat-card__change--${variant}`}>
        <TrendArrow direction={trendDirection} />
        <span>{absChange}%</span>
        <span className="stat-card__change-label">{changeLabel}</span>
      </div>
    </article>
  );
}
