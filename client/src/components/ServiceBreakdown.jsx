/**
 * ServiceBreakdown.jsx — VerdeCloud Breakdown by Cloud Service
 *
 * Horizontal bar chart showing which cloud services contribute most
 * to CO₂ emissions and cost. Toggle between CO₂ and Cost views.
 *
 * Props:
 *  data: object from mockData.serviceBreakdownData
 *
 * Reusable by Persons 2 & 3 if they want to show per-instance
 * or per-region breakdowns — just pass different data.
 */

import { useState } from 'react';
import './ServiceBreakdown.css';

// ── Service icon map ──────────────────────────────────────────
function ServiceIcon({ id, color }) {
  const p = {
    width: 14, height: 14,
    viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: '2',
    strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  switch (id) {
    case 'compute':
      return <svg {...p}><rect x="2" y="3" width="20" height="5" rx="1" /><rect x="2" y="10" width="20" height="5" rx="1" /><rect x="2" y="17" width="20" height="5" rx="1" /></svg>;
    case 'storage':
      return <svg {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
    case 'database':
      return <svg {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
    case 'networking':
      return <svg {...p}><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-4h14v4" /><path d="M12 12V8" /></svg>;
    default:
      return <svg {...p}><circle cx="12" cy="12" r="9" /></svg>;
  }
}

export default function ServiceBreakdown({ data }) {
  const [activeMetric, setActiveMetric] = useState('co2');

  const isC02 = activeMetric === 'co2';

  // Sort by active metric descending
  const sorted = [...data.services].sort(
    (a, b) => (isC02 ? b.co2 - a.co2 : b.cost - a.cost)
  );

  const total  = sorted.reduce((s, svc) => s + (isC02 ? svc.co2 : svc.cost), 0);
  const maxVal = sorted[0] ? (isC02 ? sorted[0].co2 : sorted[0].cost) : 1;

  function formatMetricValue(svc) {
    const v = isC02 ? svc.co2 : svc.cost;
    if (isC02) return `${v.toFixed(2)} tCO₂e`;
    return v >= 100000
      ? `₹${(v / 100000).toFixed(2)}L`
      : `₹${(v / 1000).toFixed(0)}K`;
  }

  return (
    <article className="sb" aria-label="Cloud service breakdown">

      {/* Header */}
      <div className="sb__header">
        <div>
          <h2 className="sb__title">{data.title}</h2>
          <p className="sb__subtitle">{data.subtitle}</p>
        </div>

        {/* Toggle */}
        <div className="sb__toggle" role="group" aria-label="Select metric">
          <button
            className={`sb__toggle-btn ${isC02 ? 'sb__toggle-btn--active' : ''}`}
            onClick={() => setActiveMetric('co2')}
            aria-pressed={isC02}
          >
            CO₂
          </button>
          <button
            className={`sb__toggle-btn ${!isC02 ? 'sb__toggle-btn--active' : ''}`}
            onClick={() => setActiveMetric('cost')}
            aria-pressed={!isC02}
          >
            Cost
          </button>
        </div>
      </div>

      {/* Service rows */}
      <div className="sb__list" role="list">
        {sorted.map((svc) => {
          const val      = isC02 ? svc.co2 : svc.cost;
          const pct      = ((val / total) * 100).toFixed(1);
          const barWidth = ((val / maxVal) * 100).toFixed(1);

          return (
            <div key={svc.id} className="sb__row" role="listitem">
              {/* Service name + icon */}
              <div className="sb__row-info">
                <span className="sb__dot" style={{ background: svc.color }} aria-hidden="true" />
                <ServiceIcon id={svc.id} color={svc.color} />
                <span className="sb__row-name">{svc.name}</span>
              </div>

              {/* Bar */}
              <div className="sb__bar-area">
                <div className="sb__track" role="progressbar" aria-valuenow={parseFloat(barWidth)} aria-valuemin={0} aria-valuemax={100}>
                  <div
                    className="sb__fill"
                    style={{ width: `${barWidth}%`, background: svc.color }}
                  />
                </div>
              </div>

              {/* Percentage */}
              <span className="sb__pct">{pct}%</span>

              {/* Absolute value */}
              <span className="sb__val">{formatMetricValue(svc)}</span>
            </div>
          );
        })}
      </div>

      {/* Total row */}
      <div className="sb__total">
        <span className="sb__total-label">Total</span>
        <span className="sb__total-value">
          {isC02
            ? `${total.toFixed(2)} tCO₂e`
            : `₹${(total / 100000).toFixed(2)}L`
          }
        </span>
      </div>
    </article>
  );
}
