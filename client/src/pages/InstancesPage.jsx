/**
 * InstancesPage.jsx — /instances
 * --------------------------------
 * List view of all cloud instances.
 * Features: search, provider/region/status/efficiency filters, sort,
 * summary stat pills, clickable rows → /instances/:id.
 *
 * Owner: Person 2 (Ardhendu)
 */

import { useState, useMemo } from 'react';
import InstanceTable from '../components/InstanceTable';
import { instances } from '../data/mockData';
import '../components/Instances.css';

// ── Derive unique filter options from data ────────────────────
const PROVIDERS  = ['All', ...new Set(instances.map(i => i.provider))];
const REGIONS    = ['All', ...new Set(instances.map(i => i.region))];
const STATUSES   = ['All', 'running', 'warning', 'critical', 'stopped'];
const EFFICIENCY = ['All', 'High (≥80%)', 'Medium (50–79%)', 'Low (<50%)'];

function matchEfficiency(value, filter) {
  if (filter === 'All') return true;
  if (filter === 'High (≥80%)')    return value >= 80;
  if (filter === 'Medium (50–79%)') return value >= 50 && value < 80;
  if (filter === 'Low (<50%)')      return value < 50;
  return true;
}

// ── Summary stat pill ────────────────────────────────────────
function StatPill({ value, label, color }) {
  return (
    <div className="inst-stat-pill">
      <span className="inst-stat-pill__value" style={{ color }}>
        {value}
      </span>
      <span className="inst-stat-pill__label">{label}</span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function InstancesPage() {
  const [search,     setSearch]     = useState('');
  const [provider,   setProvider]   = useState('All');
  const [region,     setRegion]     = useState('All');
  const [status,     setStatus]     = useState('All');
  const [efficiency, setEfficiency] = useState('All');
  const [sortKey,    setSortKey]    = useState('name');
  const [sortDir,    setSortDir]    = useState('asc');

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const filtered = useMemo(() => {
    let list = instances;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q) ||
        i.region.toLowerCase().includes(q) ||
        i.instanceType.toLowerCase().includes(q)
      );
    }
    if (provider   !== 'All') list = list.filter(i => i.provider === provider);
    if (region     !== 'All') list = list.filter(i => i.region   === region);
    if (status     !== 'All') list = list.filter(i => i.status   === status);
    if (efficiency !== 'All') list = list.filter(i => matchEfficiency(i.efficiency, efficiency));

    return [...list].sort((a, b) => {
      const va = a[sortKey] ?? '';
      const vb = b[sortKey] ?? '';
      const cmp = typeof va === 'number'
        ? va - vb
        : String(va).localeCompare(String(vb));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [search, provider, region, status, efficiency, sortKey, sortDir]);

  // Summary stats
  const running  = instances.filter(i => i.status === 'running').length;
  const warning  = instances.filter(i => i.status === 'warning' || i.status === 'critical').length;
  const stopped  = instances.filter(i => i.status === 'stopped').length;
  const totalCost = instances.reduce((s, i) => s + i.cost, 0).toFixed(2);

  return (
    <main className="page" id="instances-page">
      <div className="container" style={{ maxWidth: '1200px' }}>

        {/* ── Page header ── */}
        <header className="inst-page__header">
          <div>
            <h1 className="inst-page__title">Cloud Instances</h1>
            <p className="inst-page__subtitle">
              Monitor resource usage, efficiency, cost, and sustainability
              impact across your cloud infrastructure.
            </p>
          </div>
        </header>

        {/* ── Summary pills ── */}
        <div className="inst-summary-bar" role="region" aria-label="Instance summary">
          <StatPill value={instances.length}  label="Total instances" />
          <StatPill value={running}  label="Running"  color="var(--color-primary)" />
          <StatPill value={warning}  label="Attention needed" color="var(--color-warning)" />
          <StatPill value={stopped}  label="Stopped"  color="var(--color-text-muted)" />
          <StatPill value={`$${totalCost}`} label="Total cost/day" color="var(--color-metric-cost)" />
        </div>

        {/* ── Controls ── */}
        <div className="inst-controls" role="search" aria-label="Filter and search instances">
          {/* Search */}
          <div className="inst-search">
            <svg className="inst-search__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="inst-search-input"
              type="search"
              className="inst-search__input"
              placeholder="Search instances…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search instances by name, ID, region, or type"
            />
          </div>

          {/* Provider */}
          <select
            id="inst-filter-provider"
            className="inst-select"
            value={provider}
            onChange={e => setProvider(e.target.value)}
            aria-label="Filter by provider"
          >
            {PROVIDERS.map(p => <option key={p} value={p}>{p === 'All' ? 'All providers' : p}</option>)}
          </select>

          {/* Region */}
          <select
            id="inst-filter-region"
            className="inst-select"
            value={region}
            onChange={e => setRegion(e.target.value)}
            aria-label="Filter by region"
          >
            {REGIONS.map(r => <option key={r} value={r}>{r === 'All' ? 'All regions' : r}</option>)}
          </select>

          {/* Status */}
          <select
            id="inst-filter-status"
            className="inst-select"
            value={status}
            onChange={e => setStatus(e.target.value)}
            aria-label="Filter by status"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s === 'All' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>

          {/* Efficiency */}
          <select
            id="inst-filter-efficiency"
            className="inst-select"
            value={efficiency}
            onChange={e => setEfficiency(e.target.value)}
            aria-label="Filter by efficiency"
          >
            {EFFICIENCY.map(e => <option key={e} value={e}>{e === 'All' ? 'All efficiency' : e}</option>)}
          </select>
        </div>

        {/* ── Result count ── */}
        <p className="inst-result-count" aria-live="polite">
          Showing {filtered.length} of {instances.length} instances
        </p>

        {/* ── Table ── */}
        <InstanceTable
          instances={filtered}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />

      </div>
    </main>
  );
}
