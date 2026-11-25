function StatIcon({ variant }) {
  switch (variant) {
    case 'pending':
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'processing':
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          <path d="M21 3v5h-5" />
        </svg>
      )
    case 'resolved':
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.5 2.5 2.5 5-5" />
        </svg>
      )
    default:
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M8 13h8M8 17h5" />
        </svg>
      )
  }
}

const VARIANT_STYLES = {
  total: {
    iconWrap: 'bg-navy-50 text-navy',
    valueText: 'text-navy',
  },
  pending: {
    iconWrap: 'bg-warning-soft text-warning-ink',
    valueText: 'text-warning-ink',
  },
  processing: {
    iconWrap: 'bg-teal-50 text-teal-800',
    valueText: 'text-teal',
  },
  resolved: {
    iconWrap: 'bg-success-soft text-success-ink',
    valueText: 'text-success',
  },
}

/**
 * Reusable DashboardStatCard untuk ringkasan metrik di Dashboard Pengguna / Admin.
 * Mendukung mode interaktif (klik untuk memfilter status laporan secara cepat).
 */
function DashboardStatCard({
  id,
  label,
  value,
  subtitle,
  variant = 'total',
  isActive = false,
  onClick,
}) {
  const palette = VARIANT_STYLES[variant] || VARIANT_STYLES.total

  if (onClick) {
    return (
      <button
        id={id}
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        className={`card-stat text-left w-full flex flex-col justify-between gap-3 transition-all cursor-pointer ${
          isActive
            ? 'border-teal ring-2 ring-teal/25 bg-surface'
            : 'hover:border-line-strong hover:shadow-card-hover'
        }`}
      >
        <div className="w-full flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-muted">{label}</p>
            <p className={`stat-value mt-1.5 ${palette.valueText}`}>{value}</p>
          </div>
          <span
            className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${palette.iconWrap}`}
          >
            <StatIcon variant={variant} />
          </span>
        </div>

        {subtitle && (
          <p className="text-xs text-muted pt-2.5 border-t border-line w-full">
            {subtitle}
          </p>
        )}
      </button>
    )
  }

  return (
    <article className="card-stat flex flex-col justify-between gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-muted">{label}</p>
          <p className={`stat-value mt-1.5 ${palette.valueText}`}>{value}</p>
        </div>
        <span
          className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${palette.iconWrap}`}
        >
          <StatIcon variant={variant} />
        </span>
      </div>

      {subtitle && (
        <p className="text-xs text-muted pt-2.5 border-t border-line">
          {subtitle}
        </p>
      )}
    </article>
  )
}

export default DashboardStatCard
