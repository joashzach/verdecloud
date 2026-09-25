/**
 * App.jsx — VerdeCloud Application Root
 *
 * Sets up React Router and renders the shared Navbar
 * above all page content.
 *
 * Route map:
 *  /                    → OverviewPage        (Person 1 — Baibhav)
 *  /instances           → InstancesPage       (Person 2)
 *  /recommendations     → RecommendationsPage (Ardhendu)
 *  /reports             → ReportsPage         (Ardhendu)
 *
 * TEAM RULES:
 *  - Do NOT add feature-specific logic here.
 *  - To add a new route, add it to <Routes> and update NAV_ITEMS in Navbar.jsx.
 */

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import OverviewPage from './pages/OverviewPage';
import InstancesPage from './pages/InstancesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <>
      {/* Shared navbar — rendered on every page */}
      <Navbar />

      {/* Page content */}
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/instances" element={<InstancesPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </>
  );
}
