import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import BrandLogo from './BrandLogo.jsx'
import { AUTH_ACTION_LINKS, MAIN_NAV_LINKS } from './navigationData.js'

/**
 * Reusable Desktop Navigation Link with Hover & Active Indicator
 */
function DesktopNavItem({ id, to, label, end }) {
  return (
    <NavLink
      id={`nav-desktop-${id}`}
      to={to}
      end={end}
      className={({ isActive }) =>
        `nav-link ${isActive ? 'nav-link-active' : ''}`
      }
    >
      {label}
    </NavLink>
  )
}

/**
 * Reusable Mobile Navigation Link with 44px Touch Target, Hover & Active Indicator
 */
function MobileNavItem({ id, to, label, end, onSelect }) {
  return (
    <NavLink
      id={`nav-mobile-${id}`}
      to={to}
      end={end}
      onClick={onSelect}
      className={({ isActive }) =>
        `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
      }
    >
      {({ isActive }) => (
        <>
          <span>{label}</span>
          <span
            aria-hidden="true"
            className={`w-2 h-2 rounded-full transition-opacity ${
              isActive ? 'bg-teal opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}
    </NavLink>
  )
}

function Navbar() {
  const location = useLocation()
  // Menyimpan pathname saat menu mobile dibuka agar otomatis tertutup saat berpindah rute
  const [openMenuPathname, setOpenMenuPathname] = useState(null)
  const isMobileMenuOpen = openMenuPathname === location.pathname

  const closeMobileMenu = () => setOpenMenuPathname(null)

  const toggleMobileMenu = () => {
    setOpenMenuPathname((prev) =>
      prev === location.pathname ? null : location.pathname,
    )
  }

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenMenuPathname(null)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenMenuPathname(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-line shadow-xs">
      <div className="lw-container h-16 sm:h-[4.25rem] flex items-center justify-between gap-4">
        {/* 1. Logo */}
        <BrandLogo id="navbar-brand-link" theme="light" />

        {/* 2. Desktop Primary Navigation (Beranda, Jelajahi Laporan, Panduan, Tentang) */}
        <nav
          aria-label="Navigasi Utama Desktop"
          className="hidden lg:flex items-center gap-1"
        >
          {MAIN_NAV_LINKS.map((item) => (
            <DesktopNavItem
              key={item.id}
              id={item.id}
              to={item.to}
              label={item.label}
              end={item.end}
            />
          ))}
        </nav>

        {/* 3. Desktop Action Buttons (Masuk & Buat Laporan) */}
        <div className="hidden lg:flex items-center gap-2.5">
          <NavLink
            id="nav-desktop-masuk"
            to={AUTH_ACTION_LINKS.login.to}
            className={({ isActive }) =>
              `btn btn-outline btn-sm min-h-10 px-4 ${
                isActive
                  ? 'border-navy bg-navy-50 text-navy font-bold'
                  : ''
              }`
            }
          >
            {AUTH_ACTION_LINKS.login.label}
          </NavLink>

          <NavLink
            id="nav-desktop-buat-laporan"
            to={AUTH_ACTION_LINKS.createReport.to}
            className={({ isActive }) =>
              `btn btn-primary btn-sm min-h-10 px-4 ${
                isActive ? 'bg-teal-800 ring-2 ring-teal/30' : ''
              }`
            }
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>{AUTH_ACTION_LINKS.createReport.label}</span>
          </NavLink>
        </div>

        {/* 4. Mobile Hamburger Menu Toggle Button */}
        <button
          id="navbar-mobile-toggle"
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="navbar-mobile-menu"
          aria-label={
            isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
          }
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-navy hover:bg-surface-subtle active:bg-surface-muted transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? (
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 5. Responsive Mobile Menu Drawer & Backdrop */}
      {isMobileMenuOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={closeMobileMenu}
            className="lg:hidden fixed inset-x-0 top-16 sm:top-[4.25rem] bottom-0 bg-navy-950/35 backdrop-blur-[1px] z-30"
          />

          <nav
            id="navbar-mobile-menu"
            aria-label="Navigasi Utama Seluler"
            className="lg:hidden relative z-40 bg-surface border-b border-line shadow-dropdown"
          >
            <div className="lw-container py-4 space-y-1">
              {MAIN_NAV_LINKS.map((item) => (
                <MobileNavItem
                  key={item.id}
                  id={item.id}
                  to={item.to}
                  label={item.label}
                  end={item.end}
                  onSelect={closeMobileMenu}
                />
              ))}

              <div className="pt-3 mt-3 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <NavLink
                  id="nav-mobile-masuk"
                  to={AUTH_ACTION_LINKS.login.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `btn btn-outline btn-block ${
                      isActive ? 'border-navy bg-navy-50 font-bold' : ''
                    }`
                  }
                >
                  {AUTH_ACTION_LINKS.login.label}
                </NavLink>

                <NavLink
                  id="nav-mobile-buat-laporan"
                  to={AUTH_ACTION_LINKS.createReport.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `btn btn-primary btn-block ${
                      isActive ? 'bg-teal-800 ring-2 ring-teal/30' : ''
                    }`
                  }
                >
                  <svg
                    aria-hidden="true"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>{AUTH_ACTION_LINKS.createReport.label}</span>
                </NavLink>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}

export default Navbar
