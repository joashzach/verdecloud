/**
 * RecommendationsPage.jsx
 * -----------------------
 * Full Recommendations view. Visual language matches Overview page:
 * - top-nav layout (no sidebar)
 * - card treatment from StatCard (shadow-md, radius-md, border)
 * - metric colors from TrendChart
 *
 * States: loading (skeleton) | loaded | empty | error
 *
 * Owner: Person 2 (Ardhendu)
 */

import { useState, useEffect, useCallback } from 'react';
import RecommendationCard from '../components/RecommendationCard';
import { getRecommendations } from '../services/api';
import './RecommendationsPage.css';

const FILTERS = [
  { key: 'all',    label: 'All' },
  { key: 'high',   label: 'High' },
  { key: 'medium', label: 'Medium' },
  { key: 'low',    label: 'Low' },
];

// ── Skeleton card ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rec-card rec-card--skeleton" aria-hidden="true">
      <div className="rec-card__header">
        <div className="rec-card__header-left" style={{ gap: 'var(--space-3)' }}>
          <div className="skeleton" style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="skeleton" style={{ width: 56, height: 18, borderRadius: 'var(--radius-full)' }} />
            <div className="skeleton" style={{ width: 200, height: 16 }} />
          </div>
        </div>
        <div className="skeleton" style={{ width: 60, height: 14 }} />
      </div>
      <div className="skeleton" style={{ width: '85%', height: 13, marginTop: 'var(--space-1)' }} />
      <div className="skeleton" style={{ width: '65%', height: 13 }} />
      <hr className="divider" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
        <div className="skeleton" style={{ width: 90, height: 38 }} />
        <div className="skeleton" style={{ width: 14, height: 14 }} />
        <div className="skeleton" style={{ width: 110, height: 38 }} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="skeleton" style={{ width: 42, height: 16 }} />
            <div className="skeleton" style={{ width: 72, height: 12 }} />
          </div>
        ))}
      </div>
      <div className="skeleton" style={{ width: 96, height: 32, borderRadius: 'var(--radius-sm)' }} />
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────
function EmptyState({ filter }) {
  return (
    <div className="state-centered" role="status" aria-live="polite">
      <svg className="state-centered__icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22,4 12,14.01 9,11.01" />
      </svg>
      <p className="state-centered__title">No recommendations right now</p>
      <p className="state-centered__desc">
        {filter === 'all'
          ? 'Your infrastructure looks well-optimized. We\'ll surface new recommendations as conditions change.'
          : `No ${filter}-priority recommendations match the current filter.`}
      </p>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="state-centered" role="alert" aria-live="assertive">
      <svg className="state-centered__icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21.5 2L2 21.5" /><path d="M21 12a9 9 0 0 1-9 9 8.93 8.93 0 0 1-5.59-1.94" />
        <path d="M3.06 8.43A9 9 0 0 1 12 3a9 9 0 0 1 5.59 1.94" />
      </svg>
      <p className="state-centered__title">Unable to load recommendations</p>
      <p className="state-centered__desc">
        We couldn't retrieve your recommendations. Please try again.
      </p>
      <button
        className="btn btn--outline"
        onClick={onRetry}
        id="retry-recommendations-btn"
        aria-label="Retry loading recommendations"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="23,4 23,11 16,11" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 11" />
        </svg>
        Retry
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function RecommendationsPage() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await getRecommendations();
      setItems(data);
      setStatus('loaded');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered =
    activeFilter === 'all' ? items : items.filter(r => r.priority === activeFilter);

  function handleViewDetails(id) {
    console.info('[RecommendationsPage] View details requested for:', id);
  }

  return (
    <main className="page" id="recommendations-page">
      <div className="container">
        {/* ── Page header ── */}
        <header className="rec-page__header">
          <div>
            <h1 className="rec-page__title">Recommendations</h1>
            <p className="rec-page__subtitle">
              Infrastructure optimization suggestions ranked by impact and savings potential.
            </p>
          </div>
          {status === 'loaded' && (
            <div className="rec-page__count badge badge--success" aria-live="polite">
              {filtered.length} of {items.length}
            </div>
          )}
        </header>

        {/* ── Filter chips ── */}
        {status === 'loaded' && (
          <div className="filter-chips" role="group" aria-label="Filter recommendations by priority">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                className={`chip${activeFilter === key ? ' chip--active' : ''}`}
                onClick={() => setActiveFilter(key)}
                aria-pressed={activeFilter === key}
                id={`filter-chip-${key}`}
              >
                {label}
                {key !== 'all' && (
                  <span style={{ fontSize: 'var(--font-size-xs)', marginLeft: 2, opacity: 0.8 }}>
                    ({items.filter(r => r.priority === key).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── Loading ── */}
        {status === 'loading' && (
          <div role="status" aria-busy="true" aria-label="Loading recommendations">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* ── Error ── */}
        {status === 'error' && <ErrorState onRetry={load} />}

        {/* ── Empty ── */}
        {status === 'loaded' && filtered.length === 0 && <EmptyState filter={activeFilter} />}

        {/* ── Loaded cards ── */}
        {status === 'loaded' && filtered.length > 0 && (
          <div className="rec-list" role="list" aria-label="Recommendation cards">
            {filtered.map(rec => (
              <div key={rec.id} role="listitem">
                <RecommendationCard {...rec} onViewDetails={handleViewDetails} />
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
