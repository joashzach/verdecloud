/**
 * NotFoundPage.jsx — 404 fallback
 */

import { Link } from 'react-router-dom';
import './PlaceholderPage.css';

export default function NotFoundPage() {
  return (
    <main className="page" id="main-content">
      <div className="container">
        <div className="placeholder-page">
          <div className="placeholder-page__icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="placeholder-page__title">Page Not Found</h1>
          <p className="placeholder-page__desc">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link to="/" className="btn btn--primary">
            Go to Overview
          </Link>
        </div>
      </div>
    </main>
  );
}
