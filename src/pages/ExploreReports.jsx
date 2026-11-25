import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorState from '../components/common/ErrorState.jsx'
import Pagination from '../components/common/Pagination.jsx'
import ReportCard from '../components/common/ReportCard.jsx'
import ReportGridSkeleton from '../components/common/ReportGridSkeleton.jsx'
import { REPORT_CATEGORIES } from '../utils/dummyLandingData.js'
import {
  DUMMY_LOCATIONS,
  DUMMY_PUBLIC_REPORTS,
  PUBLIC_STATUS_FILTERS,
} from '../utils/dummyReportsData.js'

const ITEMS_PER_PAGE = 6

function getValidInitialCategory(paramValue) {
  if (!paramValue) return 'all'
  const exists = REPORT_CATEGORIES.some((cat) => cat.id === paramValue)
  return exists ? paramValue : 'all'
}

function ExploreReports() {
  const [searchParams, setSearchParams] = useSearchParams()
  const resultsTopRef = useRef(null)
  const reloadTimerRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [uiState, setUiState] = useState('loading')

  const selectedCategory = getValidInitialCategory(searchParams.get('kategori'))

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      setUiState('ready')
    }, 300)

    return () => {
      window.clearTimeout(initialTimer)
      if (reloadTimerRef.current) {
        window.clearTimeout(reloadTimerRef.current)
      }
    }
  }, [])

  const syncCategoryQueryParam = (categoryValue) => {
    const nextParams = new URLSearchParams(searchParams)
    if (categoryValue === 'all') {
      nextParams.delete('kategori')
    } else {
      nextParams.set('kategori', categoryValue)
    }
    setSearchParams(nextParams, { replace: true })
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handleCategoryChange = (event) => {
    const nextCategory = event.target.value
    setCurrentPage(1)
    syncCategoryQueryParam(nextCategory)
  }

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value)
    setCurrentPage(1)
  }

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedStatus('all')
    setSelectedLocation('all')
    setCurrentPage(1)
    syncCategoryQueryParam('all')
  }

  const handleRetryLoad = () => {
    setUiState('loading')
    if (reloadTimerRef.current) {
      window.clearTimeout(reloadTimerRef.current)
    }
    reloadTimerRef.current = window.setTimeout(() => {
      setUiState('ready')
    }, 350)
  }

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'all' ||
    selectedLocation !== 'all'

  const filteredReports = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return DUMMY_PUBLIC_REPORTS.filter((report) => {
      const matchesTitle =
        normalizedQuery === '' ||
        report.title.toLowerCase().includes(normalizedQuery)

      const matchesCategory =
        selectedCategory === 'all' || report.categorySlug === selectedCategory

      const matchesStatus =
        selectedStatus === 'all' || report.status === selectedStatus

      const matchesLocation =
        selectedLocation === 'all' || report.area === selectedLocation

      return (
        matchesTitle && matchesCategory && matchesStatus && matchesLocation
      )
    })
  }, [searchQuery, selectedCategory, selectedStatus, selectedLocation])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / ITEMS_PER_PAGE),
  )
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedReports = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
    return filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredReports, safeCurrentPage])

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage)
    if (resultsTopRef.current) {
      resultsTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      {/* Page Header */}
      <section className="bg-surface border-b border-line py-8 sm:py-10">
        <div className="lw-container flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-eyebrow text-teal">Daftar Laporan Publik</p>
              <span className="badge badge-pending">
                <span className="badge-dot" aria-hidden="true" />
                Data Dummy (Simulasi UI — Bukan Laporan Nyata)
              </span>
            </div>

            <h1 className="heading-1">Jelajahi Laporan Masyarakat</h1>
            <p className="text-body text-muted">
              Telusuri contoh laporan permasalahan infrastruktur dan fasilitas
              umum berdasarkan kata kunci judul, kategori, status penanganan,
              maupun wilayah lokasi.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              id="explore-header-create-btn"
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
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span>Buat Laporan Baru</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Filter & Results Content */}
      <section ref={resultsTopRef} className="lw-section flex-1">
        <div className="lw-container space-y-6">
          {/* Search & Multi-Filter Card */}
          <div className="card p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
              {/* 1. Pencarian Judul */}
              <div className="sm:col-span-2 lg:col-span-4 form-group">
                <label htmlFor="explore-search-input" className="form-label">
                  Cari Judul Laporan
                </label>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                  </span>

                  <input
                    id="explore-search-input"
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Ketik kata kunci judul..."
                    className="input-field pl-10 pr-9"
                  />

                  {searchQuery && (
                    <button
                      id="explore-clear-search-btn"
                      type="button"
                      onClick={handleClearSearch}
                      aria-label="Bersihkan kata kunci pencarian"
                      className="absolute inset-y-0 right-2 my-auto w-7 h-7 rounded-xs text-muted hover:text-ink hover:bg-surface-subtle flex items-center justify-center cursor-pointer"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Filter Kategori */}
              <div className="lg:col-span-3 form-group">
                <label htmlFor="explore-category-select" className="form-label">
                  Kategori
                </label>
                <select
                  id="explore-category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="select-field"
                >
                  <option value="all">Semua Kategori</option>
                  {REPORT_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Filter Status */}
              <div className="lg:col-span-2 form-group">
                <label htmlFor="explore-status-select" className="form-label">
                  Status
                </label>
                <select
                  id="explore-status-select"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="select-field"
                >
                  {PUBLIC_STATUS_FILTERS.map((statusOption) => (
                    <option key={statusOption.value} value={statusOption.value}>
                      {statusOption.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Filter Lokasi */}
              <div className="lg:col-span-3 form-group">
                <label htmlFor="explore-location-select" className="form-label">
                  Lokasi Wilayah
                </label>
                <select
                  id="explore-location-select"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  className="select-field"
                >
                  <option value="all">Semua Lokasi</option>
                  {DUMMY_LOCATIONS.map((locationName) => (
                    <option key={locationName} value={locationName}>
                      {locationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Summary + Reset + UI State Simulator Bar */}
            <div className="pt-3 border-t border-line flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 text-body-sm">
                <p className="text-muted">
                  Menampilkan{' '}
                  <strong className="text-ink">
                    {uiState === 'ready' ? filteredReports.length : 0}
                  </strong>{' '}
                  dari{' '}
                  <strong className="text-ink">
                    {DUMMY_PUBLIC_REPORTS.length}
                  </strong>{' '}
                  contoh laporan dummy
                </p>

                {hasActiveFilters && (
                  <button
                    id="explore-reset-filters-btn"
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-teal hover:text-teal-800 underline underline-offset-2 cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              {/* UI State Switcher untuk menguji Loading & Error State tanpa database */}
              <div
                aria-label="Penguji Status Tampilan UI"
                className="flex flex-wrap items-center gap-1.5"
              >
                <span className="text-xs font-medium text-muted mr-1">
                  Uji Status UI:
                </span>
                <button
                  id="sim-state-ready"
                  type="button"
                  onClick={() => setUiState('ready')}
                  className={`btn btn-sm min-h-8 px-2.5 text-xs ${
                    uiState === 'ready' ? 'btn-navy' : 'btn-outline'
                  }`}
                >
                  Normal
                </button>
                <button
                  id="sim-state-loading"
                  type="button"
                  onClick={() => setUiState('loading')}
                  className={`btn btn-sm min-h-8 px-2.5 text-xs ${
                    uiState === 'loading' ? 'btn-navy' : 'btn-outline'
                  }`}
                >
                  Loading
                </button>
                <button
                  id="sim-state-error"
                  type="button"
                  onClick={() => setUiState('error')}
                  className={`btn btn-sm min-h-8 px-2.5 text-xs ${
                    uiState === 'error' ? 'btn-danger' : 'btn-outline'
                  }`}
                >
                  Error
                </button>
              </div>
            </div>
          </div>

          {/* Conditional Rendering: Loading State / Error State / Empty State / Report Grid + Pagination */}
          {uiState === 'loading' && (
            <ReportGridSkeleton count={ITEMS_PER_PAGE} />
          )}

          {uiState === 'error' && (
            <ErrorState
              title="Gagal Memuat Daftar Laporan"
              message="Ini adalah simulasi tampilan Error State ketika terjadi gangguan jaringan atau layanan. Klik tombol di bawah untuk memuat kembali daftar contoh laporan."
              onRetry={handleRetryLoad}
            />
          )}

          {uiState === 'ready' && filteredReports.length === 0 && (
            <EmptyState
              title="Tidak Ada Laporan yang Sesuai"
              description="Pencarian judul atau kombinasi filter yang Anda pilih tidak cocok dengan contoh laporan mana pun. Silakan atur ulang filter untuk melihat seluruh daftar contoh."
              onReset={handleResetFilters}
            />
          )}

          {uiState === 'ready' && filteredReports.length > 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>

              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ExploreReports
