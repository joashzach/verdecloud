/**
 * App.jsx — VerdeCloud Application Root
 *
 * Sets up React Router and renders the shared Navbar
 * above all page content.
 *
 * Route map:
 *  /                    → OverviewPage        (Person 1)
 *  /instances           → InstancesPage       (Person 2)
 *  /instances/:id       → InstancesPage       (Person 2 — handles :id internally)
 *  /recommendations     → RecommendationsPage (Person 2/3)
 *  /reports             → ReportsPage         (Person 3)
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
        <Route path="/instances/:id" element={<InstancesPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
