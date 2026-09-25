/**
 * StatCard.jsx — VerdeCloud Overview Stat Card
 *
 * Displays a single KPI metric with:
 *  - Icon (top-left) + inline sparkline (top-right, last 7 days)
 *  - Title
 *  - Value + unit
 *  - Change indicator (% vs previous period)
 *
 * Props:
 *  stat: object from mockData.overviewStats
 *        Includes accentColor and sparklineData[7] for the sparkline.
 */

import { useId } from 'react';
import './StatCard.css';

// ── Inline SVG Sparkline ──────────────────────────────────────
function Sparkline({ data, color, id }) {
  const W = 72;
  const H = 36;
  const PAD = 3;
  const chartH = H - PAD * 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: PAD + chartH - ((v - min) / range) * chartH,
  }));

  // Smooth cubic bezier path
  const linePath = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    const prev = pts[i - 1];
    const cx1 = (prev.x + (pt.x - prev.x) * 0.5).toFixed(1);
    const cy1 = prev.y.toFixed(1);
    const cx2 = (pt.x - (pt.x - prev.x) * 0.5).toFixed(1);
    const cy2 = pt.y.toFixed(1);
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, '');

  const last = pts[pts.length - 1];
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;
  const gradId = `sg-${id}`;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className="stat-card__sparkline"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradId})`} />
      {/* Line */}
      <path
        d={linePath}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last-point dot */}
      <circle cx={last.x} cy={last.y} r="2.5" fill={color} />
    </svg>
  );
}

// ── Icon map ──────────────────────────────────────────────────
function StatIcon({ name, size = 18 }) {
  const props = {
    width: size, height: size,
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
      return <svg {...props}><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" /></svg>;
    case 'cloud':
      return <svg {...props}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>;
    case 'rupee':
    case 'indian-rupee':
      return (
        <svg {...props}>
          <path d="M6 3h12" />
          <path d="M6 8h12" />
          <path d="m6 13 8.5 8" />
          <path d="M6 13h3" />
          <path d="M9 13c6.667 0 6.667-10 0-10" />
        </svg>
      );
    case 'dollar':
      return <svg {...props}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
    case 'cpu':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      );
    default: return null;
  }
}

// ── Trend arrow ───────────────────────────────────────────────
function TrendArrow({ direction }) {
  const pts = direction === 'up' ? '18,15 12,9 6,15' : '6,9 12,15 18,9';
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points={pts} />
    </svg>
  );
}

function resolveChangeVariant(change, trend) {
  const isImprovement = (trend === 'down' && change < 0) || (trend === 'up' && change > 0);
  return isImprovement ? 'good' : 'bad';
}

// ── StatCard ──────────────────────────────────────────────────
export default function StatCard({ stat }) {
  const uid = useId().replace(/:/g, '');
  const { title, value, unit, change, changeLabel, trend, icon, accentColor, sparklineData } = stat;

  const absChange = Math.abs(change).toFixed(1);
  const variant = resolveChangeVariant(change, trend);
  const trendDirection = change >= 0 ? 'up' : 'down';

  return (
    <article
      className="stat-card"
      style={{ '--accent': accentColor }}
      aria-label={`${title}: ${value}${unit}`}
    >
      {/* ── Top row: icon + sparkline ── */}
      <div className="stat-card__top">
        <div className="stat-card__icon-wrap" aria-hidden="true">
          <StatIcon name={icon} size={18} />
        </div>
        {sparklineData && (
          <Sparkline data={sparklineData} color={accentColor} id={uid} />
        )}
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

      {/* Subtle 7-day label under sparkline area */}
      <span className="stat-card__spark-label" aria-hidden="true">7-day</span>
    </article>
  );
}
