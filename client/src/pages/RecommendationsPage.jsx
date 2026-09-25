/**
 * RecommendationsPage.jsx — PLACEHOLDER
 *
 * Owner: Person 2 or Person 3 (TBD)
 * Route: /recommendations
 *
 * This file is intentionally minimal. The assigned developer
 * should build the full Recommendations feature here.
 *
 * Available from mockData.js:
 *  import { recommendationsPlaceholder } from '../data/mockData';
 */

import './PlaceholderPage.css';

export default function RecommendationsPage() {
  return (
    <main className="page" id="main-content">
      <div className="container">
        <div className="placeholder-page">
          <div className="placeholder-page__icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.2 6l-.8.6V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.4l-.8-.6A7 7 0 0 1 12 2z" />
              <path d="M9 21h6" />
            </svg>
          </div>
          <h1 className="placeholder-page__title">Recommendations</h1>
          <p className="placeholder-page__desc">
            AI-powered optimization suggestions and cost-saving recommendations.
            <br />
            <span className="placeholder-page__owner">Assigned to: Person 2/3</span>
          </p>
          <span className="badge badge--warning">In Development</span>
        </div>
      </div>
    </main>
  );
}
