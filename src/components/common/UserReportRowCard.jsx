import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'

/**
 * Reusable UserReportRowCard untuk menampilkan item laporan milik pengguna sendiri:
 * foto, judul, nomor laporan, tanggal, kategori, status, dan tombol detail.
 */
function UserReportRowCard({ report }) {
  return (
    <article className="card p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between transition-shadow hover:shadow-card-hover">
      <div className="flex flex-col xs:flex-row gap-4 min-w-0 flex-1">
        {/* 1. Foto Bukti Laporan */}
        <div className="relative w-full xs:w-32 sm:w-36 aspect-16/9 xs:aspect-4/3 rounded-md overflow-hidden bg-surface-subtle border border-line shrink-0">
          <img
            src={report.photo}
            alt={report.photoAlt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {report.isDummy && (
            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-xs bg-navy/90 text-white text-[10px] font-bold uppercase">
              Dummy
            </span>
          )}
        </div>

        {/* 2. Nomor Laporan, Kategori, Status, Judul & Tanggal */}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-report-code text-navy bg-surface-subtle px-2 py-0.5 rounded-xs border border-line">
              #{report.reportNumber}
            </span>
            <span className="badge badge-neutral">{report.category}</span>
            <StatusBadge status={report.status} />
          </div>

          <h3 className="heading-3 line-clamp-2">{report.title}</h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <time>{report.date}</time>
            </span>

            <span className="inline-flex items-center gap-1.5 truncate">
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-teal"
              >
                <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span className="truncate">{report.location}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Tombol Detail */}
      <div className="pt-3 sm:pt-0 border-t sm:border-t-0 border-line shrink-0 flex items-center justify-end">
        <Link
          id={`user-report-detail-btn-${report.id}`}
          to={`/laporan/${report.id}`}
          className="btn btn-outline btn-sm w-full sm:w-auto"
        >
          <span>Lihat Detail</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  )
}

export default UserReportRowCard
