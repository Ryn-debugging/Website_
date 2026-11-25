import StatusBadge from './StatusBadge.jsx'

const STATUS_CHART_SERIES = [
  { key: 'menunggu_verifikasi', label: 'Menunggu Verifikasi', color: '#D99A2B' },
  { key: 'diverifikasi', label: 'Diverifikasi', color: '#173B57' },
  { key: 'sedang_diproses', label: 'Sedang Diproses', color: '#168C83' },
  { key: 'selesai', label: 'Selesai', color: '#16865B' },
  { key: 'ditolak', label: 'Ditolak', color: '#D94B4B' },
]

/**
 * Grafik Distribusi Status Laporan berbasis SVG Donut murni (tanpa dependensi berat)
 */
export function AdminStatusChartCard({ reports }) {
  const total = reports.length
  const radius = 54
  const circumference = 2 * Math.PI * radius

  const { segments } = STATUS_CHART_SERIES.reduce(
    (acc, item) => {
      const count = reports.filter((r) => r.status === item.key).length
      const fraction = total > 0 ? count / total : 0
      const dashLength = fraction * circumference
      const dashOffset = -acc.offsetFraction * circumference

      acc.segments.push({
        ...item,
        count,
        percentage: total > 0 ? Math.round(fraction * 100) : 0,
        dashLength,
        dashOffset,
      })

      return {
        offsetFraction: acc.offsetFraction + fraction,
        segments: acc.segments,
      }
    },
    { offsetFraction: 0, segments: [] },
  )

  return (
    <article className="card p-5 sm:p-6 flex flex-col justify-between gap-5">
      <div>
        <h2 className="heading-3">Distribusi Status Laporan</h2>
        <p className="text-body-sm text-muted mt-0.5">
          Proporsi tahapan penanganan dari seluruh data simulasi.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* SVG Donut Ring */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg
            aria-label="Diagram lingkaran distribusi status laporan"
            viewBox="0 0 140 140"
            className="w-full h-full -rotate-90"
          >
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#EEF3F8"
              strokeWidth="18"
            />
            {segments.map(
              (seg) =>
                seg.count > 0 && (
                  <circle
                    key={seg.key}
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="18"
                    strokeDasharray={`${seg.dashLength} ${circumference}`}
                    strokeDashoffset={seg.dashOffset}
                  />
                ),
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold text-navy tabular-nums leading-none">
              {total}
            </span>
            <span className="text-[11px] font-semibold text-muted mt-1">
              Total Dummy
            </span>
          </div>
        </div>

        {/* Legend */}
        <ul className="w-full space-y-2.5 text-body-sm">
          {segments.map((seg) => (
            <li
              key={seg.key}
              className="flex items-center justify-between gap-3"
            >
              <span className="inline-flex items-center gap-2 text-ink-secondary">
                <span
                  aria-hidden="true"
                  className="w-3 h-3 rounded-xs shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span>{seg.label}</span>
              </span>
              <span className="font-semibold text-ink tabular-nums">
                {seg.count}{' '}
                <span className="text-xs font-normal text-muted">
                  ({seg.percentage}%)
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

/**
 * Grafik Batang Horizontal Jumlah Laporan per Kategori
 */
export function AdminCategoryChartCard({ reports, categories }) {
  const total = reports.length

  const categoryRows = categories.map((cat) => {
    const count = reports.filter((r) => r.categorySlug === cat.id).length
    const percent = total > 0 ? Math.round((count / total) * 100) : 0
    return {
      id: cat.id,
      name: cat.name,
      count,
      percent,
    }
  })

  const maxCount = Math.max(1, ...categoryRows.map((item) => item.count))

  return (
    <article className="card p-5 sm:p-6 flex flex-col justify-between gap-5">
      <div>
        <h2 className="heading-3">Laporan Berdasarkan Kategori</h2>
        <p className="text-body-sm text-muted mt-0.5">
          Sebaran jenis kerusakan fasilitas umum yang dilaporkan.
        </p>
      </div>

      <div className="space-y-3.5">
        {categoryRows.map((row) => {
          const barWidth = Math.round((row.count / maxCount) * 100)
          return (
            <div key={row.id} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-body-sm">
                <span className="font-medium text-ink">{row.name}</span>
                <span className="text-xs font-semibold text-navy tabular-nums">
                  {row.count} laporan ({row.percent}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-subtle overflow-hidden">
                <div
                  style={{ width: `${barWidth}%` }}
                  className="h-full rounded-full bg-teal transition-all duration-300"
                />
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

/**
 * Panel Aktivitas Moderasi Terbaru (Log Perubahan Status Admin)
 */
export function AdminRecentActivityCard({ activities, onSelectReportId }) {
  return (
    <article className="card p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h2 className="heading-3">Aktivitas Moderasi Terbaru</h2>
          <p className="text-body-sm text-muted mt-0.5">
            Catatan riwayat verifikasi dan perubahan status pada sesi simulasi ini.
          </p>
        </div>
        <span className="badge badge-neutral">Data Dummy</span>
      </div>

      {activities.length === 0 ? (
        <p className="text-body-sm text-muted py-4 text-center">
          Belum ada catatan aktivitas moderasi.
        </p>
      ) : (
        <ul className="divide-y divide-line">
          {activities.slice(0, 6).map((act) => (
            <li
              key={act.id}
              className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    id={`activity-open-report-${act.id}`}
                    type="button"
                    onClick={() => onSelectReportId(act.reportId)}
                    className="text-report-code text-navy hover:text-teal underline underline-offset-2 cursor-pointer"
                  >
                    #{act.reportNumber}
                  </button>
                  <span className="text-sm font-semibold text-ink">
                    {act.actionLabel}
                  </span>
                </div>
                {act.note && (
                  <p className="text-body-sm text-muted line-clamp-2">
                    {act.note}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                <StatusBadge status={act.badgeStatus} />
                <time className="text-xs text-muted whitespace-nowrap">
                  {act.timestamp}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
