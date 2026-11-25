import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'

/**
 * Reusable ReportCard menampilkan foto, judul, kategori, lokasi, dan status laporan
 */
function ReportCard({ report }) {
  return (
    <article className="card card-interactive overflow-hidden flex flex-col">
      {/* 1. Foto Bukti Laporan */}
      <div className="relative aspect-16/9 bg-surface-subtle border-b border-line overflow-hidden">
        <img
          src={report.photo}
          alt={report.photoAlt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {report.isDummy && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xs bg-navy/90 text-white text-[11px] font-bold uppercase tracking-wider">
            Data Dummy
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          {/* 2. Kategori & 3. Status */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="badge badge-neutral">{report.category}</span>
            <StatusBadge status={report.status} />
          </div>

          {/* 4. Judul Laporan */}
          <h3 className="heading-3 line-clamp-2">{report.title}</h3>

          {/* 5. Lokasi Kejadian */}
          <div className="flex items-start gap-2 text-body-sm text-muted">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 mt-0.5 text-teal"
            >
              <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>{report.location}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-line flex items-center justify-between gap-3">
          <span className="text-report-code text-muted">{report.code}</span>
          <Link
            id={`report-detail-btn-${report.id}`}
            to={`/laporan/${report.id}`}
            className="btn btn-outline btn-sm"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ReportCard
