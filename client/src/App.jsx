/**
 * App.jsx
 * -------
 * Root application shell. Wires together the Sidebar and page routing.
 * Add new routes here as other developers build their pages.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import InstancesPage from "./pages/InstancesPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/instances" element={<InstancesPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
