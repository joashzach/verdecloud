/**
 * RecommendationsPage.jsx
 * -----------------------
 * Renders the full Recommendations view:
 *   - Page header
 *   - Filter chips (All / High / Medium / Low)
 *   - Loading state: 3 skeleton cards with shimmer
 *   - Loaded state: RecommendationCard list, filtered client-side
 *   - Empty state: centered icon + message
 *   - Error state: centered icon + message + retry button
 */

import { useState, useEffect, useCallback } from "react";
import { Lightbulb, RefreshCw, PackageOpen } from "lucide-react";
import RecommendationCard from "../components/RecommendationCard";
import { getRecommendations } from "../services/api";

const FILTERS = [
  { key: "all",    label: "All" },
  { key: "high",   label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low",    label: "Low" },
];

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div className="card rec-card rec-card--skeleton" aria-hidden="true">
      <div className="rec-card__header">
        <div className="rec-card__header-left" style={{ gap: "var(--sp-2)" }}>
          <div className="skeleton" style={{ width: 60, height: 20, borderRadius: "var(--radius-pill)" }} />
          <div className="skeleton" style={{ width: 200, height: 16 }} />
        </div>
        <div className="skeleton" style={{ width: 64, height: 14 }} />
      </div>
      <div className="skeleton" style={{ width: "85%", height: 13, marginTop: "var(--sp-2)" }} />
      <div className="skeleton" style={{ width: "60%", height: 13, marginTop: "var(--sp-1)" }} />
      <hr className="divider" />
      <div className="rec-card__instances" style={{ pointerEvents: "none" }}>
        <div className="skeleton" style={{ width: 90, height: 38 }} />
        <div className="skeleton" style={{ width: 14, height: 14, borderRadius: "var(--radius-sm)" }} />
        <div className="skeleton" style={{ width: 110, height: 38 }} />
      </div>
      <div className="rec-card__metrics">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rec-card__metric">
            <div className="skeleton" style={{ width: 44, height: 18 }} />
            <div className="skeleton" style={{ width: 72, height: 12, marginTop: "var(--sp-1)" }} />
          </div>
        ))}
      </div>
      <div className="rec-card__footer">
        <div className="skeleton" style={{ width: 96, height: 34, borderRadius: "var(--radius-sm)" }} />
      </div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyState({ filter }) {
  return (
    <div className="state-centered" role="status" aria-live="polite">
      <PackageOpen
        size={36}
        strokeWidth={1.5}
        className="state-centered__icon"
        aria-hidden="true"
      />
      <p className="state-centered__title">No recommendations right now</p>
      <p className="state-centered__desc">
        {filter === "all"
          ? "Your infrastructure looks well-optimized. We'll surface new recommendations as conditions change."
          : `No ${filter}-priority recommendations match the current filter.`}
      </p>
    </div>
  );
}

/* ── Error state ── */
function ErrorState({ onRetry }) {
  return (
    <div className="state-centered" role="alert" aria-live="assertive">
      <RefreshCw
        size={36}
        strokeWidth={1.5}
        className="state-centered__icon"
        aria-hidden="true"
      />
      <p className="state-centered__title">Unable to load recommendations</p>
      <p className="state-centered__desc">
        We couldn't retrieve your recommendations. Please try again.
      </p>
      <button
        className="btn btn--secondary"
        onClick={onRetry}
        id="retry-recommendations-btn"
        aria-label="Retry loading recommendations"
      >
        <RefreshCw size={14} strokeWidth={1.5} aria-hidden="true" />
        Retry
      </button>
    </div>
  );
}

/* ── Main page ── */
export default function RecommendationsPage() {
  const [status, setStatus] = useState("loading"); // "loading" | "loaded" | "error"
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const data = await getRecommendations();
      setItems(data);
      setStatus("loaded");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((r) => r.priority === activeFilter);

  function handleViewDetails(id) {
    // Stub — detail panel / modal to be implemented when backend is ready
    console.info("[RecommendationsPage] View details requested for:", id);
  }

  return (
    <main className="page" id="recommendations-page">
      {/* Page header */}
      <header className="page__header">
        <h1 className="page__title">
          <Lightbulb
            size={18}
            strokeWidth={1.5}
            style={{ verticalAlign: "middle", marginRight: "var(--sp-2)", color: "var(--color-accent)" }}
            aria-hidden="true"
          />
          Recommendations
        </h1>
        <p className="page__description">
          Infrastructure optimization suggestions ranked by impact and savings potential.
        </p>
      </header>

      {/* Filter chips — only show when loaded or loaded-but-empty */}
      {(status === "loaded") && (
        <div
          className="filter-chips"
          role="group"
          aria-label="Filter recommendations by priority"
        >
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              className={`chip${activeFilter === key ? " chip--active" : ""}`}
              onClick={() => setActiveFilter(key)}
              aria-pressed={activeFilter === key}
              id={`filter-chip-${key}`}
            >
              {label}
              {key !== "all" && (
                <span className="mono" style={{ fontSize: "11px", marginLeft: "2px" }}>
                  ({items.filter((r) => r.priority === key).length})
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {status === "loading" && (
        <div aria-label="Loading recommendations" aria-busy="true" role="status">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Error */}
      {status === "error" && <ErrorState onRetry={load} />}

      {/* Loaded — empty */}
      {status === "loaded" && filtered.length === 0 && (
        <EmptyState filter={activeFilter} />
      )}

      {/* Loaded — cards */}
      {status === "loaded" && filtered.length > 0 && (
        <div className="rec-list" role="list" aria-label="Recommendation cards">
          {filtered.map((rec) => (
            <div key={rec.id} role="listitem">
              <RecommendationCard {...rec} onViewDetails={handleViewDetails} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
