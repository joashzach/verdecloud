/**
 * Sidebar.jsx
 * -----------
 * Shared app shell sidebar. Reuse this in any page — do not
 * redefine sidebar markup elsewhere.
 *
 * OWNED BY: frontend-ardhendu (created here since client/ was empty)
 * Other developers adding nav items should extend this file.
 */

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Server,
  Lightbulb,
  FileText,
  Leaf,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/instances", label: "Instances", icon: Server },
  { to: "/recommendations", label: "Recommendations", icon: Lightbulb },
  { to: "/reports", label: "Reports", icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar__logo">
        <div className="sidebar__logo-mark" aria-hidden="true">
          <Leaf size={16} strokeWidth={2} />
        </div>
        <span className="sidebar__logo-text">VerdeCloud</span>
      </div>

      <nav className="sidebar__nav">
        <span className="sidebar__nav-label">Navigation</span>
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar__nav-item${isActive ? " active" : ""}`
            }
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          >
            <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
