/**
 * InstanceStatusBadge.jsx
 * -----------------------
 * Reusable status + efficiency badge components for the Instances feature.
 * Uses existing global badge tokens from index.css.
 */

// ── Status badge ──────────────────────────────────────────────
const STATUS_CONFIG = {
  running:  { label: 'Running',  className: 'badge inst-badge--running' },
  warning:  { label: 'Warning',  className: 'badge inst-badge--warning' },
  critical: { label: 'Critical', className: 'badge inst-badge--critical' },
  stopped:  { label: 'Stopped',  className: 'badge inst-badge--stopped' },
};

export function InstanceStatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.stopped;
  return (
    <span className={cfg.className} aria-label={`Status: ${cfg.label}`}>
      <span className="inst-badge__dot" aria-hidden="true" />
      {cfg.label}
    </span>
  );
}

// ── Efficiency badge ──────────────────────────────────────────
export function EfficiencyBadge({ value }) {
  const cls =
    value >= 80 ? 'badge inst-badge--eff-high' :
    value >= 50 ? 'badge inst-badge--eff-mid'  :
                  'badge inst-badge--eff-low';
  return (
    <span className={cls} aria-label={`Efficiency: ${value}%`}>
      {value}%
    </span>
  );
}

// ── Mini usage bar ────────────────────────────────────────────
export function UsageBar({ value, label }) {
  const cls =
    value >= 90 ? 'inst-bar__fill--critical' :
    value >= 70 ? 'inst-bar__fill--warning'  :
                  'inst-bar__fill--ok';
  return (
    <div className="inst-bar" aria-label={`${label}: ${value}%`}>
      <div
        className={`inst-bar__fill ${cls}`}
        style={{ width: `${Math.min(value, 100)}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
