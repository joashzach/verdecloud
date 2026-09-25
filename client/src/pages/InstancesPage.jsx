/**
 * InstancesPage.jsx — PLACEHOLDER
 *
 * Owner: Person 2
 * Route: /instances  and  /instances/:id
 *
 * This file is intentionally minimal. Person 2 should build
 * the full Instances feature here without modifying other files.
 *
 * Available from mockData.js:
 *  import { instancesPlaceholder } from '../data/mockData';
 */

import './PlaceholderPage.css';

export default function InstancesPage() {
  return (
    <main className="page" id="main-content">
      <div className="container">
        <div className="placeholder-page">
          <div className="placeholder-page__icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="5" rx="1.5" />
              <rect x="2" y="10" width="20" height="5" rx="1.5" />
              <rect x="2" y="17" width="20" height="5" rx="1.5" />
              <circle cx="18" cy="5.5" r="1" fill="currentColor" />
              <circle cx="18" cy="12.5" r="1" fill="currentColor" />
              <circle cx="18" cy="19.5" r="1" fill="currentColor" />
            </svg>
          </div>
          <h1 className="placeholder-page__title">Instances</h1>
          <p className="placeholder-page__desc">
            Cloud instance management and monitoring.
            <br />
            <span className="placeholder-page__owner">Assigned to: Person 2</span>
          </p>
          <span className="badge badge--warning">In Development</span>
        </div>
      </div>
    </main>
  );
}
