/**
 * OverviewPage.jsx — Person 1's primary page
 *
 * Layout:
 *  ┌─────────────────────────────────────────────────────────┐
 *  │  Page header (title + live updated timestamp)           │
 *  ├─────────────────────────────────────────────────────────┤
 *  │  StatCard (Energy) │ StatCard (CO₂) │ StatCard (Cost)  │
 *  │  + sparkline       │ + sparkline    │ + sparkline       │
 *  │  StatCard (Efficiency + sparkline)                       │
 *  ├──────────────────────────┬──────────────────────────────┤
 *  │  BeforeAfterCard         │  TrendChart                  │
 *  │  (visual bar comparison) │  (Weekly/Monthly/6M tabs)    │
 *  ├──────────────────────────┴──────────────────────────────┤
 *  │  ServiceBreakdown (2/3 width)  │  SustainabilityGoal    │
 *  └─────────────────────────────────────────────────────────┘
 *
 * Data: consumed from mockData.js — swap for API calls later.
 */

import StatCard         from '../components/StatCard';
import BeforeAfterCard  from '../components/BeforeAfterCard';
import TrendChart       from '../components/TrendChart';
import ServiceBreakdown from '../components/ServiceBreakdown';
import SustainabilityGoal from '../components/SustainabilityGoal';

import {
  overviewStats,
  beforeAfterData,
  weeklyTrendData,
  monthlyTrendData,
  sixMonthTrendData,
  serviceBreakdownData,
  sustainabilityGoal,
} from '../data/mockData';

import './OverviewPage.css';

// ── Page header ────────────────────────────────────────────────
function PageHeader() {
  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
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

        {/* ── Row 1: StatCards with sparklines ── */}
        <section
          className="grid-4 overview-page__stats"
          aria-label="Key performance metrics"
        >
          {overviewStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </section>

        {/* ── Row 2: BeforeAfterCard + TrendChart ── */}
        <section className="overview-page__bottom" aria-label="Performance analysis">
          <BeforeAfterCard data={beforeAfterData} />
          <TrendChart
            weeklyData={weeklyTrendData}
            monthlyData={monthlyTrendData}
            sixMonthData={sixMonthTrendData}
          />
        </section>

        {/* ── Row 3: Service Breakdown + Sustainability Goal ── */}
        <section className="overview-page__insights" aria-label="Service breakdown and sustainability targets">
          <ServiceBreakdown data={serviceBreakdownData} />
          <SustainabilityGoal data={sustainabilityGoal} />
        </section>

      </div>
    </main>
  );
}
