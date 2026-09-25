/**
 * RecommendationCard.jsx
 * ----------------------
 * Compact card representing a single infrastructure recommendation.
 * Receives ALL content via props — no recommendation text is hard-coded
 * here. Import this component from RecommendationsPage.jsx.
 *
 * Props:
 *   id                  string
 *   title               string
 *   description         string
 *   priority            "high" | "medium" | "low"
 *   currentInstance     string
 *   recommendedInstance string  ("terminated" renders a special label)
 *   estimatedSavings    { cost: number, energy: number, carbon: number }
 *   status              "new" | "reviewed"
 *   onViewDetails       (id: string) => void
 */

import { ArrowRight, AlertCircle, CheckCircle2, Info } from "lucide-react";

/** Maps priority → { badge class, icon, label } */
const PRIORITY_CONFIG = {
  high: {
    className: "badge badge--high",
    icon: AlertCircle,
    label: "High",
    srPrefix: "High priority:",
  },
  medium: {
    className: "badge badge--medium",
    icon: Info,
    label: "Medium",
    srPrefix: "Medium priority:",
  },
  low: {
    className: "badge badge--low",
    icon: CheckCircle2,
    label: "Low",
    srPrefix: "Low priority:",
  },
};

function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.low;
  const Icon = cfg.icon;
  return (
    <span className={cfg.className} aria-label={`Priority: ${cfg.label}`}>
      <Icon size={11} strokeWidth={1.5} aria-hidden="true" />
      {cfg.label}
    </span>
  );
}

function StatusLabel({ status }) {
  return (
    <span className="rec-card__status mono" aria-label={`Status: ${status}`}>
      {status === "new" ? "● new" : "○ reviewed"}
    </span>
  );
}

function InstanceArrow({ current, recommended }) {
  const isTerminate = recommended === "terminated";
  return (
    <div className="rec-card__instances" aria-label={`Instance: ${current} → ${recommended}`}>
      <span className="rec-card__instance-block">
        <span className="rec-card__instance-label">Current</span>
        <span className="rec-card__instance-value mono">{current}</span>
      </span>
      <ArrowRight
        size={14}
        strokeWidth={1.5}
        className="rec-card__arrow"
        aria-hidden="true"
      />
      <span className="rec-card__instance-block">
        <span className="rec-card__instance-label">Recommended</span>
        <span
          className={`rec-card__instance-value mono ${
            isTerminate ? "rec-card__instance-value--terminate" : "rec-card__instance-value--accent"
          }`}
        >
          {recommended}
        </span>
      </span>
    </div>
  );
}

function ImpactMetrics({ savings }) {
  const metrics = [
    { label: "Cost saving", value: savings.cost, unit: "%", key: "cost" },
    { label: "Energy saving", value: savings.energy, unit: "%", key: "energy" },
    { label: "CO₂ reduction", value: savings.carbon, unit: "%", key: "carbon" },
  ];

  return (
    <div className="rec-card__metrics" role="list" aria-label="Impact estimates">
      {metrics.map(({ label, value, unit, key }) => (
        <div className="rec-card__metric" key={key} role="listitem">
          <span className="rec-card__metric-value mono">
            {value > 0 ? `+${value}` : value}
            <span className="rec-card__metric-unit">{unit}</span>
          </span>
          <span className="rec-card__metric-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

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
  return (
    <article className="card rec-card" aria-label={`Recommendation: ${title}`}>
      {/* Header row */}
      <div className="rec-card__header">
        <div className="rec-card__header-left">
          <PriorityBadge priority={priority} />
          <h2 className="rec-card__title">{title}</h2>
        </div>
        <StatusLabel status={status} />
      </div>

      {/* Description */}
      <p className="rec-card__description">{description}</p>

      <hr className="divider" />

      {/* Instance comparison */}
      <InstanceArrow
        current={currentInstance}
        recommended={recommendedInstance}
      />

      {/* Impact metrics */}
      <ImpactMetrics savings={estimatedSavings} />

      {/* Footer */}
      <div className="rec-card__footer">
        <button
          className="btn btn--secondary"
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
