/**
 * OverviewPage.jsx — Person 1's primary page
 *
 * Layout:
 *  ┌──────────────────────────────────────────┐
 *  │  Page header (title + last updated)      │
 *  ├──────────────────────────────────────────┤
 *  │  StatCard grid (4 columns)               │
 *  ├──────────────────────────────────────────┤
 *  │  BeforeAfterCard    │   TrendChart        │
 *  └──────────────────────────────────────────┘
 *
 * Data: consumed from mockData.js — swap for API calls later.
 */

import StatCard from '../components/StatCard';
import BeforeAfterCard from '../components/BeforeAfterCard';
import TrendChart from '../components/TrendChart';
import { overviewStats, beforeAfterData, weeklyTrendData, monthlyTrendData, sixMonthTrendData } from '../data/mockData';
import './OverviewPage.css';

// ── Page header ────────────────────────────────────────────────
function PageHeader() {
  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="overview-page__header">
      <div>
        <h1 className="overview-page__title">Overview</h1>
        <p className="overview-page__subtitle">
          Sustainability &amp; cost metrics for your cloud infrastructure
        </p>
      </div>
      <div className="overview-page__meta">
        <span className="overview-page__live-dot" aria-hidden="true" />
        <span className="overview-page__date">Updated {now}</span>
      </div>
    </header>
  );
}

// ── OverviewPage ───────────────────────────────────────────────
export default function OverviewPage() {
  return (
    <main className="page" id="main-content">
      <div className="container">
        {/* Page header */}
        <PageHeader />

        {/* ── StatCards ── */}
        <section
          className="grid-4 overview-page__stats"
          aria-label="Key performance metrics"
        >
          {overviewStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </section>

        {/* ── Bottom row: BeforeAfter + TrendChart ── */}
        <section className="overview-page__bottom" aria-label="Performance analysis">
          <BeforeAfterCard data={beforeAfterData} />
          <TrendChart
            weeklyData={weeklyTrendData}
            monthlyData={monthlyTrendData}
            sixMonthData={sixMonthTrendData}
          />
        </section>
      </div>
    </main>
  );
}
