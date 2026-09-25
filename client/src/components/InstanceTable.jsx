/**
 * InstanceTable.jsx
 * -----------------
 * Sortable, filterable table of cloud instances.
 * Clicking a row navigates to /instances/:id via react-router.
 *
 * Props:
 *  instances — array from mockData.instances (or API)
 *  searchQuery, providerFilter, regionFilter, statusFilter,
 *  efficiencyFilter, sortKey, sortDir — all controlled by parent
 */

import { useNavigate } from 'react-router-dom';
import { InstanceStatusBadge, EfficiencyBadge, UsageBar } from './InstanceStatusBadge';

// ── Sort chevrons ─────────────────────────────────────────────
function SortIcon({ active, dir }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke={active ? 'var(--color-primary)' : 'var(--color-border)'}
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={{ flexShrink: 0 }}
    >
      {dir === 'asc' || !active
        ? <polyline points="18,15 12,9 6,15" />
        : <polyline points="6,9 12,15 18,9" />
      }
    </svg>
  );
}

// ── Provider logo chip ─────────────────────────────────────────
const PROVIDER_COLOR = {
  AWS:   { bg: '#FFF7ED', color: '#9A3412' },
  GCP:   { bg: '#EFF6FF', color: '#1D4ED8' },
  Azure: { bg: '#F0FDF4', color: '#15803D' },
};

function ProviderChip({ provider }) {
  const style = PROVIDER_COLOR[provider] ?? { bg: 'var(--color-bg)', color: 'var(--color-text-muted)' };
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 7px',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-semibold)',
        background: style.bg,
        color: style.color,
        letterSpacing: '0.01em',
      }}
    >
      {provider}
    </span>
  );
}

// ── Column definitions ────────────────────────────────────────
const COLUMNS = [
  { key: 'name',       label: 'Instance',   sortable: true },
  { key: 'provider',   label: 'Provider',   sortable: true },
  { key: 'region',     label: 'Region',     sortable: true },
  { key: 'status',     label: 'Status',     sortable: true },
  { key: 'cpu',        label: 'CPU',        sortable: true, numeric: true },
  { key: 'memory',     label: 'Memory',     sortable: true, numeric: true },
  { key: 'energy',     label: 'Energy',     sortable: true, numeric: true },
  { key: 'co2',        label: 'CO₂',        sortable: true, numeric: true },
  { key: 'cost',       label: 'Cost/day',   sortable: true, numeric: true },
  { key: 'efficiency', label: 'Efficiency', sortable: true, numeric: true },
];

// ── Inline mini sparkline for table rows ──────────────────────
function MiniLine({ data, color }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const W = 40, H = 16, pad = 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = pad + (1 - (v - min) / range) * (H - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', opacity: 0.7 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Main table ────────────────────────────────────────────────
export default function InstanceTable({ instances, sortKey, sortDir, onSort }) {
  const navigate = useNavigate();

  if (!instances.length) {
    return (
      <div className="state-centered" role="status">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="state-centered__icon" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <p className="state-centered__title">No instances found</p>
        <p className="state-centered__desc">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="inst-table-wrap">
      <table className="inst-table" aria-label="Cloud instances">
        <thead>
          <tr>
            {COLUMNS.map(col => (
              <th
                key={col.key}
                className={`inst-table__th${col.numeric ? ' inst-table__th--num' : ''}`}
                onClick={col.sortable ? () => onSort(col.key) : undefined}
                aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                style={{ cursor: col.sortable ? 'pointer' : 'default' }}
              >
                <span className="inst-table__th-inner">
                  {col.label}
                  {col.sortable && <SortIcon active={sortKey === col.key} dir={sortDir} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {instances.map(inst => (
            <tr
              key={inst.id}
              className="inst-table__row"
              onClick={() => navigate(`/instances/${inst.id}`)}
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/instances/${inst.id}`)}
              aria-label={`View details for ${inst.name}`}
              role="button"
            >
              {/* Instance name + type */}
              <td className="inst-table__td">
                <div className="inst-table__name-cell">
                  <span className="inst-table__name">{inst.name}</span>
                  <span className="inst-table__type">{inst.instanceType}</span>
                </div>
              </td>

              {/* Provider */}
              <td className="inst-table__td">
                <ProviderChip provider={inst.provider} />
              </td>

              {/* Region */}
              <td className="inst-table__td">
                <span className="inst-table__region">{inst.region}</span>
              </td>

              {/* Status */}
              <td className="inst-table__td">
                <InstanceStatusBadge status={inst.status} />
              </td>

              {/* CPU */}
              <td className="inst-table__td inst-table__td--num">
                <div className="inst-table__usage-cell">
                  <span className="inst-table__usage-val">{inst.cpu}%</span>
                  <UsageBar value={inst.cpu} label="CPU" />
                  <MiniLine data={inst.cpuHistory} color="var(--color-metric-efficiency)" />
                </div>
              </td>

              {/* Memory */}
              <td className="inst-table__td inst-table__td--num">
                <div className="inst-table__usage-cell">
                  <span className="inst-table__usage-val">{inst.memory}%</span>
                  <UsageBar value={inst.memory} label="Memory" />
                </div>
              </td>

              {/* Energy */}
              <td className="inst-table__td inst-table__td--num">
                <span style={{ color: 'var(--color-metric-energy)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>
                  {inst.energy} kWh
                </span>
              </td>

              {/* CO₂ */}
              <td className="inst-table__td inst-table__td--num">
                <span style={{ color: 'var(--color-metric-co2)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>
                  {inst.co2} kg
                </span>
              </td>

              {/* Cost */}
              <td className="inst-table__td inst-table__td--num">
                <span style={{ color: 'var(--color-metric-cost)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>
                  ${inst.cost.toFixed(2)}
                </span>
              </td>

              {/* Efficiency */}
              <td className="inst-table__td inst-table__td--num">
                <EfficiencyBadge value={inst.efficiency} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
