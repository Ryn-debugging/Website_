/**
 * Reusable Loading Skeleton Grid untuk daftar kartu laporan
 */
function ReportGridSkeleton({ count = 6 }) {
  const placeholders = Array.from({ length: count }, (_, index) => index)

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Memuat daftar laporan"
      className="space-y-4"
    >
      <div className="flex items-center gap-2.5 text-body-sm text-muted">
        <span
          aria-hidden="true"
          className="w-4 h-4 rounded-full border-2 border-teal border-t-transparent animate-spin"
        />
        <span>Memuat daftar contoh laporan...</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholders.map((item) => (
          <div key={item} className="card overflow-hidden animate-pulse">
            <div className="aspect-16/9 bg-surface-muted border-b border-line" />
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="h-5 w-24 rounded-xs bg-surface-muted" />
                <div className="h-5 w-28 rounded-xs bg-surface-muted" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-full rounded-xs bg-surface-muted" />
                <div className="h-5 w-3/4 rounded-xs bg-surface-muted" />
              </div>
              <div className="h-4 w-2/3 rounded-xs bg-surface-subtle" />
              <div className="pt-3 border-t border-line flex items-center justify-between">
                <div className="h-4 w-24 rounded-xs bg-surface-subtle" />
                <div className="h-4 w-20 rounded-xs bg-surface-subtle" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReportGridSkeleton
