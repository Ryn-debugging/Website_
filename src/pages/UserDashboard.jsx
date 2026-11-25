import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardStatCard from '../components/common/DashboardStatCard.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import UserReportRowCard from '../components/common/UserReportRowCard.jsx'
import {
  DUMMY_CURRENT_USER,
  USER_REPORT_STATUS_FILTERS,
  getDummyReportsForUser,
} from '../utils/dummyUserDashboardData.js'

/**
 * UserDashboard merender konten utama Dashboard Pengguna berdasarkan tab/rute aktif:
 * - section="overview" : Ringkasan (Sapaan, 4 Metrik Utama, & Aktivitas Laporan Pengguna)
 * - section="reports"  : Laporan Saya (Riwayat Lengkap Laporan Milik Pengguna)
 * - section="profile"  : Profil Saya (Informasi Akun Warga Sementara)
 */
function UserDashboard({ section = 'overview' }) {
  const user = DUMMY_CURRENT_USER

  // Hanya mengambil laporan yang ownerId-nya sama persis dengan user.id saat ini
  const ownedReports = useMemo(() => getDummyReportsForUser(user.id), [user.id])

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [simulateZeroReports, setSimulateZeroReports] = useState(false)

  const activeUserReports = useMemo(
    () => (simulateZeroReports ? [] : ownedReports),
    [simulateZeroReports, ownedReports],
  )

  // Perhitungan metrik real-time dari laporan milik pengguna sendiri
  const stats = useMemo(() => {
    const total = activeUserReports.length
    const pending = activeUserReports.filter(
      (item) => item.status === 'menunggu_verifikasi',
    ).length
    const processing = activeUserReports.filter(
      (item) => item.status === 'sedang_diproses',
    ).length
    const resolved = activeUserReports.filter(
      (item) => item.status === 'selesai',
    ).length

    return { total, pending, processing, resolved }
  }, [activeUserReports])

  const filteredReports = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return activeUserReports.filter((report) => {
      const matchesKeyword =
        keyword === '' ||
        report.title.toLowerCase().includes(keyword) ||
        report.reportNumber.toLowerCase().includes(keyword)

      const matchesStatus =
        statusFilter === 'all' || report.status === statusFilter

      return matchesKeyword && matchesStatus
    })
  }, [activeUserReports, searchQuery, statusFilter])

  const hasFilterOrSearch = searchQuery.trim() !== '' || statusFilter !== 'all'

  const handleResetFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
  }

  /* ========================================================================
     TAMPILAN 3: PROFIL SAYA (/dashboard/profil)
     ======================================================================== */
  if (section === 'profile') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-eyebrow text-teal">Akun Masyarakat</p>
            <h1 className="heading-1 mt-0.5">Profil Saya</h1>
            <p className="text-body-sm text-muted mt-1">
              Informasi profil contoh warga (UI Sementara sebelum integrasi tabel{' '}
              <code>profiles</code> Supabase).
            </p>
          </div>

          <Link
            id="profile-create-report-btn"
            to="/buat-laporan"
            className="btn btn-primary"
          >
            + Buat Laporan Baru
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 card">
            <div className="card-header flex items-center gap-4">
              <span className="w-14 h-14 rounded-full bg-navy text-white text-lg font-bold flex items-center justify-center shrink-0">
                {user.initials}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="heading-2">{user.fullName}</h2>
                  <span className="badge badge-pending">Data Dummy</span>
                </div>
                <p className="text-body-sm text-muted">{user.roleLabel}</p>
              </div>
            </div>

            <div className="card-body">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-body-sm">
                <div className="p-3.5 rounded-md bg-canvas border border-line">
                  <dt className="text-xs font-semibold text-muted">
                    Nama Lengkap
                  </dt>
                  <dd className="font-semibold text-ink mt-1">
                    {user.fullName}
                  </dd>
                </div>

                <div className="p-3.5 rounded-md bg-canvas border border-line">
                  <dt className="text-xs font-semibold text-muted">
                    Alamat Email
                  </dt>
                  <dd className="font-medium text-ink mt-1 break-all">
                    {user.email}
                  </dd>
                </div>

                <div className="p-3.5 rounded-md bg-canvas border border-line">
                  <dt className="text-xs font-semibold text-muted">
                    Peran Akun
                  </dt>
                  <dd className="mt-1">
                    <span className="badge badge-verified">{user.roleLabel}</span>
                  </dd>
                </div>

                <div className="p-3.5 rounded-md bg-canvas border border-line">
                  <dt className="text-xs font-semibold text-muted">
                    Terdaftar Sejak (Simulasi)
                  </dt>
                  <dd className="font-medium text-ink mt-1">{user.joinedAt}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-5 card p-6 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <h3 className="heading-3">Privasi &amp; Keamanan Akun</h3>
              <p className="text-body-sm text-muted leading-relaxed">
                Sesuai kebijakan keamanan LaporWarga, nama lengkap dan email Anda
                hanya terlihat di dashboard pribadi Anda serta pengelola resmi,
                dan tidak pernah ditampilkan pada daftar laporan publik.
              </p>
            </div>

            <div className="p-4 rounded-md bg-surface-subtle border border-line space-y-2 text-body-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Total Laporan Saya:</span>
                <strong className="text-navy">{ownedReports.length} laporan</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Status Selesai:</span>
                <strong className="text-success">
                  {ownedReports.filter((r) => r.status === 'selesai').length} laporan
                </strong>
              </div>
            </div>

            <Link
              id="profile-to-my-reports-btn"
              to="/dashboard/laporan-saya"
              className="btn btn-outline btn-block"
            >
              Lihat Riwayat Laporan Saya &rarr;
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ========================================================================
     TAMPILAN 1 & 2: RINGKASAN (/dashboard) & LAPORAN SAYA (/dashboard/laporan-saya)
     ======================================================================== */
  const isOverview = section === 'overview'

  return (
    <div className="space-y-8">
      {/* 1. Header Sapaan Pengguna / Judul Bagian + CTA Buat Laporan */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-eyebrow text-teal">
              {isOverview ? 'Dashboard Warga' : 'Riwayat Aduan Pribadi'}
            </p>
            <span className="badge badge-neutral">
              Data Contoh Milik {user.fullName}
            </span>
          </div>

          <h1 className="heading-1">
            {isOverview
              ? `Selamat datang, ${user.fullName}!`
              : 'Daftar Laporan Saya'}
          </h1>

          <p className="text-body text-muted max-w-2xl">
            {isOverview
              ? 'Pantau perkembangan status laporan infrastruktur yang telah Anda sampaikan kepada pengelola lingkungan.'
              : 'Seluruh riwayat laporan yang dikirim dari akun Anda beserta perkembangan verifikasi dan tindak lanjutnya.'}
          </p>
        </div>

        <div className="shrink-0">
          <Link
            id="dashboard-header-create-btn"
            to="/buat-laporan"
            className="btn btn-primary"
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
      </section>

      {/* 2. Overview Stat Cards (4 Metrik Wajib pada Ringkasan) */}
      {isOverview && (
        <section aria-label="Ringkasan Statistik Laporan Pengguna">
          <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            <DashboardStatCard
              id="stat-card-user-total"
              label="Total Laporan"
              value={stats.total}
              subtitle="Seluruh laporan milik Anda"
              variant="total"
              isActive={statusFilter === 'all'}
              onClick={() => setStatusFilter('all')}
            />
            <DashboardStatCard
              id="stat-card-user-pending"
              label="Menunggu Verifikasi"
              value={stats.pending}
              subtitle="Dalam antrean pemeriksaan admin"
              variant="pending"
              isActive={statusFilter === 'menunggu_verifikasi'}
              onClick={() => setStatusFilter('menunggu_verifikasi')}
            />
            <DashboardStatCard
              id="stat-card-user-processing"
              label="Sedang Diproses"
              value={stats.processing}
              subtitle="Sedang ditindaklanjuti petugas"
              variant="processing"
              isActive={statusFilter === 'sedang_diproses'}
              onClick={() => setStatusFilter('sedang_diproses')}
            />
            <DashboardStatCard
              id="stat-card-user-resolved"
              label="Selesai"
              value={stats.resolved}
              subtitle="Telah tuntas ditangani"
              variant="resolved"
              isActive={statusFilter === 'selesai'}
              onClick={() => setStatusFilter('selesai')}
            />
          </div>
        </section>
      )}

      {/* 3. Aktivitas Laporan Milik Pengguna + Pencarian & Filter Status */}
      <section
        aria-labelledby="user-activity-heading"
        className="space-y-5"
      >
        <div className="card p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 id="user-activity-heading" className="heading-2">
                {isOverview ? 'Aktivitas Laporan Saya' : 'Filter & Pencarian Laporan'}
              </h2>
              <p className="text-body-sm text-muted mt-0.5">
                Hanya menampilkan laporan milik akun Anda (laporan warga lain
                tidak digabungkan di sini).
              </p>
            </div>

            {/* Tombol Penguji Empty State Akun Baru */}
            <button
              id="toggle-empty-user-reports-btn"
              type="button"
              onClick={() => {
                setSimulateZeroReports((prev) => !prev)
                handleResetFilters()
              }}
              className={`btn btn-sm self-start sm:self-auto ${
                simulateZeroReports ? 'btn-navy' : 'btn-outline'
              }`}
            >
              {simulateZeroReports
                ? 'Tampilkan Kembali Data Dummy'
                : 'Uji Empty State (0 Laporan)'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 pt-2 border-t border-line">
            {/* Input Pencarian */}
            <div className="md:col-span-7 form-group">
              <label htmlFor="user-report-search" className="form-label">
                Cari Judul atau Nomor Laporan
              </label>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
                <input
                  id="user-report-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Ketik judul atau nomor laporan (misal: LW-2026-0412)..."
                  className="input-field pl-9 pr-9"
                />
                {searchQuery && (
                  <button
                    id="user-clear-search-btn"
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Bersihkan pencarian"
                    className="absolute inset-y-0 right-2 my-auto w-7 h-7 rounded-xs text-muted hover:text-ink hover:bg-surface-subtle flex items-center justify-center cursor-pointer"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Dropdown Filter Status */}
            <div className="md:col-span-5 form-group">
              <label htmlFor="user-report-status-filter" className="form-label">
                Filter Status
              </label>
              <select
                id="user-report-status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="select-field"
              >
                {USER_REPORT_STATUS_FILTERS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Info Jumlah & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
            <span>
              Menampilkan <strong className="text-ink">{filteredReports.length}</strong> dari{' '}
              <strong className="text-ink">{activeUserReports.length}</strong> laporan
              milik Anda (Data Dummy)
            </span>

            {hasFilterOrSearch && (
              <button
                id="user-reset-filter-btn"
                type="button"
                onClick={handleResetFilters}
                className="font-semibold text-teal hover:text-teal-800 underline underline-offset-2 cursor-pointer"
              >
                Reset Pencarian &amp; Filter
              </button>
            )}
          </div>
        </div>

        {/* Daftar Laporan atau Empty State */}
        {activeUserReports.length === 0 ? (
          <div className="card p-8 sm:p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-teal-50 text-teal mx-auto flex items-center justify-center">
              <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M12 11v6M9 14h6" />
              </svg>
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="heading-2">Belum Ada Laporan yang Anda Kirim</h3>
              <p className="text-body-sm text-muted">
                Anda belum memiliki riwayat laporan permasalahan lingkungan.
                Laporkan kerusakan fasilitas umum di sekitar Anda agar segera
                ditindaklanjuti.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                id="empty-user-create-report-btn"
                to="/buat-laporan"
                className="btn btn-primary"
              >
                + Buat Laporan Pertama
              </Link>
              {simulateZeroReports && (
                <button
                  id="empty-restore-dummy-btn"
                  type="button"
                  onClick={() => setSimulateZeroReports(false)}
                  className="btn btn-outline"
                >
                  Kembalikan Contoh Data Dummy
                </button>
              )}
            </div>
          </div>
        ) : filteredReports.length === 0 ? (
          <EmptyState
            title="Tidak Ada Laporan Anda yang Cocok"
            description="Kata kunci pencarian atau filter status yang dipilih belum cocok dengan riwayat laporan milik Anda."
            onReset={handleResetFilters}
          />
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <UserReportRowCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default UserDashboard
