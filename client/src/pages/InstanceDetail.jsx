/**
 * InstanceDetail.jsx — /instances/:id
 * -------------------------------------
 * Detail view for a single cloud instance.
 * Sections:
 *  1. Back navigation + page header (name, status, meta)
 *  2. Overview info card (type, region, provider, uptime, tags, launched)
 *  3. Sustainability metrics (energy, CO₂, cost, efficiency)
 *  4. Resource usage (CPU, memory, network, storage) with bars + sparklines
 *  5. Optimization notice (if applicable)
 */

import { useParams, useNavigate } from 'react-router-dom';
import { instances } from '../data/mockData';
import { InstanceStatusBadge, EfficiencyBadge } from '../components/InstanceStatusBadge';
import '../components/Instances.css';

// ── Inline sparkline for usage cards ──────────────────────────
function Sparkline({ data, color, label }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const W = 120, H = 28, pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = pad + (1 - (v - min) / range) * (H - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <div className="inst-sparkline-wrap" aria-label={`${label} 7-day trend`}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      </svg>
    </div>
  );
}

// ── Full usage bar ────────────────────────────────────────────
function FullBar({ value }) {
  const cls =
    value >= 90 ? 'inst-usage-bar-full__fill--critical' :
    value >= 70 ? 'inst-usage-bar-full__fill--warning'  :
                  'inst-usage-bar-full__fill--ok';
  return (
    <div className="inst-usage-bar-full">
      <div
        className={`inst-usage-bar-full__fill ${cls}`}
        style={{ width: `${Math.min(value, 100)}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

// ── Metric card ───────────────────────────────────────────────
function MetricCard({ label, value, unit, color, icon }) {
  return (
    <div className="inst-metric-card">
      <div className="inst-metric-card__icon" style={{ color }} aria-hidden="true">
        {icon}
      </div>
      <span className="inst-metric-card__label">{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="inst-metric-card__value" style={{ color }}>{value}</span>
        {unit && <span className="inst-metric-card__unit">{unit}</span>}
      </div>
    </div>
  );
}

// ── Usage card ────────────────────────────────────────────────
function UsageCard({ label, value, unit, sparkData, sparkColor }) {
  return (
    <div className="inst-usage-card">
      <div className="inst-usage-card__header">
        <span className="inst-usage-card__label">{label}</span>
        <span className="inst-usage-card__value">
          {value}{unit}
        </span>
      </div>
      <FullBar value={typeof value === 'number' ? value : 0} />
      {sparkData && (
        <Sparkline data={sparkData} color={sparkColor} label={label} />
      )}
    </div>
  );
}

// ── Overview row item ─────────────────────────────────────────
function OverviewItem({ label, value, mono }) {
  return (
    <div>
      <div className="inst-overview-item__label">{label}</div>
      <div className={mono ? 'inst-overview-item__mono' : 'inst-overview-item__value'}>
        {value}
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────
const EnergyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
  </svg>
);

const CO2Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
    <path d="M8 12s1-3 4-3 4 3 4 3-1 3-4 3-4-3-4-3z" />
  </svg>
);

const CostIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const EffIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
  </svg>
);

const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,19 5,12 12,5" />
  </svg>
);

const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ── Main page ─────────────────────────────────────────────────
export default function InstanceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const inst = instances.find(i => i.id === id);

  // Not found
  if (!inst) {
    return (
      <main className="page" id="instance-detail-page">
        <div className="container">
          <div className="inst-not-found">
            <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text)' }}>
              Instance not found
            </p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              No instance with ID <code>{id}</code> exists in the current data.
            </p>
            <button className="btn btn--outline" onClick={() => navigate('/instances')} style={{ marginTop: 'var(--space-4)' }}>
              <BackIcon /> Back to Instances
            </button>
          </div>
        </div>
      </main>
    );
  }

  const launchedDate = new Date(inst.launchedAt).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <main className="page" id="instance-detail-page">
      <div className="container" style={{ maxWidth: '1000px' }}>

        {/* ── Back navigation ── */}
        <button
          className="inst-detail__back"
          onClick={() => navigate('/instances')}
          aria-label="Back to Cloud Instances"
          id="inst-detail-back-btn"
        >
          <BackIcon />
          Cloud Instances
        </button>

        {/* ── Page header ── */}
        <header className="inst-detail__header">
          <div className="inst-detail__title-block">
            <h1 className="inst-detail__name">{inst.name}</h1>
            <div className="inst-detail__meta">
              <span className="inst-detail__meta-item">
                <span className="inst-detail__meta-mono">{inst.id}</span>
              </span>
              <span className="inst-detail__meta-item" aria-hidden="true">·</span>
              <span className="inst-detail__meta-item">{inst.provider} — {inst.region}</span>
              <span className="inst-detail__meta-item" aria-hidden="true">·</span>
              <span className="inst-detail__meta-item">Uptime {inst.uptime}%</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
            <InstanceStatusBadge status={inst.status} />
            <EfficiencyBadge value={inst.efficiency} />
          </div>
        </header>

        {/* ── Optimization notice ── */}
        {inst.optimizationNote && (
          <div className="inst-optimization" role="note" aria-label="Optimization opportunity">
            <span className="inst-optimization__icon" aria-hidden="true"><WarnIcon /></span>
            <div>
              <p className="inst-optimization__title">Optimization Opportunity</p>
              <p className="inst-optimization__text">{inst.optimizationNote}</p>
            </div>
          </div>
        )}

        {/* ── Instance overview ── */}
        <section aria-labelledby="inst-overview-heading">
          <h2 className="inst-section-title" id="inst-overview-heading">Instance Overview</h2>
          <div className="inst-overview-card">
            <div className="inst-overview-grid">
              <OverviewItem label="Instance type" value={inst.instanceType} mono />
              <OverviewItem label="Provider"       value={inst.provider} />
              <OverviewItem label="Region"         value={inst.region} mono />
              <OverviewItem label="Launched"       value={launchedDate} />
              <OverviewItem label="Uptime"         value={`${inst.uptime}%`} />
              <div>
                <div className="inst-overview-item__label">Tags</div>
                <div className="inst-tags" style={{ marginTop: 4 }}>
                  {inst.tags.map(t => (
                    <span key={t} className="inst-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sustainability metrics ── */}
        <section aria-labelledby="inst-sustainability-heading" style={{ marginBottom: 'var(--space-6)' }}>
          <h2 className="inst-section-title" id="inst-sustainability-heading">Sustainability Metrics</h2>
          <div className="inst-metric-grid">
            <MetricCard
              label="Energy"
              value={inst.energy}
              unit="kWh/day"
              color="var(--color-metric-energy)"
              icon={<EnergyIcon />}
            />
            <MetricCard
              label="CO₂ Emissions"
              value={inst.co2}
              unit="kg/day"
              color="var(--color-metric-co2)"
              icon={<CO2Icon />}
            />
            <MetricCard
              label="Cloud Cost"
              value={`$${inst.cost.toFixed(2)}`}
              unit="/day"
              color="var(--color-metric-cost)"
              icon={<CostIcon />}
            />
            <MetricCard
              label="Efficiency"
              value={`${inst.efficiency}%`}
              color="var(--color-metric-efficiency)"
              icon={<EffIcon />}
            />
          </div>
        </section>

        {/* ── Resource usage ── */}
        <section aria-labelledby="inst-resource-heading">
          <h2 className="inst-section-title" id="inst-resource-heading">Resource Usage</h2>
          <div className="inst-usage-grid">
            <UsageCard
              label="CPU Utilization"
              value={inst.cpu}
              unit="%"
              sparkData={inst.cpuHistory}
              sparkColor="var(--color-metric-efficiency)"
            />
            <UsageCard
              label="Memory Utilization"
              value={inst.memory}
              unit="%"
              sparkData={inst.memHistory}
              sparkColor="var(--color-metric-cost)"
            />
            <UsageCard
              label="Network In"
              value={inst.network.in}
              unit=" MB/s"
              sparkData={null}
              sparkColor={null}
            />
            <UsageCard
              label="Storage Used"
              value={inst.storage}
              unit="%"
              sparkData={null}
              sparkColor={null}
            />
          </div>
        </section>

      </div>
    </main>
  );
}
