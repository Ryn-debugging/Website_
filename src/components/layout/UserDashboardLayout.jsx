import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { DUMMY_CURRENT_USER } from '../../utils/dummyUserDashboardData.js'
import BrandLogo from './BrandLogo.jsx'

const DASHBOARD_NAV_ITEMS = [
  {
    id: 'ringkasan',
    label: 'Ringkasan',
    to: '/dashboard',
    end: true,
    icon: 'overview',
  },
  {
    id: 'laporan-saya',
    label: 'Laporan Saya',
    to: '/dashboard/laporan-saya',
    icon: 'reports',
  },
  {
    id: 'buat-laporan',
    label: 'Buat Laporan',
    to: '/buat-laporan',
    icon: 'create',
  },
  {
    id: 'profil-saya',
    label: 'Profil Saya',
    to: '/dashboard/profil',
    icon: 'profile',
  },
]

function DashboardNavIcon({ name }) {
  switch (name) {
    case 'overview':
      return (
        <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case 'reports':
      return (
        <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M8 13h8M8 17h5" />
        </svg>
      )
    case 'create':
      return (
        <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    case 'profile':
      return (
        <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.8-3.6 5-5.5 8-5.5s6.2 1.9 8 5.5" />
        </svg>
      )
    case 'logout':
      return (
        <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 5-5-5-5M21 12H9" />
        </svg>
      )
    default:
      return null
  }
}

/**
 * UserDashboardLayout menyediakan Sidebar Desktop, Navigasi Mobile responsif,
 * dan dialog keluar (tanpa autentikasi palsu) untuk halaman Dashboard Pengguna.
 */
function UserDashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const [openDrawerPathname, setOpenDrawerPathname] = useState(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const isMobileDrawerOpen = openDrawerPathname === location.pathname
  const user = DUMMY_CURRENT_USER

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    if (!isMobileDrawerOpen && !showLogoutModal) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenDrawerPathname(null)
        setShowLogoutModal(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileDrawerOpen, showLogoutModal])

  const closeMobileDrawer = () => setOpenDrawerPathname(null)

  const handleConfirmLogout = () => {
    setShowLogoutModal(false)
    setOpenDrawerPathname(null)
    navigate('/masuk')
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-canvas text-ink">
      <a
        id="dashboard-skip-link"
        href="#dashboard-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn btn-primary btn-sm"
      >
        Lewati ke konten dashboard
      </a>

      {/* ====================================================================
          SIDEBAR DESKTOP (lg: >= 1024px)
         ==================================================================== */}
      <aside
        aria-label="Sidebar Dashboard Pengguna"
        className="hidden lg:flex lg:w-64 xl:w-72 lg:flex-col lg:sticky lg:top-0 lg:h-screen bg-surface border-r border-line shrink-0"
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-line flex items-center justify-between">
          <BrandLogo id="dashboard-sidebar-brand" theme="light" />
        </div>

        {/* Tombol Cepat Buat Laporan */}
        <div className="p-4 border-b border-line">
          <Link
            id="sidebar-cta-buat-laporan"
            to="/buat-laporan"
            className="btn btn-primary btn-block"
          >
            <svg
              aria-hidden="true"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Buat Laporan</span>
          </Link>
        </div>

        {/* Menu Navigasi Utama Dashboard */}
        <nav
          aria-label="Menu Dashboard Warga"
          className="flex-1 p-3.5 space-y-1 overflow-y-auto"
        >
          <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
            Menu Warga
          </p>

          {DASHBOARD_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 min-h-11 px-3.5 py-2.5 rounded-md text-sm transition-colors no-underline ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-semibold border-l-3 border-teal'
                    : 'text-ink-secondary font-medium hover:bg-surface-subtle hover:text-navy'
                }`
              }
            >
              <DashboardNavIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="pt-4 mt-4 border-t border-line">
            <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
              Akses Publik
            </p>
            <Link
              id="sidebar-public-explore-link"
              to="/laporan"
              className="flex items-center gap-3 min-h-10 px-3.5 py-2 rounded-md text-sm font-medium text-ink-secondary hover:bg-surface-subtle hover:text-navy no-underline"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span>Jelajahi Laporan Publik</span>
            </Link>
          </div>
        </nav>

        {/* Profil Ringkas & Tombol Keluar */}
        <div className="p-4 border-t border-line bg-canvas/60 space-y-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="w-10 h-10 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center shrink-0"
            >
              {user.initials}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">
                {user.fullName}
              </p>
              <p className="text-xs text-muted truncate">
                Contoh Akun Warga (Dummy)
              </p>
            </div>
          </div>

          <button
            id="sidebar-logout-btn"
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="btn btn-outline btn-sm btn-block text-danger border-danger/30 hover:bg-danger-soft hover:border-danger"
          >
            <DashboardNavIcon name="logout" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* ====================================================================
          HEADER & NAVIGASI MOBILE / TABLET (< 1024px)
         ==================================================================== */}
      <div className="lg:hidden sticky top-0 z-30 bg-surface border-b border-line shadow-xs">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <BrandLogo id="dashboard-mobile-brand" theme="light" />

          <div className="flex items-center gap-2">
            <span className="hidden xs:inline-flex badge badge-pending">
              <span className="badge-dot" aria-hidden="true" />
              UI Sementara
            </span>

            <button
              id="dashboard-mobile-menu-btn"
              type="button"
              onClick={() =>
                setOpenDrawerPathname((prev) =>
                  prev === location.pathname ? null : location.pathname,
                )
              }
              aria-expanded={isMobileDrawerOpen}
              aria-controls="dashboard-mobile-drawer"
              aria-label={
                isMobileDrawerOpen
                  ? 'Tutup menu dashboard'
                  : 'Buka menu dashboard'
              }
              className="w-11 h-11 rounded-md text-navy hover:bg-surface-subtle flex items-center justify-center cursor-pointer"
            >
              {isMobileDrawerOpen ? (
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Bilah Navigasi Cepat Mobile/Tablet */}
        <nav
          aria-label="Navigasi Cepat Dashboard Seluler"
          className="px-4 sm:px-6 py-2 bg-canvas border-t border-line flex items-center gap-1.5 overflow-x-auto"
        >
          {DASHBOARD_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              id={`mobile-tab-${item.id}`}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap no-underline transition-colors ${
                  isActive
                    ? 'bg-navy text-white'
                    : 'bg-surface text-ink-secondary border border-line hover:text-navy'
                }`
              }
            >
              <DashboardNavIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <button
            id="mobile-tab-logout"
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap bg-surface text-danger border border-danger/30 hover:bg-danger-soft cursor-pointer"
          >
            <DashboardNavIcon name="logout" />
            <span>Keluar</span>
          </button>
        </nav>

        {/* Drawer Menu Lengkap Mobile */}
        {isMobileDrawerOpen && (
          <>
            <div
              aria-hidden="true"
              onClick={closeMobileDrawer}
              className="fixed inset-x-0 top-28 bottom-0 bg-navy-950/35 z-30"
            />
            <div
              id="dashboard-mobile-drawer"
              className="relative z-40 bg-surface border-t border-line p-4 sm:px-6 space-y-3 shadow-dropdown"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-line">
                <span className="w-10 h-10 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">
                  {user.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{user.fullName}</p>
                  <p className="text-xs text-muted">
                    {user.email} &middot; Data Dummy
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                {DASHBOARD_NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.id}
                    id={`drawer-nav-${item.id}`}
                    to={item.to}
                    end={item.end}
                    onClick={closeMobileDrawer}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
                    }
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <DashboardNavIcon name={item.icon} />
                      <span>{item.label}</span>
                    </span>
                  </NavLink>
                ))}
              </div>

              <div className="pt-2 border-t border-line flex flex-col xs:flex-row gap-2">
                <Link
                  id="drawer-public-home"
                  to="/"
                  onClick={closeMobileDrawer}
                  className="btn btn-outline btn-sm flex-1"
                >
                  Ke Beranda Publik
                </Link>
                <button
                  id="drawer-logout-btn"
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="btn btn-danger btn-sm flex-1"
                >
                  Keluar
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ====================================================================
          AREA KONTEN UTAMA DASHBOARD
         ==================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Utility Strip (Desktop) */}
        <header className="hidden lg:flex h-16 px-8 bg-surface border-b border-line items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="badge badge-pending">
              <span className="badge-dot" aria-hidden="true" />
              UI Sementara — Belum Terhubung Supabase Auth
            </span>
            <span className="text-xs text-muted">
              Menampilkan data contoh khusus milik satu pengguna warga
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              id="topbar-public-home-link"
              to="/"
              className="text-xs font-semibold text-navy hover:text-teal transition-colors"
            >
              &larr; Beranda Publik
            </Link>
          </div>
        </header>

        <main
          id="dashboard-main-content"
          className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto"
        >
          <Outlet />
        </main>
      </div>

      {/* ====================================================================
          MODAL KONFIRMASI KELUAR (TANPA AUTENTIKASI PALSU)
         ==================================================================== */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/45 backdrop-blur-[1px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
            className="card p-6 sm:p-7 max-w-md w-full shadow-modal space-y-4"
          >
            <div className="space-y-1.5">
              <h2 id="logout-modal-title" className="heading-3">
                Keluar dari Pratinjau Dashboard?
              </h2>
              <p className="text-body-sm text-muted">
                Halaman ini merupakan antarmuka sementara sebelum integrasi
                Supabase Auth (tidak ada sesi login aktif yang disimpan). Anda
                akan diarahkan ke halaman Masuk.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                id="logout-cancel-btn"
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="btn btn-outline btn-sm"
              >
                Batal
              </button>
              <button
                id="logout-confirm-btn"
                type="button"
                onClick={handleConfirmLogout}
                className="btn btn-danger btn-sm"
              >
                Ya, Ke Halaman Masuk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDashboardLayout
