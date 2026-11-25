import { useEffect, useMemo, useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { REPORT_STATUS } from '../../utils/designTokens.js'
import {
  DUMMY_ADMIN_PROFILE,
  INITIAL_ADMIN_ACTIVITIES,
  INITIAL_ADMIN_CATEGORIES,
  INITIAL_ADMIN_REPORTS,
} from '../../utils/dummyAdminData.js'
import AdminModerationModal from '../common/AdminModerationModal.jsx'
import BrandLogo from './BrandLogo.jsx'

function AdminNavIcon({ name }) {
  switch (name) {
    case 'dashboard':
      return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case 'all':
      return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M8 13h8M8 17h5" />
        </svg>
      )
    case 'pending':
      return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'processing':
      return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          <path d="M21 3v5h-5" />
        </svg>
      )
    case 'resolved':
      return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.5 2.5 2.5 5-5" />
        </svg>
      )
    case 'categories':
      return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
          <circle cx="7" cy="7" r="1.5" />
        </svg>
      )
    case 'settings':
      return (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      )
    default:
      return null
  }
}

/**
 * AdminDashboardLayout membungkus seluruh tampilan Admin (/admin/*) dengan:
 * - Sidebar Institusional Navy pada Desktop (7 menu wajib)
 * - Navigasi Responsif pada Mobile & Tablet
 * - State simulasi laporan, kategori, aktivitas moderasi, dan dialog konfirmasi
 *   (tanpa koneksi Supabase dan tanpa autentikasi palsu)
 */
function AdminDashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const admin = DUMMY_ADMIN_PROFILE

  const [reports, setReports] = useState(INITIAL_ADMIN_REPORTS)
  const [categories, setCategories] = useState(INITIAL_ADMIN_CATEGORIES)
  const [activities, setActivities] = useState(INITIAL_ADMIN_ACTIVITIES)

  const [inspectingReportId, setInspectingReportId] = useState(null)
  const [quickVerifyTarget, setQuickVerifyTarget] = useState(null)
  const [feedbackBanner, setFeedbackBanner] = useState('')

  const [openDrawerPathname, setOpenDrawerPathname] = useState(null)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const isMobileDrawerOpen = openDrawerPathname === location.pathname

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    if (!isMobileDrawerOpen && !showExitConfirm && !quickVerifyTarget) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenDrawerPathname(null)
        setShowExitConfirm(false)
        setQuickVerifyTarget(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileDrawerOpen, showExitConfirm, quickVerifyTarget])

  const counts = useMemo(() => {
    return {
      total: reports.length,
      pending: reports.filter((r) => r.status === 'menunggu_verifikasi').length,
      processing: reports.filter((r) => r.status === 'sedang_diproses').length,
      resolved: reports.filter((r) => r.status === 'selesai').length,
      rejected: reports.filter((r) => r.status === 'ditolak').length,
    }
  }, [reports])

  const sidebarItems = useMemo(
    () => [
      { id: 'dashboard', label: 'Dashboard', to: '/admin', end: true, icon: 'dashboard' },
      {
        id: 'semua-laporan',
        label: 'Semua Laporan',
        to: '/admin/laporan',
        icon: 'all',
        badgeCount: counts.total,
      },
      {
        id: 'menunggu-verifikasi',
        label: 'Menunggu Verifikasi',
        to: '/admin/menunggu-verifikasi',
        icon: 'pending',
        badgeCount: counts.pending,
      },
      {
        id: 'sedang-diproses',
        label: 'Sedang Diproses',
        to: '/admin/sedang-diproses',
        icon: 'processing',
        badgeCount: counts.processing,
      },
      {
        id: 'laporan-selesai',
        label: 'Laporan Selesai',
        to: '/admin/selesai',
        icon: 'resolved',
        badgeCount: counts.resolved,
      },
      { id: 'kategori', label: 'Kategori', to: '/admin/kategori', icon: 'categories' },
      { id: 'pengaturan', label: 'Pengaturan', to: '/admin/pengaturan', icon: 'settings' },
    ],
    [counts],
  )

  const inspectingReport = useMemo(
    () => reports.find((item) => item.id === inspectingReportId) || null,
    [reports, inspectingReportId],
  )

  const handleApplyModeration = ({
    reportId,
    nextStatus,
    adminNote,
    rejectionReason,
  }) => {
    const targetReport = reports.find((item) => item.id === reportId)
    if (!targetReport) return

    const nowFormatted = new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    setReports((prev) =>
      prev.map((item) => {
        if (item.id !== reportId) return item
        return {
          ...item,
          status: nextStatus,
          adminNote: adminNote !== undefined ? adminNote : item.adminNote,
          rejectionReason:
            nextStatus === 'ditolak' ? rejectionReason : '',
        }
      }),
    )

    const statusChanged = targetReport.status !== nextStatus
    const nextLabel = REPORT_STATUS[nextStatus]?.label || nextStatus

    const actionText = statusChanged
      ? nextStatus === 'ditolak'
        ? 'Laporan Ditolak dengan Alasan'
        : `Status diubah menjadi ${nextLabel}`
      : 'Catatan tindak lanjut diperbarui'

    const newActivity = {
      id: `act-${Date.now()}`,
      reportId: targetReport.id,
      reportNumber: targetReport.reportNumber,
      actionLabel: actionText,
      note:
        nextStatus === 'ditolak'
          ? rejectionReason
          : adminNote || `Pembaruan status ke ${nextLabel}.`,
      timestamp: `${nowFormatted} WIB`,
      badgeStatus: nextStatus,
    }

    setActivities((prev) => [newActivity, ...prev])
    setInspectingReportId(null)
    setQuickVerifyTarget(null)
    setFeedbackBanner(
      `Berhasil memperbarui #${targetReport.reportNumber}: ${actionText} (Simulasi Memori UI).`,
    )
  }

  const handleAddCategory = ({ name, description }) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const nextCategory = {
      id: slug || `kategori-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
    }

    setCategories((prev) => [...prev, nextCategory])
    setFeedbackBanner(
      `Kategori "${nextCategory.name}" berhasil ditambahkan pada sesi simulasi UI.`,
    )
  }

  const handleDeleteCategory = (categoryId) => {
    const target = categories.find((c) => c.id === categoryId)
    setCategories((prev) => prev.filter((c) => c.id !== categoryId))
    if (target) {
      setFeedbackBanner(
        `Kategori "${target.name}" dihapus dari sesi simulasi UI.`,
      )
    }
  }

  const outletContextValue = {
    reports,
    categories,
    activities,
    counts,
    onInspectReport: (report) => setInspectingReportId(report.id),
    onSelectReportId: (reportId) => setInspectingReportId(reportId),
    onQuickVerifyRequest: (report) => setQuickVerifyTarget(report),
    onAddCategory: handleAddCategory,
    onDeleteCategory: handleDeleteCategory,
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-canvas text-ink">
      <a
        id="admin-skip-link"
        href="#admin-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn btn-primary btn-sm"
      >
        Lewati ke konten admin
      </a>

      {/* ====================================================================
          SIDEBAR DESKTOP ADMIN (Navy #173B57 — lg: >= 1024px)
         ==================================================================== */}
      <aside
        aria-label="Sidebar Admin LaporWarga"
        className="hidden lg:flex lg:w-68 xl:w-72 lg:flex-col lg:sticky lg:top-0 lg:h-screen bg-navy text-white border-r border-navy-900 shrink-0"
      >
        <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between">
          <BrandLogo id="admin-sidebar-brand" theme="dark" />
        </div>

        <nav
          aria-label="Navigasi Panel Admin"
          className="flex-1 p-3.5 space-y-1 overflow-y-auto"
        >
          <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-200">
            Panel Pengelola
          </p>

          {sidebarItems.map((item) => (
            <NavLink
              key={item.id}
              id={`admin-nav-${item.id}`}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center justify-between gap-2 min-h-11 px-3.5 py-2.5 rounded-md text-sm transition-colors no-underline ${
                  isActive
                    ? 'bg-teal text-white font-semibold shadow-xs'
                    : 'text-white/80 font-medium hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="inline-flex items-center gap-3 min-w-0">
                <AdminNavIcon name={item.icon} />
                <span className="truncate">{item.label}</span>
              </span>

              {typeof item.badgeCount === 'number' && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-navy-950/45 text-white tabular-nums">
                  {item.badgeCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profil Admin Dummy & Keluar */}
        <div className="p-4 border-t border-white/12 bg-navy-900/65 space-y-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center shrink-0">
              {admin.initials}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {admin.name}
              </p>
              <p className="text-xs text-white/70 truncate">
                {admin.roleLabel}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              id="admin-sidebar-public-btn"
              to="/"
              className="btn btn-outline-on-dark btn-sm text-xs px-2"
            >
              Web Publik
            </Link>
            <button
              id="admin-sidebar-exit-btn"
              type="button"
              onClick={() => setShowExitConfirm(true)}
              className="btn btn-danger btn-sm text-xs px-2"
            >
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {/* ====================================================================
          HEADER & NAVIGASI MOBILE / TABLET (< 1024px)
         ==================================================================== */}
      <div className="lg:hidden sticky top-0 z-30 bg-navy text-white border-b border-navy-900 shadow-xs">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <BrandLogo id="admin-mobile-brand" theme="dark" />

          <button
            id="admin-mobile-menu-toggle"
            type="button"
            onClick={() =>
              setOpenDrawerPathname((prev) =>
                prev === location.pathname ? null : location.pathname,
              )
            }
            aria-expanded={isMobileDrawerOpen}
            aria-controls="admin-mobile-drawer"
            aria-label={
              isMobileDrawerOpen ? 'Tutup menu admin' : 'Buka menu admin'
            }
            className="w-11 h-11 rounded-md text-white hover:bg-white/10 flex items-center justify-center cursor-pointer"
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

        {/* Horizontal Scrollable Mobile Tab Strip */}
        <nav
          aria-label="Tab Cepat Admin Seluler"
          className="px-4 sm:px-6 py-2 bg-navy-900 flex items-center gap-1.5 overflow-x-auto"
        >
          {sidebarItems.map((item) => (
            <NavLink
              key={item.id}
              id={`admin-mobile-tab-${item.id}`}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap no-underline ${
                  isActive
                    ? 'bg-teal text-white'
                    : 'bg-white/8 text-white/80 hover:bg-white/15'
                }`
              }
            >
              <span>{item.label}</span>
              {typeof item.badgeCount === 'number' && (
                <span className="opacity-80">({item.badgeCount})</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Full Drawer */}
        {isMobileDrawerOpen && (
          <div
            id="admin-mobile-drawer"
            className="bg-navy-900 border-t border-white/12 p-4 sm:px-6 space-y-2 shadow-dropdown"
          >
            {sidebarItems.map((item) => (
              <NavLink
                key={item.id}
                id={`admin-drawer-item-${item.id}`}
                to={item.to}
                end={item.end}
                onClick={() => setOpenDrawerPathname(null)}
                className={({ isActive }) =>
                  `flex items-center justify-between min-h-11 px-3.5 py-2 rounded-md text-sm no-underline ${
                    isActive
                      ? 'bg-teal text-white font-semibold'
                      : 'text-white/85 hover:bg-white/10'
                  }`
                }
              >
                <span className="inline-flex items-center gap-2.5">
                  <AdminNavIcon name={item.icon} />
                  <span>{item.label}</span>
                </span>
                {typeof item.badgeCount === 'number' && (
                  <span className="text-xs font-bold">{item.badgeCount}</span>
                )}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-white/12 flex gap-2">
              <Link
                id="admin-drawer-public-link"
                to="/"
                onClick={() => setOpenDrawerPathname(null)}
                className="btn btn-outline-on-dark btn-sm flex-1"
              >
                Beranda Publik
              </Link>
              <button
                id="admin-drawer-exit-btn"
                type="button"
                onClick={() => setShowExitConfirm(true)}
                className="btn btn-danger btn-sm flex-1"
              >
                Keluar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================
          MAIN CONTENT CONTAINER
         ==================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="hidden lg:flex h-16 px-8 bg-surface border-b border-line items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="badge badge-pending">
              <span className="badge-dot" aria-hidden="true" />
              UI Sementara Admin — Belum Terhubung Supabase &amp; RLS
            </span>
            <span className="text-xs text-muted">
              Seluruh perubahan status hanya berlaku pada sesi memori pratinjau
            </span>
          </div>

          <Link
            id="admin-topbar-citizen-dashboard"
            to="/dashboard"
            className="text-xs font-semibold text-navy hover:text-teal transition-colors"
          >
            Lihat Dashboard Warga &rarr;
          </Link>
        </header>

        <main
          id="admin-main-content"
          className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6"
        >
          {feedbackBanner && (
            <div
              role="status"
              aria-live="polite"
              className="p-3.5 sm:px-5 rounded-lg border border-success/35 bg-success-soft text-success-ink flex items-center justify-between gap-3 text-body-sm"
            >
              <span className="font-medium">{feedbackBanner}</span>
              <button
                id="dismiss-admin-feedback-btn"
                type="button"
                onClick={() => setFeedbackBanner('')}
                aria-label="Tutup pemberitahuan"
                className="font-bold px-2 py-0.5 rounded-xs hover:bg-success/15 cursor-pointer"
              >
                &times;
              </button>
            </div>
          )}

          <Outlet context={outletContextValue} />
        </main>
      </div>

      {/* ====================================================================
          MODAL MODERASI LAPORAN LENGKAP
         ==================================================================== */}
      {inspectingReport && (
        <AdminModerationModal
          key={inspectingReport.id}
          report={inspectingReport}
          onClose={() => setInspectingReportId(null)}
          onApplyModeration={handleApplyModeration}
        />
      )}

      {/* ====================================================================
          DIALOG KONFIRMASI VERIFIKASI CEPAT DARI TABEL
         ==================================================================== */}
      {quickVerifyTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-[1px]">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="quick-verify-title"
            className="card p-6 max-w-md w-full shadow-modal space-y-4"
          >
            <div className="space-y-1.5">
              <h2 id="quick-verify-title" className="heading-3">
                Konfirmasi Verifikasi Laporan
              </h2>
              <p className="text-body-sm text-muted">
                Apakah Anda yakin ingin memverifikasi laporan{' '}
                <strong className="text-navy">
                  #{quickVerifyTarget.reportNumber}
                </strong>{' '}
                (<em>{quickVerifyTarget.title}</em>)? Status akan berubah menjadi{' '}
                <strong>Diverifikasi</strong>.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                id="quick-verify-cancel"
                type="button"
                onClick={() => setQuickVerifyTarget(null)}
                className="btn btn-outline btn-sm"
              >
                Batal
              </button>
              <button
                id="quick-verify-confirm"
                type="button"
                onClick={() =>
                  handleApplyModeration({
                    reportId: quickVerifyTarget.id,
                    nextStatus: 'diverifikasi',
                    adminNote:
                      quickVerifyTarget.adminNote ||
                      'Laporan telah diperiksa dan diverifikasi oleh admin.',
                    rejectionReason: '',
                  })
                }
                className="btn btn-success btn-sm"
              >
                Ya, Verifikasi Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          DIALOG KONFIRMASI KELUAR ADMIN
         ==================================================================== */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-[1px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-exit-title"
            className="card p-6 max-w-md w-full shadow-modal space-y-4"
          >
            <div className="space-y-1.5">
              <h2 id="admin-exit-title" className="heading-3">
                Keluar dari Pratinjau Admin Dashboard?
              </h2>
              <p className="text-body-sm text-muted">
                Panel admin ini merupakan pratinjau antarmuka sementara tanpa
                autentikasi admin palsu. Anda akan diarahkan ke halaman Masuk.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                id="admin-exit-cancel"
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="btn btn-outline btn-sm"
              >
                Batal
              </button>
              <button
                id="admin-exit-confirm"
                type="button"
                onClick={() => {
                  setShowExitConfirm(false)
                  navigate('/masuk')
                }}
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

export default AdminDashboardLayout
