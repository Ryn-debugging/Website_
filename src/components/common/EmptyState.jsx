/**
 * Reusable EmptyState ketika pencarian atau kombinasi filter tidak menemukan laporan
 */
function EmptyState({
  title = 'Tidak Ada Laporan yang Ditemukan',
  description = 'Coba ubah kata kunci pencarian atau sesuaikan pilihan filter kategori, status, maupun lokasi.',
  onReset,
}) {
  return (
    <div className="card p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4">
      <div className="w-14 h-14 rounded-full bg-surface-subtle text-navy mx-auto flex items-center justify-center">
        <svg
          aria-hidden="true"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5M8.5 11h5" />
        </svg>
      </div>

      <div className="space-y-1.5">
        <h2 className="heading-2">{title}</h2>
        <p className="text-body-sm text-muted max-w-md mx-auto">{description}</p>
      </div>

      {onReset && (
        <div className="pt-2">
          <button
            id="empty-state-reset-btn"
            type="button"
            onClick={onReset}
            className="btn btn-primary"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  )
}

export default EmptyState
