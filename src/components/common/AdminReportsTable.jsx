import { useMemo, useState } from 'react'
import { ADMIN_STATUS_FILTER_OPTIONS } from '../../utils/dummyAdminData.js'
import EmptyState from './EmptyState.jsx'
import ErrorState from './ErrorState.jsx'
import Pagination from './Pagination.jsx'
import StatusBadge from './StatusBadge.jsx'

const ROWS_PER_PAGE = 5

function TableSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="card p-5 space-y-3 animate-pulse"
    >
      <div className="text-xs font-medium text-muted">
        Memuat tabel manajemen laporan...
      </div>
      {[1, 2, 3, 4, 5].map((row) => (
        <div
          key={row}
          className="h-12 rounded-md bg-surface-subtle border border-line"
        />
      ))}
    </div>
  )
}

/**
 * Reusable AdminReportsTable dengan Pencarian, Filter Kategori, Filter Status,
 * Pagination, Loading/Empty/Error States, serta tampilan responsif Tabel (Desktop) & Kartu (Mobile).
 */
function AdminReportsTable({
  reports,
  categories,
  lockedStatus = null,
  onInspectReport,
  onQuickVerifyRequest,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [tableState, setTableState] = useState('ready')

  const effectiveStatusFilter = lockedStatus || statusFilter

  const filteredReports = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return reports.filter((report) => {
      const matchesKeyword =
        keyword === '' ||
        report.reportNumber.toLowerCase().includes(keyword) ||
        report.title.toLowerCase().includes(keyword) ||
        report.reporterName.toLowerCase().includes(keyword)

      const matchesCategory =
        categoryFilter === 'all' || report.categorySlug === categoryFilter

      const matchesStatus =
        effectiveStatusFilter === 'all' ||
        report.status === effectiveStatusFilter

      return matchesKeyword && matchesCategory && matchesStatus
    })
  }, [reports, searchQuery, categoryFilter, effectiveStatusFilter])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / ROWS_PER_PAGE),
  )
  const safePage = Math.min(currentPage, totalPages)

  const paginatedRows = useMemo(() => {
    const start = (safePage - 1) * ROWS_PER_PAGE
    return filteredReports.slice(start, start + ROWS_PER_PAGE)
  }, [filteredReports, safePage])

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    categoryFilter !== 'all' ||
    (!lockedStatus && statusFilter !== 'all')

  const handleReset = () => {
    setSearchQuery('')
    setCategoryFilter('all')
    if (!lockedStatus) {
      setStatusFilter('all')
    }
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Filter & Search Toolbar */}
      <div className="card p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
          {/* Pencarian */}
          <div
            className={`${
              lockedStatus ? 'lg:col-span-8' : 'sm:col-span-2 lg:col-span-5'
            } form-group`}
          >
            <label htmlFor="admin-table-search" className="form-label">
              Cari Nomor, Judul, atau Pelapor
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
                id="admin-table-search"
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Ketik nomor tiket, judul, atau nama pelapor..."
                className="input-field pl-9"
              />
            </div>
          </div>

          {/* Filter Kategori */}
          <div className="lg:col-span-4 form-group">
            <label htmlFor="admin-category-filter" className="form-label">
              Filter Kategori
            </label>
            <select
              id="admin-category-filter"
              value={categoryFilter}
              onChange={(event) => {
                setCategoryFilter(event.target.value)
                setCurrentPage(1)
              }}
              className="select-field"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Status (Disembunyikan bila sedang di tab khusus satu status) */}
          {!lockedStatus && (
            <div className="lg:col-span-3 form-group">
              <label htmlFor="admin-status-filter" className="form-label">
                Filter Status
              </label>
              <select
                id="admin-status-filter"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value)
                  setCurrentPage(1)
                }}
                className="select-field"
              >
                {ADMIN_STATUS_FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Summary & UI State Tester */}
        <div className="pt-3 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3 text-muted">
            <span>
              Menampilkan{' '}
              <strong className="text-ink">
                {tableState === 'ready' ? filteredReports.length : 0}
              </strong>{' '}
              dari <strong className="text-ink">{reports.length}</strong> laporan
              dummy
            </span>
            {hasActiveFilters && (
              <button
                id="admin-reset-filters-btn"
                type="button"
                onClick={handleReset}
                className="font-semibold text-teal hover:text-teal-800 underline underline-offset-2 cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-muted font-medium">Uji Status Tabel:</span>
            <button
              id="admin-sim-ready"
              type="button"
              onClick={() => setTableState('ready')}
              className={`btn btn-sm min-h-7 px-2.5 text-xs ${
                tableState === 'ready' ? 'btn-navy' : 'btn-outline'
              }`}
            >
              Normal
            </button>
            <button
              id="admin-sim-loading"
              type="button"
              onClick={() => setTableState('loading')}
              className={`btn btn-sm min-h-7 px-2.5 text-xs ${
                tableState === 'loading' ? 'btn-navy' : 'btn-outline'
              }`}
            >
              Loading
            </button>
            <button
              id="admin-sim-error"
              type="button"
              onClick={() => setTableState('error')}
              className={`btn btn-sm min-h-7 px-2.5 text-xs ${
                tableState === 'error' ? 'btn-danger' : 'btn-outline'
              }`}
            >
              Error
            </button>
          </div>
        </div>
      </div>

      {/* Loading / Error / Empty / Data Table */}
      {tableState === 'loading' && <TableSkeleton />}

      {tableState === 'error' && (
        <ErrorState
          title="Gagal Memuat Data Manajemen Laporan"
          message="Ini adalah simulasi Error State pada tabel admin. Klik tombol di bawah untuk memulihkan tampilan tabel."
          onRetry={() => setTableState('ready')}
        />
      )}

      {tableState === 'ready' && filteredReports.length === 0 && (
        <EmptyState
          title="Tidak Ada Laporan yang Ditemukan"
          description="Tidak ada data laporan dummy yang cocok dengan pencarian atau filter saat ini."
          onReset={hasActiveFilters ? handleReset : undefined}
        />
      )}

      {tableState === 'ready' && filteredReports.length > 0 && (
        <>
          {/* Tampilan Tabel Mudah Dibaca untuk Tablet & Desktop (md+) */}
          <div className="hidden md:block card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-subtle border-b border-line text-[11px] font-bold uppercase tracking-wider text-muted">
                    <th className="py-3.5 px-4">No. Laporan</th>
                    <th className="py-3.5 px-4">Judul Laporan</th>
                    <th className="py-3.5 px-4">Kategori</th>
                    <th className="py-3.5 px-4">Nama Pelapor</th>
                    <th className="py-3.5 px-4">Tanggal</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-sm">
                  {paginatedRows.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-canvas/80 transition-colors"
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-report-code text-navy">
                          #{report.reportNumber}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-semibold text-ink line-clamp-1">
                          {report.title}
                        </p>
                        <p className="text-xs text-muted line-clamp-1 mt-0.5">
                          {report.location}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="badge badge-neutral">
                          {report.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-ink-secondary">
                        {report.reporterName}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-muted text-xs">
                        {report.date}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="inline-flex items-center justify-end gap-2">
                          {report.status === 'menunggu_verifikasi' && (
                            <button
                              id={`admin-quick-verify-${report.id}`}
                              type="button"
                              onClick={() => onQuickVerifyRequest(report)}
                              className="btn btn-success btn-sm min-h-8 px-2.5 text-xs"
                            >
                              Verifikasi
                            </button>
                          )}
                          <button
                            id={`admin-inspect-btn-${report.id}`}
                            type="button"
                            onClick={() => onInspectReport(report)}
                            className="btn btn-outline btn-sm min-h-8 px-3 text-xs"
                          >
                            Detail &amp; Moderasi
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tampilan Kartu Responsif untuk Layar Ponsel (< md) */}
          <div className="md:hidden space-y-3">
            {paginatedRows.map((report) => (
              <article key={report.id} className="card p-4 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-report-code text-navy">
                    #{report.reportNumber}
                  </span>
                  <StatusBadge status={report.status} />
                </div>

                <div>
                  <h3 className="heading-4 line-clamp-2">{report.title}</h3>
                  <p className="text-xs text-muted mt-1">
                    Pelapor: {report.reporterName} &middot; {report.date}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-line">
                  <span className="badge badge-neutral">{report.category}</span>

                  <div className="flex items-center gap-2">
                    {report.status === 'menunggu_verifikasi' && (
                      <button
                        id={`mobile-quick-verify-${report.id}`}
                        type="button"
                        onClick={() => onQuickVerifyRequest(report)}
                        className="btn btn-success btn-sm min-h-9 px-2.5 text-xs"
                      >
                        Verifikasi
                      </button>
                    )}
                    <button
                      id={`mobile-inspect-btn-${report.id}`}
                      type="button"
                      onClick={() => onInspectReport(report)}
                      className="btn btn-outline btn-sm min-h-9 px-3 text-xs"
                    >
                      Moderasi
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}

export default AdminReportsTable
