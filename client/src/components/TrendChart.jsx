/**
 * TrendChart.jsx — VerdeCloud Trend Chart
 *
 * Supports three time periods via tab switcher:
 *  • Weekly  — last 7 days (daily granularity)
 *  • Monthly — last 12 months
 *  • 6 Months — last 6 months
 *
 * Supports four metrics:
 *  - Energy Usage (kWh)
 *  - CO₂ Emissions (tCO₂e)
 *  - Cloud Cost (₹ INR)
 *  - Resource Efficiency (%)
 *
 * Props:
 *  weeklyData    — from mockData.weeklyTrendData
 *  monthlyData   — from mockData.monthlyTrendData
 *  sixMonthData  — from mockData.sixMonthTrendData
 */

import { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import './TrendChart.css';

// ── Time period config ────────────────────────────────────────
const PERIODS = [
  { key: 'weekly',   label: 'Weekly',   shortLabel: '7D' },
  { key: 'monthly',  label: 'Monthly',  shortLabel: '12M' },
  { key: '6months',  label: '6 Months', shortLabel: '6M' },
];

// ── Metric config ─────────────────────────────────────────────
const METRICS = [
  {
    key: 'energyUsage',
    label: 'Energy Usage',
    unit: 'kWh',
    color: '#F59E0B',
    lowerIsBetter: true,
  },
  {
    key: 'co2Emissions',
    label: 'CO₂ Emissions',
    unit: 'tCO₂e',
    color: '#16A34A',
    lowerIsBetter: true,
  },
  {
    key: 'cloudCost',
    label: 'Cloud Cost',
    unit: '₹',
    prefix: '₹',
    isINR: true,
    color: '#6366F1',
    lowerIsBetter: true,
  },
  {
    key: 'efficiency',
    label: 'Efficiency',
    unit: '%',
    color: '#0EA5E9',
    lowerIsBetter: false,
  },
];

// ── INR formatter — converts raw ₹ to compact L/K notation ───
function formatINR(value) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000)   return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
}

// ── Y-axis tick formatter ─────────────────────────────────────
function formatYAxis(value, metric) {
  if (!metric) return value;
  if (metric.isINR)                    return formatINR(value);
  if (metric.key === 'efficiency')     return `${value}%`;
  if (metric.key === 'co2Emissions')   return value;
  if (value >= 1000)                   return `${(value / 1000).toFixed(0)}k`;
  return value;
}

// ── Tooltip formatter ─────────────────────────────────────────
function formatTooltipValue(value, metric) {
  if (!metric || typeof value !== 'number') return String(value);
  if (metric.isINR)                return formatINR(value);
  if (metric.key === 'efficiency') return `${value}%`;
  if (metric.unit)                 return `${value.toLocaleString('en-IN')} ${metric.unit}`;
  return value.toLocaleString('en-IN');
}

// ── Custom tooltip ────────────────────────────────────────────
function CustomTooltip({ active, payload, label, activeMetric }) {
  if (!active || !payload?.length) return null;

  const metric = METRICS.find((m) => m.key === activeMetric);
  const value  = payload[0]?.value;

  return (
    <div className="trend-tooltip" role="tooltip">
      <p className="trend-tooltip__label">{label}</p>
      <p className="trend-tooltip__value" style={{ color: metric?.color }}>
        {formatTooltipValue(value, metric)}
      </p>
    </div>
  );
}

// ── Period label for the trend summary ────────────────────────
const PERIOD_LABEL = {
  weekly:  '7-day',
  monthly: '12-month',
  '6months': '6-month',
};

// ── TrendChart ────────────────────────────────────────────────
export default function TrendChart({ weeklyData, monthlyData, sixMonthData }) {
  const [activePeriod, setActivePeriod] = useState('6months');
  const [activeMetric, setActiveMetric] = useState('energyUsage');

  // Resolve the correct dataset
  const dataMap = {
    weekly:  weeklyData,
    monthly: monthlyData,
    '6months': sixMonthData,
  };
  const data   = dataMap[activePeriod] ?? [];
  const metric = METRICS.find((m) => m.key === activeMetric);

  // Trend summary: first → last point
  const firstVal     = data[0]?.[activeMetric]              ?? 0;
  const lastVal      = data[data.length - 1]?.[activeMetric] ?? 0;
  const delta        = lastVal - firstVal;
  const deltaPercent = firstVal !== 0
    ? ((Math.abs(delta) / firstVal) * 100).toFixed(1)
    : '0.0';
  const isImproved =
    (metric?.lowerIsBetter && delta < 0) ||
    (!metric?.lowerIsBetter && delta > 0);

  return (
    <article className="trend-chart" aria-label="Performance trend chart">

      {/* ── Header ── */}
      <div className="trend-chart__header">
        <div>
          <h2 className="trend-chart__title">Performance Trend</h2>
          <p className="trend-chart__subtitle">Track changes over time across key metrics</p>
        </div>

        {/* Trend summary badge */}
        <div className={`trend-chart__summary ${isImproved ? 'trend-chart__summary--good' : 'trend-chart__summary--bad'}`}>
          <span>{isImproved ? '↓' : '↑'} {deltaPercent}%</span>
          <span className="trend-chart__summary-label">
            {PERIOD_LABEL[activePeriod]} {isImproved ? 'improvement' : 'increase'}
          </span>
        </div>
      </div>

      {/* ── Period switcher ── */}
      <div className="trend-chart__period-bar" role="tablist" aria-label="Select time period">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            role="tab"
            aria-selected={activePeriod === p.key}
            className={`trend-chart__period-btn ${activePeriod === p.key ? 'trend-chart__period-btn--active' : ''}`}
            onClick={() => setActivePeriod(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── Metric tabs ── */}
      <div className="trend-chart__tabs" role="tablist" aria-label="Select metric">
        {METRICS.map((m) => (
          <button
            key={m.key}
            role="tab"
            aria-selected={activeMetric === m.key}
            className={`trend-chart__tab ${activeMetric === m.key ? 'trend-chart__tab--active' : ''}`}
            onClick={() => setActiveMetric(m.key)}
            style={activeMetric === m.key ? { '--tab-color': m.color } : {}}
          >
            <span
              className="trend-chart__tab-dot"
              style={{ background: m.color }}
              aria-hidden="true"
            />
            {m.label}
          </button>
        ))}
      </div>

      {/* ── Chart canvas ── */}
      <div
        className="trend-chart__canvas"
        role="img"
        aria-label={`${metric?.label} trend — ${activePeriod}`}
      >
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={metric?.color} stopOpacity={0.12} />
                <stop offset="95%" stopColor={metric?.color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />

            <XAxis
              dataKey="period"
              tick={{ fontSize: 12, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-family)' }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />

            <YAxis
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-family)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatYAxis(v, metric)}
              width={metric?.isINR ? 60 : 44}
            />

            <Tooltip
              content={<CustomTooltip activeMetric={activeMetric} />}
              cursor={{ stroke: 'var(--color-border)', strokeWidth: 1, strokeDasharray: '4 4' }}
            />

            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={metric?.color}
              strokeWidth={2}
              fill={`url(#gradient-${activeMetric})`}
              dot={{ fill: metric?.color, strokeWidth: 0, r: 3 }}
              activeDot={{ fill: metric?.color, stroke: '#fff', strokeWidth: 2, r: 5 }}
              isAnimationActive={true}
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
