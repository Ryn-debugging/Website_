/**
 * Reusable ErrorState ketika terjadi kendala saat memuat daftar laporan
 */
function ErrorState({
  title = 'Gagal Memuat Daftar Laporan',
  message = 'Terjadi kendala saat mengambil data laporan. Silakan periksa koneksi Anda atau muat ulang halaman.',
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="card p-8 sm:p-10 text-center max-w-xl mx-auto border-danger/35 bg-surface space-y-4"
    >
      <div className="w-14 h-14 rounded-full bg-danger-soft text-danger mx-auto flex items-center justify-center">
        <svg
          aria-hidden="true"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4.5M12 16h.01" />
        </svg>
      </div>

      <div className="space-y-1.5">
        <h2 className="heading-2">{title}</h2>
        <p className="text-body-sm text-muted max-w-md mx-auto">{message}</p>
      </div>

      {onRetry && (
        <div className="pt-2">
          <button
            id="error-state-retry-btn"
            type="button"
            onClick={onRetry}
            className="btn btn-navy"
          >
            Coba Muat Ulang
          </button>
        </div>
      )}
    </div>
  )
}

export default ErrorState
