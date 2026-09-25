/**
 * Navbar.jsx ΓÇö VerdeCloud Resizable Navbar
 *
 * Implements the Aceternity UI "Resizable Navbar" pattern:
 * - Starts full-width (pill) centered at top of viewport
 * - Shrinks/compacts when the user scrolls down
 * - Expands back when user scrolls back to top
 * - Mobile: hamburger drawer
 *
 * Uses framer-motion for smooth resize animation.
 * Uses react-router-dom NavLink for active-state routing.
 *
 * Navigation config lives in NAV_ITEMS ΓÇö add/remove routes here.
 */

import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

// ΓöÇΓöÇ Nav configuration ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const NAV_ITEMS = [
  {
    title: 'Overview',
    href: '/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Instances',
    href: '/instances',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="5" rx="1.5" />
        <rect x="2" y="10" width="20" height="5" rx="1.5" />
        <rect x="2" y="17" width="20" height="5" rx="1.5" />
        <circle cx="18" cy="5.5" r="1" fill="currentColor" />
        <circle cx="18" cy="12.5" r="1" fill="currentColor" />
        <circle cx="18" cy="19.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Recommendations',
    href: '/recommendations',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.2 6l-.8.6V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.4l-.8-.6A7 7 0 0 1 12 2z" />
        <path d="M9 21h6" />
      </svg>
    ),
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
];

// ΓöÇΓöÇ Logo ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function VerdeCloudLogo({ compact }) {
  return (
    <NavLink to="/" className="navbar__logo" aria-label="VerdeCloud home">
      {/* Leaf icon mark */}
      <span className="navbar__logo-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 4 13c0-4 3-7 7-9 4 2 7 5 7 9a7 7 0 0 1-7 7z" />
          <path d="M11 20V9" />
        </svg>
      </span>
      {/* Wordmark ΓÇö hidden when compact on desktop */}
      <AnimatePresence>
        {!compact && (
          <motion.span
            className="navbar__logo-text"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            VerdeCloud
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );
}

// ΓöÇΓöÇ Main Navbar ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Detect scroll to trigger "compact" state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ΓöÇΓöÇ Fixed container that centers the pill ΓöÇΓöÇ */}
      <div className="navbar-wrapper" role="banner">
        <motion.nav
          className={`navbar ${scrolled ? 'navbar--compact' : ''}`}
          aria-label="Main navigation"
          initial={false}
          animate={{
            maxWidth: scrolled ? 620 : 900,
            paddingLeft: scrolled ? 16 : 24,
            paddingRight: scrolled ? 16 : 24,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        >
          {/* Logo */}
          <VerdeCloudLogo compact={scrolled} />

          {/* ΓöÇΓöÇ Desktop nav links ΓöÇΓöÇ */}
          <ul className="navbar__links" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  <span className="navbar__link-icon">{item.icon}</span>
                  <span className="navbar__link-label">{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ΓöÇΓöÇ Mobile hamburger ΓöÇΓöÇ */}
          <button
            className="navbar__hamburger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <motion.span
              className="navbar__hamburger-icon"
              animate={mobileOpen ? 'open' : 'closed'}
            >
              {mobileOpen ? (
                /* X icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </svg>
              )}
            </motion.span>
          </button>
        </motion.nav>
      </div>

      {/* ΓöÇΓöÇ Mobile Drawer ΓöÇΓöÇ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="navbar__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              className="navbar__mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            >
              {/* Drawer header */}
              <div className="navbar__mobile-header">
                <VerdeCloudLogo compact={false} />
              </div>

              {/* Drawer nav items */}
              <nav aria-label="Mobile navigation">
                <ul className="navbar__mobile-links" role="list">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <NavLink
                        to={item.href}
                        end={item.href === '/'}
                        className={({ isActive }) =>
                          `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                        }
                      >
                        <span className="navbar__link-icon">{item.icon}</span>
                        {item.title}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
