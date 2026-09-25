/**
 * App.jsx — VerdeCloud Application Root
 *
 * Sets up React Router and renders the shared Navbar
 * above all page content.
 *
 * Route map:
 *  /                    → OverviewPage        (Person 1 — Baibhav)
 *  /instances           → InstancesPage       (Person 2 — Ardhendu)
 *  /instances/:id       → InstanceDetail      (Person 2 — Ardhendu, handles detail view)
 *  /recommendations     → RecommendationsPage (Ardhendu)
 *  /reports             → ReportsPage         (Ardhendu)
 *  *                    → NotFoundPage        (catch-all)
 *
 * TEAM RULES:
 *  - Do NOT add feature-specific logic here.
 *  - Do NOT import feature components directly — use page-level imports.
 *  - To add a new route, add it to the <Routes> block and update NAV_ITEMS in Navbar.jsx.
 */

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import OverviewPage from './pages/OverviewPage';
import InstancesPage from './pages/InstancesPage';
import InstanceDetail from './pages/InstanceDetail';
import RecommendationsPage from './pages/RecommendationsPage';
import ReportsPage from './pages/ReportsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      {/* Shared navbar — rendered on every page */}
      <Navbar />

      {/* Page content */}
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/instances" element={<InstancesPage />} />
        <Route path="/instances/:id" element={<InstanceDetail />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
